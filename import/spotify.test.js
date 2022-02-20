const importer = require('./spotify').import;

async function importFromSpotify({ url }) {
  return JSON.parse((await importer({
    queryStringParameters: {
      url: url,
    }
  })).body);
}

test('invalid URL', async () => {
  const resp = await importFromSpotify({
    url: 'https://open.spotify.com/artist/5evzhxkqmzMEQIlOY4Jl89',
  });

  expect(resp.error).toBe('Invalid URL: https://open.spotify.com/artist/5evzhxkqmzMEQIlOY4Jl89');
});

// Single track with multiple artists. The multiple artists are ignored because
// all tracks have the same set of artists.
test('single track with multiple artists', async () => {
  const resp = await importFromSpotify({
    url: 'https://open.spotify.com/album/5DiOrO5QGCl84W2WpCjOzs',
  });

  expect(resp.tracks).toStrictEqual([
    {
      number: '1',
      title: 'Go On Then, Love',
    }
  ]);
});

test('single artist', async () => {
  const resp = await importFromSpotify({
    url: 'https://open.spotify.com/album/5Fliz4RQcDktb93l1uYDka',
  });

  expect(resp.tracks).toStrictEqual([
    { number: '1', title: 'Easy Does It' },
    { number: '2', title: 'Sister Moonshine' },
    { number: '3', title: "Ain't Nobody But Me" },
    { number: '4', title: 'A Soapbox Opera' },
    { number: '5', title: "Another Man's Woman" },
    { number: '6', title: 'Lady' },
    { number: '7', title: 'Poor Boy' },
    { number: '8', title: 'Just A Normal Day' },
    { number: '9', title: 'The Meaning' },
    { number: '10', title: 'Two Of Us' },
  ]);
});

