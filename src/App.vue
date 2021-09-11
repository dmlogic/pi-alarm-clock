<script>
import { defineComponent } from 'vue'
import Clock from './components/Clock.vue'
import Calendar from './components/Calendar.vue'
import Weather from './components/Weather.vue'

export default defineComponent({
  name: 'App',
    data() {
        return {
            metoffice: {
                key: import.meta.env.VITE_APIKEY,
                lat: import.meta.env.VITE_LAT,
                lng: import.meta.env.VITE_LNG
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
  <Weather v-bind:config="metoffice"/>
</template>