<script>
import { defineComponent } from 'vue'
import Clock from './components/Clock.vue'
import Calendar from './components/Calendar.vue'
import Weather from './components/Weather.vue'

import HttpTransport from "./weather/transports/HttpTransport.js";
import WeatherService from "./weather/WeatherService.js"

export default defineComponent({
  name: 'App',
    data() {
        return {
            weatherService() {
                const transport = new HttpTransport(
                    import.meta.env.VITE_APIKEY,
                    import.meta.env.VITE_LAT,
                    import.meta.env.VITE_LNG
                );
                return new WeatherService(transport);
            }
        }
    },
    components: {
        Clock,
        Calendar,
        Weather
    }
});
</script>


<style>
</style>

<template>
  <Clock />
  <Calendar />
  <Weather v-bind:api="weatherService()"/>
</template>