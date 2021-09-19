import {blockTimeFromHour} from './functions.js'

describe('Functions', () => {

    it.only ('counts as expected', () => {

        expect(blockTimeFromHour(0)).toBe(0);
        expect(blockTimeFromHour(1)).toBe(0);
        expect(blockTimeFromHour(2)).toBe(0);

        expect(blockTimeFromHour(3)).toBe(3);
        expect(blockTimeFromHour(4)).toBe(3);
        expect(blockTimeFromHour(5)).toBe(3);

        expect(blockTimeFromHour(6)).toBe(6);
        expect(blockTimeFromHour(7)).toBe(6);
        expect(blockTimeFromHour(8)).toBe(6);

        expect(blockTimeFromHour(9)).toBe(9);
        expect(blockTimeFromHour(10)).toBe(9);
        expect(blockTimeFromHour(11)).toBe(9);

        expect(blockTimeFromHour(12)).toBe(12);
        expect(blockTimeFromHour(13)).toBe(12);
        expect(blockTimeFromHour(14)).toBe(12);

        expect(blockTimeFromHour(15)).toBe(15);
        expect(blockTimeFromHour(16)).toBe(15);
        expect(blockTimeFromHour(17)).toBe(15);
        expect(blockTimeFromHour(14)).toBe(12);

        expect(blockTimeFromHour(18)).toBe(18);
        expect(blockTimeFromHour(19)).toBe(18);
        expect(blockTimeFromHour(20)).toBe(18);

        expect(blockTimeFromHour(21)).toBe(21);
        expect(blockTimeFromHour(22)).toBe(21);
        expect(blockTimeFromHour(23)).toBe(21);

    });
});