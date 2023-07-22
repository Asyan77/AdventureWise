import svgMap from 'svgmap';
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


// const url = 'https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=Taipei&country_name=Taiwan';
const url = 'https://cost-of-living-and-prices.p.rapidapi.com/cities';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e377e81e46mshc55f3ddf23c5d2dp1a6d0cjsn8fe11bcbb1f8',
		'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
	}
};
let dataArray;
async function test() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        dataArray = result
        // console.log(result.prices.reduce((obj,item) => Object.assign(obj, {[item.item_name] : item}), {} ));
        // const data = (result.prices.reduce((obj,item) => Object.assign(obj, {[item.item_name] : item}), {} ))
        console.log(dataArray)
        // console.log(result.prices)
    } catch (error) {
        console.error(error);
    }
}
test()

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
  