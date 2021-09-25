<script>
import { defineComponent } from 'vue';
import { padTime } from '../functions.js';

export default defineComponent({
    data() {
        return {
            hours: '',
            minutes: '',
            seconds: ''
        }
    },
    methods: {
        updateClock() {
            let now = new Date,
                seconds = now.getSeconds(),
                minutes = now.getMinutes();
            this.hours   = padTime( now.getHours() )
            this.minutes = padTime( minutes )
            this.seconds = padTime( seconds )

            if(seconds === 0) {
                if(minutes === 0) {
                    this.$emit('hour');
                    return;
                }
                this.$emit('minute');
            }
        }
    },
    mounted() {
        const timer = setInterval(this.updateClock, 1000)
        this.updateClock()
    }
});
</script>

<style scoped>
[class^="clock-"] {
    display: inline-block;
}
.clock-second {
    width:35px;
}
.clock-minute:after {
    content: ':';
    font-size: 2.25rem;
    padding-left:0.25rem;
}
.clock-minute:before {
    content: ':';
}
</style>

<template>
    <div class="clock bg-white bg-opacity-70 font-display text-8xl text-center text-gray-800 font-bold pb-2">
        <span class="clock-hour" v-text="hours"></span>
        <span class="clock-minute" v-text="minutes"></span>
        <span class="clock-second text-4xl text-right" v-text="seconds"></span>
    </div>
</template>
