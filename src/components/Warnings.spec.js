import { shallowMount } from '@vue/test-utils';
import Warnings from './Warnings.vue';


describe('Warnings', () => {

    it ('shows rain when expected', () => {
        let wrapper = shallowMount(Warnings,{
            propsData: {
                src: {
                    dressForRain: true
                }
            }
        })
        expect(wrapper.find('.warning-rain').isVisible()).toBe(true);

        wrapper = shallowMount(Warnings,{
            propsData: {
                src: {
                    dressForRain: false
                }
            }
        })
        expect(wrapper.find('.warning-rain').exists()).toBe(false);
    })

    it ('shows cold when expected', () => {
        let wrapper = shallowMount(Warnings,{
            propsData: {
                src: {
                    dressForCold: true
                }
            }
        })
        expect(wrapper.find('.warning-cold').isVisible()).toBe(true);

        wrapper = shallowMount(Warnings,{
            propsData: {
                src: {
                    dressForCold: false
                }
            }
        })
        expect(wrapper.find('.warning-cold').exists()).toBe(false);
    })

    it ('shows uv when expected', () => {
        let wrapper = shallowMount(Warnings,{
            propsData: {
                src: {
                    applySunscreen: true
                }
            }
        })
        expect(wrapper.find('.warning-uv').isVisible()).toBe(true);

        wrapper = shallowMount(Warnings,{
            propsData: {
                src: {
                    applySunscreen: false
                }
            }
        })
        expect(wrapper.find('.warning-uv').exists()).toBe(false);
    })

});
