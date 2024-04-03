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

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getTodo: () => (/* binding */ getTodo),\n/* harmony export */   postTodo: () => (/* binding */ postTodo)\n/* harmony export */ });\nfunction getTodo() {\n\n  return fetch(\"https://wedev-api.sky.pro/api/v2/fnami/comments\", {\n    method: \"GET\"\n  })\n    .then((response) => {\n      if (response.status === 200) {\n        return response.json()\n      } else if (response.status === 500) {\n        alert(\"Сервер сломался, попробуй позже 😕\")\n        throw new Error(\"Ошибка сервира (500)\")\n      } else {\n        alert(\"Кажется, что то пошло не так. Попробуйде другой раз\")\n        throw new Error(\"Ошибка\")\n      }\n    })\n}\n\nfunction postTodo({ nameElement, textElement }) {\n  const token = `Bearer ${localStorage.getItem(\"token\")}`;\n  return fetch(\"https://wedev-api.sky.pro/api/v2/fnami/comments\", {\n    method: \"POST\",\n    headers: {\n      Authorization: token,\n    },\n    body: JSON.stringify({\n      name: nameElement.value\n        .replaceAll(\"&\", \"&amp;\")\n        .replaceAll(\"<\", \"&lt;\")\n        .replaceAll(\">\", \"&gt;\")\n        .replaceAll('\"', \"&quot;\"),\n      text: textElement.value\n        .replaceAll(\"&\", \"&amp;\")\n        .replaceAll(\"<\", \"&lt;\")\n        .replaceAll(\">\", \"&gt;\")\n        .replaceAll('\"', \"&quot;\"),\n      forceError: true\n    })\n  })\n    .then((response) => {\n      if (response.status === 201) {\n        return response.json()\n      } else if (response.status === 500) {\n        alert(\"Сервер сломался, попробуй позже 😕\")\n        throw new Error(\"Ошибка сервира (500)\")\n      } else if (response.status === 400) {\n        alert(\"Врят ли ваше имя состоит из двух букв. Введите текст и имя не менее 3 букв.\")\n        throw new Error(\"Ошибка ввода\")\n      } else {\n        alert(\"Кажется, что-то не так. Попробуйте в другой раз\")\n        throw new Error(\"Ошибка\")\n      }\n    })\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./api.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../api.js */ \"./api.js\");\n/* harmony import */ var _secondary_functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../../secondary-functions.js */ \"./secondary-functions.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../render.js */ \"./render.js\");\n\n\n\n\nconst buttonAdd = document.getElementById('comment-button');\nconst nameElement = document.getElementById('comment-author');\nconst textElement = document.getElementById('comment-text');\n\nlet comments = [];\nlet firstLaunch = true;\n\nconst reguestAPI = () => {\n  (0,_secondary_functions_js__WEBPACK_IMPORTED_MODULE_1__.cheakOnline)()\n  ;(0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getTodo)().then((responseData) => {\n    comments = responseData.comments;\n    firstLaunch = false;\n    (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.renderComments)({firstLaunch,comments});\n  })\n  .catch((error) => {\n    buttonAdd.disabled = false;\n    buttonAdd.textContent = \"Написать\";\n    firstLaunch = true;\n  });\n};\n\nreguestAPI();\n\n(0,_render_js__WEBPACK_IMPORTED_MODULE_2__.renderComments)({firstLaunch,comments})\n\nbuttonAdd.addEventListener(\"click\", () => {\n\n  nameElement.classList.remove(\"error\");\n  textElement.classList.remove(\"error\");\n  buttonAdd.classList.remove(\"error-for-button\");\n\n  let regexp = new RegExp('^[^ ]');\n\n  if (nameElement.value === \"\" || textElement.value === \"\" || !regexp.test(nameElement.value) || !regexp.test(textElement.value)) {\n    nameElement.classList.add(\"error\");\n    textElement.classList.add(\"error\");\n    buttonAdd.classList.add(\"error-for-button\");\n    return;\n  }\n\n  buttonAdd.disabled = true;\n  buttonAdd.textContent = \"Ожидайте\";\n\n  (0,_secondary_functions_js__WEBPACK_IMPORTED_MODULE_1__.cheakOnline)()\n\n  ;(0,_api_js__WEBPACK_IMPORTED_MODULE_0__.postTodo)({ nameElement,textElement }).then((responseData) => {\n    comments = responseData.comments;\n    reguestAPI();\n    nameElement.value = \"\";\n    textElement.value = \"\";\n    buttonAdd.disabled = false;\n    buttonAdd.textContent = \"Написать\";\n  })\n  .catch((error) => {\n    buttonAdd.disabled = false;\n    buttonAdd.textContent = \"Написать\";\n  })\n    \n  reguestAPI();\n});\n\n//# sourceURL=webpack://webdev-dom-homework/./main.js?");

/***/ }),

