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
            this.hours   = padTime( now.getHours().toString() )
            this.minutes = padTime( minutes.toString() )
            this.seconds = padTime( seconds.toString() )

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
.clock-part {
    display: inline-block;
}
.clock-minute:after,
.clock-minute:before {
    content: ':';
}
</style>

<template>
    <div class="clock">
        <span class="clock-part clock-hour" v-text="hours"></span>
        <span class="clock-part clock-minute" v-text="minutes"></span>
        <span class="clock-part clock-second" v-text="seconds"></span>
    </div>
</template>
