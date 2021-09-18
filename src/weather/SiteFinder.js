export default class SiteFinder {

    constructor(dataPayload){
        this.sites = dataPayload;

    }

    getNearestSite(lat, lng) {
        var nearest = 0;
        var distance = false;

        for(var i = 0; i < this.sites.length; i++) {
            var new_distance = this.measureDistance(
                parseFloat(this.sites[i].longitude),
                parseFloat(this.sites[i].latitude),
                parseFloat(lng),
                parseFloat(lat)
                );

            if (distance == false || new_distance < distance){
                distance = new_distance;
                nearest = i;
            }
        }
        return this.sites[nearest];

    }

    measureDistance(lon1, lat1, lon2, lat2) {

        var distance = Math.abs(lon1-lon2) + Math.abs(lat1-lat2);
        return distance;
    }

}