# ![logo](https://github.com/Asyan77/FoodAroundtheWorld/assets/124006803/79e03683-7077-4a0e-93fc-4332dc396d33)

### Basic Overview
This app is intended to help you discover and/or research destinations for moving abroad or for long term visits, depending on which factors are important for you. There are 3 ways to interact with this app. 

1. As you hover over countries on the map, a tool tip appears with a brief description and rating of a major city from that country.

2. Clicking on a country will produce a data card for the major city of that country. The data card displays four categories of basic living costs, plus the average salary. You can compare up to 5 locations at a time. There is a button underneath the cards to clear you selection so you can choose new areas to compare. 

3. Click on the underlined labels in the data cards for more detailed information on the quality of life for each location.

[Start exploring!](https://asyan77.github.io/FoodAroundtheWorld/)


### Credits
This app uses the following open-source packages: 
 - [svgMAP](https://www.npmjs.com/package/svgmap) to render the map with locations and popover
 - [Traveltables API](https://traveltables.com/) for data on prices
 - [Node.js](https://nodejs.org/en) 
 - [Teleport Pubic APIS](https://developers.teleport.org/api/)

### Components
One of the few challenges was connecting the svgMap to link with data from TravelTables since svgMap's country codes were two-letters (ex: CN) and TravelTable's country codes are three-letters (ex: CHN), or it was the country name in a string (ex:'China'). Using the following code, plus creating a local file with city names, I was then able to link country to country to city, to data! 
```
function getCountryNameByCode(countryCode) {
    if (countryCode in countryCodes) {
      return countryCodes[countryCode];
    } else {
      return 'Country code not found';
    }
  }
  function getCityNameByCode(countryCode) {
    if (countryCode in cityNamesList) {
      return cityNamesList[countryCode];
    } else {
      return 'CityName not found';
    }
  } 

  getCityCostData(countryName, cityName)
        .then((div) => { 
            return countryInformation.set(countryId, div) 
        })
        .then(result => result.get(countryId))
        .then((div) => {
            const body = document.querySelector("#body");
            rotateChildrenInOrder(body, div)
    })
  
  ```

  Another couple challenges I ran into while developing is that I was not able to compare the data side by side. And on top of that I was often getting duplicate countries when I accidentally hovered. I managed to solve these issues using the following code: 

  ```
   function rotateChildrenInOrder(body, div) {
        const totalChildren = body.children.length;
        // Convert HTMLCollection to Array
        let arrayFromCollection = Array.from(body.children);

        const hasNoDuplicateText = () => {
          let elementExists = arrayFromCollection.some(element => (element.textContent || element.innerText) === div.textContent);

          // If the element doesn't exist, append it
          if (!elementExists) {
            return true
          } else {
            console.log("An element with the same text content already exists in the collection.");
            return false
          }
        }
        if (totalChildren >= 5) {
              let firstElement = body.children[0];
              firstElement.parentNode.removeChild(firstElement);
              if (hasNoDuplicateText()) {
                body.appendChild(div);
              }
            } else {
              if (hasNoDuplicateText()) {
                body.appendChild(div);
              }
            }
     }
  ```

### Upcoming Features
- Information of national and local food in the country/region
- Information on history or attractions in the country/region
- More categories compare
- More cities within each country to compare