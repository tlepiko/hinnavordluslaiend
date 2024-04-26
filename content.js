chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getGtin") {
      const webpageContent = document.documentElement.innerHTML;
      const regex = /\b\d{13}\b/g;
      const matches = webpageContent.match(regex);
      const extractedIDs = [];
      if (matches) {
        matches.forEach(match => {
            extractedIDs.push(match);
        });
    }
      sendResponse({ gtin: extractedIDs[0] });
      console.log("running content.js");
    }
  });