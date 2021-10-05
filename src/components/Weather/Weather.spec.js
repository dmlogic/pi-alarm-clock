import { mount } from "@vue/test-utils"
import store from "../../store"
import Weather from "./Weather.vue"
import Warnings from "./Warnings.vue"
import Forecast from "./Forecast.vue"

let wrapper

describe("Weather", () => {
    it ("does not show any weather if auth error", () => {
        store.commit("setAuthenticationError",true)
        wrapper = createWrapper();
        expect(wrapper.find(".auth").isVisible()).toBe(true)
        expect(wrapper.find(".weather").exists()).toBe(false)
    })

    it("does not show auth warning connection is fine", () => {
        store.commit("setAuthenticationError",false)
        wrapper = createWrapper();
        expect(wrapper.find(".auth").exists()).toBe(false)
        expect(wrapper.find(".weather").exists()).toBe(true)
    })

    it("displays expected min and max temperatures", async () => {
        wrapper = createWrapper();
        await wrapper.vm.updateSummary(
            {low:4, high:24}
        )
        let listItems = wrapper.findAll(".weather-summary li");
        expect(listItems[0].text()).toBe("min 4°");
        expect(listItems[1].text()).toBe("max 24°");
    })

    it("displays the warnings block", async () => {
        wrapper = await createWrapper({
            warnings: {
                dressForRain: true
            }
        }, "full");
        let warnings = wrapper.findComponent(Warnings);
        expect(warnings.exists()).toBe(true);

        // Watch the data pass through as expected
        expect(warnings.find('.warning-rain').exists()).toBe(true);
        expect(warnings.find('.warning-cold').exists()).toBe(false);
        expect(warnings.find('.warning-uv').exists()).toBe(false);
    })

    it("displays expected number of forecast blocks", async () => {
        wrapper = await createWrapper({
                forecast1: {time: 1},
                forecast2: {time: 2},
                forecast3: {time: 3},
                forecast4: {time: 4},
                forecast5: {time: 5},
                forecast6: {time: 6},
                forecast7: {time: 7},
                forecast8: {time: 8},
        }, "full");
        // Eight forecasts...
        let forecasts = wrapper.findAllComponents(Forecast);
        expect(forecasts.length).toBe(8);
        // ... populated with expected data
        for (let index = 0; index < forecasts.length; index++) {
            const element = forecasts[index],
                  expectedTime = '0'+(index+1)+':00';
            expect(element.find('.time').text()).toBe(expectedTime)

        }
    })
})

const createWrapper = function(data, style) {
    const w = mount(
        Weather,
        {
            shallow: !style || style === 'shallow',
            global: {
                plugins: [store]
            }
        }
    )
    if(typeof data === "object") {
        w.setData(data)
    }
    return w;
}
