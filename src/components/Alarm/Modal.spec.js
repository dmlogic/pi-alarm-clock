import { mount } from '@vue/test-utils'
import Modal from './Modal.vue'

describe('Modal', () => {
    it('renders with expected class name', () => {
        const wrapper = mount(Modal, {
            propsData: {
                mt: 'blah',
            },
        })
        expect(wrapper.find('.modal').classes()).toContain('blah')
    })
})
