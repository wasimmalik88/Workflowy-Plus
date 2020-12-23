function do_parseImg() {
    $(this).nextAll(".content-img").remove();
    var lines = $(this).text().split("\n");
    var img_re = /^\!\[.*\]\((.+)\)$/;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        var img = line.match(img_re);
        if (img === null) {
            continue;
        }
        console.log(i, img[1]);
        $(this).after('<div class="content-img"><img src="' + img[1] + '"/></div>')
    }
}
$(window).bind("load hashchange", parseImg);

function parseImg() {
    $("div.notes div.content").live("click keyup", do_parseImg);
    $("div.notes div.content").each(do_parseImg);
    $("#expandButton").live("click", function () {
        $("div.notes div.content").each(do_parseImg);
    });
};



$(window).load(function () {

    ColorCheckDay();
    var intervalID = setInterval(function () {
        ColorCheckDay()
    }, 400);
    var intervalID = setInterval(function () {
        CheckReminder()
    }, 60000);


    var intervalID = setInterval(function () {
        AddPendingBullet()
    }, 500);


});

function AddPendingBullet() {


    chrome.storage.sync.get('strNewBullet', function (result) {

        if (typeof result.strNewBullet === "undefined") {
            // No profile in storage
        }
        else {
            if (result.strNewBullet !== "nobullet") {
                var s = document.createElement('script');
                // TODO: add "script.js" to web_accessible_resources in manifest.json
                if(result.strNewBullet=="Add Please")
                s.src = chrome.runtime.getURL('newbullet.js');
                else if(result.strNewBullet=="Age")
                s.src = chrome.runtime.getURL('age.js');
                else if(result.strNewBullet=="Add")
                s.src = chrome.runtime.getURL('add.js');
                s.onload = function () {
                    this.remove();
                };
                (document.head || document.documentElement).appendChild(s);


                chrome.storage.sync.set({
                    'strNewBullet': "nobullet"
                });
            }
        }
    });

}
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

    chrome.storage.sync.get('IsDayHighlightActive', function (result) {
        {

            if (typeof result.IsDayHighlightActive === "undefined") {
                // No profile in storage
            } else {
                // alert(result);
                if (result.IsDayHighlightActive.toString() == "1") {
                    jQuery('.day-style-today').removeClass('day-style-today');
                    jQuery('div:contains("' + test + '")').closest('.content').addClass('day-style-today');
                } else {
                    jQuery('.day-style-today').removeClass('day-style-today');
                }
            }
        }
    });

    chrome.storage.sync.get('strFontTypeValue', function (result) {
        if (typeof result.strFontTypeValue === "undefined") {
            // No profile in storage
        } else {
            var strFontValue = result.strFontTypeValue;

            if (strFontValue == '0') {
                $('.content').css("font-family", 'Helvetica Neue,Arial,Sans-serif', 'important');

            }
            if (strFontValue == '1') {
                $('.content').css("font-family", 'Lucida Sans Typewriter,Lucida Console,monaco,Bitstream Vera Sans Mono,monospace', 'important');
            } else if (strFontValue == '2') {
                $('.content').css("font-family", 'Helvetica Neue,Helvetica,Arial,sans-serif', 'important');
            } else if (strFontValue == '3') {
                $('.content').css("font-family", 'Avant Garde,Avantgarde,Century Gothic,CenturyGothic,AppleGothic,sans-serif', 'important');
            } else if (strFontValue == '4') {
                $('.content').css("font-family", 'Gill Sans,Gill Sans MT,Calibri,sans-serif', 'important');
            } else if (strFontValue == '5') {
                $('.content').css("font-family", '"Trebuchet MS", Helvetica, sans-serif', 'important');
            } else if (strFontValue == '6') {
                $('.content').css("font-family", 'Georgia, serif', 'important');
            } else if (strFontValue == '7') {
                $('.content').css("font-family", '"Palatino Linotype", "Book Antiqua", Palatino, serif', 'important');
            }
            else if (strFontValue == '8') {
                $('.content').css("font-family", '"Times New Roman", Times, serif', 'important');
            }
            else if (strFontValue == '9') {
                $('.content').css("font-family", 'Arial, Helvetica, sans-serif', 'important');
            }
            else if (strFontValue == '10') {
                $('.content').css("font-family", '"Comic Sans MS", cursive, sans-serif', 'important');
            }
            else if (strFontValue == '11') {
                $('.content').css("font-family", 'Verdana, Geneva, sans-serif', 'important');
            }
            else if (strFontValue == '12') {
                $('.content').css("font-family", '"Lucida Sans Unicode", "Lucida Grande", sans-serif', 'important');
            }
            else if (strFontValue == '13') {
                $('.content').css("font-family", 'Tahoma, Geneva, sans-serif', 'important');
            }
            else if (strFontValue == '14') {
                $('.content').css("font-family", '"Courier New", Courier, monospace', 'important');
            }
            else if (strFontValue == '15') {
                $('.content').css("font-family", '"Lucida Console", Monaco, monospace', 'important');
            }

        }
    });

    chrome.storage.sync.get('strBackColor', function (result) {

        if (typeof result.strBackColor === "undefined") {
            // No profile in storage
        } else {

            $('.pageContainer').css("background-color", result.strBackColor.toString(), 'important');
            $('.breadcrumbs').css("background-color", result.strBackColor.toString(), 'important');
            $('.scroller').css("background-color", result.strBackColor.toString(), 'important');
            $('.header').css("background-color", result.strBackColor.toString(), 'important');
            $('body').css("background-color", result.strBackColor.toString(), 'important');
        }
    });

    chrome.storage.sync.get('strTextColor', function (result) {

        if (typeof result.strTextColor === "undefined") {
            // No profile in storage
        } else {
            $('.project').css("color", result.strTextColor.toString(), 'important');
            $('a.fs-block._1s3in7q').css("color", result.strTextColor.toString() + ' !important', 'important');
            $('._1lfwm1e').css("color", result.strTextColor.toString() + ' !important', 'important');
            $('._nxo4pw').css("color", result.strTextColor.toString(), 'important');
        }
    });

    chrome.storage.sync.get('strbulletColor', function (result) {

        if (typeof result.strbulletColor === "undefined") {
            // No profile in storage
        } else {
            $('.bullet').css("color", result.strbulletColor.toString(), 'important');
        }
    });

    chrome.storage.sync.get('strPageBackColor1', function (result) {

        if (typeof result.strPageBackColor1 === "undefined") {
            // No profile in storage
        } else {
            $('.page').css("background-color", result.strPageBackColor1.toString(), 'important');
        }
    });
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
            if (date.toString() == today.toString() && curTime.toString() == time.toString()) {
                alert(Message);

            }
        }
        //Daily Reminders
        else if (type == 2) {
            var time = arrDateTime[0];
            if (curTime.toString() == time.toString()) {
                alert(Message);

            }
        }
        //Yearly Reminders
        else if (type == 3) {
            today = dd + '-' + mm
            if (date.toString() == today.toString() && curTime.toString() == time.toString()) {
                alert(Message);

            }
        } else {
            if (date.toString() == today.toString() && curTime.toString() == time.toString()) {
                alert(Message);

            }
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


}