<script>
import { defineComponent } from 'vue'
import Clock from './components/Clock.vue'
import Calendar from './components/Calendar.vue'
import Weather from './components/Weather.vue'

export default defineComponent({
  name: 'App',
    data() {
        return {
            // 'metoffice_key': null,
            // 'metoffice_lat': null,
            metoffice: {
                key: import.meta.env.VITE_APIKEY
            }
        }
    },
    components: {
        Clock,
        Calendar,
        Weather,
    },
    mounted() {
        // this.metoffice_key = import.meta.VITE_APIKEY;
        console.log("mounted");
        // console.log(this.);
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