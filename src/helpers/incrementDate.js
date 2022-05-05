Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function incrementDate(currentDate) {
    var nextDay = new Date(currentDate.addDays(1))
    return nextDay;
}

export default incrementDate