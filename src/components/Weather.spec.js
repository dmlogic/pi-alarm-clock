import { mount } from '@vue/test-utils';
import Weather from './Weather.vue';

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

describe('Weather', () => {
  
    it('does not shit its pants', async () => {
        const wrapper = mount(Weather)
        expect(1).toEqual(1)
    })    
    
})