import svgMap from 'svgmap';
import countryCodes from './countriesList.js';
import cityNamesList from './cityNamesList.js';
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

let dataArray;
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
        const response = await fetch(url, options);
        const result = await response.json();

        const mealForTwoInfo = getItemAvgUSDPriceByName(mealForTwo, result);
        console.log('3-Course Meal for 2 people', mealForTwoInfo)

        const inexpensiveMealInfo = getItemAvgUSDPriceByName(inexpensiveMealPrice, result)
        console.log('Inexpensive Meal', inexpensiveMealInfo)

        const cappuccinoInfo = getItemAvgUSDPriceByName(cappuccino, result)
        console.log('Cappuccino', cappuccinoInfo)

        const dozenEggsInfo = getItemAvgUSDPriceByName(dozenEggs, result)
        console.log('Dozen Eggs', dozenEggsInfo)

        const tomatoesKiloInfo = getItemAvgUSDPriceByName(tomatoesKilo, result)
        console.log('tomatoes - 1kg', tomatoesKiloInfo)

        dataArray = result
        // console.log(result.prices.reduce((obj,item) => Object.assign(obj, {[item.item_name] : item}), {} ));
        // const data = (result.prices.reduce((obj,item) => Object.assign(obj, {[item.item_name] : item}), {} ))
        console.log(dataArray)
        const costInfoObject = {}
        costInfoObject[mealForTwo]= mealForTwoInfo
        costInfoObject[inexpensiveMealPrice] = inexpensiveMealInfo
        // console.log(result.prices)
    } catch (error) {
        console.error(error);
    }
}

function getItemAvgUSDPriceByName(itemName, result) {
  const item = result.prices.filter((item) => item.item_name === itemName);
  return item[0]['usd']['avg']
}



  new svgMap({
    targetElementID: 'svgMap',
    data: {
      data: {
        // gdp: {
          // name: 'GDP per capita',
          // format: '{0} USD',
          // thousandSeparator: ',',
          // thresholdMax: 50000,
          // thresholdMin: 1000
        // },
        mangos: {
          name: "mango",
          format: '{0} USD',
    
        },

        water: {
          name: "water",
          format: '{0} USD',
        },
        // change: {
        //   name: 'Change to year before',
        //   format: '{0} %'
        // }
      },
      //call a function getCityCostData, loop over the country codes 
      // for countryCode in data countries
      //     find city/country name for each country id
      //     fetch cost data from getCityCostData function
      //     apply that cost data values so that when you hover over the country that data is available
      // RU: {inexpensiveMealPrice: value, mealForTwo: value }
      // 
      applyData: 'mangos',
      values: {
        IT: { change: 4.73},
        AL: { change: 11.09},
        DZ: { change: 10.01},
        "United States": { change: 33, mangos: 23, water: 44}
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

      return getCityCostData(countryName, cityName)
      // function to call the cost averages API 
      // 
      console.log('Country Name', countryName) 
    }
    const svgMapInstance = document.getElementById('svgMap')
    svgMapInstance.addEventListener('click', handleMapClick);
    svgMapInstance.addEventListener('hover', handleMapClick);



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

  