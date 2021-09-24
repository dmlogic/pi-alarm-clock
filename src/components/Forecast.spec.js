import { shallowMount } from '@vue/test-utils';
import Forecast from './Forecast.vue';

describe('Forecast', () => {

    it ('shows rain as a percentage', () => {
        const wrapper = mountForcast({ rain: 12 })
        expect(wrapper.find('.rain').text()).toBe('12%');
    })

    it ('shows a weather icon matching type code', () => {
        const wrapper = mountForcast({ type: 5 })
        expect(wrapper.find('.type img').attributes('src')).toBe('/weather_icons/5.svg');
    })

    it ('shows a temperature as degrees', () => {
        const wrapper = mountForcast({ temperature: 25 })
        expect(wrapper.find('.temperature').text()).toBe('25°');
    })

    it ('formats the time like a clock', () => {
        const wrapper = mountForcast({ time: 3 })
        expect(wrapper.find('.time').text()).toBe('03:00');
    })

    it ('chooses the coldest colour for off-scale cold', () => {
        const wrapper = mountForcast({ temperature: -50 })
        expect(wrapper.find('.temperature').attributes('style')).toContain('rgb(127, 141, 184)');
    })

    it ('picks the expected colour index for minus degrees', () => {
        const wrapper = mountForcast({ temperature: -5 })
        expect(wrapper.find('.temperature').attributes('style')).toContain('rgb(187, 194, 217)');
    })

    it ('chooses the warmest colour for off-scale hot', () => {
        const wrapper = mountForcast({ temperature: 150 })
        expect(wrapper.find('.temperature').attributes('style')).toContain('rgb(195, 0, 49)');
    })

    it ('picks the expected colour index for positive degrees', () => {
        const wrapper = mountForcast({ temperature: 30 })
        expect(wrapper.find('.temperature').attributes('style')).toContain('rgb(243, 98, 51)');
    })

});

let mountForcast = function(data) {
    return shallowMount(Forecast,{
        propsData: { src: data }
    })
}
