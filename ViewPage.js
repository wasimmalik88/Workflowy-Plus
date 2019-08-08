document.addEventListener('DOMContentLoaded', function () {   
    document.getElementById('ddlViewBy').addEventListener('change', saveChanges);
    document.getElementById('backcolor').addEventListener('change', saveBackgroundChanges);
    document.getElementById('textcolor').addEventListener('change', saveTextChanges);

    document.getElementById('backPagecolor').addEventListener('change', savePageBackgroundChanges);
    document.getElementById('cbDayHighlight').addEventListener('change', saveDayHiglightChange);
    document.getElementById('btnResetBackground').addEventListener('click', restBackground);
    document.getElementById('btnResetPageBackground').addEventListener('click', restPageBackground);
    document.getElementById('btnResetText').addEventListener('click', restText);
    chrome.storage.sync.get('strFontTypeValue', function (result) {
        var e = document.getElementById("ddlViewBy");
        e.selectedIndex = result.strFontTypeValue;
    });

    chrome.storage.sync.get('strBackColor', function (result) {
        var e = document.getElementById("backcolor");
        if (typeof result.strBackColor === "undefined") {} else {
            e.value = result.strBackColor;
        }
    });
    chrome.storage.sync.get('strTextColor', function (result) {
        var e = document.getElementById("textcolor");
        if (typeof result.strTextColor === "undefined") {} else {
            e.value = result.strTextColor;
        }
    });
    chrome.storage.sync.get('strPageBackColor1', function (result) {
        var e = document.getElementById("backPagecolor");
        if (typeof result.strPageBackColor1 === "undefined") {} else {
            e.value = result.strPageBackColor1;
        }
    });
});


function restText() {
    document.getElementById("textcolor").value = "#000";
    chrome.storage.sync.set({
        'strTextColor': "#000"
    }, function () {
        document.getElementById("ResponseMessage").innerHTML = "Setting Saved!";
    });
}

function restBackground() {
    document.getElementById("backcolor").value = "#ffffff";
    chrome.storage.sync.set({
        'strBackColor': "#ffffff"
    }, function () {
        document.getElementById("ResponseMessage").innerHTML = "Setting Saved!";
    });
}

function restPageBackground() {
    document.getElementById("backPagecolor").value = "#ffffff";
    chrome.storage.sync.set({
        'strPageBackColor1': "#ffffff"
    }, function () {
        document.getElementById("ResponseMessage").innerHTML = "Setting Saved!";
    });
}

function saveChanges() {
    var e = document.getElementById("ddlViewBy");
    var strUser = e.options[e.selectedIndex].value;
    if (!strUser) {
        alert('Error: No value specified');
        return;
    }
    chrome.storage.sync.set({
        'strFontTypeValue': strUser
    }, function () {
        document.getElementById("ResponseMessage").innerHTML = "Setting Saved!";
    });
}

function saveBackgroundChanges() {
    var e = document.getElementById("backcolor");
    var strUser = e.value;
    if (!strUser) {
        alert('Error: No value specified');
        return;
    }
    chrome.storage.sync.set({
        'strBackColor': strUser
    }, function () {
        document.getElementById("ResponseMessage").innerHTML = "Setting Saved!";
    });
}

function savePageBackgroundChanges() {
    var e = document.getElementById("backPagecolor");
    var strUser = e.value;
    if (!strUser) {
        alert('Error: No value specified');
        return;
    }
    chrome.storage.sync.set({
        'strPageBackColor1': strUser
    }, function () {
        document.getElementById("ResponseMessage").innerHTML = "Setting Saved!";
    });
}

function saveDayHiglightChange() {
    var e = document.getElementById("cbDayHighlight");
    var strUser = null;
    if (e.checked == true) {
        strUser = "1";
    } else {
        strUser = "0";
    }
    if (!strUser) {
        alert('Error: No value specified');
        return;
    }
    chrome.storage.sync.set({
        'IsDayHighlightActive': strUser
    }, function () {
        document.getElementById("ResponseMessage").innerHTML = "Setting Saved!";
    });
}
chrome.storage.sync.get('IsDayHighlightActive', function (result) {
    var e = document.getElementById("cbDayHighlight");
    if (result.IsDayHighlightActive == "1") {
        e.checked = true;
    } else {
        e.checked = false;
    }
});

function saveTextChanges() {
    var e = document.getElementById("textcolor");
    var strUser = e.value;
    if (!strUser) {
        alert('Error: No value specified');
        return;
    }
    chrome.storage.sync.set({
        'strTextColor': strUser
    }, function () {
        document.getElementById("ResponseMessage").innerHTML = "Setting Saved!";
    });
}