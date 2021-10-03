<script>
import { defineComponent } from "vue"
import Modal from "./Modal.vue"
import NumberInput from "./NumberInput.vue"
export default defineComponent({
    data() {
        return {
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
             * Are we showing the settings panel?
             */
            displaySettings: true,
            /**
             * The sound we will play
             */
            audioFile: "",
            daySelections: [false, false, false, false, false, false, false],
        }
    },
    methods: {
        check() {
            if (this.isSet || this.isGoingOff || this.isSnoozed) {
                return
            }
            // check if we should go off
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
    },
    mounted() {
        this.$store.state.alarmDays.forEach(
            (i) => (this.daySelections[i] = true)
        )
    },
    components: {
        Modal,
        NumberInput,
    },
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
            <Modal>
                <template v-slot:body>
                    <label
                        ><input
                            type="checkbox"
                            value="1"
                            :checked="$store.state.alarmIsSet"
                            @change="setOnOff"
                        />
                        Alarm on</label
                    >
                    <div
                        class="grid grid-flow-col grid-cols-3 grid-rows-1 gap-4"
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
                    <p>Day checkboxes</p>
                    <label
                        ><input
                            type="checkbox"
                            value="1"
                            v-model="daySelections[1]"
                            @change="setDays"
                        />
                        Monday</label
                    >
                    <label
                        ><input
                            type="checkbox"
                            value="2"
                            v-model="daySelections[2]"
                            @change="setDays"
                        />
                        Tuesday</label
                    >
                    <label
                        ><input
                            type="checkbox"
                            value="3"
                            v-model="daySelections[3]"
                            @change="setDays"
                        />
                        Wednesday</label
                    >
                    <label
                        ><input
                            type="checkbox"
                            value="4"
                            v-model="daySelections[4]"
                            @change="setDays"
                        />
                        Thursday</label
                    >
                    <label
                        ><input
                            type="checkbox"
                            value="5"
                            v-model="daySelections[5]"
                            @change="setDays"
                        />
                        Friday</label
                    >
                    <label
                        ><input
                            type="checkbox"
                            value="6"
                            v-model="daySelections[6]"
                            @change="setDays"
                        />
                        Saturday</label
                    >
                    <label
                        ><input
                            type="checkbox"
                            value="0"
                            v-model="daySelections[0]"
                            @change="setDays"
                        />
                        Sunday</label
                    >
                    <NumberInput
                        :label="'Snoozes'"
                        :value="$store.state.snoozesAllowed"
                        :max="10"
                        :min="1"
                        @change="setSnoozes"
                    />
                </template>
                <template v-slot:footer>
                    <button
                        type="button"
                        class="
                            mt-3
                            inline-flex
                            justify-center
                            rounded-md
                            border border-gray-300
                            px-4
                            py-2
                        "
                        @click="displaySettings = false"
                    >
                        OK
                    </button>
                </template>
            </Modal>
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
