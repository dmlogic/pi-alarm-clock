<script>
import { defineComponent } from 'vue'
export default defineComponent({
    props: ['label', 'size'],
    computed: {
        class() {
            let tsize = this.size || 'text-2xl'
            return `bg-yellow-500
                        font-bold font-display
                        inline-flex
                        justify-center
                        px-4
                        py-2
                        rounded-md
                        text-black
                        ${tsize}`
        },
    },
})
</script>
<template>
    <button :class="class" @click="$emit('click')">
        {{ label }}
    </button>
</template>
