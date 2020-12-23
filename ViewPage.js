document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('ddlViewBy').addEventListener('change', saveChanges);
    document.getElementById('backcolor').addEventListener('change', saveBackgroundChanges);
    document.getElementById('textcolor').addEventListener('change', saveTextChanges);

    document.getElementById('backPagecolor').addEventListener('change', savePageBackgroundChanges);
    document.getElementById('bulletColor').addEventListener('change', saveBulletColor);
    document.getElementById('cbDayHighlight').addEventListener('change', saveDayHiglightChange);
    document.getElementById('btnResetBackground').addEventListener('click', restBackground);
    document.getElementById('btnResetPageBackground').addEventListener('click', restPageBackground);
    document.getElementById('btnResetText').addEventListener('click', restText);
    document.getElementById('btnBulletColor').addEventListener('click', restBulletColor);
    document.getElementById('btnAddNewBullet').addEventListener('click', btnAddNewBullet);
    document.getElementById('btnAge').addEventListener('click', btnAge);
    document.getElementById('btnAddDays').addEventListener('click', btnAddDays);

    chrome.storage.sync.get('strFontTypeValue', function (result) {
        var e = document.getElementById("ddlViewBy");
        e.selectedIndex = result.strFontTypeValue;
    });

    chrome.storage.sync.get('strBackColor', function (result) {
        var e = document.getElementById("backcolor");
        if (typeof result.strBackColor === "undefined") { } else {
            e.value = result.strBackColor;
        }
    });
    chrome.storage.sync.get('strTextColor', function (result) {
        var e = document.getElementById("textcolor");
        if (typeof result.strTextColor === "undefined") { } else {
            e.value = result.strTextColor;
        }
    });
    chrome.storage.sync.get('strPageBackColor1', function (result) {
        var e = document.getElementById("backPagecolor");
        if (typeof result.strPageBackColor1 === "undefined") { } else {
            e.value = result.strPageBackColor1;
        }
    });



    chrome.storage.sync.get('strbulletColor', function (result) {
        var e = document.getElementById("bulletColor");
        if (typeof result.strbulletColor === "undefined") { } else {
            e.value = result.strbulletColor;
        }
    });
});

chrome.storage.sync.get('IsDayHighlightActive', function (result) {
    var e = document.getElementById("cbDayHighlight");
    if (result.IsDayHighlightActive == "1") {
        e.checked = true;
    } else {
        e.checked = false;
    }
});

function btnAddNewBullet() {

    chrome.storage.sync.set({
        'strNewBullet': "Add Please"
    });

}
function btnAge() {

    chrome.storage.sync.set({
        'strNewBullet': "Age"
    });

}
function btnAddDays() {

    chrome.storage.sync.set({
        'strNewBullet': "Add"
    });

}

function restBulletColor() {
    document.getElementById("bulletColor").value = "#000000";
    SaveChromeStorage('strbulletColor',"#000000");
}

function restText() {
    document.getElementById("textcolor").value = "#000000";
    SaveChromeStorage('strTextColor',"#000000");
}

function restBackground() {
    document.getElementById("backcolor").value = "#ffffff";
    SaveChromeStorage('strBackColor',"#ffffff");
}

function restPageBackground() {
    document.getElementById("backPagecolor").value = "#ffffff";
    SaveChromeStorage('strPageBackColor1',"#ffffff");

}

function saveChanges() {
    SaveChromeStorage('strFontTypeValue',document.getElementById("ddlViewBy").options[document.getElementById("ddlViewBy").selectedIndex].value);
}

function saveBulletColor() {
    SaveChromeStorage('strbulletColor',document.getElementById("bulletColor").value);
}
function saveBackgroundChanges() {
    SaveChromeStorage('strBackColor',document.getElementById("backcolor").value);
}

function savePageBackgroundChanges() {
    SaveChromeStorage('strPageBackColor1',document.getElementById("backPagecolor").value);
}

function saveDayHiglightChange() {

    SaveChromeStorage('IsDayHighlightActive',document.getElementById("cbDayHighlight").checked?"1":"0");
}


function saveTextChanges() {
    SaveChromeStorage('strTextColor',document.getElementById("textcolor").value);
}


function SaveChromeStorage(variable,value)
{
    if (!value) {
        alert('Error: No value specified');
        return;
    }
    chrome.storage.sync.set({
        [variable]: value
    }, function () {
        document.getElementById("ResponseMessage").innerHTML = "Setting Saved!";
    });
}

