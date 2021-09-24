<script>
import Forecast from './Forecast.vue'
import Warnings from './Warnings.vue'
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        'authError': false,
        'networkError': false,
    },
    data() {
        return {
            minTemp: null,
            maxTemp:null,
            warnings: {},
            forecast1:{},
            forecast2:{},
            forecast3:{},
            forecast4:{},
            forecast5:{},
            forecast6:{},
            forecast7:{},
            forecast8:{},
        }
    },
    methods: {
        updateSummary(summary) {
            this.minTemp = summary.low
            this.maxTemp = summary.high
        },
        updateForecast(data) {
            this.warnings = data.warnings;
            this.forecast1 = data.forecast[0];
            this.forecast2 = data.forecast[1];
            this.forecast3 = data.forecast[2];
            this.forecast4 = data.forecast[3];
            this.forecast5 = data.forecast[4];
            this.forecast6 = data.forecast[5];
            this.forecast7 = data.forecast[6];
            this.forecast8 = data.forecast[7];
        }
    },
    computed: {
        tempLow() {
            return `Min ${this.minTemp}°`;
        },
        tempHigh() {
            return `Max ${this.maxTemp}°`;
        }
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
    <div class="auth" v-if="authError">
        Cannot collect weather data. Please check your api key and reboot
    </div>
    <div class="weather" v-if="!authError">

        <ul class="weather-summary">
            <li>{{tempLow}}</li>
            <li>{{tempHigh}}</li>
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
