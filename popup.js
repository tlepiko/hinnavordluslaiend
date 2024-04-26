chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getGtin" }, function(response) {
        if (response && response.gtin) {
            document.getElementById("gtin").textContent = "Leitud GTIN on:" + response.gtin;
        } else {
            document.getElementById("gtin").textContent = "GTIN koodi ei leitud!";
        }
    });
});