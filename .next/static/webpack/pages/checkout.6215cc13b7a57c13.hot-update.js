"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/checkout",{

/***/ "./src/pages/Checkout.tsx":
/*!********************************!*\
  !*** ./src/pages/Checkout.tsx ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Components_Checkout_CheckoutInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Components/Checkout/CheckoutInfo */ \"./src/Components/Checkout/CheckoutInfo.tsx\");\n/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @stripe/react-stripe-js */ \"./node_modules/@stripe/react-stripe-js/dist/react-stripe.umd.js\");\n/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @stripe/stripe-js */ \"./node_modules/@stripe/stripe-js/lib/index.mjs\");\n/* harmony import */ var _components_BannerButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/BannerButton */ \"./src/components/BannerButton.tsx\");\n/* harmony import */ var _components_Navbar_MiniCart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Navbar/MiniCart */ \"./src/components/Navbar/MiniCart.tsx\");\n/* provided dependency */ var process = __webpack_require__(/*! process */ \"./node_modules/next/dist/build/polyfills/process.js\");\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\nvar stripePromise = (0,_stripe_stripe_js__WEBPACK_IMPORTED_MODULE_4__.loadStripe)(\"pk_test_TYooMQauvdEDq54NiTphI7jx\");\nvar Checkout = function() {\n    _s();\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_7__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), 2), billing = _useState[0], setBilling = _useState[1];\n    var options = {\n        // passing the client secret obtained from the server\n        clientSecret: process.env.STRIPE_SECRET_KEY\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_3__.Elements, {\n        stripe: stripePromise,\n        options: options,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"checkout-container max-w-5xl m-auto \",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-row flex-wrap md:grid md:grid-cols-2 justify-around \",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"checkout-left-col flex flex-col\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Components_Checkout_CheckoutInfo__WEBPACK_IMPORTED_MODULE_2__.CheckoutInfo, {\n                                heading: \"Shipping Details\"\n                            }, void 0, false, {\n                                fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/pages/Checkout.tsx\",\n                                lineNumber: 27,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"billing-checkbox flex items-center font-semibold ml-2\",\n                                onClick: function() {\n                                    return setBilling(!billing);\n                                },\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                        type: \"checkbox\",\n                                        checked: billing\n                                    }, void 0, false, {\n                                        fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/pages/Checkout.tsx\",\n                                        lineNumber: 29,\n                                        columnNumber: 13\n                                    }, _this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                        children: \"Enter Seperate Billing Details\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/pages/Checkout.tsx\",\n                                        lineNumber: 30,\n                                        columnNumber: 13\n                                    }, _this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/pages/Checkout.tsx\",\n                                lineNumber: 28,\n                                columnNumber: 11\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/pages/Checkout.tsx\",\n                        lineNumber: 26,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"checkout-right-col flex flex-col justify-around \",\n                        children: [\n                            billing && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"w-full\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Components_Checkout_CheckoutInfo__WEBPACK_IMPORTED_MODULE_2__.CheckoutInfo, {\n                                    heading: \"Billing Deatils\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/pages/Checkout.tsx\",\n                                    lineNumber: 38,\n                                    columnNumber: 11\n                                }, _this)\n                            }, void 0, false, {\n                                fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/pages/Checkout.tsx\",\n                                lineNumber: 37,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar_MiniCart__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                                fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/pages/Checkout.tsx\",\n                                lineNumber: 42,\n                                columnNumber: 11\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex place-order-button w-full items-center justify-center \",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_BannerButton__WEBPACK_IMPORTED_MODULE_5__.ButtonSquareRed, {\n                                    label: \"Place Order\",\n                                    onclick: function() {}\n                                }, void 0, false, {\n                                    fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/pages/Checkout.tsx\",\n                                    lineNumber: 45,\n                                    columnNumber: 13\n                                }, _this)\n                            }, void 0, false, {\n                                fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/pages/Checkout.tsx\",\n                                lineNumber: 44,\n                                columnNumber: 11\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/pages/Checkout.tsx\",\n                        lineNumber: 34,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/pages/Checkout.tsx\",\n                lineNumber: 25,\n                columnNumber: 5\n            }, _this)\n        }, void 0, false, {\n            fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/pages/Checkout.tsx\",\n            lineNumber: 24,\n            columnNumber: 5\n        }, _this)\n    }, void 0, false, {\n        fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/pages/Checkout.tsx\",\n        lineNumber: 23,\n        columnNumber: 5\n    }, _this);\n};\n_s(Checkout, \"dKkdvlA2oG8x6sz8DA1IGC0Pcow=\");\n_c = Checkout;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Checkout);\nvar _c;\n$RefreshReg$(_c, \"Checkout\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvQ2hlY2tvdXQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVDO0FBQzJCO0FBQ2hCO0FBQ0o7QUFFZTtBQUNSO0FBRXJELElBQU1PLGdCQUFnQkgsNkRBQVVBLENBQUM7QUFHakMsSUFBTUksV0FBVzs7SUFFZixJQUErQlAsWUFBQUEsK0RBQUFBLENBQUFBLCtDQUFRQSxDQUFVLFlBQXpDUSxVQUF1QlIsY0FBZFMsYUFBY1Q7SUFHN0IsSUFBTVUsVUFBVTtRQUNoQixxREFBcUQ7UUFDckRDLGNBQWNDLE9BQU9BLENBQUNDLEdBQUcsQ0FBQ0MsaUJBQWlCO0lBQzdDO0lBRUEscUJBQ0UsOERBQUNaLDZEQUFRQTtRQUFDYSxRQUFRVDtRQUFlSSxTQUFTQTtrQkFDMUMsNEVBQUNNO1lBQUlDLFdBQVU7c0JBQ2YsNEVBQUNEO2dCQUFJQyxXQUFVOztrQ0FDWCw4REFBQ0Q7d0JBQUlDLFdBQVU7OzBDQUNiLDhEQUFDaEIsMkVBQVlBO2dDQUFDaUIsU0FBUTs7Ozs7OzBDQUN0Qiw4REFBQ0Y7Z0NBQUlDLFdBQVU7Z0NBQXdERSxTQUFTOzJDQUFNVixXQUFZLENBQUNEOzs7a0RBQ2pHLDhEQUFDWTt3Q0FBTUMsTUFBSzt3Q0FBWUMsU0FBU2Q7Ozs7OztrREFDakMsOERBQUNlO2tEQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBSVosOERBQUNQO3dCQUFJQyxXQUFVOzs0QkFFWFQseUJBQ0YsOERBQUNRO2dDQUFJQyxXQUFVOzBDQUNmLDRFQUFDaEIsMkVBQVlBO29DQUFDaUIsU0FBUTs7Ozs7Ozs7Ozs7MENBSXRCLDhEQUFDYixtRUFBUUE7Ozs7OzBDQUVULDhEQUFDVztnQ0FBSUMsV0FBVTswQ0FDYiw0RUFBQ2IscUVBQWVBO29DQUFDbUIsT0FBTTtvQ0FBY0MsU0FBUyxZQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZakU7R0E3Q01qQjtLQUFBQTtBQStDTiwrREFBZUEsUUFBUUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvQ2hlY2tvdXQudHN4P2IyZmMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBDaGVja291dEluZm8gfSBmcm9tICcuLi9Db21wb25lbnRzL0NoZWNrb3V0L0NoZWNrb3V0SW5mbydcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnQHN0cmlwZS9yZWFjdC1zdHJpcGUtanMnXG5pbXBvcnQgeyBsb2FkU3RyaXBlIH0gZnJvbSAnQHN0cmlwZS9zdHJpcGUtanMnXG5pbXBvcnQgeyBQYXltZW50SW5mbyB9IGZyb20gJy4uL0NvbXBvbmVudHMvQ2hlY2tvdXQvUGF5bWVudEluZm8nO1xuaW1wb3J0IHsgQnV0dG9uU3F1YXJlUmVkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9CYW5uZXJCdXR0b24nO1xuaW1wb3J0IE1pbmlDYXJ0IGZyb20gJy4uL2NvbXBvbmVudHMvTmF2YmFyL01pbmlDYXJ0JztcblxuY29uc3Qgc3RyaXBlUHJvbWlzZSA9IGxvYWRTdHJpcGUoJ3BrX3Rlc3RfVFlvb01RYXV2ZEVEcTU0TmlUcGhJN2p4J1xuKTtcblxuY29uc3QgQ2hlY2tvdXQgPSAoKSA9PiB7XG5cbiAgY29uc3QgWyBiaWxsaW5nLCBzZXRCaWxsaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAvLyBwYXNzaW5nIHRoZSBjbGllbnQgc2VjcmV0IG9idGFpbmVkIGZyb20gdGhlIHNlcnZlclxuICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuU1RSSVBFX1NFQ1JFVF9LRVksXG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8RWxlbWVudHMgc3RyaXBlPXtzdHJpcGVQcm9taXNlfSBvcHRpb25zPXtvcHRpb25zfT5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNoZWNrb3V0LWNvbnRhaW5lciBtYXgtdy01eGwgbS1hdXRvIFwiPiBcbiAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleCBmbGV4LXJvdyBmbGV4LXdyYXAgbWQ6Z3JpZCBtZDpncmlkLWNvbHMtMiBqdXN0aWZ5LWFyb3VuZCAnPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoZWNrb3V0LWxlZnQtY29sIGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICA8Q2hlY2tvdXRJbmZvIGhlYWRpbmc9XCJTaGlwcGluZyBEZXRhaWxzXCIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJpbGxpbmctY2hlY2tib3ggZmxleCBpdGVtcy1jZW50ZXIgZm9udC1zZW1pYm9sZCBtbC0yXCIgb25DbGljaz17KCkgPT4gc2V0QmlsbGluZyggIWJpbGxpbmcpfT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAgY2hlY2tlZD17YmlsbGluZ30gICAvPlxuICAgICAgICAgICAgPGxhYmVsID5FbnRlciBTZXBlcmF0ZSBCaWxsaW5nIERldGFpbHM8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoZWNrb3V0LXJpZ2h0LWNvbCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYXJvdW5kIFwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsgYmlsbGluZyAmJiBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndy1mdWxsJz5cbiAgICAgICAgICA8Q2hlY2tvdXRJbmZvIGhlYWRpbmc9J0JpbGxpbmcgRGVhdGlscycgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgPE1pbmlDYXJ0IC8+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggcGxhY2Utb3JkZXItYnV0dG9uIHctZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgXCI+XG4gICAgICAgICAgICA8QnV0dG9uU3F1YXJlUmVkIGxhYmVsPSdQbGFjZSBPcmRlcicgb25jbGljaz17KCkgPT4ge319IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICBcbiAgICA8L2Rpdj5cblxuXG4gICAgXG4gICAgPC9kaXY+XG4gICAgPC9FbGVtZW50cz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGVja291dDtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiQ2hlY2tvdXRJbmZvIiwiRWxlbWVudHMiLCJsb2FkU3RyaXBlIiwiQnV0dG9uU3F1YXJlUmVkIiwiTWluaUNhcnQiLCJzdHJpcGVQcm9taXNlIiwiQ2hlY2tvdXQiLCJiaWxsaW5nIiwic2V0QmlsbGluZyIsIm9wdGlvbnMiLCJjbGllbnRTZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiU1RSSVBFX1NFQ1JFVF9LRVkiLCJzdHJpcGUiLCJkaXYiLCJjbGFzc05hbWUiLCJoZWFkaW5nIiwib25DbGljayIsImlucHV0IiwidHlwZSIsImNoZWNrZWQiLCJsYWJlbCIsIm9uY2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/Checkout.tsx\n"));

/***/ })

});