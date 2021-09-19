<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: [
        'data',
    ]
});
</script>

<style>
.forecast {
    display:inline-block;
    padding:6px;
    text-align:center;
}
</style>

<template>
    <li class="forecast">
        <div class="rain">{{data.rain}}%</div>
        <div class="type">{{data.type}}</div>
        <div class="temperature">{{data.temperature}}°</div>
        <div class="time">{{data.time}}</div>
    </li>
</template>