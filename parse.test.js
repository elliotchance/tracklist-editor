const parseTracks = require('./parse');

var tests = [
    {str: '', expected: []},
    {str: 'you can leave your hat on', expected: [
        {number: '', title: 'you can leave your hat on', time: ''},
    ]},
    {str: 'you can leave your hat on\n', expected: [
        {number: '', title: 'you can leave your hat on', time: ''},
    ]},
    {str: '\n\nyou can leave your hat on\n', expected: [
        {number: '', title: 'you can leave your hat on', time: ''},
    ]},
    {str: 'track 1\ntrack 2\n', expected: [
        {number: '', title: 'track 1', time: ''},
        {number: '', title: 'track 2', time: ''},
    ]},
    {
        str: `
        1	Next to Me	 	 	5:14
        2	Make It Happen	5:20`,
        expected: [
            {number: '1', title: 'Next to Me', time: '5:14'},
            {number: '2', title: 'Make It Happen', time: '5:20'},
        ],
    },
    {
        str: `
        1.	"Next to Me"	 	 	5:14
        2.	"Make It Happen"	5:20`,
        expected: [
            {number: '1', title: 'Next to Me', time: '5:14'},
            {number: '2', title: 'Make It Happen', time: '5:20'},
        ],
    },
    {
        str: `
        1 -	Next to  \t  Me
        2 - Make\tIt Happen`,
        expected: [
            {number: '1', title: 'Next to Me', time: ''},
            {number: '2', title: 'Make It Happen', time: ''},
        ],
    },
    {
        str: `
        First track (1:23)
        Second track (45:57)
        Third track (8:12:34)`,
        expected: [
            {number: '', title: 'First track', time: '1:23'},
            {number: '', title: 'Second track', time: '45:57'},
            {number: '', title: 'Third track', time: '8:12:34'},
        ],
    },
    {
        str: `
        First track - 1:23
        Second track - 45:57
        Third track - 8:12:34`,
        expected: [
            {number: '', title: 'First track', time: '1:23'},
            {number: '', title: 'Second track', time: '45:57'},
            {number: '', title: 'Third track', time: '8:12:34'},
        ],
    },
    {
        // Note: Uses long dashes.
        str: `
        Artist 1 — First track
        Artist 2 — Second track`,
        expected: [
            {number: '', title: 'Artist 1 - First track', time: ''},
            {number: '', title: 'Artist 2 - Second track', time: ''},
        ],
    },
    {
        str: `
        1|Loving You (featuring Lulu James)|4:01
        2|Diamonds (featuring Solomon Grey)|5:54`,
        expected: [
            {number: '1', title: 'Loving You (featuring Lulu James)', time: '4:01'},
            {number: '2', title: 'Diamonds (featuring Solomon Grey)', time: '5:54'},
        ],
    },
    {
        str: `
        1. Loving You (featuring Lulu James) (0:00)
        2. Diamonds (featuring Solomon Grey) (01:23)
        3. Pearls                            (0:00:00)
        4. Emeralds                          (1:00:00)`,
        expected: [
            {number: '1', title: 'Loving You (featuring Lulu James)', time: ''},
            {number: '2', title: 'Diamonds (featuring Solomon Grey)', time: '1:23'},
            {number: '3', title: 'Pearls', time: ''},
            {number: '4', title: 'Emeralds', time: '1:00:00'},
        ],
    },
];

function clean(tracks) {
    return JSON.stringify(tracks.map(track => ({
        number: track.number,
        title: track.title,
        time: track.time,
    })), null, 2)
}

tests.forEach(test => {
    const actual = clean(parseTracks(test.str));
    const expected = clean(test.expected);
    if (actual !== expected) {
        throw new Error(`expecting ${expected} but got ${actual}`)
    }
});