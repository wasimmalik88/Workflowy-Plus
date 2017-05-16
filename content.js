$(window).load(function () {
    ColorCheckDay();
    var intervalID = setInterval(function () {
        ColorCheckDay()
    }, 60000);
    var intervalID = setInterval(function () {
        CheckReminder()
    }, 60000);


});

function ColorCheckDay() {
    var day = new Date().getDay();
    if (day == 0)
        test = "Sunday";
    else if (day == 1)
        test = "Monday";
    else if (day == 2)
        test = "Tuesday";
    else if (day == 3)
        test = "Wednesday";
    else if (day == 4)
        test = "Thursday";
    else if (day == 5)
        test = "Friday";
    else if (day == 6)
        test = "Saturday";

    jQuery('.day-style-today').removeClass('day-style-today');
    jQuery('div:contains("' + test + '")').closest('.content').addClass('day-style-today');



}

function ProcessReminders(ReminderItem, type) {
    for (var k = 1; k < ReminderItem.length; k++) {
        var ReminderText = ReminderItem[k];
        // console.log("PR Type" + type);
        var arrReminder = ReminderText.split(",");
        var Message = arrReminder[0];
        var arrDateTime = arrReminder[1].split(" ");
        var time = arrDateTime[1];

        var date = arrDateTime[0];
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = dd + '-' + mm + '-' + yyyy;
        var currentdate = new Date();
        var curTime = currentdate.getHours() + ":" + (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes();

        //Monthy Reminders
        if (type == 1) {
            today = dd;
            if (date.toString() == today.toString() && curTime.toString() == time.toString())
                alert(Message);
        }
            //Daily Reminders
        else if (type == 2) {
            var time = arrDateTime[0];
            if (curTime.toString() == time.toString())
                alert(Message);
        }
            //Yearly Reminders
        else if (type == 3) {
            today = dd + '-' + mm
            if (date.toString() == today.toString() && curTime.toString() == time.toString())
                alert(Message);
        }
        else {
            if (date.toString() == today.toString() && curTime.toString() == time.toString())
                alert(Message);
        }
    }

}

function CheckReminder() {
    var Reminder = jQuery('div:contains("@r,")').closest('.content').text();
    var ReminderItem = Reminder.split("@r,");
    ProcessReminders(ReminderItem, 0);

    var Reminder = jQuery('div:contains("@rm,")').closest('.content').text();
    var ReminderItem = Reminder.split("@rm,");
    ProcessReminders(ReminderItem, 1);


    var Reminder = jQuery('div:contains("@rd,")').closest('.content').text();
    var ReminderItem = Reminder.split("@rd,");
    ProcessReminders(ReminderItem, 2);

    var Reminder = jQuery('div:contains("@ry,")').closest('.content').text();
    var ReminderItem = Reminder.split("@ry,");
    ProcessReminders(ReminderItem, 3);

    //console.log(ReminderItem);

}