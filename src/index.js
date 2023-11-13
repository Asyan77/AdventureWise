import svgMap from 'svgmap';
import countryCodesList from './countriesList.js';
import cityNamesList from './cityNamesList.js';
import { fakeData } from './fakeData.js';

const countryInformation = new Map();
const popup = document.getElementById("popup");
const clearDataCardsBtn = document.getElementById("clear-data-cards-btn")
const svgMapInstance = document.getElementById('svgMap')
let domain = 'https://food-around-the-world-proxy-server.onrender.com'


if (process.env.NODE_ENV !== 'production') {
  domain = 'http://localhost:5001'
}

// HANDLES WELCOME POP-UP
function showPopup() {

const popupContentDiv = document.createElement("div");
popupContentDiv.classList.add("popup-content")

const h2 = document.createElement("h2")
h2.innerHTML =("Discover your next journey!")
h2.style.color="purple"

const ul = document.createElement("ul");
ul.id = "popop-ul"

const ol1 = document.createElement("ol")
ol1.innerHTML= "Hover over a country to see a brief description"
const br1 = document.createElement("br")

const ol2 = document.createElement("ol")
ol2.innerHTML = "Click on up to 5 countries at a time to compare local living costs (in $USD)"
const br2 = document.createElement("br")

const ol3 = document.createElement("ol")
ol3.innerHTML = "For more indepth destination details click the purple labels of data cards"
const br3 = document.createElement("br")

const ol4 = document.createElement("ol")
ol4.innerHTML = "Happy Exploring!"

ul.appendChild(ol1)
ul.appendChild(br1)
ul.appendChild(ol2)
ul.appendChild(br2)
ul.appendChild(ol3)
ul.appendChild(br3)
ul.appendChild(ol4)

popupContentDiv.appendChild(h2)
popupContentDiv.appendChild(ul)

popup.appendChild(popupContentDiv)

popup.style.display = "block";

return popup
}

function closePopup() {
  popup.style.display = "none";``
}

window.onclick = function(event) {
  closePopup()
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
  // flagURL: flagURL,
  onGetTooltip(toolTipdiv, countryId, countryValues) { 
    const cityName = getCityNameByCode(countryId);
    const countryName = getCountryNameByCode(countryId);

    getTeleportAPI(cityName) 
    .then((res) => {
      const summary = getCitySummary(res)
      if (summary) {
        document.getElementById(`summary-${countryId}`).innerHTML = summary
      }
    })

      const hoverDivEle = document.createElement('div');
      hoverDivEle.classList.add('wrapper');

      const flagDiv = document.createElement("img")
      // flagDiv.id =`${countryId}-flag`
      // flagDiv.src = 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@latest/svg/{0}.svg'

      const locationH1 = document.createElement("h1");
      locationH1.class = "hover-H1"
      locationH1.id =`${cityName}, ${countryName}`
      locationH1.innerHTML = `${cityName}, ${countryName}`;

      const summarySpan = document.createElement('span');
      summarySpan.id = `summary-${countryId}`

      hoverDivEle.appendChild(flagDiv);
      hoverDivEle.appendChild(locationH1);
      if (summarySpan.innerHTML != null) {
        hoverDivEle.appendChild(summarySpan);
      }
  
      return hoverDivEle;

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
        const body = document.querySelector("#body")
        rotateChildrenInOrder(body, div)
      })

      console.log(body, "body inside the click ")

    }
  });
}


async function getTeleportAPI(city) {
  const url = `https://api.teleport.org/api/cities/?search=${city}&limit=1&embed=city%3Asearch-results%2Fcity%3Aitem%2Fcity%3Aurban_area%2Fua%3Ascores`
  try {
    const response = await fetch(url, {});
      if (response.ok) {
        const result = await response.json();
        return result
      } 
  } catch (error) {
  }
}

function getCitySummary (response) {
  if(response._embedded['city:search-results'][0]?._embedded['city:item']?._embedded) {
    const summary = response._embedded['city:search-results'][0]._embedded['city:item']._embedded['city:urban_area']._embedded['ua:scores'].summary;
    return summary
  } else {
    return null
  }
}

function getCityUrlLink(response) {
  if (response._embedded['city:search-results'][0]?._embedded['city:item']?._embedded) {
    const url = response._embedded['city:search-results'][0]._embedded['city:item']._embedded['city:urban_area'].teleport_city_url;
    return url
  } else {
    return null
  }
}

// fetching to get cost data, then calling createDataCard to make the data cards.
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

async function createDataCards (city, country, infoArray, parentDiv)  {
  let url;

  return await getTeleportAPI(city)
  .then((res) => {
    url = getCityUrlLink(res)
    if (url === null) {
      const h1 = document.createElement('h1');
      h1.id = "data-card-h1"
      h1.innerHTML = `${city}, ${country}`;
      parentDiv.appendChild(h1);
      infoArray.forEach(item => parentDiv.appendChild(item));
      return parentDiv;
    } else {
      const h1 = document.createElement('h1');
      h1.id = "data-card-h1"
      const linkText = `<a href="${url}" target="_blank">${city}, ${country}</a>`
      h1.setAttribute
      h1.innerHTML = linkText
      parentDiv.appendChild(h1);
      infoArray.forEach(item => parentDiv.appendChild(item)); 
      return parentDiv;
    }
  })
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
  // console.log(body.children[2], "body inside rotate children")

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

// clearDataCardsBtn.addEventListener("click", clearALLDataCards)

// function clearALLDataCards (e) {
//   // const bodyOfCards = document.getElementById("body")
//   if(bodyOfCards.children.length) {
//     bodyOfCards.remove(bodyOfCards.childNodes)
//     return body
//   }

// }