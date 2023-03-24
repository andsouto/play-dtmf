/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_DtmfPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/DtmfPlayer */ \"../src/DtmfPlayer.ts\");\n\nlet dtmfPlayer;\nconst startButton = document.getElementById('start');\nif (startButton) {\n    startButton.onclick = onStart;\n}\nfunction onStart() {\n    if (!dtmfPlayer) {\n        const audioContext = new AudioContext();\n        dtmfPlayer = new _src_DtmfPlayer__WEBPACK_IMPORTED_MODULE_0__.DtmfPlayer(audioContext);\n    }\n    const tone = dtmfPlayer.play('1');\n    tone.stop(0.5);\n}\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "../src/DtmfPlayer.ts":
/*!****************************!*\
  !*** ../src/DtmfPlayer.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DtmfPlayer\": () => (/* binding */ DtmfPlayer)\n/* harmony export */ });\nclass DtmfPlayer {\n    audioContext;\n    constructor(audioContext) {\n        this.audioContext = audioContext;\n    }\n    play(key) {\n        switch (key) {\n            case '1': return this.playTone(697, 1209);\n            case '2': return this.playTone(697, 1336);\n            case '3': return this.playTone(697, 1477);\n            case '4': return this.playTone(770, 1209);\n            case '5': return this.playTone(770, 1336);\n            case '6': return this.playTone(770, 1477);\n            case '7': return this.playTone(852, 1209);\n            case '8': return this.playTone(852, 1336);\n            case '9': return this.playTone(852, 1477);\n            case '*': return this.playTone(941, 1209);\n            case '0': return this.playTone(941, 1336);\n            case '#': return this.playTone(941, 1477);\n            case 'A': return this.playTone(697, 1633);\n            case 'B': return this.playTone(770, 1633);\n            case 'C': return this.playTone(852, 1633);\n            case 'D': return this.playTone(941, 1633);\n        }\n    }\n    playTone(freq1, freq2) {\n        const audioContext = this.audioContext;\n        const gainNode = audioContext.createGain();\n        gainNode.gain.value = .1;\n        const oscillator1 = audioContext.createOscillator();\n        oscillator1.type = 'sine';\n        oscillator1.frequency.value = freq1;\n        oscillator1.connect(gainNode);\n        const oscillator2 = audioContext.createOscillator();\n        oscillator2.type = 'sine';\n        oscillator2.frequency.value = freq2;\n        oscillator2.connect(gainNode);\n        gainNode.connect(audioContext.destination);\n        oscillator1.start();\n        oscillator2.start();\n        return {\n            stop(when = 0) {\n                oscillator2.onended = () => gainNode.disconnect();\n                oscillator1.stop(audioContext.currentTime + when);\n                oscillator2.stop(audioContext.currentTime + when);\n            }\n        };\n    }\n}\n\n\n//# sourceURL=webpack:///../src/DtmfPlayer.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;