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

module.exports = {
  response,
  formatTime,
};
