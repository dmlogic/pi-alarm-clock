import { shallowMount } from "@vue/test-utils"
import Warnings from "./Warnings.vue"

describe("Warnings", () => {
    it("shows rain when expected", () => {
        let wrapper = mountWarnings({ dressForRain: true })
        expect(wrapper.find(".warning-rain").isVisible()).toBe(true)

        wrapper = mountWarnings({ dressForRain: false })
        expect(wrapper.find(".warning-rain").exists()).toBe(false)
    })

    it("shows cold when expected", () => {
        let wrapper = mountWarnings({ dressForCold: true })
        expect(wrapper.find(".warning-cold").isVisible()).toBe(true)

        wrapper = mountWarnings({ dressForCold: false })
        expect(wrapper.find(".warning-cold").exists()).toBe(false)
    })

    it("shows uv when expected", () => {
        let wrapper = mountWarnings({ applySunscreen: true })
        expect(wrapper.find(".warning-uv").isVisible()).toBe(true)

        wrapper = mountWarnings({ applySunscreen: false })
        expect(wrapper.find(".warning-uv").exists()).toBe(false)
    })
})

let mountWarnings = function (data) {
    return shallowMount(Warnings, {
        propsData: { src: data },
    })
}
