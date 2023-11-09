import svgMap from 'svgmap';
import countryCodesList from './countriesList.js';
import cityNamesList from './cityNamesList.js';
import { fakeData } from './fakeData.js';

const countryInformation = new Map();
const popup = document.getElementById("popup");
const svgMapInstance = document.getElementById('svgMap')
let domain = 'https://food-around-the-world-proxy-server.onrender.com'

if (process.env.NODE_ENV !== 'production') {
  domain = 'http://localhost:5001'
}

// HANDLES WELCOME POP-UP
function showPopup() {
  popup.style.display = "block";
}

function closePopup() {
  popup.style.display = "none";``
}

window.onclick = function(event) {
  if (event.target === popup) {
      closePopup()
  }
}
window.onload = function() {
  showPopup();
}

function getCountryNameByCode(countryCode) {
  if (countryCode in countryCodesList) {
    return countryCodesList[countryCode];
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

// CREATES AND LOADS SVG MAP WITH TOOLTIP
const map = new svgMap({
  targetElementID: 'svgMap',
  onGetTooltip(toolTipdiv, countryId, countryValues) {
    const cityName = getCityNameByCode(countryId);
    const countryName = getCountryNameByCode(countryId);
  },
  data: {
    data: {
      threeCourse: {
        name: "holder",
        format: 'holder',
      },
    },
    applyData: 'threeCourse',
    values: {}
  },
  
});

// IF MAP IS LOADED, ADD EVENTLISTENER FOR CLICK ON EACH COUNTRY WHICH WILL THEN 
//MAKE A NEW DATA CARD

if (map) {
  document.querySelector('.svg-pan-zoom_viewport').addEventListener('click', (e) => {
    if (e.target.tagName === 'path') {
      const countryCode = e.target.dataset.id
      const cityName = getCityNameByCode(countryCode);
      const countryName = getCountryNameByCode(countryCode);
      getCityCostData(countryName, cityName)
      .then((div) => { 
        return countryInformation.set(countryCode, div) 
      })
      .then(result => result.get(countryCode))
      .then((div) => {
        const body = document.querySelector("#body");
        rotateChildrenInOrder(body, div)
      })

      console.log(cityName)
      console.log(teleportAPI(cityName))

    }
  });
}


async function teleportAPI(city) {
  const url = `https://api.teleport.org/api/cities/?search=${city}&limit=1&embed=city%3Asearch-results%2Fcity%3Aitem%2Fcity%3Aurban_area%2Fua%3Ascores`
  try {
    const response = await fetch(url, {});
      if (response.ok) {
        const result = await response.json();
        console.log(result)
      } else {
         console.log(response)
     }
  } catch (error) {
    console.error(error);
  }
}

async function getCityCostData(countryName, cityName) {
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
            //  console.log(result)
            } else {
              // console.log(response)
            }
        }
       
        const infoArray = [];
        infoArray.push(getItemAvgUSDPriceByName("Tomato, 1 kg", result, 'Tomatoes - 1kg'));
        infoArray.push(getItemAvgUSDPriceByName("Gasoline, 1 liter", result, "Gasoline, 1L"));
        infoArray.push(getItemAvgUSDPriceByName("Meal for 2 People, Mid-range Restaurant, Three-course", result, '3-Course Meal (2ppl)'));
        infoArray.push(getItemAvgUSDPriceByName("Average Monthly Net Salary, After Tax", result, 'Salary (after tax)'));
        infoArray.push(getItemAvgUSDPriceByName("One bedroom apartment in city centre", result, "Rent (1bd Apt)"));
      
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('wrapper');
        
        return createDataCards(cityName, countryName, infoArray, parentDiv)

    } catch (error) {
        console.error(error);
    }
}

function createDataCards (city, country, infoArray, parentDiv)  {
  const h1 = document.createElement('h1');
  h1.innerHTML = `${city}, ${country}`;
  parentDiv.appendChild(h1);

  infoArray.forEach(item => parentDiv.appendChild(item)); 
  return parentDiv;
}


function getItemAvgUSDPriceByName(itemName, result, label) {
  const item = result.prices.find((item) => item.item_name === itemName);
  const divEl = document.createElement('div');
  divEl.classList.add('row');
  const labelEl = document.createElement('label');
  labelEl.innerHTML = label;

  if (item) {
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
  } else {
    const spanEl = document.createElement('span');
    spanEl.innerHTML = 'unavailable';

    divEl.appendChild(labelEl);
    divEl.appendChild(spanEl);

    return divEl
  }
}


function rotateChildrenInOrder(body, div) {
  const totalChildren = body.children.length;
  let arrayFromCollection = Array.from(body.children);

  const hasNoDuplicateText = () => {
    let elementExists = arrayFromCollection.some(element => (element.textContent || element.innerText) === div.textContent);
    
    if (!elementExists) {
      return true
    } else {
      console.log("This is a duplicate.");
      return false
    }
  }

  if (totalChildren === 5 && hasNoDuplicateText()) {
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


//MODAL
// const modal = document.getElementById('myModal');
// const triggerButton = document.getElementById('openModal');
// const closeBtn = document.querySelector('.close');

// function openModal() {
//   modal.style.display = 'block';
// }

// function closeModal() {
//   modal.style.display = 'none';
// }

// triggerButton.addEventListener('click', openModal);
// closeBtn.addEventListener('click', closeModal);
  
  