import svgMap from 'svgmap';
import countryCodesList from './countriesList.js';
import cityNamesList from './cityNamesList.js';
import { fakeData } from './fakeData.js';

const countryInformation = new Map();
const popup = document.getElementById("popup");
const clearDataCardsBtn = document.getElementById("clear-data-cards-btn")
clearDataCardsBtn.classList.add("hide")
const svgMapInstance = document.getElementById('svgMap')
// let domain = 'https://food-around-the-world-proxy-server.onrender.com'
let domain = 'https://asyan77.github.io/AdventureWise/'
let dataCardBody;
let saveBtn;
let dataCard;


if (process.env.NODE_ENV !== 'production') {
  domain = 'http://localhost:5001'
}

// HANDLES WELCOME POP-UP
function showPopup() {

const popupContentDiv = document.createElement("div");
popupContentDiv.classList.add("popup-content")

const h2 = document.createElement("h2")
h2.innerHTML =("Discover your next journey")
h2.style.color="purple"

const ul = document.createElement("div");
ul.id = "popup-ul"

const ol1 = document.createElement("div")
ol1.innerHTML= "Hover over the map to see which country you'd like to view data on"
const br1 = document.createElement("br")

const ol2 = document.createElement("div")
ol2.innerHTML = "Select by clicking on up to 4 countries at a time to compare various local living costs and average salary, in $USD"
const br2 = document.createElement("br")

const ol3 = document.createElement("div")
ol3.innerHTML = "Pin the data cards you want to keep around, or remove pins and clear all data cards to start fresh"
const br3 = document.createElement("br")

// const ol4 = document.createElement("div")
// ol4.innerHTML = "For more indepth destination details, click the underlined labels of the data cards"
// const br4 = document.createElement("br")

const ol5 = document.createElement("div")
ol5.innerHTML = "Happy Exploring!"
const br5 = document.createElement("br")

ul.appendChild(ol1)
ul.appendChild(br1)
ul.appendChild(ol2)
ul.appendChild(br2)
ul.appendChild(ol3)
ul.appendChild(br3)
// ul.appendChild(ol4)
// ul.appendChild(br4)
ul.appendChild(ol5)

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
  } //else {
  //   return 'CityName not found';
  // }
}

