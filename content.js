chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getGtin") {
      const webpageContent = document.documentElement.innerHTML;
      const regex = /\b\d{13}\b/g;
      const matches = webpageContent.match(regex);
      const extractedIDs = [];
      console.log(matches);
      if (matches) {
        matches.forEach(match => {
            let sum = 0;
            for (let i = 0; i < 12; i++) {
                const digit = parseInt(match[i]);
                sum += i %2 === 0 ? digit : digit * 3;
                console.log(sum);
            }
            const checksum = (10 - (sum % 10)) % 10;
            if (checksum === parseInt(match[12])) {
                extractedIDs.push(match);
            }
        });
    }
      sendResponse({ gtin: extractedIDs[0] });
      console.log(extractedIDs);
    }
  });