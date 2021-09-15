class DummyTransport {

    constructor(siteId, payload) {
        this.siteId = siteId;
        this.payload = payload;
    }

    lookupSiteId() {
        return this.siteId;
    }

    getDailyData() {
        return this.getMockedData()
    }

    getHourlyData() {
        return this.getMockedData()
    }


    getMockedData() {
        if(typeof this.payload !== "string") {
            return {};
        }
        return JSON.parse(this.payload);
    }

}

module.exports = DummyTransport
