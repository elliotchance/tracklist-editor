Vue.component('quick-fix-action', {
    props: ['getTracks', 'setTrack', 'refresh'],
    mounted() {
        this.loadActions();
        this.refresh(() => this.loadActions());
    },
    methods: {
        pluralizeTracks(n) {
            if (n === 1) {
                return '1 track';
            }

            return `${n} tracks`;
        },
        run(actionKey) {
            this.actions.forEach(action => {
                if (actionKey === action.key) {
                    action.apply.call(this);
                }
            });
            this.loadActions();
        },
        loadActions() {
            this.actions = [];

            // Replace [] with ()
            let count = 0;
            this.getTracks().forEach(track => {
                if (track.title.match(/[\[\]]/)) {
                    ++count;
                }
            });
            if (count > 0) {
                this.actions.push({
                    title: `Replace [] with () from ${this.pluralizeTracks(count)}`,
                    key: 'squareToParen',
                    apply() {
                        this.getTracks().forEach(track => {
                            this.setTrack(track.id, {
                                title: track.title.replace('[', '(').replace(']', ')'),
                            });
                        });
                    }
                });
            }

            // Replace {} with ()
            count = 0;
            this.getTracks().forEach(track => {
                if (track.title.match(/[\{\}]/)) {
                    ++count;
                }
            });
            if (count > 0) {
                this.actions.push({
                    title: `Replace {} with () from ${this.pluralizeTracks(count)}`,
                    key: 'curlyToParen',
                    apply() {
                        this.getTracks().forEach(track => {
                            this.setTrack(track.id, {
                                title: track.title.replace('{', '(').replace('}', ')'),
                            });
                        })
                    }
                });
            }

            // Common substrings

            // Find all substrings within brackets.
            let substrs = {};
            this.getTracks().forEach(track => {
                const matches = track.title.match(/\(.*?\)/g);
                if (matches) {
                    matches.forEach(match => {
                        if (!substrs[match]) {
                            substrs[match] = 0;
                        }
                        ++substrs[match];
                    });
                }
            });

            // For any substrings that appear in more than 50% of
            // the tracks.
            const totalTracks = this.getTracks().length;
            for (const substr in substrs) {
                if (substrs[substr] / totalTracks > 0.5) {
                    this.actions.push({
                        title: `Remove "${substr}" from ${this.pluralizeTracks(substrs[substr])}`,
                        key: `remove-${substr}`,
                        apply() {
                            this.getTracks().forEach(track => {
                                this.setTrack(track.id, {
                                    title: track.title.replace(substr, '').replace('  ', ' '),
                                });
                            })
                        }
                    });
                }
            }
        },
    },
    data: function () {
        return {
            actions: [],
        }
    },
    template: `
    <div>
        <div class="container">
            <div class="row">
                <div class="col">
                    <div v-if="actions.length === 0">
                        No quick fixes available.
                    </div>
                    <div v-if="actions.length > 0">
                        {{ actions.length }} quick
                        fix{{ actions.length === 1 ? '' : 'es' }} found
                        (click to immediately apply):
                    </div>
                    <ol v-if="actions.length > 0">
                        <li v-for="action in actions">
                            <a href="#" @click="run(action.key)">
                                {{ action.title }}
                            </a>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>`
});
