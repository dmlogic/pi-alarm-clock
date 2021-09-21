import DummyTransport from "./transports/DummyTransport.js";
import WeatherService from "./WeatherService.js"
import {mockDailyForecast, mockHourlyForecast} from "../../tests/metoffice_mocks.js"
import fs from "fs"
import { time } from "console";
import {datatype} from 'faker/locale/en_GB'

const startOfDay = 1;
const middleOfDay = 13;

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
            service.forecast( startOfDay )
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
        const mockData = mockHourlyForecast(middleOfDay);
        const service = makeWeatherService(mockData.data)
        const outcome = service.forecast( middleOfDay);
        expect(outcome.forecast.length).toEqual(8);
        expect(typeof outcome.forecast[0]).toBe('object')
    });

    it ('strips the first rep from today if the data time is old', () => {

        const mockData = mockHourlyForecast(11);
        const service = makeWeatherService(mockData.data)
        const outcome = service.forecast( 13 );
        expect(outcome.forecast.length).toEqual(8);
        expect(outcome.forecast[0].time).toEqual(12);
        expect(outcome.forecast[3].time).toEqual(21);
        expect(outcome.forecast[4].time).toEqual(0);
    });


    it ('formats a time block as expected', () => {
        const mockData = mockHourlyForecast(middleOfDay);
        const service = makeWeatherService(mockData.data)
        const outcome = service.forecast( middleOfDay );
        const blockTwo = outcome.forecast[1];

        // We assert on the second block, just because
        expect(blockTwo.time).toBe(15)
        expect(blockTwo.type).toBe(mockData.mocks.today[1].type)
        expect(blockTwo.temperature).toBe(mockData.mocks.today[1].temperature)
        expect(blockTwo.rain).toBe(mockData.mocks.today[1].rain)
        expect(blockTwo.uv).toBe(mockData.mocks.today[1].uv)
    });

    it ('uses the whole day if time now is in the first block', () => {
        const mockData = mockHourlyForecast( startOfDay );
        const service = makeWeatherService( mockData.data );
        const outcome = service.forecast( startOfDay );
        // Let's check all metrics. The chance of the faker giving a
        // false positive on all that is vanishingly small
        expect(outcome.forecast[0].time).toBe(0)
        expect(outcome.forecast[0].type).toBe(mockData.mocks.today[0].type)
        expect(outcome.forecast[0].temperature).toBe(mockData.mocks.today[0].temperature)
        expect(outcome.forecast[0].rain).toBe(mockData.mocks.today[0].rain)
        expect(outcome.forecast[0].uv).toBe(mockData.mocks.today[0].uv)

        expect(outcome.forecast[7].time).toBe(21)
        expect(outcome.forecast[7].type).toBe(mockData.mocks.today[7].type)
        expect(outcome.forecast[7].temperature).toBe(mockData.mocks.today[7].temperature)
        expect(outcome.forecast[7].rain).toBe(mockData.mocks.today[7].rain)
        expect(outcome.forecast[7].uv).toBe(mockData.mocks.today[7].uv)

    });

    it ('spreads into tomorrow if the time now is later in the day', () => {
        const mockData = mockHourlyForecast(middleOfDay);
        const service = makeWeatherService(mockData.data)
        const outcome = service.forecast( middleOfDay );
        expect(outcome.forecast[0].time).toBe(12)
        expect(outcome.forecast[0].type).toBe(mockData.mocks.today[0].type)
        expect(outcome.forecast[0].temperature).toBe(mockData.mocks.today[0].temperature)
        expect(outcome.forecast[0].rain).toBe(mockData.mocks.today[0].rain)
        expect(outcome.forecast[0].uv).toBe(mockData.mocks.today[0].uv)
        expect(outcome.forecast[3].time).toBe(21)

        expect(outcome.forecast[4].time).toBe(0)
        expect(outcome.forecast[7].time).toBe(9)
        expect(outcome.forecast[7].type).toBe(mockData.mocks.tomorrow[3].type)
        expect(outcome.forecast[7].temperature).toBe(mockData.mocks.tomorrow[3].temperature)
        expect(outcome.forecast[7].rain).toBe(mockData.mocks.tomorrow[3].rain)
        expect(outcome.forecast[7].uv).toBe(mockData.mocks.tomorrow[3].uv)
    });

    it ('fills in any gaps if data missing', () => {
        const mockData = mockHourlyForecast(middleOfDay);
        // let's kill blocks 2 and 3
        mockData.data.SiteRep.DV.Location.Period[0].Rep[2] = null;
        mockData.data.SiteRep.DV.Location.Period[0].Rep[3] = null;
        const service = makeWeatherService(mockData.data)
        const outcome = service.forecast( middleOfDay );

        expect(outcome.forecast[0].time).toBe(12)
        expect(outcome.forecast[0].type).toBe(mockData.mocks.today[0].type)

        expect(outcome.forecast[2].time).toBe(18)
        expect(outcome.forecast[2].type).toBeNull()
        expect(outcome.forecast[2].temperature).toBeNull()
        expect(outcome.forecast[2].rain).toBeNull()
        expect(outcome.forecast[2].uv).toBeNull()

        expect(outcome.forecast[3].time).toBe(21)
        expect(outcome.forecast[3].type).toBeNull()

        expect(outcome.forecast[4].time).toBe(0)
        expect(outcome.forecast[4].type).toBe(mockData.mocks.tomorrow[0].type)
    });

    it ('responds gracefully if data is present but an unexpected format', () => {

        const mockData1 = mockHourlyForecast(startOfDay);
        mockData1.data.SiteRep.DV.Location.Period  = {
            what: "a mess"
        };
        const service1 = makeWeatherService(mockData1.data)
        const outcome1 = service1.forecast(startOfDay);
        expect(outcome1).toBeNull();

        const mockData2 = mockHourlyForecast(startOfDay);
        mockData2.data.SiteRep.DV.Location.Period[0].Rep[0]  = {
            what: "a mess"
        };
        const service2 = makeWeatherService(mockData2.data)
        const outcome2 = service2.forecast(startOfDay);
        expect(outcome2.forecast[0].time).toBe(0)
        expect(outcome2.forecast[0].type).toBeNull()
    });

    it ('warns about sunscreen when it should', () => {

        let mockData = mockForWarnings('U',0, startOfDay);

        const service1 = makeWeatherService(mockData.data);
        const outcome1 = service1.forecast(startOfDay);
        expect(outcome1.warnings.applySunscreen).toBe(false);

        // A high UV in the night shouldn't trigger
        mockData.data.SiteRep.DV.Location.Period[0].Rep[0].U = 6
        const service2 = makeWeatherService(mockData.data);
        const outcome2 = service2.forecast(
            startOfDay
        );
        expect(outcome2.warnings.applySunscreen).toBe(false);


        // A high UV in the day should trigger a warning
        mockData.data.SiteRep.DV.Location.Period[0].Rep[4].U = 6
        const service3 = makeWeatherService(mockData.data);
        const outcome3 = service3.forecast(
            startOfDay
        );
        expect(outcome3.warnings.applySunscreen).toBe(true);
    });

    it ('warns about rain when it should', () => {

        let mocl
        let mockData = mockForWarnings('Pp',0, startOfDay);

        const service1 = makeWeatherService(mockData.data);
        const outcome1 = service1.forecast(startOfDay);
        expect(outcome1.warnings.dressForRain).toBe(false);

        mockData.data.SiteRep.DV.Location.Period[0].Rep[4].Pp = 80

        const service2 = makeWeatherService(mockData.data);
        const outcome2 = service2.forecast(startOfDay);
        expect(outcome2.warnings.dressForRain).toBe(true);

    });

    it ('warns about cold when it should', () => {
        let mockData = mockForWarnings('T',22, middleOfDay);

        const service1 = makeWeatherService(mockData.data);
        const outcome1 = service1.forecast( middleOfDay );
        expect(outcome1.warnings.dressForCold).toBe(false);

        mockData.data.SiteRep.DV.Location.Period[1].Rep[3].T = 4

        const service2 = makeWeatherService(mockData.data);
        const outcome2 = service2.forecast(middleOfDay);
        expect(outcome2.warnings.dressForCold).toBe(true);
    });



});

const mockForWarnings = function(metric, value, mockTime) {
    const mockData = mockHourlyForecast(mockTime);

    for (let index = 0; index < mockData.data.SiteRep.DV.Location.Period[0].Rep.length; index++) {
        mockData.data.SiteRep.DV.Location.Period[0].Rep[index][metric] = value

    }
    for (let index = 0; index < mockData.data.SiteRep.DV.Location.Period[1].Rep.length; index++) {
        mockData.data.SiteRep.DV.Location.Period[1].Rep[index][metric] = value

    }

    return mockData;

}

const makeWeatherService = function(withData, withException) {
    if(typeof withData !== 'object') {
        withData = MetOffice.mockWeeklyForecast();
    }

    const transport = new DummyTransport( datatype.number(), withData );

    if(typeof withException === 'string') {
        transport.expectError(withException)
    }
    return new WeatherService(transport);
}
