import svgMap from 'svgmap';
import countryCodes from './countriesList.js';
import cityNamesList from './cityNamesList.js';
import countriesList from './countriesList.js';
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

async function fakeResponse() {
  return Promise.resolve({
    "city_id": 9377,
    "city_name": "Kant",
    "state_code": null,
    "country_name": "Kyrgyzstan",
    "exchange_rate": {
        "EUR": 0.9141043559814876,
        "AUD": 1.5044384337004684,
        "USD": 1,
        "CAD": 1.365551246061353,
        "CNY": 6.958206234740171,
        "CZK": 21.75104642096151,
        "DKK": 6.863042486656362,
        "GBP": 0.8026009925345098,
        "HKD": 7.847752263093859,
        "JPY": 135.73507701786255,
        "NZD": 1.6151181891227067,
        "NOK": 10.724763178413976,
        "RUB": 77.36039478338927,
        "KRW": 1342.4607515583195,
        "CHF": 0.8978689485149004,
        "UAH": 36.81677509467836,
        "SEK": 10.473343345823046
    },
    "exchange_rates_updated": {
        "date": "2023-05-13",
        "timestamp": 1684019043
    },
    "prices": [
        {
            "good_id": 3,
            "item_name": "International Primary School, Yearly for 1 Child",
            "category_id": 2,
            "category_name": "Childcare",
            "min": 279662.21,
            "avg": 724465.15,
            "max": 1506214.33,
            "usd": {
                "min": "3203.32",
                "avg": "8298.21",
                "max": "17252.56"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 4,
            "item_name": "Private Preschool or Kindergarten, Monthly for 1 Child",
            "category_id": 2,
            "category_name": "Childcare",
            "min": 5993.17,
            "avg": 10046.77,
            "max": 19975.81,
            "usd": {
                "min": "68.65",
                "avg": "115.08",
                "max": "228.81"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 5,
            "item_name": "Pair of Jeans in a Chain Store Like George, H&M, Zara, etc.",
            "category_id": 3,
            "category_name": "Clothing And Shoes",
            "min": 998.58,
            "avg": 1934.48,
            "max": 3495.45,
            "usd": {
                "min": "11.44",
                "avg": "22.16",
                "max": "40.04"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 6,
            "item_name": "Pair of Leather Business Shoes",
            "category_id": 3,
            "category_name": "Clothing And Shoes",
            "min": 2496.87,
            "avg": 4547.39,
            "max": 6597.91,
            "usd": {
                "min": "28.60",
                "avg": "52.09",
                "max": "75.57"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 7,
            "item_name": "Pair of Running Shoes, Mid-Range Price",
            "category_id": 3,
            "category_name": "Clothing And Shoes",
            "min": 1998,
            "avg": 4069.7,
            "max": 6141.4,
            "usd": {
                "min": "22.89",
                "avg": "46.62",
                "max": "70.35"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 9,
            "item_name": "Apples, 1 kg",
            "category_id": 4,
            "category_name": "Markets",
            "min": 20.33,
            "avg": 80.46,
            "max": 140.59,
            "usd": {
                "min": "0.23",
                "avg": "0.92",
                "max": "1.61"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 10,
            "item_name": "Banana, 1 kg",
            "category_id": 4,
            "category_name": "Markets",
            "min": 79.62,
            "avg": 101.64,
            "max": 199.89,
            "usd": {
                "min": "0.91",
                "avg": "1.16",
                "max": "2.29"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 11,
            "item_name": "Beef Round or Equivalent Back Leg Red Meat, 1 kg ",
            "category_id": 4,
            "category_name": "Markets",
            "min": 319.31,
            "avg": 366.74,
            "max": 499.71,
            "usd": {
                "min": "3.66",
                "avg": "4.20",
                "max": "5.72"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 12,
            "item_name": "Bottle of Wine, Mid-Range Price",
            "category_id": 4,
            "category_name": "Markets",
            "min": 149.91,
            "avg": 349.8,
            "max": 599.66,
            "usd": {
                "min": "1.72",
                "avg": "4.01",
                "max": "6.87"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 13,
            "item_name": "Chicken Breasts, Boneless and Skinless, 1 kg",
            "category_id": 4,
            "category_name": "Markets",
            "min": 199.89,
            "avg": 282.04,
            "max": 364.19,
            "usd": {
                "min": "2.29",
                "avg": "3.23",
                "max": "4.17"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 14,
            "item_name": "Domestic Beer, 0.5 liter Bottle",
            "category_id": 4,
            "category_name": "Markets",
            "min": 49.97,
            "avg": 66.91,
            "max": 99.94,
            "usd": {
                "min": "0.57",
                "avg": "0.77",
                "max": "1.14"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 15,
            "item_name": "Eggs, 12 pack",
            "category_id": 4,
            "category_name": "Markets",
            "min": 60.13,
            "avg": 92.32,
            "max": 124.51,
            "usd": {
                "min": "0.69",
                "avg": "1.06",
                "max": "1.43"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 17,
            "item_name": "Lettuce, 1 head",
            "category_id": 4,
            "category_name": "Markets",
            "min": 10.16,
            "avg": 19.48,
            "max": 49.97,
            "usd": {
                "min": "0.12",
                "avg": "0.22",
                "max": "0.57"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 18,
            "item_name": "Loaf of Fresh White Bread, 0.5 kg",
            "category_id": 4,
            "category_name": "Markets",
            "min": 16.09,
            "avg": 21.17,
            "max": 39.81,
            "usd": {
                "min": "0.18",
                "avg": "0.24",
                "max": "0.46"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 19,
            "item_name": "Local Cheese, 1 kg",
            "category_id": 4,
            "category_name": "Markets",
            "min": 199.89,
            "avg": 404.85,
            "max": 698.75,
            "usd": {
                "min": "2.29",
                "avg": "4.64",
                "max": "8.00"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 20,
            "item_name": "Milk, Regular,1 liter",
            "category_id": 4,
            "category_name": "Markets",
            "min": 34.73,
            "avg": 44.04,
            "max": 54.21,
            "usd": {
                "min": "0.40",
                "avg": "0.50",
                "max": "0.62"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 21,
            "item_name": "Onion, 1 kg",
            "category_id": 4,
            "category_name": "Markets",
            "min": 15.25,
            "avg": 22.87,
            "max": 34.73,
            "usd": {
                "min": "0.17",
                "avg": "0.26",
                "max": "0.40"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 22,
            "item_name": "Oranges, 1 kg",
            "category_id": 4,
            "category_name": "Markets",
            "min": 74.53,
            "avg": 110.11,
            "max": 189.72,
            "usd": {
                "min": "0.85",
                "avg": "1.26",
                "max": "2.17"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 23,
            "item_name": "Pack of Cigarettes",
            "category_id": 4,
            "category_name": "Markets",
            "min": 79.62,
            "avg": 89.78,
            "max": 99.94,
            "usd": {
                "min": "0.91",
                "avg": "1.03",
                "max": "1.14"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 24,
            "item_name": "Potato, 1 kg",
            "category_id": 4,
            "category_name": "Markets",
            "min": 15.25,
            "avg": 23.72,
            "max": 34.73,
            "usd": {
                "min": "0.17",
                "avg": "0.27",
                "max": "0.40"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 25,
            "item_name": "White Rice, 1 kg",
            "category_id": 4,
            "category_name": "Markets",
            "min": 49.97,
            "avg": 72.84,
            "max": 129.59,
            "usd": {
                "min": "0.57",
                "avg": "0.83",
                "max": "1.48"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 26,
            "item_name": "Tomato, 1 kg",
            "category_id": 4,
            "category_name": "Markets",
            "min": 20.33,
            "avg": 100.79,
            "max": 181.25,
            "usd": {
                "min": "0.23",
                "avg": "1.15",
                "max": "2.08"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 27,
            "item_name": "Water, 1.5 liter Bottle",
            "category_id": 4,
            "category_name": "Markets",
            "min": 20.33,
            "avg": 31.34,
            "max": 55.05,
            "usd": {
                "min": "0.23",
                "avg": "0.36",
                "max": "0.63"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 32,
            "item_name": "Cappuccino",
            "category_id": 6,
            "category_name": "Restaurants",
            "min": 110.11,
            "avg": 118.58,
            "max": 129.59,
            "usd": {
                "min": "1.26",
                "avg": "1.36",
                "max": "1.48"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 33,
            "item_name": "Coca-Cola, 0.33 liter Bottle",
            "category_id": 6,
            "category_name": "Restaurants",
            "min": 29.64,
            "avg": 33.88,
            "max": 49.97,
            "usd": {
                "min": "0.34",
                "avg": "0.39",
                "max": "0.57"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 34,
            "item_name": "Domestic Beer, 0.5 liter Draught",
            "category_id": 6,
            "category_name": "Restaurants",
            "min": 60.13,
            "avg": 70.3,
            "max": 115.19,
            "usd": {
                "min": "0.69",
                "avg": "0.81",
                "max": "1.32"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 35,
            "item_name": "Imported Beer, 0.33 liter Bottle",
            "category_id": 6,
            "category_name": "Restaurants",
            "min": 79.62,
            "avg": 120.27,
            "max": 160.92,
            "usd": {
                "min": "0.91",
                "avg": "1.38",
                "max": "1.84"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 36,
            "item_name": "McMeal at McDonalds or Alternative Combo Meal",
            "category_id": 6,
            "category_name": "Restaurants",
            "min": 224.87,
            "avg": 249.86,
            "max": 274.85,
            "usd": {
                "min": "2.58",
                "avg": "2.86",
                "max": "3.15"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 37,
            "item_name": "Meal for 2 People, Mid-range Restaurant, Three-course",
            "category_id": 6,
            "category_name": "Restaurants",
            "min": 1498.29,
            "avg": 1698.18,
            "max": 4184.04,
            "usd": {
                "min": "17.16",
                "avg": "19.45",
                "max": "47.93"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 38,
            "item_name": "Meal in Inexpensive Restaurant",
            "category_id": 6,
            "category_name": "Restaurants",
            "min": 199.89,
            "avg": 299.83,
            "max": 657.25,
            "usd": {
                "min": "2.29",
                "avg": "3.43",
                "max": "7.53"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 42,
            "item_name": "Cinema ticket, 1 Seat",
            "category_id": 8,
            "category_name": "Sports And Leisure",
            "min": 199.89,
            "avg": 299.83,
            "max": 499.71,
            "usd": {
                "min": "2.29",
                "avg": "3.43",
                "max": "5.72"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 45,
            "item_name": "Gasoline, 1 liter",
            "category_id": 9,
            "category_name": "Transportation",
            "min": 39.81,
            "avg": 43.2,
            "max": 46.59,
            "usd": {
                "min": "0.46",
                "avg": "0.49",
                "max": "0.53"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 48,
            "item_name": "Taxi, price for 1 hour Waiting, Normal Tariff",
            "category_id": 9,
            "category_name": "Transportation",
            "min": 99.94,
            "avg": 179.56,
            "max": 259.18,
            "usd": {
                "min": "1.14",
                "avg": "2.06",
                "max": "2.97"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 49,
            "item_name": "Taxi, price for 1 km, Normal Tariff",
            "category_id": 9,
            "category_name": "Transportation",
            "min": 10.16,
            "avg": 11.86,
            "max": 15.25,
            "usd": {
                "min": "0.12",
                "avg": "0.14",
                "max": "0.17"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 50,
            "item_name": "Taxi Start, Normal Tariff",
            "category_id": 9,
            "category_name": "Transportation",
            "min": 39.81,
            "avg": 49.97,
            "max": 99.94,
            "usd": {
                "min": "0.46",
                "avg": "0.57",
                "max": "1.14"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 52,
            "item_name": "Volkswagen Golf 1.4 90 KW Trendline (Or Equivalent New Car)",
            "category_id": 9,
            "category_name": "Transportation",
            "min": 1143617.56,
            "avg": 1198551.26,
            "max": 1498188.44,
            "usd": {
                "min": "13099.28",
                "avg": "13728.51",
                "max": "17160.63"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 53,
            "item_name": "Prepaid Mobile Tariff Local, price per 1 min, No Discounts or Plans",
            "category_id": 10,
            "category_name": "Utilities Per Month",
            "min": 0.85,
            "avg": 1.69,
            "max": 3.39,
            "usd": {
                "min": "0.01",
                "avg": "0.02",
                "max": "0.04"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 54,
            "item_name": "Basic utilities for 85 square meter Apartment including Electricity, Heating or Cooling, Water and Garbage",
            "category_id": 10,
            "category_name": "Utilities Per Month",
            "min": 1998,
            "avg": 3043.17,
            "max": 4494.88,
            "usd": {
                "min": "22.89",
                "avg": "34.86",
                "max": "51.49"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 55,
            "item_name": "Internet, 60 Mbps or More, Unlimited Data, Cable/ADSL",
            "category_id": 10,
            "category_name": "Utilities Per Month",
            "min": 898.64,
            "avg": 1350.07,
            "max": 1998,
            "usd": {
                "min": "10.29",
                "avg": "15.46",
                "max": "22.89"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 58,
            "item_name": "Water, 0.33 liter Bottle",
            "category_id": 4,
            "category_name": "Markets",
            "min": 20.33,
            "avg": 22.87,
            "max": 32.18,
            "usd": {
                "min": "0.23",
                "avg": "0.26",
                "max": "0.37"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 64,
            "item_name": "Summer Dress in a Chain Store Like George, H&M, Zara, etc.",
            "category_id": 3,
            "category_name": "Clothing And Shoes",
            "min": 898.64,
            "avg": 2185.19,
            "max": 3495.45,
            "usd": {
                "min": "10.29",
                "avg": "25.03",
                "max": "40.04"
            },
            "measure": "money",
            "currency_code": "KGS"
        },
        {
            "good_id": 65,
            "item_name": "Mortgage Interest Rate in Percentages for 20 Years Fixed-Rate, Yearly, Fixed-Rate",
            "category_id": 7,
            "category_name": "Salaries And Financing",
            "min": 14.53,
            "avg": 16.14,
            "max": 17.75,
            "measure": "percent"
        },
        {
            "good_id": 68,
            "item_name": "Imported Beer, 0.33 liter Bottle",
            "category_id": 4,
            "category_name": "Markets",
            "min": 65.22,
            "avg": 93.17,
            "max": 121.12,
            "usd": {
                "min": "0.75",
                "avg": "1.07",
                "max": "1.39"
            },
            "measure": "money",
            "currency_code": "KGS"
        }
    ],
    "error": null
})
}

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
        const useFakeResponse = false;
        let result;

        if (useFakeResponse) {
            result = await fakeResponse()
            
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
  