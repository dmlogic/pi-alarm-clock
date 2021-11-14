/**
 * Tests are limited here as I've not attempted to solve the problem
 * of the lack of a real Audio element without a browser.
 *
 * This means I can't cover a lot of the mecahnics of playback.
 */
import { mount } from '@vue/test-utils'
import Alarm from './Alarm.vue'
import Settings from './Settings.vue'
import store from '../../store'

beforeEach(() => {
    store.commit('setTime', new Date())
})

describe('Alarm', () => {
    it('has a dim bell when alarm off', () => {
        const wrapper = createWrapper()
        const bell = wrapper.find('[data-testid="bell"]')
        expect(bell.classes()).toContain('bell-off')
        expect(bell.classes()).not.toContain('bell-set')
    })

    it('has a highlighted bell when alarm set', () => {
        store.commit('setOnOff', true)
        const wrapper = createWrapper()
        const bell = wrapper.find('[data-testid="bell"]')
        expect(bell.classes()).not.toContain('bell-off')
        expect(bell.classes()).toContain('bell-set')
    })

    it('shows and hides settings as expected', async () => {
        const wrapper = createWrapper()
        let settings = wrapper.findComponent(Settings)
        expect(settings.exists()).toBe(false)

        await wrapper.setData({ displaySettings: true })
        settings = wrapper.findComponent(Settings)
        expect(settings.exists()).toBe(true)
    })

    it('show alert when alarm going off', async () => {
        const wrapper = createWrapper()
        expect(wrapper.find('.alert').exists()).toBe(false)

        await wrapper.setData({ isGoingOff: true })
        expect(wrapper.find('.alert').exists()).toBe(true)
        expect(wrapper.find('[data-testid="snooze"]').exists()).toBe(true)
        expect(wrapper.find('[data-testid="shutUp"]').exists()).toBe(true)
    })

    it('shows snooze panel when snoozing', async () => {
        const wrapper = createWrapper()
        expect(wrapper.find('.snooze').exists()).toBe(false)

        await wrapper.setData({ isSnoozed: true })
        expect(wrapper.find('.snooze').exists()).toBe(true)
        expect(wrapper.find('[data-testid="cancelSnooze"]').exists()).toBe(true)
    })

    it('cannot re-snooze if limit reached', async () => {
        store.commit('setSnoozes', 1)
        const wrapper = createWrapper()
        await wrapper.setData({ isGoingOff: true, snoozeCount: 1 })
        expect(wrapper.find('[data-testid="snooze"]').exists()).toBe(false)
    })
})

const createWrapper = function () {
    return mount(Alarm, {
        global: {
            plugins: [store],
        },
    })
}
