import { mount } from '@vue/test-utils';
import Calendar from './Calendar.vue';
import ordinal from "ordinal"

describe('Calendar', () => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    it('displays the date in expected format', async () => {
        const wrapper = mount(Calendar)

        let now = new Date;
        await wrapper.find('.calendar')
        let day = await wrapper.find('.calendar-day').text();
        let date = await wrapper.find('.calendar-date').text();
        let month = await wrapper.find('.calendar-month').text();
        let year = await wrapper.find('.calendar-year').text();

        expect(day).toBe(days[now.getDay()])
        expect(date).toBe(ordinal(now.getDate()))
        expect(month).toBe(months[now.getMonth()])
        expect(year).toBe(now.getFullYear().toString())
    })

})
