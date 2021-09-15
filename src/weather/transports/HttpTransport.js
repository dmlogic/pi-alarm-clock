import SiteFinder from "./SiteFinder"

class HttpTransport {

    constructor(apiKey, latitude, longitude) {
        this.apiKey = apiKey
        this.siteId = this.lookupSiteId(latitude, longitude)
    }


    lookupSiteId(latitude, longitude) {

        const sourceData = this.performApiCall('sitelist');

        let finder = new SiteFinder(sourceData)
        return finder.getNearestSite(latitude,longitude).id;
    }


    getDailyData() {
        return response = this.performApiCall(this.siteId, {res:"daily"});
    }

    getHourlyData() {
        return response = this.performApiCall(this.siteId, {res:"3hourly"});
    }

    makeUrl(path, params) {
        if( typeof params === "undefined") {
            params = {}
        }
        params.key = this.apiKey;

        return 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/'+path+'/'+ new URLSearchParams(params);
    }


    performApiCall(path, params) {
        try {

            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.makeUrl(path, params), false);
            xhr.send();


            if (xhr.readyState == 4 && xhr.status == 200) {
                return JSON.parse(xhr.responseText);
            } else if (xhr.status <= 599 && xhr.status >= 403) {
                throw "AUTH_ERROR";
            } else if (xhr.status <= 599 && xhr.status >= 400) {
                throw "SERVER_ERROR";
            } else {
                throw "NETWORK_ERROR";
            }
        } catch (e) {
            throw "NETWORK_ERROR";

        }

    }

}

module.exports = HttpTransport
