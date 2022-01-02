'use strict';

// Examples:
//   sls invoke -f apple-music -d '{"url":"https://music.apple.com/us/album/nye-2022-dj-mix/1600990821"}'
//   curl "https://sxxqp2lco7.execute-api.us-east-1.amazonaws.com/dev/apple-music?url=https%3A%2F%2Fmusic.apple.com%2Fus%2Falbum%2Fnye-2022-dj-mix%2F1600990821"

const fetch = require('node-fetch');
const { response } = require('./util');

module.exports.import = async (event) => {
  // Validate the URL to prevent mistakes and abuse.
  const querystring = event.queryStringParameters;
  const url = querystring.url;
  if (!url.startsWith('https://music.apple.com/us/album/')) {
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
  //
  // There are a few layouts we need to test, specially various artist albums
  // have a different layout than a single artist album.

  // If we get more than one match, this must be a VA album. The regexp happens
  // to fall out that way, but also an album with one track could hardly be
  // considered various artists. Maybe this is possible - I haven't seen any
  // examples of this though.
  let matches = Array.from(body.matchAll(/songs-list-row__song-name">([^<]+).*?row__link".*?>([^<]+).*?row__length">([^<]+)/gs));
  let decoder = (match, number) => ({
    number,
    title: match[2].trim() + ' - ' + match[1].trim(),
    time: match[3].trim(),
  });

  if (matches.length < 2) {
    matches = Array.from(body.matchAll(/songs-list-row__song-name".*?>(.*?)<.*?row__length".*?>(.*?)</gs));
    decoder = (match, number) => ({
      number,
      title: match[1].trim(),
      time: match[2].trim(),
    });
  }

  let tracks = [];
  let number = 1;
  for (const match of matches) {
    tracks.push(decoder(match, number));
    ++number;
  }

  return response(200, {
    tracks,
  });
};
