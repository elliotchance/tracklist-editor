const importer = require('./discogs').import;
const assert = require('assert');

function assertDiscogs(tt) {
  (async () => {
    const resp = JSON.parse((await importer({
      queryStringParameters: {
        url: tt.url,
      }
    })).body);

    if (tt.error || resp.error) {
      assert.equal(resp.error, tt.error);
      return;
    }

    assert.deepEqual(resp.tracks, tt.tracks);
  })();
}

// Bad URL
assertDiscogs({
  url: 'https://www.discogs.com/something-else',
  error: 'Invalid URL: https://www.discogs.com/something-else',
});

// Single artist
assertDiscogs({
  url: 'https://www.discogs.com/master/146065-OneRepublic-Dreaming-Out-Loud',
  tracks: [
    { number: 1, title: 'Say (All I Need)', time: '3:50' },
    { number: 2, title: 'Mercy', time: '4:01' },
    { number: 3, title: 'Stop And Stare', time: '3:43' },
    { number: 4, title: 'Apologize', time: '3:28' },
    { number: 5, title: 'Goodbye, Apathy', time: '3:32' },
    { number: 6, title: 'All Fall Down', time: '4:05' },
    { number: 7, title: 'Tyrant', time: '5:03' },
    { number: 8, title: 'Prodigal', time: '3:55' },
    { number: 9, title: "Won't Stop", time: '5:03' },
    { number: 10, title: 'All We Are', time: '4:28' },
    { number: 11, title: 'Someone To Save You', time: '4:15' },
    { number: 12, title: 'Come Home', time: '4:23' },
    { number: 13, title: 'Dreaming Out Loud', time: '4:40' },
    { number: 14, title: 'Apologize (Remix)', time: '3:04' }
  ],
});

// Various artists
assertDiscogs({
  url: 'https://www.discogs.com/master/320977-Armin-van-Buuren-A-State-Of-Trance-2011',
  tracks: [
    {
      number: 1,
      title: "Triple A - Winter Stayed (Armin van Buuren's On The Beach Intro Mix)",
      time: '4:10'
    },
    {
      number: 2,
      title: 'Omnia & The Blizzard - My Inner Island (Original Mix)',
      time: '3:43'
    },
    {
      number: 3,
      title: 'Mike Shiver & Matias Lehtola - Slacker (Original Mix)',
      time: '4:10'
    },
    {
      number: 4,
      title: 'Dreas & Alex Robert - Mormugao (Alex Robert 2011 Mix)',
      time: '3:37'
    },
    {
      number: 5,
      title: 'Anhken - Always Look Back (Original Mix)',
      time: '4:29'
    },
    {
      number: 6,
      title: 'Nuera - Green Cape Sunset (Original Mix)',
      time: '3:06'
    },
    {
      number: 7,
      title: 'Rex Mundi - Sandstone (Original Mix)',
      time: '4:44'
    },
    {
      number: 8,
      title: 'Robert Nickson & Thomas Datt - Godless (Protoculture Remix)',
      time: '4:38'
    },
    {
      number: 9,
      title: 'Bobina - Lamento Sentimental (Original Mix)',
      time: '3:38'
    },
    {
      number: 10,
      title: 'Mark Otten - Libertine (Original Mix)',
      time: '4:05'
    },
    {
      number: 11,
      title: 'Max Graham & Neev Kennedy - So Caught Up (Original Mix)',
      time: '4:42'
    },
    {
      number: 12,
      title: 'Ashley Wallbridge - Moonlight Sonata (Original Mix)',
      time: '4:25'
    },
    {
      number: 13,
      title: 'Beat Service & Cathy Burton - When Tomorrow Never Comes (Original Mix)',
      time: '3:55'
    },
    {
      number: 14,
      title: 'Arty & Mat Zo - Rebound (Original Mix)',
      time: '2:43'
    },
    {
      number: 15,
      title: 'Various - A State Of Trance 2011, Pt. 1 (On The Beach: Full Continuous DJ Mix)',
      time: '1:16:52'
    },
    {
      number: 16,
      title: "Ron Hagen & Al-Exander - Now Is The Time (Armin van Buuren's Intro Edit)",
      time: '3:50'
    },
    {
      number: 17,
      title: 'Super8 & Tab & Julie Thompson - My Enemy (Rank 1 Remix)',
      time: '4:59'
    },
    {
      number: 18,
      title: 'Shogun - Skyfire (Original Mix)',
      time: '4:10'
    },
    {
      number: 19,
      title: "John O'Callaghan & Timmy & Tommy - Talk To Me (Ørjan Nilsen Trance Mix)",
      time: '3:47'
    },
    {
      number: 20,
      title: 'Gaia - Status Excessu D (ASOT 500 Theme)',
      time: '4:00'
    },
    {
      number: 21,
      title: "Mark Eteson - Blackboard (Jon O'Bir Remix)",
      time: '4:00'
    },
    {
      number: 22,
      title: "Daniel Kandi & Phillip Alpha - If It Ain't Broke (Original Mix)",
      time: '4:59'
    },
    {
      number: 23,
      title: 'Andrew Rayel - Aether (Original Mix)',
      time: '7:51'
    },
    {
      number: 24,
      title: 'Ørjan Nilsen - Between The Rays (Original Mix)',
      time: '3:57'
    },
    {
      number: 25,
      title: 'Armin van Buuren & Winter Kills - Take A Moment (Alex M.O.R.P.H. Remix)',
      time: '4:03'
    },
    {
      number: 26,
      title: 'Lost World - Stargazer (Original Mix)',
      time: '3:48'
    },
    {
      number: 27,
      title: 'Aly & Fila & Jwaydan - We Control The Sunlight (Original Mix)',
      time: '3:46'
    },
    {
      number: 28,
      title: 'Juventa - Dionysia (Original Mix)',
      time: '4:27'
    },
    {
      number: 29,
      title: 'Bjorn Akesson - Painting Pyramids (Original Mix)',
      time: '4:19'
    },
    {
      number: 30,
      title: 'Laura Jansen - Use Somebody (Armin van Buuren Rework)',
      time: '8:35'
    },
    {
      number: 31,
      title: 'Various - A State Of Trance 2011, Pt. 2 (In The Club: Full Continuous DJ Mix)',
      time: '1:13:48'
    }
  ],
});
