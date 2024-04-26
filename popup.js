chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getTitle" }, function(response) {
        if (response && response.title) {
            document.getElementById("title").textContent = "Esimese leitud tiitli sisu on:" + response.title;
        } else {
            document.getElementById("title").textContent = "Tiitlit ei leitud!";
        }
    });
});