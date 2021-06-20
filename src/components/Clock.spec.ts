import { mount } from '@vue/test-utils';
import Clock from './Clock.vue';

describe('Clock', () => {
  it('should display the time', () => {
      const wrapper = mount(Clock)
      
      let currentTime = wrapper.find('.clock').html();
      console.log(currentTime);
      // expect().toEqual(msg)
    })    
})