/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/commonElements.js":
/*!*******************************!*\
  !*** ./src/commonElements.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Footer": () => (/* binding */ Footer),
/* harmony export */   "Header": () => (/* binding */ Header),
/* harmony export */   "Main": () => (/* binding */ Main)
/* harmony export */ });
var create = function create() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
  document.createElement(element);
};

var createLink = function createLink() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '_self';
  var a = create('a');
  a.href = url;
  a.target = target;
  a.textContent = text;
  return a;
};

var Header = function Header(title, logoUrl) {
  var getElement = function getElement() {
    var header = create('header');
    var h1 = create('h1');
    var link = createLink(title, logoUrl);
    h1.append(link);
    header.append(h1);
    return header;
  };

  return {
    getElement: getElement
  };
};

var Main = function Main() {
  var getElement = function getElement() {
    create('main');
  };

  return {
    getElement: getElement
  };
};

var Footer = function Footer() {
  var getGithubLogo = function getGithubLogo() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#000';
    var logoSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var logoPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    logoSvg.setAttribute('fill', color);
    logoSvg.setAttribute('viewBox', '0 0 16 16');
    logoPath.setAttribute('fill-rule', 'evenodd');
    logoPath.setAttribute('d', 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z');
    logoSvg.appendChild(logoPath);
    return logoSvg;
  };

  var getElement = function getElement() {
    var footerElement = create('footer');
    var footerText = create('p');
    footerText.textContent = 'made by: ';
    var githubLink = createLink(' robbe vanslambrouck', 'https://github.com/RobbeVanslambrouck', '_blank');
    githubLink.prepend(getGithubLogo());
    footerText.append(githubLink);
    footerElement.append(footerText);
    return footerElement;
  };

  return {
    getElement: getElement
  };
};



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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commonElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commonElements */ "./src/commonElements.js");

var homepageHeader = (0,_commonElements__WEBPACK_IMPORTED_MODULE_0__.Header)('battleship', '#').getElement();
var homepageFooter = (0,_commonElements__WEBPACK_IMPORTED_MODULE_0__.Footer)().getElement();
var homepagecontent = (0,_commonElements__WEBPACK_IMPORTED_MODULE_0__.Main)().getElement();
document.body.append(homepageHeader, homepagecontent, homepageFooter);
})();

/******/ })()
;
//# sourceMappingURL=bundle.d2e733aee5564eea4a25.js.map