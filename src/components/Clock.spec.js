import { mount } from '@vue/test-utils';
import Clock from './Clock.vue';

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

describe('Clock', () => {

    it('should display the time', async () => {
        const wrapper = mount(Clock)

        let els = await wrapper.findAll('.clock .clock-part');
        let now = new Date;
        expect(els.length).toEqual(3)
        expect(els[0].text()).toEqual( now.getHours().toString().padStart(2, '0'))
        expect(els[1].text()).toEqual( now.getMinutes().toString().padStart(2, '0'))
    })

    it('increments time each second', async () => {
      const wrapper = mount(Clock)
      await wrapper.find('.clock');

      let startSecond = await wrapper.find('.clock-second').text()
      let startInt = parseInt(startSecond);

      await sleep(2000);
      let finishSecond = await wrapper.find('.clock-second').text()
      let finishInt = parseInt(finishSecond);


      if(startInt > 57) {
        expect(finishInt).toBeLessThan(2)
      } else {
        expect(finishInt).toBeGreaterThan(startInt)

      }

    })
})
