document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('ddlViewBy').addEventListener('change', saveChanges);
});

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
        chrome.storage.sync.set({'strFontTypeValue': strUser}, function() {
          // Notify that we saved.
         
          document.getElementById("ResponseMessage").innerHTML="Setting Saved please refresh your workflowy page to see changes!";
          
        });
      }