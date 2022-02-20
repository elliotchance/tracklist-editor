const importer = require('./discogs').import;
const assert = require('assert');

async function importFromDiscogs({ url }) {
  return JSON.parse((await importer({
    queryStringParameters: {
      url: url,
    }
  })).body);
}

test('invalid URL', async () => {
  const resp = await importFromDiscogs({
    url: 'https://www.discogs.com/something-else',
  });

  expect(resp.error).toBe('Invalid URL: https://www.discogs.com/something-else');
});

test('release URL with credits (but no featuring)', async () => {
  const resp = await importFromDiscogs({
    url: 'https://www.discogs.com/release/1137659-Furtips-When-My-Baby-Smiles-At-Me-I-Go-To-Rio',
  });

  expect(resp.tracks).toStrictEqual([
    { number: "1", title: "It's Cold Offside", time: '2:37' },
    { number: "2", title: 'Grapes, No Vine', time: '3:02' },
    { number: "3", title: 'Chosen Ones', time: '3:13' },
    { number: "4", title: 'My Girl (Is Lazy)', time: '0:50' },
    { number: "5", title: 'Selection Kat', time: '1:47' },
    { number: "6", title: "Isn't She Pretty", time: '2:48' },
    { number: "7", title: 'BWC Caruso', time: '3:29' },
    { number: "8", title: 'Eat All Our Heart', time: '3:20' },
    { number: "9", title: 'Neat!', time: '1:27' },
    { number: "10", title: 'Park Angerenstein', time: '0:50' },
    { number: "11", title: 'Bunny Falcon', time: '2:24' },
    { number: "12", title: 'Vampire Smile', time: '2:06' },
    { number: "13", title: 'Stand Back, Speak Normally', time: '3:18' },
    { number: "14", title: 'Colonel Impossible', time: '2:46' },
    { number: "15", title: 'Das Schloss', time: '2:34' }
  ]);
});

test('release URL with featuring credits', async () => {
  const resp = await importFromDiscogs({
    url: 'https://www.discogs.com/release/14749028-Rameses-B-Cosmonauts',
  });

  expect(resp.tracks).toStrictEqual([
    { number: "1", title: 'Raindrops (feat. Rhode)', time: '4:22' },
    { number: "2", title: 'All For One (feat. Veela & Zoe Moon)', time: '4:12' },
    { number: "3", title: 'Lost', time: '5:06' },
    { number: "4", title: 'Hold Me Close', time: '3:50' },
    { number: "5", title: 'Through My Eyes', time: '3:52' },
    { number: "6", title: 'Hero (feat. Irosa)', time: '4:10' },
    { number: "7", title: 'God Mode', time: '4:28' },
    { number: "8", title: 'Cosmonauts', time: '4:44' },
    { number: "9", title: 'Far From Home', time: '2:55' }
  ]);
});

test('release URL with various artists and featuring', async () => {
  const resp = await importFromDiscogs({
    url: 'https://www.discogs.com/release/5647466-Armin-van-Buuren-A-State-Of-Trance-2005-Light',
  });

  expect(resp.tracks).toStrictEqual([
    { number: "1", title: 'Interstate - I Found You', time: '5:13' },
    { number: "2", title: 'Hidden Logic Presents Luminary - Wasting', time: '4:11' },
    { number: "3", title: 'Markus Schulz - First Time', time: '5:33' },
    {
      number: "4",
      title: "Max Graham - I Know You're Gone (feat. Jessica Jacobs)",
      time: '3:48'
    },
    { number: "5", title: 'Mike Foyle Presents Statica - Space Guitar', time: '4:50' },
    { number: "6", title: 'Ava Mea - In The End', time: '3:20' },
    { number: "7", title: 'Elevation - Ocean Rain', time: '4:39' },
    {
      number: "8",
      title: 'Locust - Aerospace (Probspot Remix)',
      time: '5:43'
    },
    { number: "9", title: 'Armin van Buuren - Shivers', time: '6:37' },
    { number: "10", title: 'EnMass - Beyond Horizon', time: '5:43' },
    {
      number: "11",
      title: 'Kyau vs. Albert - Falling Anywhere (Rework)',
      time: '4:01'
    },
    {
      number: "12",
      title: 'Fragile - Inertia (Armin van Buuren Remix) (feat. Alex Lemon)',
      time: '6:36'
    },
    {
      number: "13",
      title: "Sophie Sugar - Call Of Tomorrow (John O'Callaghan Remix)",
      time: '4:35'
    },
    { number: "14", title: 'Marcos - Cosmicstring', time: '6:14' },
    { number: "15", title: 'John Askew - Mood Swing', time: '4:32' }
  ]);
});

