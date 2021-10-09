<script>
import { defineComponent } from "vue"
import Clock from "./components/Clock.vue"
import Calendar from "./components/Calendar.vue"
import Weather from "./components/Weather/Weather.vue"
import Alarm from "./components/Alarm/Alarm.vue"

import HttpTransport from "./weather/transports/HttpTransport.js"
import WeatherService from "./weather/WeatherService.js"

export default defineComponent({
    name: "App",
    props: {
        mockedWeatherService: null,
    },
    data() {
        return {
            networkError: false,
            audioError: this.$store.state.audioError,
        }
    },
    methods: {
        onNewMinute() {
            if (this.networkError) {
                this.refreshWeatherData()
            }
            this.$refs.alarm.check()
        },
        onNewHour() {
            this.updateCalendar()
            this.refreshWeatherData()
        },
        createWeatherService() {
            if (this.mockedWeatherService) {
                return this.mockedWeatherService
            }
            this.networkError = false
            const transport = new HttpTransport(
                import.meta.env.VITE_APIKEY,
                import.meta.env.VITE_LAT,
                import.meta.env.VITE_LNG
            )
            return new WeatherService(transport)
        },
        refreshWeatherData() {
            this.updateWeatherSummary()
            if (!this.networkError) {
                this.updateWeatherForecast()
            }
        },
        updateWeatherSummary() {
            if (this.$store.state.weatherAuthenticationError) {
                return
            }
            try {
                const summaryData =
                    this.createWeatherService().minMaxTemperatures()
                this.$refs.weather.updateSummary(summaryData)
            } catch (error) {
                this.setWeatherError(error)
            }
        },
        updateCalendar() {
            this.$refs.calendar.update(this.$store.state.timeNow)
        },
        updateWeatherForecast() {
            if (this.$store.state.weatherAuthenticationError) {
                return
            }
            const now = new Date()
            try {
                const forecastData = this.createWeatherService().forecast(
                    now.getHours()
                )
                this.$refs.weather.updateForecast(forecastData)
            } catch (error) {
                this.setWeatherError(error)
            }
        },
        setWeatherError(error) {
            if (error === "AUTH_ERROR") {
                this.$store.commit("setAuthenticationError", true)
                return false
            }
            this.networkError = error
        },
    },
    mounted() {
        this.refreshWeatherData()
        this.updateCalendar()
    },
    components: {
        Clock,
        Calendar,
        Weather,
        Alarm,
    },
})
</script>

<style></style>

<template>
    <div
        class="auth text-yellow-600 font-bold text-center text-center text-2xl"
        v-if="audioError"
    >
        <p>No audio playback available</p>
        <p>Please power-off the clock and reboot</p>
    </div>

    <div class="page" v-if="!audioError">
        <div class="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4">
            <Clock @minute="onNewMinute" @hour="onNewHour" />
            <Calendar ref="calendar" />
        </div>
        <Weather ref="weather" />
        <Alarm ref="alarm" />
    </div>
</template>
