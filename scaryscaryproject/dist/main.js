/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("// const blah blah = document.querySelector\n\n// const url = 'https://cost-of-living-and-prices.p.rapidapi.com/cities';\n// const options = {\n// \tmethod: 'GET',\n// \theaders: {\n// \t\t'X-RapidAPI-Key': 'e377e81e46mshc55f3ddf23c5d2dp1a6d0cjsn8fe11bcbb1f8',\n// \t\t'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'\n// \t}\n// };\n\n// async function test() {\n//     try {\n//         const response = await fetch(url, options);\n//         const result = await response.text();\n//         console.log(result);\n//     } catch (error) {\n//         console.error(error);\n//     }\n// }\n// test()\n\n\nconst url = 'https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=Taipei&country_name=Taiwan';\nconst options = {\n\tmethod: 'GET',\n\theaders: {\n\t\t'X-RapidAPI-Key': 'e377e81e46mshc55f3ddf23c5d2dp1a6d0cjsn8fe11bcbb1f8',\n\t\t'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'\n\t}\n};\n\nasync function test() {\n    try {\n        const response = await fetch(url, options);\n        const result = await response.json();\n        // console.log(result.prices.reduce((obj,item) => Object.assign(obj, {[item.item_name] : item}), {} ));\n        const data = (result.prices.reduce((obj,item) => Object.assign(obj, {[item.item_name] : item}), {} ))\n        console.log(data[\"Meal in Inexpensive Restaurant\"].usd.avg)\n        // console.log(result.prices)\n    } catch (error) {\n        console.error(error);\n    }\n}\ntest()\n\n//# sourceURL=webpack://scaryscaryproject/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;