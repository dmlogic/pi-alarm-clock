<template>
  <Clock />
  <Calendar />
  <Weather />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Clock from './components/Clock.vue'
import Calendar from './components/Calendar.vue'
import Weather from './components/Weather.vue'


export default defineComponent({
  name: 'App',
  components: {
    Clock,
    Calendar,
    Weather
  }
})
</script>

<style>
</style>
