'use strict';

// Examples:
//   sls invoke -f spotify -d '{"url":"https://open.spotify.com/album/5evzhxkqmzMEQIlOY4Jl89"}'
//   curl "https://sxxqp2lco7.execute-api.us-east-1.amazonaws.com/dev/apple-music?url=https%3A%2F%2Fopen.spotify.com%2Falbum%2F5evzhxkqmzMEQIlOY4Jl89"

const fetch = require('node-fetch');
const { response, formatTime, joinArtists, decodeHtml } = require('./util');

module.exports.import = async (event) => {
  // Validate the URL to prevent mistakes and abuse.
  const querystring = event.queryStringParameters;
  const url = querystring.url;
  if (!url.startsWith('https://www.discogs.com/master/')) {
    return response(400, {
      error: `Invalid URL: ${url}`,
    });
  }

  // Fetch the raw HTML.
  const resp = await fetch(url);
  const body = await resp.text();

  // Parse tracks.
  //
  // TODO(elliotchance): This is an ultra crude regexp that will probably break
  //  in the future.
  let matches = Array.from(body.matchAll(/("tracklist_track_artists">(.*?)<\/td>.*?)?"tracklist_track_title">([^<]+).*?<span>([\d:]+)/gs));

  let tracks = [];
  let number = 1;
  for (const match of matches) {
    let track = {
      number,
      title: decodeHtml(match[3].trim()),
      time: match[4].trim(),
    };

    if (match[2]) {
      let artists = joinArtists(Array.from(match[2].matchAll(/<a.*?>(.*?)</gs))
        .map(m => m[1].replace(/\(.*\)$/, '').trim()));
      track.title = decodeHtml(artists + ' - ' + match[3].trim());
    }

    tracks.push(track);
    ++number;
  }

  return response(200, {
    tracks,
  });
};
