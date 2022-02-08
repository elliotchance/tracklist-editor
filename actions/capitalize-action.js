const doNotCapitalize = ['a', 'an', 'and', 'the', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'vs.', 'v.', 'etc.', 'or'];
const alwaysLowerCase = ['etc.'];
const alwaysUpperCase = ['DJ', 'ID'];
const punctuation = [',', ' ', '(', ')', '[', ']', ':']

function capitalizeSplit(title) {
    let parts = [];
    let word = '';
    for (let i = 0; i < title.length; i++) {
        if (punctuation.includes(title[i])) {
            if (word !== '') {
                parts.push(word);
                word = '';
            }

            parts.push(title[i]);
        } else {
            word += title[i];
        }
    }

    if (word !== '') {
        parts.push(word);
    }

    return parts;
}

function titleCaseWord(word) {
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

function capitalize(title) {
    // Always use short dashes.
    title = title.replace(/\u2013|\u2014/g, '-');

    const words = capitalizeSplit(title);
    for (let i = 0; i < words.length; i++) {
        if (alwaysLowerCase.includes(words[i].toLowerCase())) {
            words[i] = words[i].toLowerCase();
            continue
        }

        if (alwaysUpperCase.includes(words[i].toUpperCase())) {
            words[i] = words[i].toUpperCase()
            continue
        }

        // The first and last words are special. However, also take into account
        // the first and last words within brackets are treated this way as
        // well.
        const special = i === 0 || i === words.length - 1 ||
            (i > 0 && words[i-1] == '(') || (i > 0 && words[i-1] == '[') ||
            (i < words.length - 1 && words[i+1] == ')') || (i > words.length - 1 && words[i+1] == ']');

        if (special || !doNotCapitalize.includes(words[i].toLowerCase())) {
            words[i] = titleCaseWord(words[i])
        } else {
            words[i] = words[i].toLowerCase();
        }
    }

    return words.join('');
}

// This is so the tests don't complain.
Vue = typeof Vue !== 'undefined' ? Vue : {component: () => {}};

Vue.component('capitalize-action', {
    props: ['getTracks', 'setTrack'],
    methods: {
        apply() {
            this.getTracks().forEach(track => {
                this.setTrack(track.id, { title: capitalize(track.title )})
            });
        },
    },
    template: '<button type="button" class="btn btn-primary" v-on:click="apply()">Apply Rate Your Music Capitalization</button>'
});

if (typeof module !== 'undefined') {
    module.exports = capitalize;
}
