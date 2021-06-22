<template>
  <Clock />
  <Calendar />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Clock from './components/Clock.vue'
import Calendar from './components/Calendar.vue'


export default defineComponent({
  name: 'App',
  components: {
    Clock,
    Calendar
  }
})
</script>

<style>
</style>
