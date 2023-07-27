# ![logo](https://github.com/Asyan77/FoodAroundtheWorld/assets/124006803/79e03683-7077-4a0e-93fc-4332dc396d33)

### Basic Overview
Zoom around the map and hover over countries to see a display of costs for five different food categories. While analyzing up to 5 countries at a time, compare the cost (in USD) of a cup of cappuccino, a dozen eggs, a kilo of tomatoes, an inexspensive meal for one person, or a 3-course meal for two people all over the world!

As you hover over the map you will see the country name along with country flag. Below the map will list the data for that couuntry along with the city name. The countries will shift to the left as you continue to hover without needing to worry about duplicate countries.

[Start exploring!](https://asyan77.github.io/FoodAroundtheWorld/)


### Credits
This app uses the following open-source packages: 
 - [svgMAP](https://www.npmjs.com/package/svgmap) to render the map with locations and popover
 - [Traveltables API](https://traveltables.com/) for data on prices
 - [Node.js](https://nodejs.org/en) 

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
- Information of national and local dishes to try in the country and regions
- Information on specialty produce specific to countries and regions
- More categories compare
- Search more specifically by cities 