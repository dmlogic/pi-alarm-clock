import DummyTransport from "./transports/DummyTransport.js";
import WeatherService from "./WeatherService.js"
import fs from "fs"

describe('WeatherService', () => {

    it ('gets a site id from supplied transport', () => {

        const transport = new DummyTransport(1234);
        const service = new WeatherService(transport);

        expect(service.siteId).toEqual(transport.siteId);
    });

    it('cannot get temperature without data', () => {
        const service = new WeatherService(
            new DummyTransport(0)
        );
        expect(service.minMaxTemperatures()).toBe(null)
    });

    it('gets a min and max temperature for the day', () => {
        const transport = new DummyTransport(
            1234,
            fs.readFileSync('tests/daily_forecast.json', 'utf8')
        );
        const service = new WeatherService(transport);
        expect(service.minMaxTemperatures()).toEqual({ low: 13, high: 20 })

    })

    it('gets a block of eight objects for a forecast', () => {
    });

    it('uses the whole day if time now is in the first block', () => {
    });

    it('spreads into tomorrow if the time now is later in the day', () => {
    });


});