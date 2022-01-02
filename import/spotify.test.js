const importer = require('./spotify').import;
const assert = require('assert');

function assertSpotify(tt) {
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
assertSpotify({
  url: 'https://open.spotify.com/artist/5evzhxkqmzMEQIlOY4Jl89',
  error: 'Invalid URL: https://open.spotify.com/artist/5evzhxkqmzMEQIlOY4Jl89',
});

// Single track with multiple artists. The multiple artists are ignored because
// all tracks have the same set of artists.
assertSpotify({
  url: 'https://open.spotify.com/album/5DiOrO5QGCl84W2WpCjOzs',
  tracks: [
    {
      number: '1',
      title: 'Go On Then, Love',
      time: '3:21'
    }
  ],
});

// Single artist
assertSpotify({
  url: 'https://open.spotify.com/album/5Fliz4RQcDktb93l1uYDka',
  tracks: [
    { number: 1, title: 'Easy Does It', time: '2:19' },
    { number: 2, title: 'Sister Moonshine', time: '5:16' },
    { number: 3, title: "Ain't Nobody But Me", time: '5:14' },
    { number: 4, title: 'A Soapbox Opera', time: '4:54' },
    { number: 5, title: "Another Man's Woman", time: '6:16' },
    { number: 6, title: 'Lady', time: '5:24' },
    { number: 7, title: 'Poor Boy', time: '5:08' },
    { number: 8, title: 'Just A Normal Day', time: '4:02' },
    { number: 9, title: 'The Meaning', time: '5:23' },
    { number: 10, title: 'Two Of Us', time: '3:27' }
  ],
});

// Various artists with multiple disks
assertSpotify({
  url: 'https://open.spotify.com/album/5evzhxkqmzMEQIlOY4Jl89',
  tracks: [
    {
      number: '1.1',
      title: "John O'Callaghan, Audrey Gallagher & Armin van Buuren - Big Sky [Mix Cut] - Armin van Buuren's Intro Mix",
      time: '6:13'
    },
    {
      number: '1.2',
      title: 'Accadia & James Holden - Into The Dawn [Mix Cut] - James Holden Remix',
      time: '5:58'
    },
    {
      number: '1.3',
      title: 'The Blizzard - Kalopsia [Mix Cut] - Original Mix',
      time: '3:53'
    },
    {
      number: '1.4',
      title: 'Solarstone & Armin van Buuren - Seven Cities [Mix Cut] - Armin van Buuren Remix',
      time: '7:21'
    },
    {
      number: '1.5',
      title: 'Dj Eremit & YOMC - Tanz der Seele [Mix Cut] - YOMC Club Mix',
      time: '4:09'
    },
    {
      number: '1.6',
      title: 'Gouryella - Ligaya [Mix Cut] - Original Instrumental Mix',
      time: '5:00'
    },
    {
      number: '1.7',
      title: 'Airbase - Escape [Mix Cut] - Original Mix',
      time: '5:04'
    },
    {
      number: '1.8',
      title: 'GAIA - 4 Elements [Mix Cut] - Original Mix',
      time: '6:49'
    },
    {
      number: '1.9',
      title: 'Active Sight - Out Of Our Lives [Mix Cut] - Original Mix',
      time: '4:56'
    },
    {
      number: '1.10',
      title: 'The Thrillseekers & En-Motion - Synaesthesia [Mix Cut] - En-Motion Remix',
      time: '4:00'
    },
    {
      number: '1.11',
      title: 'Sean Tyas - Lift [Mix Cut] - Original Mix',
      time: '3:16'
    },
    {
      number: '1.12',
      title: "John O'Callaghan - Broken [Mix Cut] - Original Mix",
      time: '2:20'
    },
    {
      number: '1.13',
      title: 'Andy Ling - Fixation [Mix Cut] - Original Mix',
      time: '2:48'
    },
    {
      number: '1.14',
      title: 'Questia - Nexus Asia [Mix Cut] - Original Mix',
      time: '4:03'
    },
    {
      number: '1.15',
      title: 'Rank 1 - Awakening [Mix Cut] - Original Mix',
      time: '4:03'
    },
    {
      number: '1.16',
      title: 'W&W - Invasion - ASOT 550 Anthem [Mix Cut] - Club Mix',
      time: '3:44'
    },
    {
      number: '2.1',
      title: 'Dash Berlin - Till The Sky Falls Down (Live at A State of Trance 500) [Mix Cut] - Intro Mix',
      time: '3:24'
    },
    {
      number: '2.2',
      title: 'Dash Berlin & Jonathan Mendelsohn - World Falls Apart [Mix Cut] - Club Mix',
      time: '6:12'
    },
    {
      number: '2.3',
      title: 'First State, Sarah Howells & Dash Berlin - Reverie [Mix Cut] - Dash Berlin Remix',
      time: '7:10'
    },
    {
      number: '2.4',
      title: 'Dash Berlin, Jonathan Mendelsohn & Shogun - Better Half Of Me [Mix Cut] - Shogun Remix',
      time: '6:02'
    },
    {
      number: '2.5',
      title: 'Filo & Peri, Audrey Gallagher & Dash Berlin - This Night [Mix Cut] - Dash Berlin Remix',
      time: '4:59'
    },
    {
      number: '2.6',
      title: "Lange & Dash Berlin - Touched [Mix Cut] - Dash Berlin's Sense Of Touch Remix",
      time: '4:54'
    },
    {
      number: '2.7',
      title: 'Dash Berlin, Emma Hewitt & Sean Tyas - Waiting [Mix Cut] - Sean Tyas Remix',
      time: '5:35'
    },
    {
      number: '2.8',
      title: 'Planet Perfecto Knights & Paul Oakenfold - ResuRection [Mix Cut] - Paul Oakenfold Full On Fluoro Remix',
      time: '6:54'
    },
    {
      number: '2.9',
      title: 'Luke Bond - Amaze [Mix Cut] - Original Mix',
      time: '5:59'
    },
    {
      number: '2.10',
      title: 'Dash Berlin, Cerf, Mitiska & Jaren - Man On The Run [Mix Cut] - Original Mix',
      time: '3:00'
    },
    {
      number: '2.11',
      title: 'RAM & Jorn Van Deynhoven - RAMsterdam [Mix Cut] - Jorn van Deynhoven Remix',
      time: '3:27'
    },
    {
      number: '2.12',
      title: 'Fix To Fax - Meridian [Mix Cut] - Original Mix',
      time: '3:55'
    },
    {
      number: '2.13',
      title: 'Coast 2 Coast & Discovery - Home [Mix Cut] - Original Mix',
      time: '2:34'
    },
    {
      number: '2.14',
      title: 'Vincent de Moor - Flowtation [Mix Cut] - Original Mix',
      time: '4:57'
    },
    {
      number: '2.15',
      title: 'Rank 1 & Dutch Force - Airwave [Mix Cut] - Rank 1 vs Dutch Force Mix',
      time: '5:38'
    },
    {
      number: '3.1',
      title: 'Ridgewalkers, EL & Andy Moor - Find [Mix Cut] - Andy Moor Remix',
      time: '5:03'
    },
    {
      number: '3.2',
      title: 'Pulser - My Religion [Mix Cut] - Original Mix',
      time: '4:17'
    },
    {
      number: '3.3',
      title: 'St. John & Locust - Mind Circles [Mix Cut] - Original Mix',
      time: '6:10'
    },
    {
      number: '3.4',
      title: 'Terry Bones, Fred Baker & Water Planet - Introspection [Mix Cut] - Orginal Mix',
      time: '6:05'
    },
    {
      number: '3.5',
      title: "John O'Callaghan & Heatbeat - Las Lilas [Mix Cut] - Original Mix",
      time: '7:03'
    },
    {
      number: '3.6',
      title: 'John Askew - Mood Swing [Mix Cut] - Original Mix',
      time: '4:39'
    },
    {
      number: '3.7',
      title: 'Octagen & Arizona - Starburst [Mix Cut] - Original Mix',
      time: '6:15'
    },
    {
      number: '3.8',
      title: 'Jose Amnesia, Serp & Martin Roth - Second Day [Mix Cut] - Martin Roth Remix',
      time: '6:41'
    },
    {
      number: '3.9',
      title: 'Dark Matters, Jess Morgan & Jorn Van Deynhoven - The Real You [Mix Cut] - Jorn van Deynhoven Remix',
      time: '6:19'
    },
    {
      number: '3.10',
      title: "Magnus & John O'Callaghan - Velvet [Mix Cut] - John O'Callaghan Remix",
      time: '4:21'
    },
    {
      number: '3.11',
      title: "Gareth Emery, Christina Novelli & John O'Callaghan - Concrete Angel [Mix Cut] - John O'Callaghan Remix",
      time: '6:16'
    },
    {
      number: '3.12',
      title: 'Joint Operations Centre - Glyph [Mix Cut] - Original Mix',
      time: '4:33'
    },
    {
      number: '3.13',
      title: "John O'Callaghan, Lo-Fi Sugar & Giuseppe Ottaviani - Never Fade Away [Mix Cut] - Giuseppe Ottaviani Remix",
      time: '5:26'
    },
    {
      number: '3.14',
      title: 'RAM & Jorn Van Deynhoven - RAMsterdam [Mix Cut] - Jorn van Deynhoven Remix',
      time: '4:50'
    },
    {
      number: '4.1',
      title: 'Mat Zo & ARTY - Mozart [Mix Cut] - Original Mix',
      time: '6:08'
    },
    {
      number: '4.2',
      title: 'ARTY - Around The World [Mix Cut] - Original Mix',
      time: '6:25'
    },
    {
      number: '4.3',
      title: 'ARTY - Zara [Mix Cut] - Original Mix',
      time: '5:51'
    },
    {
      number: '4.4',
      title: 'D-Mad & ARTY - She Gave Happiness [Mix Cut] - Arty Remix',
      time: '4:36'
    },
    {
      number: '4.5',
      title: 'Kyau & Albert & ARTY - Are You Fine? [Mix Cut] - Arty Remix',
      time: '6:00'
    }
  ],
});
