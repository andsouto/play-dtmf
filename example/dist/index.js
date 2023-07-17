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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_PhoneTonePlayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/PhoneTonePlayer.js */ \"../src/PhoneTonePlayer.ts\");\n\nlet _phoneTonePlayer;\nfunction getPhoneTonePlayer() {\n    if (!_phoneTonePlayer) {\n        const audioContext = new AudioContext();\n        _phoneTonePlayer = new _src_PhoneTonePlayer_js__WEBPACK_IMPORTED_MODULE_0__.PhoneTonePlayer(audioContext);\n    }\n    return _phoneTonePlayer;\n}\n// Button handlers //\n/////////////////////\nconst dtmfButton = document.getElementById('dtmf');\nif (dtmfButton) {\n    dtmfButton.onclick = playDtmf;\n}\nconst ringingButton = document.getElementById('ringing');\nif (ringingButton) {\n    ringingButton.onclick = playRinging;\n}\nconst stopRingingButton = document.getElementById('stop-ringing');\nif (stopRingingButton) {\n    stopRingingButton.onclick = stopRinging;\n}\nconst busyToneButton = document.getElementById('busy-tone');\nif (busyToneButton) {\n    busyToneButton.onclick = playBusyTone;\n}\nconst stopBusyToneButton = document.getElementById('stop-busy-tone');\nif (stopBusyToneButton) {\n    stopBusyToneButton.onclick = stopBusyTone;\n}\n// DTMF //\n//////////\nfunction playDtmf() {\n    const phoneTonePlayer = getPhoneTonePlayer();\n    const tone = phoneTonePlayer.playDtmf('1');\n    tone.stop(0.5);\n}\n// Ringing //\n/////////////\nlet ringingTone;\nfunction playRinging() {\n    const phoneTonePlayer = getPhoneTonePlayer();\n    ringingTone = phoneTonePlayer.playRinging();\n}\nfunction stopRinging() {\n    ringingTone?.stop();\n}\n// Busy //\n/////////////\nlet busyTone;\nfunction playBusyTone() {\n    console.warn('x');\n    const phoneTonePlayer = getPhoneTonePlayer();\n    busyTone = phoneTonePlayer.playBusyTone();\n}\nfunction stopBusyTone() {\n    busyTone?.stop();\n}\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "../src/PhoneTonePlayer.ts":
/*!*********************************!*\
  !*** ../src/PhoneTonePlayer.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PhoneTonePlayer: () => (/* binding */ PhoneTonePlayer)\n/* harmony export */ });\n// Tone reference: https://www.etsi.org/deliver/etsi_tr/101000_101099/10104102/01.01.01_60/tr_10104102v010101p.pdf\nclass PhoneTonePlayer {\n    audioContext;\n    config;\n    constructor(audioContext, config = { gain: 0.1 }) {\n        this.audioContext = audioContext;\n        this.config = config;\n    }\n    /**\n     * Reproduces a DTMF tone\n     * @param key The DTMF tone that wants to be played\n     */\n    playDtmf(key) {\n        switch (key) {\n            case '1': return this.playDtmfTone(697, 1209);\n            case '2': return this.playDtmfTone(697, 1336);\n            case '3': return this.playDtmfTone(697, 1477);\n            case '4': return this.playDtmfTone(770, 1209);\n            case '5': return this.playDtmfTone(770, 1336);\n            case '6': return this.playDtmfTone(770, 1477);\n            case '7': return this.playDtmfTone(852, 1209);\n            case '8': return this.playDtmfTone(852, 1336);\n            case '9': return this.playDtmfTone(852, 1477);\n            case '*': return this.playDtmfTone(941, 1209);\n            case '0': return this.playDtmfTone(941, 1336);\n            case '#': return this.playDtmfTone(941, 1477);\n            case 'A': return this.playDtmfTone(697, 1633);\n            case 'B': return this.playDtmfTone(770, 1633);\n            case 'C': return this.playDtmfTone(852, 1633);\n            case 'D': return this.playDtmfTone(941, 1633);\n        }\n    }\n    /**\n     * Reproduces a spanish ringing tone:\n     *  Cadence: 1,5 - 3,0 s\n     *  Period: 4,5 s\n     *  Frequency: 425 Hz\n     */\n    playRinging() {\n        return this.playTone([1.5, 4.5], 425);\n    }\n    /**\n     * Reproduces a spanish busy tone:\n     *  Cadence: 0,2 - 0,2 s\n     *  Period: 0,4 s\n     *  Frequency: 425 Hz\n     */\n    playBusyTone() {\n        return this.playTone([0.2, 0.2], 425);\n    }\n    createOscillator(frequency, type = 'sine') {\n        return new OscillatorNode(this.audioContext, { type, frequency });\n    }\n    createLFO(onTime, offTime) {\n        const period = onTime + offTime;\n        const channels = 1;\n        const sampleRate = this.audioContext.sampleRate;\n        const frameCount = sampleRate * period;\n        const arrayBuffer = this.audioContext.createBuffer(channels, frameCount, sampleRate);\n        var bufferData = arrayBuffer.getChannelData(0);\n        for (let i = 0; i < frameCount; i++) {\n            if ((i / sampleRate > 0 && i / sampleRate < onTime)) {\n                bufferData[i] = 0.25;\n            }\n        }\n        const bufferSource = this.audioContext.createBufferSource();\n        bufferSource.buffer = arrayBuffer;\n        bufferSource.loop = true;\n        return bufferSource;\n    }\n    playDtmfTone(freq1, freq2) {\n        const gainNode = new GainNode(this.audioContext, { gain: this.config.gain });\n        gainNode.connect(this.audioContext.destination);\n        const oscillator1 = this.createOscillator(freq1);\n        const oscillator2 = this.createOscillator(freq2);\n        oscillator1.connect(gainNode);\n        oscillator2.connect(gainNode);\n        oscillator1.start();\n        oscillator2.start();\n        const audioContext = this.audioContext;\n        return {\n            stop(when = 0) {\n                oscillator2.onended = () => gainNode.disconnect();\n                oscillator1.stop(audioContext.currentTime + when);\n                oscillator2.stop(audioContext.currentTime + when);\n            }\n        };\n    }\n    playTone(cadence, frequency) {\n        const gain = this.config.gain;\n        const gainNode = new GainNode(this.audioContext, { gain });\n        gainNode.connect(this.audioContext.destination);\n        gainNode.gain.value = 0;\n        const oscillator = this.createOscillator(frequency);\n        const lfo = this.createLFO(...cadence);\n        lfo.connect(gainNode.gain);\n        oscillator.connect(gainNode);\n        oscillator.start();\n        lfo.start();\n        return {\n            stop() {\n                lfo.stop();\n                oscillator.stop();\n                gainNode.disconnect();\n            }\n        };\n    }\n}\n\n\n//# sourceURL=webpack:///../src/PhoneTonePlayer.ts?");

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