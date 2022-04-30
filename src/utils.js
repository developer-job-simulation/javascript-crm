export function formatRevenue(revenue) {
    // Convert to str array and separate by decimal (if any)
    let revenueArr = revenue.toString().split('.');

    // Verify that revenue is valid
    const digits = /^[0-9]+/g;
    revenueArr[0] = revenueArr[0].match(digits);
    if (revenueArr.length > 1) {
        revenueArr[1] = revenueArr[1].match(digits);
    }

    // Insert space every 3 digits starting from the right (not including decimal portion)
    revenueArr[0] = revenueArr[0].toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

    // Return formatted revenue
    if (revenueArr.length > 1) {
        // Join formatted revenue back with decimal portion (if any)
        return `${revenueArr[0]}.${revenueArr[1]}`;
    }
    else {
        return `${revenueArr[0]}`;
    }
}


// Accepts a string date-time in ISO 8601 format
// Returns a string date-time with the time displayed in 24 hour notiation
export function formatDateTime(datetime) {
    // Convert to str array and separate by "T" delimiter
    let dateTimeArr = datetime.toString().split('T');
        
    // Separate hours, minutes, seconds and pop seconds
    dateTimeArr[1] = `${dateTimeArr[1]}`.split(':');
    dateTimeArr[1].pop();;
    
    // Join the date back to the 24 hour time, separated by a space for readability
    return `${dateTimeArr[0]} ${dateTimeArr[1].join(':')}`;
}