test('various artists with multiple disks', async () => {
  const resp = await importFromSpotify({
    url: 'https://open.spotify.com/album/5evzhxkqmzMEQIlOY4Jl89',
  });

  expect(resp.tracks).toStrictEqual([
     {
        number: "1",
        title: "John O'Callaghan, Audrey Gallagher, Armin van Buuren - Big Sky [Mix Cut] - Armin van Buuren's Intro Mix"
     },
     {
        number: "2",
        title: "Accadia, James Holden - Into The Dawn [Mix Cut] - James Holden Remix"
     },
     {
        number: "3",
        title: "The Blizzard - Kalopsia [Mix Cut] - Original Mix"
     },
     {
        number: "4",
        title: "Solarstone, Armin van Buuren - Seven Cities [Mix Cut] - Armin van Buuren Remix"
     },
     {
        number: "5",
        title: "Dj Eremit, YOMC - Tanz der Seele [Mix Cut] - YOMC Club Mix"
     },
     {
        number: "6",
        title: "Gouryella - Ligaya [Mix Cut] - Original Instrumental Mix"
     },
     {
        number: "7",
        title: "Airbase - Escape [Mix Cut] - Original Mix"
     },
     {
        number: "8",
        title: "GAIA - 4 Elements [Mix Cut] - Original Mix"
     },
     {
        number: "9",
        title: "Active Sight - Out Of Our Lives [Mix Cut] - Original Mix"
     },
     {
        number: "10",
        title: "The Thrillseekers, En-Motion - Synaesthesia [Mix Cut] - En-Motion Remix"
     },
     {
        number: "11",
        title: "Sean Tyas - Lift [Mix Cut] - Original Mix"
     },
     {
        number: "12",
        title: "John O'Callaghan - Broken [Mix Cut] - Original Mix"
     },
     {
        number: "13",
        title: "Andy Ling - Fixation [Mix Cut] - Original Mix"
     },
     {
        number: "14",
        title: "Questia - Nexus Asia [Mix Cut] - Original Mix"
     },
     {
        number: "15",
        title: "Rank 1 - Awakening [Mix Cut] - Original Mix"
     },
     {
        number: "16",
        title: "W&W - Invasion - ASOT 550 Anthem [Mix Cut] - Club Mix"
     },
     {
        number: "17",
        title: "Dash Berlin - Till The Sky Falls Down (Live at A State of Trance 500) [Mix Cut] - Intro Mix"
     },
     {
        number: "18",
        title: "Dash Berlin, Jonathan Mendelsohn - World Falls Apart [Mix Cut] - Club Mix"
     },
     {
        number: "19",
        title: "First State, Sarah Howells, Dash Berlin - Reverie [Mix Cut] - Dash Berlin Remix"
     },
     {
        number: "20",
        title: "Dash Berlin, Jonathan Mendelsohn, Shogun - Better Half Of Me [Mix Cut] - Shogun Remix"
     },
     {
        number: "21",
        title: "Filo & Peri, Audrey Gallagher, Dash Berlin - This Night [Mix Cut] - Dash Berlin Remix"
     },
     {
        number: "22",
        title: "Lange, Dash Berlin - Touched [Mix Cut] - Dash Berlin's Sense Of Touch Remix"
     },
     {
        number: "23",
        title: "Dash Berlin, Emma Hewitt, Sean Tyas - Waiting [Mix Cut] - Sean Tyas Remix"
     },
     {
        number: "24",
        title: "Planet Perfecto Knights, Paul Oakenfold - ResuRection [Mix Cut] - Paul Oakenfold Full On Fluoro Remix"
     },
     {
        number: "25",
        title: "Luke Bond - Amaze [Mix Cut] - Original Mix"
     },
     {
        number: "26",
        title: "Dash Berlin, Cerf, Mitiska, Jaren - Man On The Run [Mix Cut] - Original Mix"
     },
     {
        number: "27",
        title: "RAM, Jorn Van Deynhoven - RAMsterdam [Mix Cut] - Jorn van Deynhoven Remix"
     },
     {
        number: "28",
        title: "Fix To Fax - Meridian [Mix Cut] - Original Mix"
     },
     {
        number: "29",
        title: "Coast 2 Coast, Discovery - Home [Mix Cut] - Original Mix"
     },
     {
        number: "30",
        title: "Vincent de Moor - Flowtation [Mix Cut] - Original Mix"
     },
     {
        number: "31",
        title: "Rank 1, Dutch Force - Airwave [Mix Cut] - Rank 1 vs Dutch Force Mix"
     },
     {
        number: "32",
        title: "Ridgewalkers, EL, Andy Moor - Find [Mix Cut] - Andy Moor Remix"
     },
     {
        number: "33",
        title: "Pulser - My Religion [Mix Cut] - Original Mix"
     },
     {
        number: "34",
        title: "St. John, Locust - Mind Circles [Mix Cut] - Original Mix"
     },
     {
        number: "35",
        title: "Terry Bones, Fred Baker, Water Planet - Introspection [Mix Cut] - Orginal Mix"
     },
     {
        number: "36",
        title: "John O'Callaghan, Heatbeat - Las Lilas [Mix Cut] - Original Mix"
     },
     {
        number: "37",
        title: "John Askew - Mood Swing [Mix Cut] - Original Mix"
     },
     {
        number: "38",
        title: "Octagen, Arizona - Starburst [Mix Cut] - Original Mix"
     },
     {
        number: "39",
        title: "Jose Amnesia, Serp, Martin Roth - Second Day [Mix Cut] - Martin Roth Remix"
     },
     {
        number: "40",
        title: "Dark Matters, Jess Morgan, Jorn Van Deynhoven - The Real You [Mix Cut] - Jorn van Deynhoven Remix"
     },
     {
        number: "41",
        title: "Magnus, John O'Callaghan - Velvet [Mix Cut] - John O'Callaghan Remix"
     },
     {
        number: "42",
        title: "Gareth Emery, Christina Novelli, John O'Callaghan - Concrete Angel [Mix Cut] - John O'Callaghan Remix"
     },
     {
        number: "43",
        title: "Joint Operations Centre - Glyph [Mix Cut] - Original Mix"
     },
     {
        number: "44",
        title: "John O'Callaghan, Lo-Fi Sugar, Giuseppe Ottaviani - Never Fade Away [Mix Cut] - Giuseppe Ottaviani Remix"
     },
     {
        number: "45",
        title: "RAM, Jorn Van Deynhoven - RAMsterdam [Mix Cut] - Jorn van Deynhoven Remix"
     },
     {
        number: "46",
        title: "Mat Zo, ARTY - Mozart [Mix Cut] - Original Mix"
     },
     {
        number: "47",
        title: "ARTY - Around The World [Mix Cut] - Original Mix"
     },
     {
        number: "48",
        title: "ARTY - Zara [Mix Cut] - Original Mix"
     },
     {
        number: "49",
        title: "D-Mad, ARTY - She Gave Happiness [Mix Cut] - Arty Remix"
     },
     {
        number: "50",
        title: "Kyau & Albert, ARTY - Are You Fine? [Mix Cut] - Arty Remix"
     }
  ]);
});
