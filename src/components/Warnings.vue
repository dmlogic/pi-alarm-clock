<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: [
        'data',
    ]
});
</script>

<style scoped>
[class^="warning"] {
    box-sizing: border-box;
    display:inline-block;
    width:123px;
    height: 125px;
    overflow:hidden;
    background-repeat: no-repeat;
    padding-top:125px;
    background-size: contain;
}
.warning-rain {
    background-image: url(umbrella.svg);
}
.warning-cold {
    background-image: url(hat.svg);
}
.warning-uv {
    background-image: url(sunscreen.svg);
}
</style>

<template>
    <ul class="weather-warnings">
        <li class="warning-rain" v-if="data.dressForRain">Dress for rain</li>
        <li class="warning-cold" v-if="data.dressForCold">Dress for cold</li>
        <li class="warning-uv" v-if="data.applySunscreen">Apply sunscreen</li>
    </ul>
</template>