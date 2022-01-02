# 👉 https://elliotchance.github.io/tracklist-editor 👈

# Features

1. Paste a tracklist from anywhere and have it do sensible parsing for titles,
track numbers, artists and times with *Paste from Anywhere...*
2. Import tracklists directly from Apple Music, Discogs and Spotify.
3. Automatically fix capitalization from
[RYM standards](https://rateyourmusic.com/wiki/RYM:Capitalization).
4. Fill in/fix track numbers.
5. Find/replace tools with preview and regex options.
6. Formats as RYM ready to paste into "Advanced".

# Development

All of the docs below are useful if you want to develop or contribute.

## Track

A track (as seen in the UI) is represented as an object with the following
properties:

- `id` (string) is a read-only attribute used to identify tracks within the
track list.
- `highlights` ([]Range) are the pairs for index ranges (startIndex, endIndex)
to be shown in the UI. See `highlightTrack()`.
- `number` (string) is the track number.
- `time` (string) is either empty or in the format '0:00'.
- `title` (string) is the track title.

## Running Tests

```sh
node test.js
```

If you see no output, then all tests pass, otherwise you will see an exception.

## API

### refresh()

Call `refresh` on mount to assign a function that should be called when the
track list changes. For example, the Find/Replace component will need to perform
the find again when the track list changes:

```js
Vue.component('find-replace-action', {
    props: ['refresh'],
    mounted() {
        this.refresh(() => {
            this.find();
        })
    },
});
```

### getTracks()

`getTracks` returns an array of tracks. Each track object is described above.

### setTracks([]Track)

`setTracks` will replace _all_ tracks.

### setTrack(TrackID, Track)

`setTrack` will merge any propertes of the track onto the existing track. For
example, you can update the track title with:

```js
setTrack(track.id, { title: 'My New Title' });
```

### highlightTrack(TrackID, []Position)

`highlightTrack` will replace any existing highlights for the track. To remove
all highlights, you should provide `[]`.

Each element is a pair of [startIndex, endIndex], for example `[[5,6], [12,16]]`
will show the following highlighted text for the title:

> This **is** the **title** of the track
