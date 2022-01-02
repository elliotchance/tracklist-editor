function response(statusCode, body) {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);

  let secs = seconds - (mins * 60);
  if (secs < 10) {
    secs = '0' + secs.toString();
  }

  return `${mins}:${secs}`
}

function joinArtists(artists) {
  return artists.map((artist, i) => {
      if (artists.length > 1 && i === artists.length - 1) {
        return ' & ' + artist;
      }

      if (i === 0) {
        return artist;
      }

      return ', ' + artist;
    })
    .join('');
}

function decodeHtml(str) {
  return str.
    replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    }).
    replace('&amp;', '&');
};

module.exports = {
  response,
  formatTime,
  joinArtists,
  decodeHtml
};
