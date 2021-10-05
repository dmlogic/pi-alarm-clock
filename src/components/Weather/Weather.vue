<script>
import Forecast from "./Forecast.vue"
import Warnings from "./Warnings.vue"
import { defineComponent } from "vue"

export default defineComponent({
    data() {
        return {
            authError: this.$store.state.weatherAuthenticationError,
            minTemp: null,
            maxTemp: null,
            warnings: {},
            forecast1: {},
            forecast2: {},
            forecast3: {},
            forecast4: {},
            forecast5: {},
            forecast6: {},
            forecast7: {},
            forecast8: {},
        }
    },
    methods: {
        updateSummary(summary) {
            this.minTemp = summary.low
            this.maxTemp = summary.high
        },
        updateForecast(data) {
            this.warnings = data.warnings
            this.forecast1 = data.forecast[0]
            this.forecast2 = data.forecast[1]
            this.forecast3 = data.forecast[2]
            this.forecast4 = data.forecast[3]
            this.forecast5 = data.forecast[4]
            this.forecast6 = data.forecast[5]
            this.forecast7 = data.forecast[6]
            this.forecast8 = data.forecast[7]
        },
    },
    components: {
        Forecast,
        Warnings,
    },
})
</script>

<style scoped>
.auth {
    padding: 100px;
}
</style>

<template>
    <div
        class="auth text-yellow-600 font-bold text-center text-center text-2xl"
        v-if="authError"
    >
        <p>Cannot collect weather data</p>
        <p>Please check your api key and reboot</p>
    </div>

    <div class="weather mt-4" v-if="!authError">
        <div class="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4">
            <ul
                class="
                    weather-summary
                    text-white
                    font-display
                    text-4xl
                    p-5
                    text-center
                    font-bold
                "
            >
                <li class="inline-block pr-2" v-if="minTemp">
                    <span class="font-medium">min</span> {{ minTemp
                    }}<span class="font-light">°</span>
                </li>
                <li class="inline-block pl-2" v-if="maxTemp">
                    <span class="font-medium">max</span> {{ maxTemp
                    }}<span class="font-light">°</span>
                </li>
            </ul>

            <Warnings :src="warnings" />
        </div>

        <ul
            class="
                weather-forecast
                grid grid-flow-col grid-cols-8 grid-rows-1
                gap-2
            "
        >
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
