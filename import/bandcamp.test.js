const importer = require('./bandcamp').import;

async function importFromBandcamp({ url }) {
  return JSON.parse((await importer({
    queryStringParameters: {
      url: url,
    }
  })).body);
}

test('invalid URL', async () => {
  const resp = await importFromBandcamp({
    url: 'https://ramesesb.bandcamp.com/track/goddess',
  });

  expect(resp.error).toBe('Invalid URL: https://ramesesb.bandcamp.com/track/goddess');
});

test('album', async () => {
  const resp = await importFromBandcamp({
    url: 'https://ramesesb.bandcamp.com/album/inspire-ep',
  });

  expect(resp.tracks).toStrictEqual([
    {
      number: '1',
      title: 'Goddess',
      time: '4:52'
    },
    {
      number: '2',
      title: 'Moonlight',
      time: '5:43'
    },
    {
      number: '3',
      title: 'Night Sky',
      time: '6:40'
    },
    {
      number: '4',
      title: 'Inspire',
      time: '4:28'
    },
  ]);
});
