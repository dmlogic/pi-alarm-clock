<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: [
        'data',
    ]
});
</script>

<style>
</style>

<template>
    <ul class="weather-warnings">
        <li class="warning-rain" v-if="data.dressForRain">Dress for rain</li>
        <li class="warning-cold" v-if="data.dressForCold">Dress for cold</li>
        <li class="warning-uv" v-if="data.applySunscreen">Apply sunscreen</li>
    </ul>
</template>