Vue.component('track-numbers-action', {
    props: ['getTracks', 'setTracks'],
    methods: {
        reset: function () {
            this.setTracks(this.getTracks().map((track, i) => ({ ...track, number: i + 1 })));
        },
    },
    template: '<button type="button" class="btn btn-primary" v-on:click="reset()">Reset All</button>'
});
