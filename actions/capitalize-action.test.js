const capitalize = require('./capitalize-action');

var tests = [
    {title: '', expected: ''},
    {title: 'you can leave your hat on', expected: 'You Can Leave Your Hat On'},
    {title: 'one is for', expected: 'One Is For'},
    {title: 'and you and I', expected: 'And You and I'},
    {title: 'the greatest hits of', expected: 'The Greatest Hits Of'},
    {title: 'i am the walrus', expected: 'I Am the Walrus'},
    {title: 'it is what it is', expected: 'It Is What It Is'},
    {title: 'that was then, this is now', expected: 'That Was Then, This Is Now'},
    {title: 'that was and, this is now', expected: 'That Was and, This Is Now'},
    {title: 'you are so beautiful', expected: 'You Are So Beautiful'},
    {title: 'this is as good as it gets', expected: 'This Is As Good As It Gets'},
    {title: 'when you walked into my life', expected: 'When You Walked Into My Life'},
    {title: 'live from las vegas', expected: 'Live From Las Vegas'},
    {title: 'the boy with the arab strap', expected: 'The Boy With the Arab Strap'},
    {title: 'the man who sold the world', expected: 'The Man Who Sold the World'},
    {title: 'in a safe place', expected: 'In a Safe Place'},
    {title: 'rattle and hum', expected: 'Rattle and Hum'},
    {title: "it's now or never", expected: "It's Now or Never"},
    {title: 'life is but a dream', expected: 'Life Is But a Dream'},
    {title: "ain't but a few of us left", expected: "Ain't But a Few of Us Left"},
    {title: 'you are but a draft, a long rehearsal for a show that will never play', expected: 'You Are But a Draft, a Long Rehearsal for a Show That Will Never Play'},
    {title: 'live at woodstock', expected: 'Live at Woodstock'},
    {title: 'face to face', expected: 'Face to Face'},
    {title: 'death cab for cutie', expected: 'Death Cab for Cutie'},
    {title: 'pretty in pink', expected: 'Pretty in Pink'},
    {title: 'spy vs. spy', expected: 'Spy vs. Spy'},
    {title: 'birds v. worms', expected: 'Birds v. Worms'},
    {title: 'time after time etc.', expected: 'Time After Time etc.'},
    {title: 'nowhere to run', expected: 'Nowhere to Run'},
    {title: 'how to dismantle an atomic bomb', expected: 'How to Dismantle an Atomic Bomb'},
    {title: 'song i love to sing', expected: 'Song I Love to Sing'},
    {title: 'reality used to be a friend of mine', expected: 'Reality Used to Be a Friend of Mine'},
    {title: 'TUNE OF THE WEEK: VIVID & JEN - Breathe Me In [Enhanced]', expected: 'Tune of the Week: Vivid & Jen - Breathe Me in [Enhanced]'},
    {title: 'Cubicore & Shane 54 - Personal Jesus (cubicore Deep Mix) [armind]', expected: 'Cubicore & Shane 54 - Personal Jesus (Cubicore Deep Mix) [Armind]'},
    {title: 'PROFF feat. Mokka – Revivial', expected: 'Proff Feat. Mokka - Revivial'},
    {title: 'ID - ID', expected: 'ID - ID'},
    {title: 'DJ nobody - ID', expected: 'DJ Nobody - ID'},

    // Difficult cases that don't work:

    // {title: 'the best of the temptations', expected: 'The Best of The Temptations'},
    // {title: "nothin' but a good time", expected: "Nothin' but a Good Time"},
    // {title: 'i know you are but what am i', expected: 'I Know You Are but What Am I'},
    // {title: "i don't know what it is but I like it", expected: "I Don't Know What It Is but I Like It"},
    // {title: "keep on rockin' in the free world", expected: "Keep On Rockin' in the Free World"},
    // {title: 'come in from the cold', expected: 'Come In From the Cold'},
];

tests.forEach(test => {
    const actual = capitalize(test.title);
    if (actual !== test.expected) {
        throw new Error(`expecting '${test.expected}' but got '${actual}'`)
    }
});
