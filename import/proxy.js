'use strict';

const fetch = require('node-fetch');
const { response } = require('./util');

module.exports.request = async (event) => {
  // Validate the URL to prevent mistakes and abuse.
  const querystring = event.queryStringParameters;
  const url = querystring.url;
  if (!url.startsWith('https://rateyourmusic.com/go/search2')) {
    return response(400, {
      error: `Invalid URL: ${url}`,
    });
  }

  // Fetch the raw HTML.
  const resp = await fetch(url);
  const body = await resp.text();

  return {
    statusCode: 200,
    body: body,
    headers: {
      'Content-type': 'text/html',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};
