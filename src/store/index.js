import { createStore } from "vuex"

export default createStore({
    state() {
        return {
            timeNow: null,
            weatherAuthenticationError: false,
            alarmIsSet: false,
            alarmHour: 15,
            alarmMinute: 22,
            alarmDays: [1, 2, 3, 4, 5],
            snoozesAllowed: 3,
            snoozeMinutes: 10,
            snoozeMinutes: 10,
        }
    },
    mutations: {
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
        setAlarmDays(state, value) {
            state.alarmDays = value
        },
        setOnOff(state, value) {
            state.alarmIsSet = Boolean(value)
        },
    },
})
