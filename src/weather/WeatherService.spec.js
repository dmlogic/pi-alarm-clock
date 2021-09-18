import DummyTransport from "./transports/DummyTransport.js";
import WeatherService from "./WeatherService.js"
import {mockDailyForecast, mockHourlyForecast} from "../../tests/metoffice_mocks.js"
import fs from "fs"
import { time } from "console";
import {datatype} from 'faker/locale/en_GB'
const moment = require("moment")

describe('WeatherService', () => {

    it ('throws expected error for temperature check', () => {
        const service = makeWeatherService({}, "AUTH_ERROR");

        expect(() => {
            service.minMaxTemperatures()
        }).toThrow("AUTH_ERROR");

    });

    it ('throws expected error for forecast check', () => {
        const service = makeWeatherService({}, "NETWORK_ERROR");

        expect(() => {
            service.forecast( new Date )
        }).toThrow("NETWORK_ERROR");
    });


    it ('cannot get temperature without data', () => {
        const service = makeWeatherService({});
        expect(service.minMaxTemperatures()).toBe(null)
    });

    it ('gets a min and max temperature for the day', () => {
        const mockData = mockDailyForecast();
        const service = makeWeatherService(mockData.data);
        expect(service.minMaxTemperatures()).toEqual({
            low: mockData.mocks.low,
            high: mockData.mocks.high
        })

    })

    it ('gets a block of eight objects for a forecast', () => {
        const mockData = mockHourlyForecast(4);
        const service = makeWeatherService(mockData.data)
        const outcome = service.forecast(
            moment().set('hour', 13).toDate()
        );
        expect(outcome.length).toEqual(8);
        expect(typeof outcome[0]).toBe('object')
    });


    it ('formats a time block as expected', () => {
        const mockData = mockHourlyForecast(4);
        const service = makeWeatherService(mockData.data)
        const outcome = service.forecast(
            moment().set('hour', 13).toDate()
        );
        const blockTwo = outcome[1];

        // We assert on the second block, just because
        expect(blockTwo.time).toBe(15)
        expect(blockTwo.type).toBe(mockData.mocks.today[1].type)
        expect(blockTwo.temperature).toBe(mockData.mocks.today[1].temperature)
        expect(blockTwo.rain).toBe(mockData.mocks.today[1].rain)
        expect(blockTwo.uv).toBe(mockData.mocks.today[1].uv)
    });

    it ('uses the whole day if time now is in the first block', () => {
        const mockData = mockHourlyForecast();
        const service = makeWeatherService(mockData.data);
        const outcome = service.forecast(
            moment().set('hour', 1).toDate()
        );
        // Let's check all metrics. The chance of the faker giving a
        // false positive on all that is vanishingly small
        expect(outcome[0].time).toBe(0)
        expect(outcome[0].type).toBe(mockData.mocks.today[0].type)
        expect(outcome[0].temperature).toBe(mockData.mocks.today[0].temperature)
        expect(outcome[0].rain).toBe(mockData.mocks.today[0].rain)
        expect(outcome[0].uv).toBe(mockData.mocks.today[0].uv)

        expect(outcome[7].time).toBe(21)
        expect(outcome[7].type).toBe(mockData.mocks.today[7].type)
        expect(outcome[7].temperature).toBe(mockData.mocks.today[7].temperature)
        expect(outcome[7].rain).toBe(mockData.mocks.today[7].rain)
        expect(outcome[7].uv).toBe(mockData.mocks.today[7].uv)

    });

    it ('spreads into tomorrow if the time now is later in the day', () => {
        const mockData = mockHourlyForecast(4);
        const service = makeWeatherService(mockData.data)
        const outcome = service.forecast(
            moment().set('hour', 13).toDate()
        );
        expect(outcome[0].time).toBe(12)
        expect(outcome[0].type).toBe(mockData.mocks.today[0].type)
        expect(outcome[0].temperature).toBe(mockData.mocks.today[0].temperature)
        expect(outcome[0].rain).toBe(mockData.mocks.today[0].rain)
        expect(outcome[0].uv).toBe(mockData.mocks.today[0].uv)
        expect(outcome[3].time).toBe(21)

        expect(outcome[4].time).toBe(0)
        expect(outcome[7].time).toBe(9)
        expect(outcome[7].type).toBe(mockData.mocks.tomorrow[3].type)
        expect(outcome[7].temperature).toBe(mockData.mocks.tomorrow[3].temperature)
        expect(outcome[7].rain).toBe(mockData.mocks.tomorrow[3].rain)
        expect(outcome[7].uv).toBe(mockData.mocks.tomorrow[3].uv)
    });

    it ('fills in any gaps if data missing', () => {
        const mockData = mockHourlyForecast(4);
        // let's kill blocks 2 and 3
        mockData.data.SiteRep.DV.Location.Period[0].Rep[2] = null;
        mockData.data.SiteRep.DV.Location.Period[0].Rep[3] = null;
        const service = makeWeatherService(mockData.data)
        const outcome = service.forecast(
            moment().set('hour', 13).toDate()
        );

        expect(outcome[0].time).toBe(12)
        expect(outcome[0].type).toBe(mockData.mocks.today[0].type)

        expect(outcome[2].time).toBe(18)
        expect(outcome[2].type).toBeNull()
        expect(outcome[2].temperature).toBeNull()
        expect(outcome[2].rain).toBeNull()
        expect(outcome[2].uv).toBeNull()

        expect(outcome[3].time).toBe(21)
        expect(outcome[3].type).toBeNull()

        expect(outcome[4].time).toBe(0)
        expect(outcome[4].type).toBe(mockData.mocks.tomorrow[0].type)
    });

    it('responds gracefully if data is present but an unexpected format', () => {

        const mockData = mockHourlyForecast();
        // let's kill block 2
        mockData.data.SiteRep.DV.Location.Period {
            what: "a mess"
        };
        const service = makeWeatherService(mockData.data)
        const outcome = service.forecast(
            moment().set('hour', 0).toDate()
        );

        console.log(outcome);
    });

    it('includes expected events in the forecast', () => {
    });



});

let makeWeatherService = function(withData, withException) {
    if(typeof withData !== 'object') {
        withData = MetOffice.mockWeeklyForecast();
    }

    const transport = new DummyTransport( datatype.number(), withData );

    if(typeof withException === 'string') {
        transport.expectError(withException)
    }
    return new WeatherService(transport);
}