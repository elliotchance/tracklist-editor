'use strict';

// Examples:
//   sls invoke -f spotify -d '{"url":"https://open.spotify.com/album/5evzhxkqmzMEQIlOY4Jl89"}'
//   curl "https://sxxqp2lco7.execute-api.us-east-1.amazonaws.com/dev/apple-music?url=https%3A%2F%2Fopen.spotify.com%2Falbum%2F5evzhxkqmzMEQIlOY4Jl89"

const fetch = require('node-fetch');
const { response, formatTime, joinArtists } = require('./util');
const HTMLParser = require('node-html-parser');

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
  // Tip: For debugging use ".structure" to pretty print. See
  // https://www.npmjs.com/package/node-html-parser
  const root = HTMLParser.parse(body);
  let tracks = [];
  let allArtists = new Set();
  for (const row of root.querySelectorAll('button[data-testid="entity-row-v2-button"]')) {
    const [title, artists] = row.childNodes[1].childNodes[0].childNodes;

    tracks.push({
      number: row.childNodes[0].text,
      title: artists.text + ' - ' + title.text,
    });

    allArtists.add(artists.text);
  }

  if (allArtists.size === 1) {
    tracks = tracks.map(track => ({
      ...track,
      title: track.title.substr(Array.from(allArtists)[0].length + 3),
    }));
  }

  return response(200, {
    tracks,
  });
};
