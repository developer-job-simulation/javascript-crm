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