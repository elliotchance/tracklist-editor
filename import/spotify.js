'use strict';

// Examples:
//   sls invoke -f spotify -d '{"url":"https://open.spotify.com/album/5evzhxkqmzMEQIlOY4Jl89"}'
//   curl "https://sxxqp2lco7.execute-api.us-east-1.amazonaws.com/dev/apple-music?url=https%3A%2F%2Fopen.spotify.com%2Falbum%2F5evzhxkqmzMEQIlOY4Jl89"

const fetch = require('node-fetch');
const { response, formatTime, joinArtists } = require('./util');

module.exports.import = async (event) => {
  // Validate the URL to prevent mistakes and abuse.
  const querystring = event.queryStringParameters;
  const url = querystring.url;
  if (!url.startsWith('https://open.spotify.com/album/')) {
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
  //  in the future. Yes, I know we should use the API but I don't want to
  //  register an app and deal with the secrets at the moment.
  const matches = body.match(/id="initial-state">(.*?)<\/script>/s);
  if (!matches) {
    return response(500, {
      error: `Cannot parse album, please open an issue with this URL`,
    });
  }

  const data = JSON.parse(matches[1].replace(/[\s;]+$/, ''));
  const parsedTracks = data.entities.items[Object.keys(data.entities.items)[0]].tracks.items;

  // Only include the disc number if there are multiple discs.
  let trackNumberFn = (item) => `${item.disc_number}.${item.track_number}`;
  if (new Set(parsedTracks.map(track => track.disc_number)).size === 1) {
    trackNumberFn = (item) => item.track_number;
  }

  // Only include artist(s) if they are different on the tracks.
  let trackTitleFn = (item) => {
    const artists = joinArtists(item.artists.map(artist => artist.name));

    return `${artists} - ${item.name}`
  };
  if (new Set(parsedTracks.map(track => track.artists.map(artist => artist.name).join(', '))).size === 1) {
    trackTitleFn = (item) => item.name;
  }

  let tracks = [];
  for (const item of parsedTracks) {
    tracks.push({
      number: trackNumberFn(item),
      title: trackTitleFn(item),
      time: formatTime(Math.round(item.duration_ms / 1000)),
    });
  }

  return response(200, {
    tracks,
  });
};
