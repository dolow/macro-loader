(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["macro-loader"] = factory();
	else
		root["macro-loader"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parser_DefaultParser__ = __webpack_require__(1);

/*
function getParser(name: string): MacroLoader.Interface.Parser {
  const ParserClass = require(`./parser/${name}`);
  return new ParserClass();
}
*/
function load(source) {
    const options = this.query;
    // const parserName = options.parser || "DefaultParser";
    const parser = new __WEBPACK_IMPORTED_MODULE_0__parser_DefaultParser__["a" /* default */]();
    // const parser = getParser(parserName);
    parser.lineBreak = options.lineBreak || "\n";
    parser.commentStyle = options.commentStyle || "//#";
    const markers = parser.parse(source);
    if (markers.length > 0) {
        const marker = markers[0];
        let tmpSouce = source.substr(0, marker.index);
        const tail = marker.index + marker.length;
        tmpSouce += source.substr(tail, source.length - tail);
        source = tmpSouce;
    }
    return source;
}
/* harmony default export */ __webpack_exports__["default"] = (load);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__marker_DefaultMarker__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__error_ParseError__ = __webpack_require__(3);


class DefaultParser {
    constructor() {
        this.lineBreak = "\n";
        this.commentStyle = "//#";
    }
    parse(source) {
        const markers = [];
        const markerStack = [];
        let macroIndex = source.indexOf(this.commentStyle);
        while (macroIndex !== -1) {
            let macroTail = source.indexOf(this.lineBreak, macroIndex);
            if (macroTail === -1) {
                // EOF
                macroTail = source.length;
            }
            const macroBeginIndex = macroIndex + this.commentStyle.length;
            const macroLength = macroTail - macroIndex - this.commentStyle.length;
            const macroContent = source.substr(macroBeginIndex, macroLength);
            const marker = new __WEBPACK_IMPORTED_MODULE_0__marker_DefaultMarker__["a" /* default */](macroContent, macroIndex);
            // line like "//#\n"
            if (marker.statement === undefined) {
                continue;
            }
            // TODO: export rules
            switch (marker.statement) {
                case "ifdef":
                case "ifndef": {
                    markers.push(marker);
                    markerStack.push(marker);
                    break;
                }
                case "endif": {
                    if (markerStack.length === 0) {
                        throw new __WEBPACK_IMPORTED_MODULE_1__error_ParseError__["a" /* default */]();
                    }
                    else {
                        const currentMarker = markerStack.pop();
                        if (currentMarker === undefined) {
                            throw new __WEBPACK_IMPORTED_MODULE_1__error_ParseError__["a" /* default */]();
                        }
                        else {
                            currentMarker.length = macroTail - currentMarker.index;
                        }
                    }
                    break;
                }
                case "define":
                    markers.push(marker);
                    break;
                default: break;
            }
            macroIndex = source.indexOf(this.commentStyle, macroIndex + 1);
            if (macroIndex >= source.length) {
                // EOF
                break;
            }
        }
        if (markerStack.length > 0) {
            throw new __WEBPACK_IMPORTED_MODULE_1__error_ParseError__["a" /* default */]();
        }
        return markers;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DefaultParser;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DefaultMarker {
    constructor(content, index) {
        this.statement = "";
        this.arguments = [];
        this.index = -1;
        this.length = -1;
        this.arguments = this.parse(content);
        if (this.arguments.length === 0) {
            return;
        }
        const statement = this.arguments.shift();
        if (statement === undefined) {
            return;
        }
        this.statement = statement;
        this.index = index;
        this.length = content.length;
    }
    hasBlock() {
        return this.length >= 0;
    }
    /**
     * @params content would be like "ifdef MY_DEF"
     */
    parse(content) {
        let elements = [];
        // to array like ["ifdef", "MY_DEF"]
        elements = content.trim().split(" ").filter((element) => element.length > 0);
        if (elements.length === 0) {
            return elements;
        }
        // elements are definitions
        return elements;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DefaultMarker;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ParseError extends Error {
    constructor(code, description) {
        let message = "";
        if (code !== undefined && description !== undefined) {
            message += code + description;
        }
        super(message);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ParseError;



/***/ })
/******/ ]);
});