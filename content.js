function do_parseImg() {
  $(this).nextAll('.content-img').remove();
  var lines = $(this).text().split('\n');
  var img_re = /^\!\[.*\]\((.+)\)$/;

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    var img = line.match(img_re);
    if (img === null) {
      continue;
    }
    console.log(i, img[1]);
    $(this).after('<div class="content-img"><img src="' + img[1] + '"/></div>');
  }
}
$(window).bind('load hashchange', parseImg);

function parseImg() {
  $('div.notes div.content').live('click keyup', do_parseImg);
  $('div.notes div.content').each(do_parseImg);
  $('#expandButton').live('click', function () {
    $('div.notes div.content').each(do_parseImg);
  });
}

//TODO: Look for timer to improve effecieny of code
$(window).load(function () {
  ColorCheckDay();
  var intervalID = setInterval(function () {
    ColorCheckDay();
  }, 400);
  var intervalID = setInterval(function () {
    CheckReminder();
  }, 60000);

  var intervalID = setInterval(function () {
    AddPendingBullet();
  }, 500);
});

function AddPendingBullet() {
  chrome.storage.sync.get('strNewBullet', function (result) {
    if (typeof result.strNewBullet === 'undefined') {
      // No profile in storage
    } else {
      if (result.strNewBullet !== 'nobullet') {
        var s = document.createElement('script');
        // TODO: add "script.js" to web_accessible_resources in manifest.json
        if (result.strNewBullet == 'Add Please')
          s.src = chrome.runtime.getURL('newbullet.js');
        else if (result.strNewBullet == 'Age')
          s.src = chrome.runtime.getURL('age.js');
        else if (result.strNewBullet == 'Add')
          s.src = chrome.runtime.getURL('add.js');
        s.onload = function () {
          this.remove();
        };
        (document.head || document.documentElement).appendChild(s);

        chrome.storage.sync.set({
          strNewBullet: 'nobullet',
        });
      }
    }
  });
}
function ColorCheckDay() {
  var day = new Date().getDay();
  if (day == 0) test = 'Sunday';
  else if (day == 1) test = 'Monday';
  else if (day == 2) test = 'Tuesday';
  else if (day == 3) test = 'Wednesday';
  else if (day == 4) test = 'Thursday';
  else if (day == 5) test = 'Friday';
  else if (day == 6) test = 'Saturday';

  chrome.storage.sync.get('IsDayHighlightActive', function (result) {
    {
      if (typeof result.IsDayHighlightActive === 'undefined') {
        // No profile in storage
      } else {
        // alert(result);
        if (result.IsDayHighlightActive.toString() == '1') {
          jQuery('.day-style-today').removeClass('day-style-today');
          jQuery('div:contains("' + test + '")')
            .closest('.content')
            .addClass('day-style-today');
        } else {
          jQuery('.day-style-today').removeClass('day-style-today');
        }
      }
    }
  });

  chrome.storage.sync.get('strFontTypeValue', function (result) {
  const strFontValue = result.strFontTypeValue;

  if (typeof strFontValue === 'undefined') return;

  const fonts = {
    0: '',

 16: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
17: '"Segoe UI", Tahoma, Geneva, sans-serif',
18: '-apple-system, BlinkMacSystemFont, sans-serif',
19: 'Roboto, Ubuntu, Arial, sans-serif',
20: 'Calibri, Candara, Segoe, Arial, sans-serif',
21: 'Candara, Calibri, Segoe, sans-serif',
22: 'Optima, Segoe, Arial, sans-serif',
23: '"Franklin Gothic Medium", Arial, sans-serif',
24: '"Arial Narrow", Arial, sans-serif',
25: '"Century Gothic", Futura, Arial, sans-serif',
26: 'Futura, Trebuchet MS, Arial, sans-serif',
27: '"Helvetica Neue", Helvetica, Arial, sans-serif',

28: 'Cambria, Georgia, serif',
29: 'Garamond, Hoefler Text, Times New Roman, serif',
30: 'Baskerville, Palatino, serif',
31: '"Book Antiqua", Palatino, serif',
32: 'Didot, Times New Roman, serif',
33: '"Hoefler Text", Garamond, serif',

34: 'Menlo, Monaco, Consolas, monospace',
35: 'Monaco, Consolas, monospace',
36: '"SFMono-Regular", Menlo, Monaco, monospace',
37: '"Ubuntu Mono", Consolas, monospace',
38: '"DejaVu Sans Mono", Consolas, monospace',

39: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
40: 'Chalkboard, Comic Sans MS, cursive',
41: 'Papyrus, fantasy',
42: 'Copperplate, Papyrus, fantasy',

43: 'Ubuntu, Cantarell, Arial, sans-serif',
44: 'Cantarell, Ubuntu, sans-serif',
45: '"Noto Sans", Arial, sans-serif',
46: '"Noto Serif", Times New Roman, serif',

99: 'sans-serif'
  };

  if (!(strFontValue in fonts)) return;

  if (strFontValue === '0') {
    $('.content').css('font-family', '');
    return;
  }

  $('.content').attr(
    'style',
    `font-family: ${fonts[strFontValue]} !important`
  );
});

  chrome.storage.sync.get('strBackColor', function (result) {
    if (typeof result.strBackColor === 'undefined') {
      // No profile in storage
    } else {
      if (result.strBackColor == '#1313ff') {
  $('.pageContainer, .breadcrumbs, .scroller, .header, body')
  .css('background-color', '');

      } else {
      $('.pageContainer, .breadcrumbs, .scroller, .header, body')
  .css('background-color', result.strBackColor.toString());
      }
    }
  });

  chrome.storage.sync.get('strTextColor', function (result) {
    if (typeof result.strTextColor === 'undefined') {
      // No profile in storage
    } else {
      if (result.strTextColor == '#1313ff') {
        $('.project').css('color', '');
      } else {
        $('.project').css('color', result.strTextColor.toString(), 'important');
      }
    }
  });

  chrome.storage.sync.get('strbulletColor', function (result) {
    if (typeof result.strbulletColor === 'undefined') {
      // No profile in storage
    } else {
      if (result.strbulletColor == '#1313ff') {
        $('.bullet').css('color', '');
      } else {
        $('.bullet').css(
          'color',
          result.strbulletColor.toString(),
          'important'
        );
      }
    }
  });

  chrome.storage.sync.get('strPageBackColor1', function (result) {
    if (typeof result.strPageBackColor1 === 'undefined') {
      // No profile in storage
    } else {
      if (result.strPageBackColor1 == '#1313ff') {
        $('.page').css('background-color', '');
      } else {
        $('.page').css(
          'background-color',
          result.strPageBackColor1.toString(),
          'important'
        );
      }
    }
  });
}

