chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("running content.js");
    if (request.action === "getTitle") {
        const title = document.querySelector('title').textContent;
        sendResponse({ title: title });
    }
});