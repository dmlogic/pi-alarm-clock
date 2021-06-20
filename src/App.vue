<template>
  <Clock />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Clock from './components/Clock.vue'

export default defineComponent({
  name: 'App',
  components: {
    Clock
  }
})
</script>

<style>
</style>
