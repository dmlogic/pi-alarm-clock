<script>
import { defineComponent } from "vue"
import Modal from "./Modal.vue"
import NumberInput from "./NumberInput.vue"
import Button from "./Button.vue"
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
             * Are we showing the settings panel?
             */
            displaySettings: false,
            /**
             * The sound we will play
             */
            audioFile: new Audio(this.$store.state.audioFile),
            /**
             * The days set to sound the alarm
             */
            daySelections: [false, false, false, false, false, false, false],
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
                    ":" +
                    this.$store.state.timeNow.getMinutes(),
                triggerTime =
                    this.$store.state.alarmHour +
                    ":" +
                    this.$store.state.alarmMinute,
                triggerDay = this.$store.state.timeNow.getDay()

            return (
                timeNow === triggerTime &&
                this.$store.state.alarmDays.includes(triggerDay)
            )
        },
        setHour(to) {
            this.$store.commit("setAlarmHour", to)
        },
        setMinute(to) {
            this.$store.commit("setAlarmMinute", to)
        },
        setSnoozes(to) {
            this.$store.commit("setSnoozes", to)
        },
        setSnoozeMinutes(to) {
            this.$store.commit("setSnoozeMinutes", to)
        },
        setVolume(to) {
            this.$store.commit("setVolume", to)
            const audioPreview = new Audio("/audio/beep-beep.mp3")
            audioPreview.volume = parseInt(to) / 10
            audioPreview.play()
            setTimeout(function () {
                audioPreview.pause()
            }, 1000)
        },
        setDays() {
            let selection = []
            for (let index = 0; index < this.daySelections.length; index++) {
                if (this.daySelections[index] === true) {
                    selection.push(index)
                }
            }
            this.$store.commit("setAlarmDays", selection)
        },
        setOnOff(ev) {
            this.$store.commit("setOnOff", ev.target.checked)
        },
    },
    computed: {
        bellClass() {
            return this.$store.state.alarmIsSet ? "bell-set" : "bell-off"
        },
        nextAlarmPlay() {
            if (!this.snoozeEnds) {
                return "-"
            }
            return (
                this.snoozeEnds.getHours() + ":" + this.snoozeEnds.getMinutes()
            )
        },
    },
    mounted() {
        this.$store.state.alarmDays.forEach(
            (i) => (this.daySelections[i] = true)
        )
        this.check()
    },
    components: {
        Modal,
        NumberInput,
        Button,
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
[class^="bell-"] {
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
                            :label="'SNOOZE'"
                            :size="'text-4xl'"
                            v-if="snoozeCount < $store.state.snoozesAllowed"
                            v-on:click="snoozeAlarm"
                        />

                        <Button
                            :label="'SHUT UP!'"
                            :size="'text-4xl'"
                            v-on:click="dismissAlarm"
                        >
                        </Button>
                    </div>
                </template>
            </Modal>
        </section>

        <section class="settings" v-if="displaySettings">
            <Modal>
                <template v-slot:body>
                    <label class="font-bold text-2xl block mb-6"
                        ><input
                            type="checkbox"
                            class="form-checkbox rounded p-3"
                            value="1"
                            :checked="$store.state.alarmIsSet"
                            @change="setOnOff"
                        />
                        Alarm on</label
                    >
                    <div
                        class="
                            mb-6
                            grid grid-flow-col grid-cols-3 grid-rows-1
                            gap-4
                        "
                    >
                        <NumberInput
                            :label="'Hour'"
                            :value="$store.state.alarmHour"
                            :max="23"
                            @change="setHour"
                        />
                        <NumberInput
                            :label="'Minute'"
                            :value="$store.state.alarmMinute"
                            :max="59"
                            @change="setMinute"
                        />
                    </div>

                    <div
                        class="
                            mb-6
                            grid grid-flow-col grid-cols-7 grid-rows-1
                            gap-1
                            text-xl
                            font-bold
                        "
                    >
                        <label
                            ><input
                                type="checkbox"
                                class="form-checkbox rounded p-3"
                                value="1"
                                v-model="daySelections[1]"
                                @change="setDays"
                            />
                            Mon</label
                        >
                        <label
                            ><input
                                type="checkbox"
                                class="form-checkbox rounded p-3"
                                value="2"
                                v-model="daySelections[2]"
                                @change="setDays"
                            />
                            Tue</label
                        >
                        <label
                            ><input
                                type="checkbox"
                                class="form-checkbox rounded p-3"
                                value="3"
                                v-model="daySelections[3]"
                                @change="setDays"
                            />
                            Wed</label
                        >
                        <label
                            ><input
                                type="checkbox"
                                class="form-checkbox rounded p-3"
                                value="4"
                                v-model="daySelections[4]"
                                @change="setDays"
                            />
                            Thu</label
                        >
                        <label
                            ><input
                                type="checkbox"
                                class="form-checkbox rounded p-3"
                                value="5"
                                v-model="daySelections[5]"
                                @change="setDays"
                            />
                            Fri</label
                        >
                        <label
                            ><input
                                type="checkbox"
                                class="form-checkbox rounded p-3"
                                value="6"
                                v-model="daySelections[6]"
                                @change="setDays"
                            />
                            Sat</label
                        >
                        <label
                            ><input
                                type="checkbox"
                                class="form-checkbox rounded p-3"
                                value="0"
                                v-model="daySelections[0]"
                                @change="setDays"
                            />
                            Sun</label
                        >
                    </div>
                    <div
                        class="grid grid-flow-col grid-cols-3 grid-rows-1 gap-4"
                    >
                        <NumberInput
                            :label="'Snoozes'"
                            :value="$store.state.snoozesAllowed"
                            :max="10"
                            :min="1"
                            @change="setSnoozes"
                        />
                        <NumberInput
                            :label="'Snooze minutes'"
                            :value="$store.state.snoozeMinutes"
                            :max="10"
                            :min="5"
                            @change="setSnoozeMinutes"
                        />
                        <NumberInput
                            :label="'Volume'"
                            :value="$store.state.volume"
                            :max="10"
                            :min="1"
                            @change="setVolume"
                        />
                    </div>
                </template>
                <template v-slot:footer>
                    <Button
                        :label="'OK'"
                        v-on:click="displaySettings = false"
                    />
                </template>
            </Modal>
        </section>

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
