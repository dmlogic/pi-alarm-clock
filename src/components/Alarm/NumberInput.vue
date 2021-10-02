<script>
import { defineComponent } from "vue"
export default defineComponent({
    props: ["value", "label", "max"],
    data() {
        return {
            internalValue: null
        }
    },
    mounted() {
        this.internalValue = this.value;
    },
    methods: {
        increment() {
            let nextValue = this.internalValue +1;
            if(nextValue > this.max) {
                nextValue = 1
            }
            this.internalValue = nextValue
            this.$emit('change',this.internalValue);
        },
        decrement() {
            let nextValue = this.internalValue -1;
            if(nextValue < 1) {
                nextValue = this.max
            }
            this.internalValue = nextValue
            this.$emit('change',this.internalValue);
        }
    }
})
</script>
<template>

    <div class="custom-number-input h-10 w-32">
        <div  class="w-full text-gray-700 text-sm font-semibold">
            {{label}}
        </div>
        <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button class=" bg-gray-300 text-gray-600 h-full w-20 rounded-l outline-none" @click="decrement">
                <span class="m-auto text-2xl font-thin">−</span>
            </button>
            <input v-model="internalValue" type="text" class="outline-none text-center w-full bg-gray-300 font-semibold text-md flex items-center text-gray-700  outline-none"  />
            <button class="bg-gray-300 text-gray-600 h-full w-20 rounded-r cursor-pointer" @click="increment">
                <span class="m-auto text-2xl font-thin">+</span>
            </button>
        </div>
    </div>

</template>
