/**
 * Formats an ISO 8601 date into a 24-hour time format date
 * @param {Date} isoDate date in ISO 8601 format
 * @returns date in 24-hour time format
 */
export const formatDate = (isoDate) => {
    const options = {dateStyle: "short", timeStyle: "short", hour12: false};
    return new Date(isoDate).toLocaleString(undefined, options);
}