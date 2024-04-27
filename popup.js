chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getGtin" }, function(response) {
      if (response && response.gtin) {
        document.getElementById("gtin").textContent = "Tootekood on: " +response.gtin;
          fetch(`https://api.hinnavaatlus.ee/search/?query=${response.gtin}`)
              .then(response => response.json())
              .then(data1 => {
                fetch(`https://api.hinnavaatlus.ee/product/${data1.data[0].id}`)
                  .then(response => response.json())
                  .then(data2 => {
                      data2.offers.forEach(offer => {
                        const price = parseFloat(offer.price);
                        if (price == data1.data[0].price) {
                          dealerName = offer.dealer.name;
                          rating = offer.dealer.rating;
                          console.log(rating);
                      }
                  });
                      const price = data1.data[0].price;
                      const shopName = dealerName;
                      const shopRating = rating;
                      const priceElement = document.createElement('div');
                      priceElement.textContent = `Hind: ${price} €`;
                      const shopElement = document.createElement('div');
                      shopElement.textContent = `Müüja: ${shopName}`;
                      const ratingElement = document.createElement('div');
                      ratingElement.textContent = `Müüja hinnang: ${shopRating}/5`;
                      const contentDiv = document.getElementById('andmed');
                      contentDiv.appendChild(priceElement);
                      contentDiv.appendChild(shopElement);
                      contentDiv.appendChild(ratingElement);
                  })
                  .catch(error => {
                    console.error('Fetch error:', error);
                });
              })
              .catch(error => {
                  console.error('Fetch error:', error);
              });
  
      } else {
        document.getElementById("gtin").textContent = "Toodet ei leitud!";
      }
    });
  });
  