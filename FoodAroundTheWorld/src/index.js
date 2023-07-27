import svgMap from 'svgmap';
import countryCodes from './countriesList.js';
import cityNamesList from './cityNamesList.js';
import { fakeData } from './fakeData.js';
// import "index.scss";
// import 'svgmap/dist/svgMap.min.css';

const mealForTwo = "Meal for 2 People, Mid-range Restaurant, Three-course"
const inexpensiveMealPrice = "Meal in Inexpensive Restaurant"
const cappuccino = "Cappuccino"
const dozenEggs = "Eggs, 12 pack"
const tomatoesKilo = "Tomato, 1 kg"
const popup = document.getElementById("popup");

function showPopup() {
  popup.style.display = "block";
}

function closePopup() {
  popup.style.display = "none";``
}

window.onclick = function(event) {
  if (event.target === popup) {
      closePopup()
      document.querySelector(".content").classList.remove("blur");
  }
}
window.onload = function() {
  showPopup();
}

const svgMapInstance = document.getElementById('svgMap')
   

function getCountryNameByCode(countryCode) {
    console.log('CountryCode', countryCode)
    if (countryCode in countryCodes) {
      return countryCodes[countryCode];
    } else {
      return 'Country code not found';
    }
  }

  function getCityNameByCode(countryCode) {
    console.log('CountryCode', countryCode)
    if (countryCode in cityNamesList) {
      return cityNamesList[countryCode];
    } else {
      return 'CityName not found';
    }
  }

let domain = 'https://food-around-the-world-proxy-server.onrender.com'

if (process.env.NODE_ENV !== 'production') {
  domain = 'http://localhost:5001'
}

async function getCityCostData(countryName, cityName) {
  // const url = `${domain}?url=https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${cityName}&country_name=${countryName}`;
  const url = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${cityName}&country_name=${countryName}`
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e377e81e46mshc55f3ddf23c5d2dp1a6d0cjsn8fe11bcbb1f8',
      'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
    }
  };
    try {
        const useFakeResponse = true;
        let result;

        if (useFakeResponse) {
            result = await Promise.resolve(fakeData)
        } else {
            const response = await fetch(url, options);
            if (response.ok) {
             result = await response.json();
             console.log(result)
            } else {
              console.log(response)
            }
        }

        const mealForTwoInfo = getItemAvgUSDPriceByName(mealForTwo, result, '3-Course Meal (2ppl)');
        const inexpensiveMealInfo = getItemAvgUSDPriceByName(inexpensiveMealPrice, result, 'Inexpensive Meal')
        const cappuccinoInfo = getItemAvgUSDPriceByName(cappuccino, result, 'Cappuccino')
        const dozenEggsInfo = getItemAvgUSDPriceByName(dozenEggs, result, 'Dozen Eggs')
        const tomatoesKiloInfo = getItemAvgUSDPriceByName(tomatoesKilo, result, 'tomatoes - 1kg');

        //TO-DO Break this appending of items into its own function
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('wrapper');

        const h1 = document.createElement('h1');
        h1.innerHTML = `${cityName}, ${countryName}`;

        parentDiv.appendChild(h1);
        parentDiv.appendChild(cappuccinoInfo);
        parentDiv.appendChild(dozenEggsInfo);
        parentDiv.appendChild(tomatoesKiloInfo);
        parentDiv.appendChild(inexpensiveMealInfo);
        parentDiv.appendChild(mealForTwoInfo);

        return parentDiv;

    } catch (error) {
        console.error(error);
    }
}


function getItemAvgUSDPriceByName(itemName, result, label) {
  const item = result.prices.find((item) => item.item_name === itemName);
  if (item) {
        const divEl = document.createElement('div');
        divEl.classList.add('row');

        const labelEl = document.createElement('label');
        labelEl.innerHTML = label;

        const spanEl = document.createElement('span');
        spanEl.innerHTML = '$' + item['usd']['avg'];

        divEl.appendChild(labelEl);
        divEl.appendChild(spanEl);
        `
        <div class="row">
            <label>{label}</label>
            <span>$1.23</span>
        </div>
        `
        return divEl;
  }
  return 'Not Found';
}

const countryInformation = new Map();

  new svgMap({
    targetElementID: 'svgMap',
    onGetTooltip(toolTipdiv, countryId, countryValues) {
      const cityName = getCityNameByCode(countryId);
      const countryName = getCountryNameByCode(countryId);

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

    getCityCostData(countryName, cityName)
        .then((div) => { 
            return countryInformation.set(countryId, div) 
        })
        .then(result => result.get(countryId))
        .then((div) => {
            const body = document.querySelector("#body");
            rotateChildrenInOrder(body, div)
    })

        },
    data: {
      data: {
        threeCourse: {
          name: "3-Course Meal for Two",
          format: '{0} USD',
        },
      },
      applyData: 'threeCourse',
      values: {
        
      }
    }
  });
  
   



  
  