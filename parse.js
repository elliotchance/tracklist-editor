// parse.js contains the implementation for translating some random input into
// the tracks.

function newTrack(track) {
    return {
        id: Math.floor(Math.random() * 1e9),
        number: '',
        title: '',
        time: '',
        highlight: [],
        editingNumber: false,
        editingTitle: false,
        editingTime: false,
        ...track
    }
}

function parseTracks(str, lineMode) {
    let lines = str.split('\n').filter(x => x.trim() !== '');
    const trackNumberRegex = /^\d+[.-\s|]*/;
    const trackTimeRegex = /(\d+:)?\d+:\d\d/;

    if (lineMode === 'artist-first') {
        let newLines = [];
        for (let i = 0; i < lines.length; i += 2) {
            newLines.push(lines[i] + ' - ' + lines[i+1])
        }
        lines = newLines;
    }

    if (lineMode === 'title-first') {
        let newLines = [];
        for (let i = 0; i < lines.length; i += 2) {
            newLines.push(lines[i+1] + ' - ' + lines[i])
        }
        lines = newLines;
    }

    const tracks = lines.map((line, i) => {
        let track = {
            title: line.trim()
        };
        
        // Always use short dashes.
        track.title = track.title.replace(/\u2013|\u2014/g, '-');

        if (track.title.match(trackNumberRegex)) {
            const match = trackNumberRegex.exec(track.title)[0];
            track.number = match.replace(/[^\d]/g, '');
            track.title = track.title.replace(match, '').trim();
        }

        if (track.title.match(trackTimeRegex)) {
            track.time = trackTimeRegex.exec(track.title)[0];
            track.title = track.title.replace(track.time, '').trim();

            // Trim off any leading zeros from the time (ie. '01:23' -> '1:23').
            track.time = track.time.replace(/^[0:]+/g, '');
        }

        // Strip surrounding "".
        // TODO: This should be smarter to only do this is almost all of the
        //  tracks look like this.
        track.title = track.title.replace(/^"|"$/g, '');

        // Remove multiple spaces. This also replaces tabs with spaces.
        track.title = track.title.replace(/\s+/g, ' ');

        // Strip remaining punctuation.
        track.title = track.title.replace(/\(\s*\)$/g, ' ');
        track.title = track.title.replace(/[|-\s]+$/g, '');

        // Replace backticks and single curly apostrophes with regular apostrophes
        track.title = track.title
            .replace(/`/g, "'")
            .replace(/[\u2018\u2019]/g, "'");

        track.title = track.title.trim();

        return newTrack(track);
    });

    return tracks;
}

if (typeof module !== 'undefined') {
    module.exports = parseTracks;
}
