function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
}

function getFormattedDateABNT(date) {

    var day = date.substring(0, 2);
    var month = date.substring(3, 5);
    var year = date.substring(6, 10);
    
    return month + "-" + day + "-" + year
}