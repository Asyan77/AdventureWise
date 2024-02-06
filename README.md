# ![logo](assets/header.png)

### Basic Overview
This app is intended to help you discover and/or research destinations for moving abroad or for long term visits, depending on which factors are important for you. There are 3 ways to interact with this app:

1. As you hover over countries on the map, a tool tip appears with the country flag and the name of a major city from that country.

2. Clicking on a country will produce a data card for the major city of that country. The data card displays four categories of basic living costs, plus the average salary. You can compare up to 4 location at a time. There is a button underneath the cards to clear you selection so you can choose new areas to compare. 

3. Click on the underlined labels in the data cards for more detailed information on the quality of life for each location.

[Start exploring!](https://asyan77.github.io/FoodAroundtheWorld/)

### Video Demo 
[![Watch the video](assets/CleanShot.gif)](https://www.canva.com/design/DAF0Xulu5TU/watch)


### Credits
This app uses the following open-source packages: 
 - [svgMAP](https://www.npmjs.com/package/svgmap) renders the map with countries and tooltip.
 - [Traveltables API](https://traveltables.com/) provides the for data on living costs that goes into the data cards
 - [Teleport Pubic APIS](https://developers.teleport.org/api/) provides the summary in the tooltip, the monthly salary data, and url links
 - [Node.js](https://nodejs.org/en) 

### Components
Three of the most challenging peices to this app was creating the data cards, getting them to pin/unpin, and rotate properly according to if they were pinned or not. Here's how I solved these issues: 

1. Creating Data Cards - The data cards are pulling data from 2 seperate APIs so the timing of promises and population of the infomation was tricky. Also using the result from one API to populate data from the second API was challenging. I ran into the issue where if the there was no url for a country the data card wouldn't create at all. I also had account for the `saveBtn.innerHTML` and the `parentDiv.classList` so that upon creation of datacards it was set properly and that I could toggle their state later in the code.
```
async function createDataCards (city, country, infoArray, parentDiv)  {
  let url;
  clearDataCardsBtn.classList.remove("hide");
  clearDataCardsBtn.classList.add("show");
  parentDiv.classList.add("unpinned")

  saveBtn = document.createElement("button");
  saveBtn.id = "pin"
  saveBtn.innerHTML = "pin"
  
  return await getTeleportAPI(city)
  .then((res) => {
    url = getCityUrlLink(res)
    if (url === null) {
      const h1 = document.createElement('h1');
      h1.id = "data-card-h1"
      h1.innerHTML = `${city}, ${country}`;
      parentDiv.appendChild(h1);
      infoArray.forEach(item => parentDiv.appendChild(item));
      parentDiv.appendChild(saveBtn);
      saveBtn.addEventListener("click", handleSaveBtnClick)
      return parentDiv;
    } else {
      const h1 = document.createElement('h1');
      h1.id = "data-card-h1-with-link"
      const linkText = `<a href="${url}" target="_blank" >${city}, ${country}</a>`
      h1.innerHTML = linkText
      parentDiv.appendChild(h1);
      infoArray.forEach(item => parentDiv.appendChild(item)); 
      parentDiv.appendChild(saveBtn)
      saveBtn.addEventListener("click", handleSaveBtnClick)
      return parentDiv;
    }
  })
}
  ```
2. Pinning & Unpinning Data Cards - It took many tried to figure out where to add the event listener and how to change/update an attribute, and how to use that attribute to toggle between state. You can see in the code above that I ultimately chose to add the event listener to each card as it was created. In the code blocks below you can see how I update the attributes in the `handleSaveBtnClick`, and how I used those attributes in the `clearUnpinnedDataCards` function to determine which cards to keep and remove. 

```
  function handleSaveBtnClick (e) {
  const btn = e.target
  const card = e.target.parentNode
  if (card.classList.contains("pinned") ) {
    card.classList.remove("pinned");
    card.classList.add("unpinned")
    btn.innerHTML = "pin"
  } else {
    card.classList.add("pinned");
    card.classList.remove("unpinned");
    btn.innerHTML = "remove pin"
  }
}
```

```
 function clearUnpinnedDataCards (e) {
  const arrayOfChildren = Array.from(dataCardBody.children);

  arrayOfChildren.forEach(function(child) {
    if (!child.classList.contains("pinned")) {
      dataCardBody.removeChild(child)    
      } 
    })

    if (dataCardBody.children.length === 0) {
      clearDataCardsBtn.classList.add("hide")
      clearDataCardsBtn.classList.remove("show")
    }
}
  ```


3. Rotating Data Cards - I wanted the cards populate only up to four card, no duplicates, and starting from left to right. I needed to check if cards were pinned/unpinned so that pinned cards would not be rotated out of the deck. 

```
function rotateUnpinnedChildren(cards, div) {
  const unpinnedChildren = Array.from(cards.children).filter(child => !child.classList.contains("pinned"));

  const hasNoDuplicateText = () => {
    let elementExists = unpinnedChildren.some(element => (element.textContent || element.innerText) === div.textContent);

    if (!elementExists) {
      return true;
    } else {
      return false;
    }
  };

  if (cards.children.length === 4 && hasNoDuplicateText()) {
    let firstElement = unpinnedChildren[0];

    firstElement.parentNode.removeChild(firstElement);
    if (hasNoDuplicateText()) {
      cards.appendChild(div);
    }
  } else {
    if (hasNoDuplicateText()) {
      cards.appendChild(div);
    }
  }
}
```

### Upcoming Features! 
- Information of national and local food in the country/region
- Information on history or attractions in the country/region
- More categories compare
- More cities within each country to compare
- Add a currency converter