<script>
import { defineComponent } from 'vue'
import Modal from './Modal.vue'
import NumberInput from './NumberInput.vue'
import Button from './Button.vue'
export default defineComponent({
    data() {
        return {
            daySelections: [false, false, false, false, false, false, false],
        }
    },
    methods: {
        setHour(to) {
            this.$store.commit('setAlarmHour', to)
        },
        setMinute(to) {
            this.$store.commit('setAlarmMinute', to)
        },
        setSnoozes(to) {
            this.$store.commit('setSnoozes', to)
        },
        setSnoozeMinutes(to) {
            this.$store.commit('setSnoozeMinutes', to)
        },
        setVolume(to) {
            this.$store.commit('setVolume', to)
            const audioPreview = new Audio('/audio/beep-beep.mp3')
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
            this.$store.commit('setAlarmDays', selection)
        },
        setOnOff(ev) {
            this.$store.commit('setOnOff', ev.target.checked)
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
        Button,
    },
})
</script>

<style scoped>

</style>

<template>

        <section class="settings">
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
                            data-testid="hour"
                            :label="'Hour'"
                            :value="$store.state.alarmHour"
                            :max="23"
                            @change="setHour"
                        />
                        <NumberInput
                            data-testid="minute"
                            :label="'Minute'"
                            :value="$store.state.alarmMinute"
                            :max="59"
                            @change="setMinute"
                        />
                    </div>

                    <div
                        data-testid="days"
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
                            data-testid="snoozeCount"
                            :label="'Snoozes'"
                            :value="$store.state.snoozesAllowed"
                            :max="10"
                            :min="1"
                            @change="setSnoozes"
                        />
                        <NumberInput
                            data-testid="snoozeMinutes"
                            :label="'Snooze minutes'"
                            :value="$store.state.snoozeMinutes"
                            :max="10"
                            :min="5"
                            @change="setSnoozeMinutes"
                        />
                        <NumberInput
                            data-testid="volume"
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
                        data-testid="close"
                        :label="'OK'"
                        v-on:click="$emit('close')"
                    />
                </template>
            </Modal>
        </section>

</template>
