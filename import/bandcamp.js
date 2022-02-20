'use strict';

const fetch = require('node-fetch');
const { response } = require('./util');
const HTMLParser = require('node-html-parser');

module.exports.import = async (event) => {
  // Validate the URL to prevent mistakes and abuse.
  const querystring = event.queryStringParameters;
  const url = querystring.url;
  if (!url.includes('.bandcamp.com/album/')) {
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
  for (const song of root.querySelectorAll('.track_row_view')) {
    tracks.push({
      number: song.querySelector('.track_number').text.replace('.', '').trim(),
      title: song.querySelector('.track-title').text.trim(),
      time: song.querySelector('.time').text.replace(/^\s*0/, '').trim(),
    });
  }

  return response(200, {
    tracks,
  });
};
