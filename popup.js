chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getGtin" }, function(response) {
      if (response && response.gtin) {
        const contentDiv = document.getElementById('andmed');
        const searchButton = document.createElement('button');
        const searchLink = `https://google.com/search?q=${response.gtin}`;
        searchButton.classList.add('btn', 'btn-info');
        searchButton.style.width = '80%';
        searchButton.style.marginBottom = '5px';
        searchButton.textContent = 'Otsi toodet internetist';
        searchButton.onclick = function() {
            window.open(searchLink, '_blank');
        }
        const productCode = document.createElement(`p`);
        productCode.textContent = `Tootekood: ` + response.gtin;
        const notFound = document.createElement('strong');
        notFound.textContent = `Toodet ei leitud!`
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
                          shopUrl = offer.shopUrl;
                          img = data2.images[0];
                          console.log(data2.images[0]);
                      }
                  });
                      const price = data1.data[0].price;
                      const offersLink = `https://hinnavaatlus.ee/${data1.data[0].id}`;
                      const shopName = dealerName;
                      const shopRating = rating;
                      const shopLink = shopUrl;
                      const imgLink = img;
                      const priceElement = document.createElement('div');
                      priceElement.textContent = `Hind: ${price} €`;
                      const shopElement = document.createElement('div');
                      shopElement.textContent = `Müüja: ${shopName}`;
                      const shopButton = document.createElement('button');
                      shopButton.style.width = '80%';
                      shopButton.style.marginTop = '5px';
                      shopButton.classList.add('btn', 'btn-primary');
                      shopButton.textContent = 'Mine poodi';
                      shopButton.onclick = function() {
                        window.open(shopLink, '_blank');
                      };
                      const offersButton = document.createElement('button');
                      offersButton.style.width = '80%';
                      offersButton.style.margin = '5px';
                      offersButton.classList.add('btn', 'btn-secondary');
                      offersButton.textContent = 'Vaata kõiki pakkumisi';
                      offersButton.onclick = function() {
                        window.open(offersLink, '_blank');
                      }
                      const ratingElement = document.createElement('div');
                      ratingElement.textContent = `Müüja hinnang: ${shopRating}/5`;
                      

                      const imageElement = document.createElement('img');
                      imageElement.classList.add('card-img-top');
                      imageElement.src = imgLink;
                      imageElement.style.maxWidth = '80%';
                      imageElement.style.margin = '5px';
                      
                      contentDiv.appendChild(imageElement);
                      contentDiv.appendChild(priceElement);
                      contentDiv.appendChild(shopElement);
                      contentDiv.appendChild(ratingElement);
                      contentDiv.appendChild(shopButton);
                      contentDiv.appendChild(offersButton);
                      contentDiv.appendChild(searchButton);
                      document.getElementById("gtin").appendChild(productCode);
                      
                  })
                  .catch(error => {
                    console.error('Fetch error:', error);
                });
              })
              .catch(error => {
                document.getElementById("gtin").appendChild(notFound);
                document.getElementById("gtin").appendChild(searchButton);
                document.getElementById("gtin").appendChild(productCode);
              });
  
      } else {
        document.getElementById("gtin").textContent = "Tootekood puudub!";
      }
    });
  });
  