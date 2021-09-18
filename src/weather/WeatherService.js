class WeatherService {

    NIGHT_MINIMUM_TOKEN = "Nm";
    DAY_MINIMUM_TOKEN = "Dm";
    WEATHER_TYPE_TOKEN = "W";
    TEMPERATURE_TOKEN = "T";
    RAIN_PROBABILITY_TOKEN = "Pp";
    MAX_UV_TOKEN = "U";

    returnedForecast = [];

    constructor(transport) {
        this.transport = transport;
    }


    /**
     * Find the min and max temperatures for today
     * @returns object
     */
    minMaxTemperatures() {
        const sourceData = this.transport.getDailyData();
        let dataSlice = null;
        try {
            dataSlice = sourceData.SiteRep.DV.Location.Period[0];
        } catch (e) {
        }
        return  dataSlice ? {
            "low" : parseInt(dataSlice.Rep[1][this.NIGHT_MINIMUM_TOKEN]),
            "high" : parseInt(dataSlice.Rep[0][this.DAY_MINIMUM_TOKEN]),
        } : null
    }


    /**
     * We want an array of 8 blocks of weather summary
     * These are the remaining blocks for today plus
     * however many we need from tomorrow
     * Each block providers:
     * - Time
     * - Weather type
     * - Temperature
     * - Rain probability
     * - Max UV
     *
     * This completely relies on the client timezone
     * matching that for the Metoffice
     *
     * @var Date timeNow
     */
    forecast(timeNow) {
        const response = this.transport.getHourlyData();
        const sourceData = response.SiteRep.DV.Location;

        this.returnedForecast = [];
        let blockHour = this.blockTimeFromHour(
            timeNow.getHours()
        );

        // Pick up the remaining blocks for today
        let todayData = sourceData.Period[0].Rep;
        this.processForcastDay(todayData, blockHour, todayData.length);

        if(this.returnedForecast.length >= 8) {
            return this.returnedForecast;
        }

        let remainingBlocks = 8 - this.returnedForecast.length;
        let tomorrowData = sourceData.Period[1].Rep;
        this.processForcastDay(tomorrowData, 0, remainingBlocks);


        return this.returnedForecast;
    }

    processForcastDay(sourceData, blockHour, requiredBlocks) {

        for (let index = 0; index < requiredBlocks; index++) {
            this.returnedForecast.push(
                this.parseTimeBlock( sourceData[index], blockHour )
            );
            blockHour += 3;
        }
    }

    parseTimeBlock(block, hour) {

        return {
            'time': hour,
            'type' : this.valueFromToken(block, this.WEATHER_TYPE_TOKEN),
            'temperature' : this.valueFromToken(block, this.TEMPERATURE_TOKEN),
            'rain' : this.valueFromToken(block, this.RAIN_PROBABILITY_TOKEN),
            'uv' : this.valueFromToken(block, this.MAX_UV_TOKEN),
        };
    }

    /**
     * Block hours are one of
     * 0|3|6|9|12|15|18|21
     * @returns integer
     */
    blockTimeFromHour(hour) {
        return Math.floor(hour/3) * 3;
    }

    valueFromToken(block, token) {
        if(!block || typeof block !== 'object') {
            return null;
        }

        if(typeof block[token] === 'undefined') {
            return null;
        }

        return parseInt(block[token]);
    }

}

module.exports = WeatherService
