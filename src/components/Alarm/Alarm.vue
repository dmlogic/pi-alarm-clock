<script>
import { defineComponent } from 'vue'
import Modal from './Modal.vue'
import Button from './Button.vue'
import Settings from './Settings.vue'
import { padTime } from '../../functions.js'
export default defineComponent({
    data() {
        return {
            /**
             * Is the alarm going off right now?
             */
            isGoingOff: false,
            /**
             * The monitor for how long the alarm has been sounding
             */
            goingOffTimer: null,
            /**
             * Has the alarm been snoozed?
             */
            isSnoozed: false,
            /**
             * When the current snooze will end
             */
            snoozeEnds: null,
            /**
             * The snooze timer object
             */
            snoozeTimer: null,
            /**
             * How many times we've snoozed
             */
            snoozeCount: 0,

            /**
             * The sound we will play
             */
            audioFile: new Audio(this.$store.state.audioFile),
            /**
             * Are settings being displayed?
             */
            displaySettings: false,
        }
    },
    methods: {
        check() {
            if (
                !this.$store.state.alarmIsSet ||
                this.isGoingOff ||
                this.isSnoozed ||
                !this.timeToGoOff()
            ) {
                return
            }

            this.snoozeCount = 0
            this.startAlarm()
        },
        snoozeAlarm(e) {
            this.stopAlarmPlayback()
            this.snoozeCount++
            this.isSnoozed = true
            this.isGoingOff = false
            const timeUntilNextPlayback =
                this.$store.state.snoozeMinutes * 60 * 1000
            this.snoozeTimer = setTimeout(
                this.startAlarm,
                timeUntilNextPlayback
            )
            const timeOfNextPlayback =
                    this.$store.state.timeNow.getTime() + timeUntilNextPlayback,
                d = new Date()
            d.setTime(timeOfNextPlayback)
            this.snoozeEnds = d
        },
        startAlarm() {
            if (!this.$store.state.alarmIsSet) {
                return this.dismissAlarm()
            }
            this.startAlarmPlayback()
            this.isGoingOff = true
            this.isSnoozed = false
            this.snoozeTimer = null
            this.snoozeEnds = null
            this.goingOffTimer = setTimeout(this.dismissAlarm, 10 * 60 * 1000)
        },
        dismissAlarm() {
            this.stopAlarmPlayback()
            this.isGoingOff = false
            this.isSnoozed = false
            this.snoozeCount = 0
            this.snoozeTimer = null
            this.snoozeEnds = null
        },
        startAlarmPlayback() {
            this.audioFile.volume = this.$store.state.volume / 10
            this.audioFile.loop = true
            this.audioFile.play()
        },
        stopAlarmPlayback() {
            clearTimeout(this.goingOffTimer)
            this.audioFile.pause()
        },
        timeToGoOff() {
            const timeNow =
                    this.$store.state.timeNow.getHours() +
                    ':' +
                    this.$store.state.timeNow.getMinutes(),
                triggerTime =
                    this.$store.state.alarmHour +
                    ':' +
                    this.$store.state.alarmMinute,
                triggerDay = this.$store.state.timeNow.getDay()

            return (
                timeNow === triggerTime &&
                this.$store.state.alarmDays.includes(triggerDay)
            )
        },
    },
    computed: {
        bellClass() {
            return this.$store.state.alarmIsSet ? 'bell-set' : 'bell-off'
        },
        nextAlarmPlay() {
            if (!this.snoozeEnds) {
                return '-'
            }
            return (
                padTime(this.snoozeEnds.getHours()) +
                ':' +
                padTime(this.snoozeEnds.getMinutes())
            )
        },
    },
    mounted() {
        this.check()
    },
    components: {
        Modal,
        Button,
        Settings,
    },
})
</script>

<style scoped>
.alarm {
    position: fixed;
    top: 0;
    left: 0;
}
.snooze {
    top: 100px;
}
[class^='bell-'] {
    position: absolute;
    top: 180px;
    left: 702px;
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
.alarm-buttons {
    gap: 7rem;
    padding: 4rem 2.5rem;
}
</style>

<template>
    <div class="alarm">
        <button
            data-testid="bell"
            :class="bellClass"
            @click="displaySettings = !displaySettings"
        ></button>

        <section class="alert" v-if="isGoingOff">
            <Modal>
                <template v-slot:body>
                    <p class="font-display text-center font-extrabold text-6xl">
                        Time to wake up!
                    </p>
                    <div
                        class="
                            alarm-buttons
                            grid grid-flow-col grid-cols-2 grid-rows-1
                            text-center
                        "
                    >
                        <Button
                            data-testid="snooze"
                            :label="'SNOOZE'"
                            :size="'text-4xl'"
                            v-if="snoozeCount < $store.state.snoozesAllowed"
                            v-on:click="snoozeAlarm"
                        />

                        <Button
                            data-testid="shutUp"
                            :label="'SHUT UP!'"
                            :size="'text-4xl'"
                            v-on:click="dismissAlarm"
                        >
                        </Button>
                    </div>
                </template>
            </Modal>
        </section>

        <Settings v-if="displaySettings" v-on:close="displaySettings = false" />

        <section class="alert snooze" v-if="isSnoozed">
            <Modal :mt="'mt-36'">
                <template v-slot:body>
                    <p class="font-display text-center font-extrabold text-6xl">
                        Alarm!
                    </p>
                    <div class="text-center">
                        <p class="py-4 text-xl">
                            Snoozed until {{ nextAlarmPlay }}
                        </p>
                        <Button
                            data-testid="cancelSnooze"
                            :label="'CANCEL'"
                            :size="'text-4xl'"
                            v-on:click="dismissAlarm"
                        />
                    </div>
                </template>
            </Modal>
        </section>
    </div>
</template>
