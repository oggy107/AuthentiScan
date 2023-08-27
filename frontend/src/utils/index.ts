/**
 * Converts epoch seconds to date string
 * @param epochSeconds number of epoch seconds
 * @returns string of date in format dd-mm-yyyy
 */
export const epochToDate = (epochSeconds: number) => {
    const milliseconds = epochSeconds * 1000;
    const date = new Date(milliseconds);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
};
