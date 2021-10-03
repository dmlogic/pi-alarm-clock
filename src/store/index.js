import { createStore } from "vuex"

export default createStore({
    state() {
        return {
            timeNow: null,
            weatherAuthenticationError: false,
            alarmIsSet: false,
            alarmHour: null,
            alarmMinute: null,
            alarmDays: [],
        }
    },
    mutations: {
        setTime(state, value) {
            state.timeNow = value
        },
        setAuthenticationError(state, value) {
            state.weatherAuthenticationError = Boolean(value)
        },
        setAlarm(state, values) {
            state.alarmHour = values.hour
            state.alarmMinute = values.minute
            state.alarmDays = values.days
        },
    },
})
