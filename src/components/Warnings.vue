<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: [
        'src',
    ]
});
</script>

<style scoped>
[class^="warning"] {
    overflow:hidden;
    background-repeat: no-repeat;
    height: 50px;
    background-size: contain;
    background-position-x: center;
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
    <div class="grid grid-flow-col grid-cols-5 grid-rows-1 gap-4 mt-4 pl-2">
        <div class="warning-rain" v-if="src.dressForRain"></div>
        <div class="warning-cold" v-if="src.dressForCold"></div>
        <div class="warning-uv" v-if="src.applySunscreen"></div>
    </div>
</template>
