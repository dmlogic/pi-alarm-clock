import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
    it('renders with default properties', () => {
        const wrapper = mount(Button, {
            propsData: {
                label: 'test label',
                size: null,
            },
        })
        expect(wrapper.classes()).toContain('text-2xl')
        expect(wrapper.text()).toContain('test label')
    })

    it('renders with supplied properties', () => {
        const wrapper = mount(Button, {
            propsData: {
                label: 'test label',
                size: 'raa',
            },
        })
        expect(wrapper.classes()).not.toContain('text-2xl')
        expect(wrapper.classes()).toContain('raa')
    })

    it('emits event on click', () => {
        const wrapper = mount(Button)
        wrapper.find('button').trigger('click')
        expect(wrapper.emitted()).toHaveProperty('click')
    })
})