/***/ "./render.js":
/*!*******************!*\
  !*** ./render.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderComments: () => (/* binding */ renderComments)\n/* harmony export */ });\n/* harmony import */ var _secondary_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../secondary-functions.js */ \"./secondary-functions.js\");\nconst commentItems = document.getElementById('comments');\n\n\n\nfunction renderComments({firstLaunch,comments}) {\n    if (firstLaunch) {\n      if (!navigator.onLine) {\n        commentItems.innerHTML = `<p>Извините, но у вас проблемы с интернетом 😕</p>`;\n      } else {\n        commentItems.innerHTML = `Подождите, коментарии загружаются ...`;\n      }\n    } else{\n      const commentHtml = comments.map((comment, index) => {\n      let dateNoFormat = new Date(comment.date)\n  \n      let dateString = (0,_secondary_functions_js__WEBPACK_IMPORTED_MODULE_0__.twoDigits)(dateNoFormat.getDate()) + \".\" + (0,_secondary_functions_js__WEBPACK_IMPORTED_MODULE_0__.twoDigits)(dateNoFormat.getMonth() + 1) + \".\" + dateNoFormat.getFullYear() + \" \" + (0,_secondary_functions_js__WEBPACK_IMPORTED_MODULE_0__.twoDigits)(dateNoFormat.getHours()) + \":\" + (0,_secondary_functions_js__WEBPACK_IMPORTED_MODULE_0__.twoDigits)(dateNoFormat.getMinutes())\n  \n      if (Boolean(comment.isLiked)) {\n        return `<li class=\"comment\" data-index=\"${index}\">\n          <div class=\"comment-header\">\n            <div>${comment.author.name}</div>\n            <div>${dateString}</div>\n          </div>\n          <div class=\"comment-body\">\n            <div class=\"comment-text\">\n              ${comment.text}\n            </div>\n          </div>\n          <div class=\"comment-footer\">\n            <div class=\"likes\">\n              <span class=\"likes-counter\">${comment.likes}</span>\n              <button class=\"like-button -active-like\" data-index=\"${index}\" data-position=\"${comment.isLiked}\"></button>\n            </div>\n          </div>\n        </li>`;\n      } else {\n        return `<li class=\"comment\" data-index=\"${index}\">\n          <div class=\"comment-header\">\n            <div>${comment.author.name}</div>\n            <div>${dateString}</div>\n          </div>\n          <div class=\"comment-body\">\n            <div class=\"comment-text\">\n              ${comment.text}\n            </div>\n          </div>\n          <div class=\"comment-footer\">\n            <div class=\"likes\">\n              <span class=\"likes-counter\">${comment.likes}</span>\n              <button class=\"like-button\" data-index=\"${index}\" data-position=\"${comment.isLiked}\"></button>\n            </div>\n          </div>\n        </li>`;\n      }\n      }).join(\"\");\n  \n      commentItems.innerHTML = commentHtml;\n  \n      const buttonLikes = document.querySelectorAll('.like-button')\n  \n      for (const button of buttonLikes) {\n        button.addEventListener(\"click\", (event) => {\n          event.stopPropagation();\n  \n          const index = Number(button.dataset.index);\n  \n          let position = Boolean(Number(comments[index].isLiked));\n                \n          position = !position;\n                \n          if (position) {\n            comments[index].likes = comments[index].likes + 1;\n            comments[index].isLiked = Boolean(1);\n            renderComments({firstLaunch,comments});\n          }\n          if (!position) {\n            comments[index].likes = comments[index].likes - 1;\n            comments[index].isLiked = Boolean(0);\n            renderComments({firstLaunch,comments});\n          }\n        })\n      }\n  \n      const commentElement = document.querySelectorAll(\".comment\")\n  \n      for (const comment of commentElement) {\n        comment.addEventListener(\"click\", (event) => {\n          event.stopPropagation();\n  \n          const index = Number(comment.dataset.index);\n  \n          textElement.value = `↪️ ${comments[index].text}\\n\\n${comments[index].author.name}, `;\n        })\n      }\n    }\n  }\n\n//# sourceURL=webpack://webdev-dom-homework/./render.js?");

/***/ }),

/***/ "./secondary-functions.js":
/*!********************************!*\
  !*** ./secondary-functions.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   cheakOnline: () => (/* binding */ cheakOnline),\n/* harmony export */   twoDigits: () => (/* binding */ twoDigits)\n/* harmony export */ });\nfunction cheakOnline() {if (!navigator.onLine) {\n    alert(\"Извините, но у вас проблемы с интернетом 😕\")\n    commentItems.innerHTML = `<p>Извините, но у вас проблемы с интернетом 😕</p>`;\n    buttonAdd.disabled = false;\n    buttonAdd.textContent = \"Написать\";\n  }} \n\nfunction twoDigits(num) {\n    if( num >= 0 && num <= 9) {\n      return \"0\" + num;\n    } else { \n      return \"\" + num;\n    }\n  }\n\n//# sourceURL=webpack://webdev-dom-homework/./secondary-functions.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;