import SiteFinder from './SiteFinder'
import fs from 'fs'

describe('SiteFinder', () => {
    it('finds the expected site from coordinates', () => {
        const data = fs.readFileSync('tests/site_list.json', 'utf8')

        let finder = new SiteFinder(JSON.parse(data))
        let site = finder.getNearestSite(51.501364, -0.1440787)

        expect(site.id).toBe('354160')
        expect(site.name).toBe('Westminster')
    })
})