// CREATES AND LOADS SVG MAP WITH TOOLTIP
const map = new svgMap({
  targetElementID: 'svgMap',
  // flagURL: flagURL,
  onGetTooltip(toolTipdiv, countryId, countryValues) { 
    const cityName = getCityNameByCode(countryId);
    const countryName = getCountryNameByCode(countryId);

    // getTeleportAPI(cityName) 
    // .then((res) => {
    //   const summary = getCitySummary(res)
    //   if (summary) {
    //     document.getElementById(`summary-${countryId}`).innerHTML = summary
    //   }
    // })

      const hoverDivEle = document.createElement('div');
      hoverDivEle.classList.add('hover-wrapper');

      const flagDiv = document.createElement("img")
      flagDiv.id =`${countryId}-flag`
      flagDiv.classList.add("flag")
      flagDiv.src = `https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@latest/svg/${countryId.toLowerCase()}.svg`

      const locationH1 = document.createElement("h1");
      locationH1.classList.add("hover-h1")
      locationH1.id =`${cityName}, ${countryName}`
      locationH1.innerHTML = `${cityName}, ${countryName}`;

      const summarySpan = document.createElement('span');
      summarySpan.id = `summary-${countryId}`
      summarySpan.classList.add("summary")

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
function handleMapClick(e) {
  if (e.target.tagName === 'path') {
    const countryCode = e.target.dataset.id;
    const cityName = getCityNameByCode(countryCode);
    const countryName = getCountryNameByCode(countryCode);

    getCityCostData(countryName, cityName)
      .then((div) => {
        return countryInformation.set(countryCode, div);
      })
      .then(result => result.get(countryCode))
      .then((div) => {
        dataCardBody = document.querySelector("#data-card-body");
        rotateUnpinnedChildren(dataCardBody, div);
      });
  }
}
if (map) {
  document.querySelector('.svg-pan-zoom_viewport').addEventListener('click', handleMapClick);
}

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

// async function getTeleportAPI(city) {
//   const url = `https://api.teleport.org/api/cities/?search=${city}&limit=1&embed=city%3Asearch-results%2Fcity%3Aitem%2Fcity%3Aurban_area%2Fua%3Ascores`
//   const options = {
//     method: "GET",
//     headers: {
//      "Accept": "application/vnd.teleport.v1+json"
//     }
//   }
//   try {
//     const response = await fetch(url, options);
//       if (response.ok) {
//         const result = await response.json();
//         return result
//       } 
//   } catch (error) {
//   }
// }

// function getCitySummary (response) {
//   if(response._embedded['city:search-results'][0]?._embedded['city:item']?._embedded) {
//     const summary = response._embedded['city:search-results'][0]._embedded['city:item']._embedded['city:urban_area']._embedded['ua:scores'].summary;
//     return summary
//   } else {
//     return null
//   }
// }

// function getCityUrlLink(response) {
//   if (response._embedded['city:search-results'][0]?._embedded['city:item']?._embedded) {
//     const url = response._embedded['city:search-results'][0]._embedded['city:item']._embedded['city:urban_area'].teleport_city_url;
//     return url
//   } else {
//     return null
//   }
// }

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
        const useFakeResponse = false;
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
        infoArray.push(getItemAvgUSDPriceByName("Average Monthly Net Salary, After Tax", result, 'Salary (Monthly, after tax)'));
        infoArray.push(getItemAvgUSDPriceByName("One bedroom apartment in city centre", result, "Rent (1bd Apt)"));
      
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('wrapper');
        
        return createDataCards(cityName, countryName, infoArray, parentDiv)
    } catch (error) {
        // console.error(error);
    }
}

//creates data card and save button
function createDataCards (city, country, infoArray, parentDiv)  {
  clearDataCardsBtn.classList.remove("hide");
  clearDataCardsBtn.classList.add("show");
  parentDiv.classList.add("unpinned")

  saveBtn = document.createElement("button");
  saveBtn.id = "pin"
  saveBtn.innerHTML = "pin"
  
  // return 
  // await getTeleportAPI(city)
  // .then((res) => {
    // url = getCityUrlLink(res)
    // if (url === null) {
      const h1 = document.createElement('h1');
      h1.id = "data-card-h1"
      h1.innerHTML = `${city}, ${country}`;
      parentDiv.appendChild(h1);
      infoArray.forEach(item => parentDiv.appendChild(item));
      parentDiv.appendChild(saveBtn);
      saveBtn.addEventListener("click", handleSaveBtnClick)
      return parentDiv;
    // } 
    // else {
    //   const h1 = document.createElement('h1');
    //   h1.id = "data-card-h1-with-link"
    //   const linkText = `<a href="${url}" target="_blank" >${city}, ${country}</a>`
    //   h1.innerHTML = linkText
    //   parentDiv.appendChild(h1);
    //   infoArray.forEach(item => parentDiv.appendChild(item)); 
    //   parentDiv.appendChild(saveBtn)
    //   saveBtn.addEventListener("click", handleSaveBtnClick)
    //   return parentDiv;
    // }
  // })
  // <div class="wrapper unpinned">
  // <h1> city, country (with link) </h1>
  // <>item
  // <>item
  // <>item
  // <>item
  // <button id="pin">pin</button>
// </div>
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


function rotateUnpinnedChildren(cards, div) {
  const unpinnedChildren = Array.from(cards.children).filter(child => !child.classList.contains("pinned"));
  console.log(div, 'div')
  
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

clearDataCardsBtn.addEventListener("click", clearUnpinnedDataCards)

function clearUnpinnedDataCards (e) {
  const arrayOfChildren = Array.from(dataCardBody.children);

  arrayOfChildren.forEach(function(child) {
    if (!child.classList.contains("pinned")) {
      dataCardBody.removeChild(child)    
      } 
    })

    if(dataCardBody.children.length === 0) {
    clearDataCardsBtn.classList.add("hide")
    clearDataCardsBtn.classList.remove("show")
    }
}


