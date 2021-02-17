
function getPrettyDatetime(dateIn) {

    let date_ob = new Date();

    if(dateIn) {
        date_ob = new Date(dateIn);
    }

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = ("0" + (date_ob.getHours() + 1)).slice(-2);

    // current minutes
    let minutes = ("0" + (date_ob.getMinutes() + 1)).slice(-2);

    // current seconds
    let seconds = ("0" + (date_ob.getSeconds() + 1)).slice(-2);

    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}

module.exports = {
    getPrettyDatetime
}