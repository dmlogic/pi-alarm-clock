import { shallowMount } from "@vue/test-utils"
import Weather from "./Weather.vue"

function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

describe("Weather", () => {
    it("does not show any weather if auth error", () => {
        const wrapper = shallowMount(Weather, {
            propsData: {
                authError: true,
            },
        })
        expect(wrapper.find(".auth").isVisible()).toBe(true)
        expect(wrapper.find(".weather").exists()).toBe(false)
    })

    it("does not show auth warning if prop to false", () => {
        const wrapper = shallowMount(Weather, {
            propsData: {
                authError: false,
            },
        })
        expect(wrapper.find(".auth").exists()).toBe(false)
        expect(wrapper.find(".weather").exists()).toBe(true)
    })

    it("displays expected min and max temperatures", () => {})

    it("displays the warnings block", () => {})

    it("displays expected number of forecast blocks", () => {})
})
