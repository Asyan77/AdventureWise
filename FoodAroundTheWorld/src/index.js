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


const url = 'https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=Taipei&country_name=Taiwan';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e377e81e46mshc55f3ddf23c5d2dp1a6d0cjsn8fe11bcbb1f8',
		'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
	}
};

async function test() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result.prices.reduce((obj,item) => Object.assign(obj, {[item.item_name] : item}), {} ));
        const data = (result.prices.reduce((obj,item) => Object.assign(obj, {[item.item_name] : item}), {} ))
        console.log(data["Meal in Inexpensive Restaurant"].usd.avg)
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
        gdp: {
          name: 'GDP per capita',
          format: '{0} USD',
          thousandSeparator: ',',
          thresholdMax: 50000,
          thresholdMin: 1000
        },
        change: {
          name: 'Change to year before',
          format: '{0} %'
        }
      },
      applyData: 'gdp',
      values: {
        AF: {gdp: 587, change: 4.73},
        AL: {gdp: 4583, change: 11.09},
        DZ: {gdp: 4293, change: 10.01}
        // ...
      }
    }
  });
  