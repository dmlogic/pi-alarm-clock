class WeatherService {
    
    constructor(transport) {

        this.transport = transport;
    
    }
    
    icons() {

    }

    minmax() {
        
        console.log("I am a forecast");
        console.log(this.transport);
    }

    forecast() {
        // val/wxfcs/all/datatype/locationId
    }

}

module.exports = WeatherService
