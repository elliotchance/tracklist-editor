const importer = require('./apple-music').import;

async function importFromAppleMusic({ url }) {
  return JSON.parse((await importer({
    queryStringParameters: {
      url: url,
    }
  })).body);
}

test('invalid URL', async () => {
  const resp = await importFromAppleMusic({
    url: 'https://notapple.com/1600990821',
  });

  expect(resp.error).toBe('Invalid URL: https://notapple.com/1600990821');
});

test('single track', async () => {
  const resp = await importFromAppleMusic({
    url: 'https://music.apple.com/us/album/go-on-then-love-feat-the-maine-odea-remix-odea-remix-single/1591618917',
  });

  expect(resp.tracks).toStrictEqual([
    {
      number: '1',
      title: 'Go On Then, Love (feat. The Maine) [Odea Remix]',
      time: '3:08'
    }
  ]);
});

test('single artist', async () => {
  const resp = await importFromAppleMusic({
    url: 'https://music.apple.com/us/album/dreaming-out-loud/1440889649',
  });

  expect(resp.tracks).toStrictEqual([
      { number: "1", title: 'Say (All I Need)', time: '3:50' },
      { number: "2", title: 'Mercy', time: '4:01' },
      { number: "3", title: 'Stop and Stare', time: '3:44' },
      { number: "4", title: 'Apologize', time: '3:25' },
      { number: "5", title: 'Goodbye, Apathy', time: '3:32' },
      { number: "6", title: 'All Fall Down', time: '4:06' },
      { number: "7", title: 'Tyrant', time: '5:05' },
      { number: "8", title: 'Prodigal', time: '3:56' },
      { number: "9", title: "Won't Stop", time: '5:05' },
      { number: "10", title: 'All We Are', time: '4:23' },
      { number: "11", title: 'Someone to Save You', time: '4:13' },
      { number: "12", title: 'Come Home', time: '4:29' },
      {
        number: "13",
        title: 'Timbaland - Apologize (feat. OneRepublic)',
        time: '3:05'
      }
   ]);
});

test('various artists', async () => {
  const resp = await importFromAppleMusic({
    url: 'https://music.apple.com/us/album/nye-2022-dj-mix/1600990821',
  });

  expect(resp.tracks).toStrictEqual([
    {
      number: '1',
      title: 'Westside Gunn - Praise God Intro (feat. AA Rashid) [Mixed]',
      time: '2:03'
    },
    {
      number: '2',
      title: "The S.S.O. Orchestra - Tonight's the Night (feat. Douglas Lucas & The Sugar Sisters) [Mixed]",
      time: '1:11'
    },
    {
      number: '3',
      title: 'Irish Coffee & René Costy & His Orchestra - The Show, Pt. 1 / Scrabble (Mixed)',
      time: '1:42'
    },
    {
      number: '4',
      title: "All The People & Beastie Boys - Cramp Your Style / Don't Play No Game That I Can't Win (feat. Santigold) [Remix] [Mixed]",
      time: '1:21'
    },
    { number: '5', title: 'Nas - Nasty (Mixed)', time: '1:01' },
    {
      number: '6',
      title: 'Johnny Pate - Shaft In Africa (Addis) [Mixed]',
      time: '1:19'
    },
    {
      number: '7',
      title: 'Freedom - Get Up and Dance (Mixed)',
      time: '1:12'
    },
    {
      number: '8',
      title: "Funky 4+1 - That's the Joint (Mixed)",
      time: '1:00'
    },
    {
      number: '9',
      title: 'Esther Williams - Last Night Changed It All (I Really Had a Ball) [Mixed]',
      time: '1:06'
    },
    {
      number: '10',
      title: "Jungle Brothers & Joe Simon - Feelin' Alright / Love Vibration (Mixed)",
      time: '0:51'
    },
    {
      number: '11',
      title: 'Indeep & Shina Williams & His African Percussionists - Last Night a D.J. Saved My Life / Agboju Logun (Mr Bongo 7\" Edit) [Mixed]',
      time: '1:50'
    },
    {
      number: '12',
      title: 'Bobby Thurston - You Got What It Takes (Remix) [Mixed]',
      time: '2:18'
    },
    {
      number: '13',
      title: 'The Rebirth - Evil Vibrations (Remix) [Mixed]',
      time: '1:33'
    },
    {
      number: '14',
      title: 'Vaughan Mason and Crew - Bounce, Rock, Skate, Roll (Mixed)',
      time: '3:24'
    },
    {
      number: '15',
      title: 'Love Unlimited - I Did It for Love (Mixed)',
      time: '1:59'
    },
    {
      number: '16',
      title: 'King Sporty & The Root Rockers - Get on Down (Mixed)',
      time: '1:20'
    },
    {
      number: '17',
      title: 'El Turronero - Las Penas (Las Cañas) [Mixed]',
      time: '2:06'
    },
    {
      number: '18',
      title: "Sault - Don't Waste My Time (Mixed)",
      time: '1:47'
    },
    {
      number: '19',
      title: 'Can - Vitamin C (U.N.K.L.E. Mix) [Mixed]',
      time: '3:24'
    },
    {
      number: '20',
      title: 'Radiohead - Everything In Its Right Place (Mixed)',
      time: '3:54'
    },
    {
      number: '21',
      title: 'ID - ID1 (from NYE 2022: Zane Lowe) [Mixed]',
      time: '2:47'
    },
    {
      number: '22',
      title: 'Pete Le Freq - One More Step (Mixed)',
      time: '3:17'
    },
    {
      number: '23',
      title: 'ID - ID2 (from NYE 2022: Zane Lowe) [Mixed]',
      time: '4:10'
    },
    { number: '24', title: 'iZNiiK - Leave (Mixed)', time: '2:27' },
    {
      number: '25',
      title: 'Disclosure - In My Arms (Mixed)',
      time: '2:09'
    },
    { number: '26', title: 'SG Lewis - Time (Mixed)', time: '2:28' },
    {
      number: '27',
      title: 'Underworld - Two Months Off (Mixed)',
      time: '5:48'
    }
  ]);
});

// TODO(elliotchance): These ones do not working.

// Various artists with mostly the same artist (so this they don't show on most
// of the tracks)
// assertAppleMusic({
//   url: 'https://music.apple.com/us/album/mirage/398383005',
//   tracks: [],
// });