function ProcessReminders(ReminderItem, type) {
  for (var k = 1; k < ReminderItem.length; k++) {
    var ReminderText = ReminderItem[k];
    // console.log("PR Type" + type);
    var arrReminder = ReminderText.split(',');
    var Message = arrReminder[0];
    var arrDateTime = arrReminder[1].split(' ');
    var time = arrDateTime[1];

    var date = arrDateTime[0];
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    var currentdate = new Date();
    var curTime =
      currentdate.getHours() +
      ':' +
      (currentdate.getMinutes() < 10 ? '0' : '') +
      currentdate.getMinutes();

    //Monthy Reminders
    if (type == 1) {
      today = dd;
      if (
        date.toString() == today.toString() &&
        curTime.toString() == time.toString()
      ) {
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
      today = dd + '-' + mm;
      if (
        date.toString() == today.toString() &&
        curTime.toString() == time.toString()
      ) {
        alert(Message);
      }
    } else {
      if (
        date.toString() == today.toString() &&
        curTime.toString() == time.toString()
      ) {
        alert(Message);
      }
    }
  }
}

function CheckReminder() {
  var Reminder = jQuery('div:contains("@r,")').closest('.content').text();
  var ReminderItem = Reminder.split('@r,');
  ProcessReminders(ReminderItem, 0);

  var Reminder = jQuery('div:contains("@rm,")').closest('.content').text();
  var ReminderItem = Reminder.split('@rm,');
  ProcessReminders(ReminderItem, 1);

  var Reminder = jQuery('div:contains("@rd,")').closest('.content').text();
  var ReminderItem = Reminder.split('@rd,');
  ProcessReminders(ReminderItem, 2);

  var Reminder = jQuery('div:contains("@ry,")').closest('.content').text();
  var ReminderItem = Reminder.split('@ry,');
  ProcessReminders(ReminderItem, 3);
}
