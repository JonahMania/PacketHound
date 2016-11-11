/**
* Takes a timestamp and returns a formated string with the date and time
* @param {int} timestamp Unix timestamp to generate a date from
*/
function timestampToDate( timestamp ){
    var date = new Date(timestamp*1000);
    var month;
    switch(date.getMonth()){
        case 0:
            month = "Jan";
            break;
        case 1:
            month = "Feb";
            break;
        case 2:
            month = "Mar";
            break;
        case 3:
            month = "Apr";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "Aug";
            break;
        case 8:
            month = "Sept";
            break;
        case 9:
            month = "Oct";
            break;
        case 10:
            month = "Nov";
            break;
        case 11:
            month = "Dec";
            break;
    }
    var formattedDate = month+" "+date.getDate()+" "+date.getFullYear()
    +" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    return formattedDate;
}

module.exports.timestampToDate = timestampToDate;
