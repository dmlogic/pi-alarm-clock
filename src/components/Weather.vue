
<script>
import { defineComponent } from 'vue';
import datapoint from 'datapoint-js';
export default defineComponent({
    props: [
        'config'
    ],
    data() {
        return {
            
        }
    },
    methods: {
    },
    mounted() {
        datapoint.set_key(this.config.key)
        console.log(datapoint);
        // const site = datapoint.get_nearest_forecast_site(import.meta.env.VITE_LNG, import.meta.env.VITE_LAT)
        // console.log(site);
    //     let forecast = datapoint.get_forecast_for_site(site.id, "3hourly")
    //     let current_timestep = forecast.days[0].timesteps[0]
    //     console.log("Temperature is " + current_timestep.temperature.value + "°" + current_timestep.temperature.units + " in " + site.name)
    }
});
</script>

<style scoped>
</style>

<template>
    Weather
</template>