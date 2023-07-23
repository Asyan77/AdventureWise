import svgMap from 'svgmap';
import countryCodes from './countriesList.js';
import cityNamesList from './cityNamesList.js';
import { fakeData } from './fakeData.js';
// import "index.scss";
// import 'svgmap/dist/svgMap.min.css';

// const url = 'https://cost-of-living-and-prices.p.rapidapi.com/cities';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'e377e81e46mshc55f3ddf23c5d2dp1a6d0cjsn8fe11bcbb1f8',
// 		'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
// 	}
// };

// async function test() {
//     try {
//         const response = await fetch(url, options);
//         const result = await response.text();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// }
// test()

const mealForTwo = "Meal for 2 People, Mid-range Restaurant, Three-course"
const inexpensiveMealPrice = "Meal in Inexpensive Restaurant"
const cappuccino = "Cappuccino"
const dozenEggs = "Eggs, 12 pack"
const tomatoesKilo = "Tomato, 1 kg"


async function getCityCostData(countryName, cityName) {
  const url = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${cityName}&country_name=${countryName}`;
  // const url = 'https://cost-of-living-and-prices.p.rapidapi.com/cities';
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
             result = await response.json();

        }
 


        const mealForTwoInfo = getItemAvgUSDPriceByName(mealForTwo, result, '3-Course Meal for 2 people');
        const inexpensiveMealInfo = getItemAvgUSDPriceByName(inexpensiveMealPrice, result, 'Inexpensive Meal')
        const cappuccinoInfo = getItemAvgUSDPriceByName(cappuccino, result, 'Cappuccino')
        const dozenEggsInfo = getItemAvgUSDPriceByName(dozenEggs, result, 'Dozen Eggs')
        const tomatoesKiloInfo = getItemAvgUSDPriceByName(tomatoesKilo, result, 'tomatoes - 1kg');

        const parentDiv = document.createElement('div');
        parentDiv.classList.add('wrapper');

        const h1 = document.createElement('h1');
        h1.innerHTML = `${cityName}, ${countryName}`;

        parentDiv.appendChild(h1);
        parentDiv.appendChild(mealForTwoInfo);
        parentDiv.appendChild(inexpensiveMealInfo);
        parentDiv.appendChild(cappuccinoInfo);
        parentDiv.appendChild(dozenEggsInfo);
        parentDiv.appendChild(tomatoesKiloInfo);

        `
        <div class="wrapper">
            <h1></h1>
            <div class="row">...</div>
            <div class="row">...</div>
            <div class="row">...</div>
            <div class="row">...</div>
            <div class="row">...</div>
        </div>
        `

        return parentDiv;

        // dataArray = result
        // // console.log(result.prices.reduce((obj,item) => Object.assign(obj, {[item.item_name] : item}), {} ));
        // // const data = (result.prices.reduce((obj,item) => Object.assign(obj, {[item.item_name] : item}), {} ))
        // console.log(dataArray)
        // const costInfoObject = {}
        // costInfoObject[mealForTwo]= mealForTwoInfo
        // costInfoObject[inexpensiveMealPrice] = inexpensiveMealInfo
        // // console.log(result.prices)
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
    // If async/await was supported:
    async onGetTooltip2(toolTipdiv, countryId, countryValues) {
        const cityName = getCityNameByCode(countryId);
        const countryName = getCountryNameByCode(countryId);
        return await getCityCostData(countryName, cityName);
    },
    // Since async/await is not supported with this npm library
    onGetTooltip(toolTipdiv, countryId, countryValues) {
      const cityName = getCityNameByCode(countryId);
      const countryName = getCountryNameByCode(countryId);

      if (countryInformation.has(countryId)) { // checking if we've loaded the data 
        return countryInformation.get(countryId); // get the country info by country id
      } else {
        getCityCostData(countryName, cityName).then((div) => { // this line is loading the country data (Promise.then)
            countryInformation.set(countryId, div); // this line is setting the data 
          });
          return `Loading data for ${cityName}, ${countryName}`;
      }
    },
    data: {
      data: {
        // gdp: {
          // name: 'GDP per capita',
          // format: '{0} USD',
          // thousandSeparator: ',',
          // thresholdMax: 50000,
          // thresholdMin: 1000
        // },
        threeCourse: {
          name: "3-Course Meal for Two",
          format: '{0} USD',
    
        },

        inexpensiveMeal: {
          name: "Inexpensive Meal",
          format: '{0} USD',
        },

        cappuccinoCup: {
          name: "Cappuccino",
          format: '{0} USD',
        },

        eggs: {
          name: "Dozen Eggs",
          format: '{0} USD',
        },

        tomatoes: {
          name: "Tomatoes, 1kg",
          format: '{0} USD',
        },
      },
      //call a function getCityCostData, loop over the country codes 
      // for countryCode in data countries
      //     find city/country name for each country id
      //     fetch cost data from getCityCostData function
      //     apply that cost data values so that when you hover over the country that data is available
      // RU: {inexpensiveMealPrice: value, mealForTwo: value }
      // 
      applyData: 'threeCourse',
      values: {
        IT: { change: 4.73},
        AL: { change: 11.09},
        DZ: { change: 10.01},
        US: {threeCourse: 23, inexpensiveMeal: 44}
        // ...
      }
    }
  });
  
    // Client-side JavaScript
    function handleMapClick(event) {
      // Get the target element that was clicked
      const clickedElement = event.target;
    
      // Now, you can extract information from the clicked element
      // For example, if the elements have data attributes or specific classes, you can access them like this:
      const elementCountryID = clickedElement.attributes[2]['value']; // Assuming the element has only one class
    
      // Use the information as you need, for example, log it to the console
      const countryName = getCountryNameByCode(elementCountryID)  
      const cityName = getCityNameByCode(elementCountryID)

      console.log('Country Name', countryName) 
      return getCityCostData(countryName, cityName)
      // function to call the cost averages API 
      // 
    }
    const svgMapInstance = document.getElementById('svgMap')
    // svgMapInstance.addEventListener('click', handleMapClick);
    // svgMapInstance.addEventListener('hover', handleMapClick);



    function getCountryNameByCode(countryCode) {
      console.log('CountryCode', countryCode)
      // Check if the provided country code exists in the 'countryCodes' object
      if (countryCode in countryCodes) {
        // If the country code is found, return the corresponding country name
        return countryCodes[countryCode];
      } else {
        // If the country code is not found, return a message indicating it's not available
        return 'Country code not found';
      }
    }

    function getCityNameByCode(countryCode) {
      console.log('CountryCode', countryCode)
      // Check if the provided country code exists in the 'countryCodes' object
      if (countryCode in cityNamesList) {
        // If the country code is found, return the corresponding country name
        return cityNamesList[countryCode];
      } else {
        // If the country code is not found, return a message indicating it's not available
        return 'CityName not found';
      }
    }
  