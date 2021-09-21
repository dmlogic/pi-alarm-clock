import { mount } from '@vue/test-utils';
import Weather from './Weather.vue';

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

describe('Weather', () => {

    it('needs a change of approach to inject the data', async () => {
        const wrapper = mount(Weather,{
            propsData: {
                config: {
                    key: "mykey",
                    lat: "myLat",
                    lng: "myLng",
                }
            }
        })
        expect(false).toEqual(true)
    })

})