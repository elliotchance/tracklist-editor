Vue.component('find-replace-action', {
    props: ['getTracks', 'setTrack', 'highlightTrack'],
    watch: {
        lookingFor() {
            this.find();
        },
    },
    methods: {
        escapeRegExp(string) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
        },
        regex() {
            const options = this.caseSensitive ? 'g' : 'gi';
            const lookingFor = this.isRegex ? this.lookingFor : this.escapeRegExp(this.lookingFor);
            return new RegExp(lookingFor, options);
        },
        find() {
            this.totalMatches = 0;
            this.trackMatches = 0;
            this.getTracks().forEach(track => {
                let ranges = [];
                if (this.lookingFor !== '') {
                    let match;
                    const regex = this.regex();
                    let found = false;

                    while ((match = regex.exec(track.title)) !== null) {
                        // There are some cases where a regex can much zero
                        // characters (such as ".*"). If this happens we need to
                        // bail out to prevent an infinite loop.
                        if (match[0].length === 0) {
                            break;
                        }
                        
                        ranges.push([match.index, match.index + match[0].length]);
                        ++this.totalMatches;
                        found = true;
                    }

                    if (found) {
                        ++this.trackMatches;
                    }
                }

                this.highlightTrack(track.id, ranges);
            });
        },
        replace: function () {
            this.getTracks().forEach(track => {
                this.setTrack(track.id, {
                    title: track.title.replace(this.regex(), this.replaceWith),
                });
            });
            this.find();
        },
        pluralize(word, n, suffix = 's') {
            if (n === 1) {
                return word;
            }

            return word + suffix;
        },
        matchResults() {
            if (this.lookingFor === '') {
                return '';
            }

            return '' + this.totalMatches + ' ' +
                this.pluralize('match', this.totalMatches, 'es') + ' in ' +
                this.trackMatches + ' ' +
                this.pluralize('track', this.trackMatches);
        }
    },
    data: function () {
        return {
            lookingFor: '',
            replaceWith: '',
            caseSensitive: false,
            isRegex: true,
            totalMatches: 0,
            trackMatches: 0,
        }
    },
    template: `
    <div>
        <div class="container">
            <div class="row">
                <div class="col-7">
                    <input type="text" class="form-control" placeholder="Find..." v-model="lookingFor">
                </div>
                <div class="col-5">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="caseSensitive" v-model="caseSensitive" @change="find">
                        <label class="form-check-label" for="caseSensitive">Case sensitive</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="isRegex" v-model="isRegex" @change="find">
                        <label class="form-check-label" for="isRegex">Regex</label>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-7">
                    <input type="text" class="form-control" placeholder="Replace..." v-model="replaceWith">
                </div>
                <div class="col-5">
                    <button type="button" class="btn btn-primary" v-on:click="replace()" :disabled="this.lookingFor === ''">Replace</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ matchResults() }}
                </div>
            </div>
        </div>
    </div>`
});
