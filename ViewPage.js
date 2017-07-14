document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('ddlViewBy').addEventListener('change', saveChanges);
    document.getElementById('backcolor').addEventListener('change', saveBackgroundChanges);
    document.getElementById('backPagecolor').addEventListener('change', savePageBackgroundChanges);
    document.getElementById('btnResetBackground').addEventListener('click', restBackground);
    document.getElementById('btnResetPageBackground').addEventListener('click', restPageBackground);
    chrome.storage.sync.get('strFontTypeValue', function (result) {
        var e = document.getElementById("ddlViewBy");
        e.selectedIndex = result.strFontTypeValue;


    });

    chrome.storage.sync.get('strBackColor', function (result) {
        var e = document.getElementById("backcolor");
        if (typeof result.strBackColor === "undefined") {
            // No profile in storage
        } else {
            e.value = result.strBackColor;
        }

    });

    chrome.storage.sync.get('strPageBackColor1', function (result) {
        var e = document.getElementById("backPagecolor");
        if (typeof result.strPageBackColor1 === "undefined") {
            // No profile in storage
        } else {
            e.value = result.strPageBackColor1;

        }
    });
});
function restBackground() {
    document.getElementById("backcolor").value = "#f6f6f6";

    chrome.storage.sync.set({ 'strBackColor': "#f6f6f6" }, function () {
        // Notify that we saved.

        document.getElementById("ResponseMessage").innerHTML = "Setting Saved!";

    });
}
function restPageBackground() {
    document.getElementById("backPagecolor").value = "#ffffff";

    chrome.storage.sync.set({ 'strPageBackColor1': "#ffffff" }, function () {
        // Notify that we saved.

        document.getElementById("ResponseMessage").innerHTML = "Setting Saved!";

    });
}

function saveChanges() {
    var e = document.getElementById("ddlViewBy");
    var strUser = e.options[e.selectedIndex].value;
    // Get a value saved in a form.

    // Check that there's some code there.
    if (!strUser) {
        alert('Error: No value specified');
        return;
    }
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({ 'strFontTypeValue': strUser }, function () {
        // Notify that we saved.

        document.getElementById("ResponseMessage").innerHTML = "Setting Saved!";

    });
}


function saveBackgroundChanges() {
    var e = document.getElementById("backcolor");
    var strUser = e.value;
    // Get a value saved in a form.

    // Check that there's some code there.
    if (!strUser) {
        alert('Error: No value specified');
        return;
    }
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({ 'strBackColor': strUser }, function () {
        // Notify that we saved.

        document.getElementById("ResponseMessage").innerHTML = "Setting Saved!";

    });
}

function savePageBackgroundChanges() {
    var e = document.getElementById("backPagecolor");
    var strUser = e.value;
    // Get a value saved in a form.

    // Check that there's some code there.
    if (!strUser) {
        alert('Error: No value specified');
        return;
    }
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({ 'strPageBackColor1': strUser }, function () {
        // Notify that we saved.

        document.getElementById("ResponseMessage").innerHTML = "Setting Saved!";

    });
}