test('single artist master', async () => {
  const resp = await importFromDiscogs({
    url: 'https://www.discogs.com/master/146065-OneRepublic-Dreaming-Out-Loud',
  });

  expect(resp.tracks).toStrictEqual([
    { number: "", title: 'Say (All I Need)', time: '3:50' },
    { number: "", title: 'Mercy', time: '4:01' },
    { number: "", title: 'Stop And Stare', time: '3:43' },
    { number: "", title: 'Apologize', time: '3:28' },
    { number: "", title: 'Goodbye, Apathy', time: '3:32' },
    { number: "", title: 'All Fall Down', time: '4:05' },
    { number: "", title: 'Tyrant', time: '5:03' },
    { number: "", title: 'Prodigal', time: '3:55' },
    { number: "", title: "Won't Stop", time: '5:03' },
    { number: "", title: 'All We Are', time: '4:28' },
    { number: "", title: 'Someone To Save You', time: '4:15' },
    { number: "", title: 'Come Home', time: '4:23' },
    { number: "", title: 'Dreaming Out Loud', time: '4:40' },
    { number: "", title: 'Apologize (Remix)', time: '3:04' }
  ]);
});

test('various artists master', async () => {
  const resp = await importFromDiscogs({
    url: 'https://www.discogs.com/master/320977-Armin-van-Buuren-A-State-Of-Trance-2011',
  });

  expect(resp.tracks).toStrictEqual([
    {
      number: '',
      title: "Triple A - Winter Stayed (Armin van Buuren's On The Beach Intro Mix)",
      time: '4:10'
    },
    {
      number: '',
      title: 'Omnia & The Blizzard - My Inner Island (Original Mix)',
      time: '3:43'
    },
    {
      number: '',
      title: 'Mike Shiver Vs. Matias Lehtola - Slacker (Original Mix)',
      time: '4:10'
    },
    {
      number: '',
      title: 'Dreas Vs. Alex Robert - Mormugao (Alex Robert 2011 Mix)',
      time: '3:37'
    },
    {
      number: '',
      title: 'Anhken - Always Look Back (Original Mix)',
      time: '4:29'
    },
    {
      number: '',
      title: 'Nuera - Green Cape Sunset (Original Mix)',
      time: '3:06'
    },
    {
      number: '',
      title: 'Rex Mundi - Sandstone (Original Mix)',
      time: '4:44'
    },
    {
      number: '',
      title: 'Robert Nickson & Thomas Datt - Godless (Protoculture Remix)',
      time: '4:38'
    },
    {
      number: '',
      title: 'Bobina - Lamento Sentimental (Original Mix)',
      time: '3:38'
    },
    {
      number: '',
      title: 'Mark Otten - Libertine (Original Mix)',
      time: '4:05'
    },
    {
      number: '',
      title: 'Max Graham Feat. Neev Kennedy - So Caught Up (Original Mix)',
      time: '4:42'
    },
    {
      number: '',
      title: 'Ashley Wallbridge - Moonlight Sonata (Original Mix)',
      time: '4:25'
    },
    {
      number: '',
      title: 'Beat Service Feat. Cathy Burton - When Tomorrow Never Comes (Original Mix)',
      time: '3:55'
    },
    {
      number: '',
      title: 'Arty & Mat Zo - Rebound (Original Mix)',
      time: '2:43'
    },
    {
      number: '',
      title: 'Various - A State Of Trance 2011, Pt. 1 (On The Beach: Full Continuous DJ Mix)',
      time: '1:16:52'
    },
    {
      number: '',
      title: "Ron Hagen & Al-Exander - Now Is The Time (Armin van Buuren's Intro Edit)",
      time: '3:50'
    },
    {
      number: '',
      title: 'Super8 & Tab Feat. Julie Thompson - My Enemy (Rank 1 Remix)',
      time: '4:59'
    },
    {
      number: '',
      title: 'Shogun - Skyfire (Original Mix)',
      time: '4:10'
    },
    {
      number: '',
      title: "John O'Callaghan & Timmy & Tommy - Talk To Me (Ørjan Nilsen Trance Mix)",
      time: '3:47'
    },
    {
      number: '',
      title: 'Gaia - Status Excessu D (ASOT 500 Theme)',
      time: '4:00'
    },
    {
      number: '',
      title: "Mark Eteson - Blackboard (Jon O'Bir Remix)",
      time: '4:00'
    },
    {
      number: '',
      title: "Daniel Kandi & Phillip Alpha - If It Ain't Broke (Original Mix)",
      time: '4:59'
    },
    {
      number: '',
      title: 'Andrew Rayel - Aether (Original Mix)',
      time: '7:51'
    },
    {
      number: '',
      title: 'Ørjan Nilsen - Between The Rays (Original Mix)',
      time: '3:57'
    },
    {
      number: '',
      title: 'Armin van Buuren Feat. Winter Kills - Take A Moment (Alex M.O.R.P.H. Remix)',
      time: '4:03'
    },
    {
      number: '',
      title: 'Lost World - Stargazer (Original Mix)',
      time: '3:48'
    },
    {
      number: '',
      title: 'Aly & Fila Feat. Jwaydan - We Control The Sunlight (Original Mix)',
      time: '3:46'
    },
    {
      number: '',
      title: 'Juventa - Dionysia (Original Mix)',
      time: '4:27'
    },
    {
      number: '',
      title: 'Bjorn Akesson - Painting Pyramids (Original Mix)',
      time: '4:19'
    },
    {
      number: '',
      title: 'Laura Jansen - Use Somebody (Armin van Buuren Rework)',
      time: '8:35'
    },
    {
      number: '',
      title: 'Various - A State Of Trance 2011, Pt. 2 (In The Club: Full Continuous DJ Mix)',
      time: '1:13:48'
    }
  ]);
});
