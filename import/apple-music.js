'use strict';

// Examples:
//   sls invoke -f apple-music -d '{"url":"https://music.apple.com/us/album/nye-2022-dj-mix/1600990821"}'
//   curl "https://sxxqp2lco7.execute-api.us-east-1.amazonaws.com/dev/apple-music?url=https%3A%2F%2Fmusic.apple.com%2Fus%2Falbum%2Fnye-2022-dj-mix%2F1600990821"

const fetch = require('node-fetch');
const { response } = require('./util');
const HTMLParser = require('node-html-parser');

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
  // Tip: For debugging use ".structure" to pretty print. See
  // https://www.npmjs.com/package/node-html-parser
  const root = HTMLParser.parse(body);
  let tracks = [];
  for (const song of root.querySelectorAll('.songs-list-row--song')) {
    const titleWrapper = song.querySelector('.songs-list-row__song-name-wrapper');

    let title = titleWrapper.text.trim();
    const artist = titleWrapper.querySelector('.songs-list-row__by-line span');
    if (artist) {
      title = artist.childNodes.map(e => e.text.trim()).join(' ').trim() + ' - ' + titleWrapper.querySelector('div').text.trim();
    }

    tracks.push({
      number: song.querySelector('.songs-list-row__index-wrapper').text.trim(),
      title,
      time: song.querySelector('time').text.trim(),
    });
  }

  return response(200, {
    tracks,
  });
};
