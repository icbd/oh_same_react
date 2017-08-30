function fullZero(num) {
    return (num > 9 ? '' : '0') + num;
}

export function showDate(dateObj, withTime = false) {
    const date = (dateObj instanceof Date) ? dateObj : (new Date(dateObj));

    const Y = date.getFullYear();
    const m = fullZero(date.getMonth() + 1);
    const d = fullZero(date.getDate());
    const Ymd = "" + Y + '-' + m + '-' + d;

    const H = fullZero(date.getHours());
    const i = fullZero(date.getMinutes());
    const s = fullZero(date.getSeconds());
    const His = "" + H + ':' + i + ':' + s;


    return withTime ? (Ymd + '  ' + His) : Ymd;
}


export function showDateDiff(timeStringFromDB) {
    // 一周以上显示具体日期
    // 一天以上显示'几天前'
    // 一小时以上显示'几小时前'
    // 五分钟以上显示'几分钟前'
    // 刚刚

    const date = new Date(timeStringFromDB);
    const now = new Date();

    //ms
    const aWeek = 3600 * 24 * 7 * 1000;
    const aDay = 3600 * 24 * 1000;
    const aHour = 3600 * 1000;
    const aMin = 60 * 1000;

    const delta = now - date;
    if (delta > aWeek) {
        return showDate(date);
    } else if (delta > aDay) {
        const days = Math.ceil(delta / aDay);
        return "" + days + "天前";
    } else if (delta > aHour) {
        const hours = Math.ceil(delta / aHour);
        return "" + hours + "小时前";
    } else if (delta > aMin * 5) {
        const minutes = Math.ceil(delta / aMin);
        return "" + minutes + "分钟前";
    } else {
        return "刚刚";
    }
}