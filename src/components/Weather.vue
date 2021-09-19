<script>
import Forecast from './Forecast.vue'
import Warnings from './Warnings.vue'
import { defineComponent } from 'vue';

export default defineComponent({
    props: [
        'api'
    ],
    data() {
        return {
            authError: false,
            networkError: false,
            minTemp: null,
            maxTemp:null,
            forecast1:{},
            forecast2:{},
            forecast3:{},
            forecast4:{},
            forecast5:{},
            forecast6:{},
            forecast7:{},
            forecast8:{},
            warnings: {},
        }
    },
    methods: {
        updateWeather() {
            const summary = this.api.minMaxTemperatures();
            const currentTime = new Date;
            this.minTemp = summary.low
            this.maxTemp = summary.high

            const response = this.api.forecast( currentTime.getHours() );
            this.forecast1 = response.forecast[0];
            this.forecast2 = response.forecast[1];
            this.forecast3 = response.forecast[2];
            this.forecast4 = response.forecast[3];
            this.forecast5 = response.forecast[4];
            this.forecast6 = response.forecast[5];
            this.forecast7 = response.forecast[6];
            this.forecast8 = response.forecast[7];
            this.warnings = response.warnings;

            this.api.transport.siteId = null;
        }
    },
    mounted() {
        this.updateWeather();
    },
    components: {
        Forecast,
        Warnings
    }
});
</script>

<style scoped>

</style>

<template>
    <div class="weather">
        <ul class="weather-summary">
            <li>Min {{minTemp}}°</li>
            <li>Max {{maxTemp}}°</li>
        </ul>
        <Warnings :data="warnings" />
        <ul class="weather-forecast">
            <Forecast :src="forecast1" />
            <Forecast :src="forecast2" />
            <Forecast :src="forecast3" />
            <Forecast :src="forecast4" />
            <Forecast :src="forecast5" />
            <Forecast :src="forecast6" />
            <Forecast :src="forecast7" />
            <Forecast :src="forecast8" />
        </ul>
    </div>
</template>