'use strict';

// Examples:
//   sls invoke -f spotify -d '{"url":"https://open.spotify.com/album/5evzhxkqmzMEQIlOY4Jl89"}'
//   curl "https://sxxqp2lco7.execute-api.us-east-1.amazonaws.com/dev/apple-music?url=https%3A%2F%2Fopen.spotify.com%2Falbum%2F5evzhxkqmzMEQIlOY4Jl89"

const fetch = require('node-fetch');
const { response, formatTime, joinArtists, decodeHtml } = require('./util');
const HTMLParser = require('node-html-parser');

module.exports.import = async (event) => {
  // Validate the URL to prevent mistakes and abuse.
  const querystring = event.queryStringParameters;
  const url = querystring.url;

  if (url.startsWith('https://www.discogs.com/release/') ||
    url.startsWith('https://www.discogs.com/master/')) {
    return parsePage(url);
  }

  return response(400, {
    error: `Invalid URL: ${url}`,
  });
};

async function parsePage(url) {
  // Fetch the raw HTML.
  const resp = await fetch(url);
  const body = await resp.text();

  // Parse tracks.
  //
  // Tip: For debugging use ".structure" to pretty print. See
  // https://www.npmjs.com/package/node-html-parser
  const root = HTMLParser.parse(body);
  let tracks = [];
  for (const tr of root.querySelector('#release-tracklist').querySelectorAll('tr')) {
    const [pos, artist, title, duration] = tr.querySelectorAll('td');
    let realTitle = title.querySelector('span').text;

    // Optional artist.
    if (artist.text) {
      realTitle = artist.childNodes.map(a => cleanArtistName(a.text)).join(' ') + '- ' + realTitle;
    }

    // Optional credits.
    for (const credits of title.querySelectorAll('div[class^="credits_"] div')) {
      if (!credits.text.includes('Featuring')) {
        continue;
      }

      const artistNames = credits.querySelectorAll('span[class^="link_"]')
        .map(credit => cleanArtistName(credit.text));

      realTitle += ` (feat. ${joinArtists(Array.from(new Set(artistNames)))})`;
    }

    tracks.push({
      number: pos.text,
      title: realTitle,
      time: duration.text,
    });
  }

  return response(200, {
    tracks,
  });
}

function cleanArtistName(artist) {
  return artist.split('(')[0].replace('–', '').replace('*', '').trim();
}
