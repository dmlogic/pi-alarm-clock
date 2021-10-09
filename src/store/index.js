import { createStore } from "vuex"

export default createStore({
    state() {
        return {
            timeNow: null,
            audioError: true,
            weatherAuthenticationError: false,
            alarmIsSet: false,
            alarmHour: 6,
            alarmMinute: 30,
            alarmDays: [1, 2, 3, 4, 5],
            snoozesAllowed: 3,
            snoozeMinutes: 10,
            volume: 5,
            audioFile: "/audio/beep-beep.mp3",
        }
    },
    mutations: {
        setAudioError(state, value) {
            state.audioError = Boolean(value)
        },
        setTime(state, value) {
            state.timeNow = value
        },
        setAuthenticationError(state, value) {
            state.weatherAuthenticationError = Boolean(value)
        },
        setAlarmHour(state, value) {
            state.alarmHour = parseInt(value)
        },
        setAlarmMinute(state, value) {
            state.alarmMinute = parseInt(value)
        },
        setSnoozes(state, value) {
            state.snoozesAllowed = parseInt(value)
        },
        setSnoozeMinutes(state, value) {
            state.snoozeMinutes = parseInt(value)
        },
        setAlarmDays(state, value) {
            state.alarmDays = value
        },
        setOnOff(state, value) {
            state.alarmIsSet = Boolean(value)
        },
        setVolume(state, value) {
            state.volume = parseInt(value)
        },
        setAudioFile(state, value) {
            state.audioFile = value
        },
    },
})
