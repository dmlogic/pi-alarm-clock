class DummyTransport {

    expectedError = null;

    constructor(siteId, payload) {
        this.siteId = siteId;
        this.payload = payload;
    }

    expectError(message) {
        this.expectedError = message;
    }


    lookupSiteId() {
        this.checkForError();
        return this.siteId;
    }

    getDailyData() {
        return this.getMockedData()
    }

    getHourlyData() {
        return this.getMockedData()
    }


    getMockedData() {
        this.checkForError();
        if(typeof this.payload !== "object") {
            return {};
        }
        return this.payload;
    }

    checkForError() {
        if(this.expectedError) {
            throw this.expectedError
        }
    }
}

module.exports = DummyTransport
