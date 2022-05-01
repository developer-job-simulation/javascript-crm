export const formatRevenue = (revenue) => {
    const groupNumRegex = /(?!^)(\d{3})(?=(?:\d{3})*$)/g;
    /* regex groups numbers together from back to front;
    initial setup is for groups of three numbers;
    if a different group is needed, please only change the digits in regex to reflect any new groupings; */

    const numberSplitter = " "; // this is inserted between number groups

    const formattedRevenue = revenue.toString().replace(groupNumRegex, `${numberSplitter}$1`);

    return formattedRevenue;
}