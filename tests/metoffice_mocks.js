import { datatype } from 'faker/locale/en_GB'
import { blockTimeFromHour } from '../src/functions.js'

/**
 * These functions mock responses from Met Office Datapoint
 * Those responses contain a lot of data that this project
 * doesn't consume, so we simply don't include it here.
 */

export function mockDailyForecast() {
    let response = {
        mocks: {
            high: datatype.number(11, 30),
            low: datatype.number(0, 10),
        },
    }

    response.data = {
        SiteRep: {
            Wx: {},
            DV: {
                Location: {
                    Period: [
                        {
                            type: 'Day',
                            Rep: [
                                {
                                    Dm: response.mocks.high,
                                },
                                {
                                    Nm: response.mocks.low,
                                },
                            ],
                        },
                    ],
                },
            },
        },
    }
    return response
}

export function mockHourlyForecast(dataHour) {
    let blockHour = blockTimeFromHour(dataHour)
    let blocksToday = 8 - blockHour / 3

    let response = {
        mocks: {
            today: [],
            tomorrow: [],
        },
        data: {
            SiteRep: {
                Wx: {},
                DV: {
                    type: 'Forecast',
                    Location: {
                        Period: [
                            {
                                Rep: [],
                            },
                            {
                                Rep: [],
                            },
                        ],
                    },
                },
            },
        },
    }

    for (let index = 0; index < blocksToday; index++) {
        response.mocks.today.push(mockForecastBlock())
        response.data.SiteRep.DV.Location.Period[0].Rep.push({
            W: response.mocks.today[index].type,
            T: response.mocks.today[index].temperature,
            Pp: response.mocks.today[index].rain,
            U: response.mocks.today[index].uv,
        })
    }

    for (let index = 0; index < 8; index++) {
        response.mocks.tomorrow.push(mockForecastBlock())
        response.data.SiteRep.DV.Location.Period[1].Rep.push({
            W: response.mocks.tomorrow[index].type,
            T: response.mocks.tomorrow[index].temperature,
            Pp: response.mocks.tomorrow[index].rain,
            U: response.mocks.tomorrow[index].uv,
        })
    }

    return response
}

function mockForecastBlock() {
    return {
        type: datatype.number({ min: 0, max: 30 }),
        temperature: datatype.number({ min: 10, max: 20 }),
        rain: datatype.number({ min: 0, max: 100 }),
        uv: datatype.number({ min: 0, max: 10 }),
    }
}
