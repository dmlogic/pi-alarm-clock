import { mount } from '@vue/test-utils'
import Settings from './Settings.vue'
import NumberInput from './NumberInput.vue'
import store from '../../store'


describe('Settings', () => {

    it('turns the alarm on and off', async () => {
        const wrapper = createWrapper()
        let alarmControl = wrapper.find('input:nth-child(1)');
        await alarmControl.setChecked()
        expect(store.state.alarmIsSet).toBe(true)
        await alarmControl.setChecked(false)
        expect(store.state.alarmIsSet).toBe(false)
    })

    it('sets the alarm time', async() => {
        const wrapper = createWrapper()
        const hour = wrapper.find('[data-testid="hour"]')
        const minute = wrapper.find('[data-testid="minute"]')
        const startHour = store.state.alarmHour;
        const startMinute = store.state.alarmMinute;

        await hour.find('[data-testid="increment"]').trigger('click')
        expect(store.state.alarmHour).toBe(startHour + 1)

        await minute.find('[data-testid="increment"]').trigger('click')
        expect(store.state.alarmMinute).toBe(startMinute + 1)

    })

    it('sets the alarm days', async () => {
        store.commit('setAlarmDays', [])
        const wrapper = createWrapper()

        const tuesday = wrapper.find('[data-testid="days"] label:nth-child(2) input')
        const saturday = wrapper.find('[data-testid="days"] label:nth-child(6) input')

        await tuesday.setChecked(true)
        await saturday.setChecked(true)

        expect(store.state.alarmDays).toEqual([2,6])
    })

    it('sets the snooze count', async () => {
        const wrapper = createWrapper()
        const startCount = store.state.snoozesAllowed;

        await wrapper.find('[data-testid="snoozeCount"]').find('[data-testid="increment"]').trigger('click')
        expect(store.state.snoozesAllowed).toBe(startCount + 1)
    })

    it ('sets the snooze minutes', async () => {
        store.commit('setSnoozeMinutes', 4)
        const wrapper = createWrapper()
        const startCount = store.state.snoozeMinutes;

        await wrapper.find('[data-testid="snoozeMinutes"]').find('[data-testid="increment"]').trigger('click')
        expect(store.state.snoozeMinutes).toBe(startCount + 1)
    })

    it('emits a close event', () => {
        const wrapper = createWrapper()
        wrapper.find('[data-testid="close"]').trigger('click')
        expect(wrapper.emitted()).toHaveProperty('close')
    })
})

const createWrapper = function (data) {
    const w = mount(Settings, {
        global: {
            plugins: [store],
        },
    })
    if (typeof data === 'object') {
        w.setData(data)
    }
    return w
}
