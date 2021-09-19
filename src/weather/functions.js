/**
     * Block hours are one of
     * 0|3|6|9|12|15|18|21
     * @returns integer
     */
export function blockTimeFromHour(hour) {
    return Math.floor(hour/3) * 3;
}