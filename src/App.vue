<script>
import { defineComponent } from "vue"
import Clock from "./components/Clock.vue"
import Calendar from "./components/Calendar.vue"
import Weather from "./components/Weather.vue"
import Alarm from "./components/Alarm.vue"

import HttpTransport from "./weather/transports/HttpTransport.js"
import WeatherService from "./weather/WeatherService.js"

export default defineComponent({
    name: "App",
    props: {
        mockedWeatherService: null,
    },
    data() {
        return {
            authError: false,
            networkError: false,
        }
    },
    methods: {
        onNewMinute(dateObj) {
            if (this.networkError) {
                this.refreshWeatherData()
            }
            this.$refs.alarm.check(dateObj)
        },
        onNewHour(dateObj) {
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
            if (this.authError) {
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
        updateWeatherForecast() {
            if (this.authError) {
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
                this.authError = true
                return false
            }
            this.networkError = error
        },
    },
    mounted() {
        this.refreshWeatherData()
    },
    components: {
        Clock,
        Calendar,
        Weather,
        Alarm,
    },
})
</script>

<style>
.page {
    width: 800px;
    height: 480px;
}
</style>

<template>
    <div class="page">
        <div class="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4">
            <Clock @minute="onNewMinute" @hour="onNewHour" />
            <Calendar />
        </div>
        <Weather ref="weather" :authError="authError" />
        <Alarm ref="alarm" />
    </div>
</template>
