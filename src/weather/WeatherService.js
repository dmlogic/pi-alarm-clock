class WeatherService {

    NIGHT_MINIMUM_TOKEN = "Nm";
    DAY_MINIMUM_TOKEN = "Dm";
    WEATHER_TYPE_TOKEN = "W";
    TEMPERATURE_TOKEN = "T";
    RAIN_PROBABILITY_TOKEN = "Pp";
    MAX_UV_TOKEN = "U";

    constructor(transport) {

        this.transport = transport;
        this.siteId = this.transport.lookupSiteId();

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
     * These are "now" and the next 7 blocks
     * Each block providers:
     * - Weather type
     * - Temperature
     * - Rain probability
     * - Max UV
     *
     * @var Date timeNow
     */
    forecast(timeNow) {
        const sourceData = this.transport.getHourlyData();
        let returnedForecast = [];

        // First we need to know what "now" means
        // should be 0|3|6|9|12|15|18|21
        // An hour can be turned into one of these via
        // Math.floor(hour/3)

        // We'll always want the first index for "now"
        // Then we iterate through the remainder of the day
        // If we reach the end of the day, and don't have 8,
        // start again at tomorrow until we do
    }

    timeBlockFromHour(hour) {

    }

}

module.exports = WeatherService
