import SiteFinder from "./SiteFinder"
import fs from "fs"

describe('SiteFinder', () => {

    it('finds the expected site from coordinates', () => {
        
        const data = fs.readFileSync('tests/site_list.json', 'utf8')
        
        let finder = new SiteFinder(data)
        let site = finder.getNearestSite(51.501364,-0.1440787)
        
        expect(site.id).toBe("354160")
        expect(site.name).toBe("Westminster");
    });
    it('has nowhere else to go ', () => {

        let thing = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/?' + new URLSearchParams({foo:"fum"});
        console.log(thing);
    });

});