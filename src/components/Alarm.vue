<script>
import { defineComponent } from "vue"
export default defineComponent({
    data() {
        return {
            /**
             * Is the alarm in a state where it's set to go off?
             */
            isSet: false,
            /**
             * Is the alarm going off right now?
             */
            isGoingOff: false,
            /**
             * Has the alarm been snoozed?
             */
            isSnoozed: false,
            /**
             * The snooze timer object
             */
            snoozeTimer: null,
            /**
             * How many times we've snoozed
             */
            snoozeCount: 0,
            /**
             * How many times we may snooze
             */
            snoozesAllowed: 0,
            /**
             * How long snoozes last
             */
            snoozeMinutes: 10,
            /**
             * The set alarm hour
             */
            hour: null,
            /**
             * The set alarm minute
             */
            minute: null,
            /**
             * The days on which the alarm is set to go off
             */
            days: [],
            /**
             * Are we showing the settings panel?
             */
            displaySettings: false,
            /**
             * The sound we will play
             */
            audioFile: "",
        }
    },
    methods: {
        check(timeNow) {
            if (this.isSet || this.isGoingOff || this.isSnoozed) {
                return
            }
            // check if we should go off
        },
    },
    computed: {
        bellClass() {
            return this.isSet ? "bell-set" : "bell-off"
        },
    },
    mounted() {},
})
</script>

<style scoped>
.alarm {
    position: fixed;
    top: 0;
    left: 0;
}
[class^="bell-"] {
    position: absolute;
    top: 190px;
    left: 750px;
    display: inline-block;
    width: 60px;
    height: 60px;
    mask: url(/alarm.svg) no-repeat center;
}
.bell-set {
    opacity: 0.8;
    background-color: #eb9d0d;
}
.bell-off {
    opacity: 0.2;
    background-color: #ffffff;
}
</style>

<template>
    <div class="alarm">
        <button
            :class="bellClass"
            @click="displaySettings = !displaySettings"
        ></button>

        <section class="settings" v-if="displaySettings">
            <p>On/off button</p>
            <p>Hour setting</p>
            <p>Minute setting</p>
            <p>Day checkboxes</p>
            <p>Snooze count</p>
            <button>OK</button>
        </section>

        <section class="alert" v-if="isGoingOff">
            <h1>ALARM</h1>
            <div v-if="isSnoozed">
                <p>Snoozed until [when]...</p>
            </div>
            <div v-else>
                <button>Snooze</button>
            </div>
        </section>
    </div>
</template>
