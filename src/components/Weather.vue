<template>
    Weather
</template>

<script lang="ts">
import datapoint from "datapoint-js"
export default {
    data() {
        return {
            
        }
    },
    methods: {
    },
    mounted() {
        console.log(datapoint);
        // console.log(import.meta.env);
        datapoint.set_key("6bab679d-c8a6-40c0-b81b-c08498890766")
        let site = datapoint.get_nearest_forecast_site("-0.8180972", "51.2169605")
    //     let forecast = datapoint.get_forecast_for_site(site.id, "3hourly")
    //     let current_timestep = forecast.days[0].timesteps[0]
    //     console.log("Temperature is " + current_timestep.temperature.value + "°" + current_timestep.temperature.units + " in " + site.name)
    }
}
</script>

<style scoped>
</style>
