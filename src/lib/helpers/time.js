export const getTimestamp = date => {
    const regexp = /\w+([^\w])/;
    const [, splitSymbol] = date.match(regexp);
    const dates = date.split(splitSymbol);
    let utcDate;
    switch(dates.length) {
        case 2: {
            const year = new Date().getFullYear();
            utcDate = new Date([year, ...dates.reverse()]).getTime() / 1000;
        }
        break;
        case 3: utcDate = new Date(dates).getTime() / 1000;
        break;
        default: utcDate = new Date(dates).getTime() / 1000;
    }
    return utcDate;
}

const parseNumberForDate = number => {
    if (String(number).length === 1) {
        return `0${number}`;
    }

    return number;
}

export const getDateFromTimestamp = date => {
    const utc = new Date(date * 1000);

    const day = parseNumberForDate(utc.getDate());
    const month = parseNumberForDate(utc.getMonth() + 1);

    return `${day}.${month}`;
}