import { mount } from '@vue/test-utils'
import NumberInput from './NumberInput.vue'

describe('NumberInput', () => {
    it('renders a number input', () => {
        const wrapper = mount(NumberInput, {
            propsData: {
                value: 5,
                min: 0,
                max: 10,
                step: 1,
                label: 'test label',
                name: 'test name',
            },
        })
        expect(wrapper.text()).toContain('test label')
        expect(wrapper.vm.internalValue).toBe(5)
    })

    it('reacts to increment and decrement', async () => {
        const wrapper = mount(NumberInput, {
            propsData: {
                value: 5,
                min: 0,
                max: 10,
                step: 1,
                label: 'test label',
                name: 'test name',
            },
        })
        let buttons = wrapper.findAll('button')
        expect(buttons.length).toBe(2)

        await wrapper.find('[data-testid="increment"]').trigger('click')
        expect(wrapper.vm.internalValue).toBe(6)
        await wrapper.find('[data-testid="decrement"]').trigger('click')
        expect(wrapper.vm.internalValue).toBe(5)
    })

    it('loops around when thresholds reached', async () => {
        const wrapper = mount(NumberInput, {
            propsData: {
                value: 1,
                min: 0,
                max: 3,
                step: 1,
                label: 'test label',
                name: 'test name',
            },
        })
        let increment = wrapper.find('[data-testid="increment"]')
        let decrement = wrapper.find('[data-testid="decrement"]')

        // click up and end up at min value
        for (let index = 0; index < 3; index++) {
            await increment.trigger('click')
        }
        expect(wrapper.vm.internalValue).toBe(0)

        wrapper.setData({ internalValue: 3 })
        // click down and end up at max value
        for (let index = 0; index < 4; index++) {
            await decrement.trigger('click')
        }
        expect(wrapper.vm.internalValue).toBe(3)
    })
})
