import DummyTransport from "./transports/DummyTransport.js";
import WeatherService from "./WeatherService.js"
import fs from "fs"
import { time } from "console";

describe('WeatherService', () => {

    it ('responds to a network exception for site lookup', () => {
    });

    it ('responds to a network exception for forecast', () => {
    });

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
        const transport = new DummyTransport(
            1234,
            fs.readFileSync('tests/three_hourly_forecast.json', 'utf8')
        );
        const service = new WeatherService(transport);
        // There are 4 reps left in our sample data,
        // so let's say it's 13:00 now
        const timeNow = new Date('August 19, 1975 13:14:15');
        const outcome = service.forecast(timeNow);
        expect(outcome.length).toEqual(8);
    });

    it('uses the whole day if time now is in the first block', () => {
    });

    it('spreads into tomorrow if the time now is later in the day', () => {
    });


});