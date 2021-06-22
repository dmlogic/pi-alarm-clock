import { mount } from '@vue/test-utils';
import Weather from './Weather.vue';
import * as dotenv from 'dotenv';

dotenv.config();

describe('Weather', () => {
  


    it('displays weather for the day', async () => {
        const wrapper = mount(Weather)
    })    
    
})