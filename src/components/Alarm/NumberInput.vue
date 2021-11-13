<script>
import { defineComponent } from "vue"
export default defineComponent({
    props: ["value", "label", "max", "min"],
    data() {
        return {
            internalValue: null,
        }
    },
    mounted() {
        this.internalValue = this.value
    },
    methods: {
        increment() {
            let nextValue = this.internalValue + 1
            if (nextValue > this.max) {
                nextValue = this.min
            }
            this.internalValue = nextValue
            this.$emit("change", this.internalValue)
        },
        decrement() {
            const floor = this.min || 0
            let nextValue = this.internalValue - 1
            if (nextValue < floor) {
                nextValue = this.max
            }
            this.internalValue = nextValue
            this.$emit("change", this.internalValue)
        },
    },
})
</script>
<template>
    <div class="w-40">
        <div class="text-xl font-semibold">
            {{ label }}
        </div>
        <div class="flex flex-row rounded-lg relative my-2">
            <button
                class="bg-gray-300 text-gray-400 w-20 rounded-l outline-none"
                @click="decrement"
            >
                <span class="m-auto text-4xl font-bold">−</span>
            </button>
            <input
                v-model="internalValue"
                type="text"
                readonly
                class="
                    outline-none
                    text-center
                    w-full
                    bg-gray-300
                    font-semibold
                    text-md
                    flex
                    items-center
                    text-gray-700 text-2xl
                    outline-none
                "
            />
            <button
                class="bg-gray-300 text-gray-400 w-20 rounded-r"
                @click="increment"
            >
                <span class="m-auto text-4xl font-bold">+</span>
            </button>
        </div>
    </div>
</template>
