"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/product/[productId]",{

/***/ "./src/components/Product/Reviews/WriteReviewBox.tsx":
/*!***********************************************************!*\
  !*** ./src/components/Product/Reviews/WriteReviewBox.tsx ***!
  \***********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WriteReviewBox: function() { return /* binding */ WriteReviewBox; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/_/_async_to_generator */ \"./node_modules/@swc/helpers/esm/_async_to_generator.js\");\n/* harmony import */ var _swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @swc/helpers/_/_define_property */ \"./node_modules/@swc/helpers/esm/_define_property.js\");\n/* harmony import */ var _swc_helpers_object_spread__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swc/helpers/_/_object_spread */ \"./node_modules/@swc/helpers/esm/_object_spread.js\");\n/* harmony import */ var _swc_helpers_object_spread_props__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swc/helpers/_/_object_spread_props */ \"./node_modules/@swc/helpers/esm/_object_spread_props.js\");\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var _swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swc/helpers/_/_ts_generator */ \"./node_modules/@swc/helpers/esm/_ts_generator.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _BannerButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../BannerButton */ \"./src/components/BannerButton.tsx\");\n/* harmony import */ var _StarRating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StarRating */ \"./src/components/Product/Reviews/StarRating.tsx\");\n\n\n\n\n\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\nvar WriteReviewBox = function(param) {\n    var productId = param.productId;\n    var createReview = function createReview() {\n        return _createReview.apply(this, arguments);\n    };\n    _s();\n    // const [rating, setRating] = useState(0);\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_4__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        id: 1,\n        created_at: Date(),\n        product_id: productId,\n        user_id: 0,\n        title: \"\",\n        content: \"\",\n        rating: 0\n    }), 2), review = _useState[0], setReview = _useState[1];\n    function _createReview() {\n        _createReview = (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_5__._)(function() {\n            var res, data;\n            return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_6__._)(this, function(_state) {\n                switch(_state.label){\n                    case 0:\n                        return [\n                            4,\n                            fetch(\"/api/reviews\", {\n                                method: \"post\",\n                                headers: {\n                                    \"Content-Type\": \"application/json\"\n                                },\n                                body: JSON.stringify({\n                                    review: review\n                                })\n                            })\n                        ];\n                    case 1:\n                        res = _state.sent();\n                        return [\n                            4,\n                            res.json()\n                        ];\n                    case 2:\n                        data = _state.sent();\n                        setReview(data);\n                        return [\n                            2\n                        ];\n                }\n            });\n        });\n        return _createReview.apply(this, arguments);\n    }\n    var handleOnChange = function(e) {\n        var _e_target = e.target, name = _e_target.name, value = _e_target.value;\n        setReview(function(oldReview) {\n            return (0,_swc_helpers_object_spread_props__WEBPACK_IMPORTED_MODULE_7__._)((0,_swc_helpers_object_spread__WEBPACK_IMPORTED_MODULE_8__._)({}, oldReview), (0,_swc_helpers_define_property__WEBPACK_IMPORTED_MODULE_9__._)({}, name, value));\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                children: \"Leave a Review:\"\n            }, void 0, false, {\n                fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/components/Product/Reviews/WriteReviewBox.tsx\",\n                lineNumber: 46,\n                columnNumber: 9\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"title-stars flex flex-row flex-wrap items-baseline  \",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"text\",\n                        placeholder: \"Title...\",\n                        value: review.title,\n                        name: \"title\",\n                        onChange: handleOnChange,\n                        className: \"w-96 border border-gray-300 rounded-md mb-8 p-2\"\n                    }, void 0, false, {\n                        fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/components/Product/Reviews/WriteReviewBox.tsx\",\n                        lineNumber: 48,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_StarRating__WEBPACK_IMPORTED_MODULE_3__.CreateStarRating, {\n                        rating: review.rating,\n                        setRating: setReview(function(old) {})\n                    }, void 0, false, {\n                        fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/components/Product/Reviews/WriteReviewBox.tsx\",\n                        lineNumber: 50,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/components/Product/Reviews/WriteReviewBox.tsx\",\n                lineNumber: 47,\n                columnNumber: 9\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                type: \"text\",\n                placeholder: \"Review content...\",\n                value: review.content,\n                name: \"content\",\n                onChange: handleOnChange,\n                className: \"w-full min-h-72 border border-gray-300 rounded-md p-2\"\n            }, void 0, false, {\n                fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/components/Product/Reviews/WriteReviewBox.tsx\",\n                lineNumber: 54,\n                columnNumber: 9\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_BannerButton__WEBPACK_IMPORTED_MODULE_2__.ButtonSquareRed, {\n                label: \"Submit\",\n                onclick: createReview\n            }, void 0, false, {\n                fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/components/Product/Reviews/WriteReviewBox.tsx\",\n                lineNumber: 55,\n                columnNumber: 9\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/lorencouse/Documents/development/React/foldy-friends/src/components/Product/Reviews/WriteReviewBox.tsx\",\n        lineNumber: 45,\n        columnNumber: 5\n    }, _this);\n};\n_s(WriteReviewBox, \"t6nxACORqDQn2WuyWHIHmhbyyb8=\");\n_c = WriteReviewBox;\nvar _c;\n$RefreshReg$(_c, \"WriteReviewBox\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9Qcm9kdWN0L1Jldmlld3MvV3JpdGVSZXZpZXdCb3gudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUM7QUFDYTtBQUNMO0FBR3hDLElBQU1JLGlCQUFpQjtRQUFHQyxrQkFBQUE7UUFhaEJDLHdCQUFBQTtlQUFBQTs7O0lBWGYsMkNBQTJDO0lBQzNDLElBQTRCTCxZQUFBQSwrREFBQUEsQ0FBQUEsK0NBQVFBLENBQWdCO1FBQ2hETSxJQUFJO1FBQ0pDLFlBQVlDO1FBQ1pDLFlBQVlMO1FBQ1pNLFNBQVM7UUFDVEMsT0FBTztRQUNQQyxTQUFTO1FBQ1RDLFFBQU87SUFDWCxRQVJPQyxTQUFxQmQsY0FBYmUsWUFBYWY7YUFVYks7UUFBQUEsZ0JBQWY7Z0JBRVFXLEtBT0FDOzs7O3dCQVBNOzs0QkFBTUMsTUFBTSxnQkFBZ0I7Z0NBQ3RDQyxRQUFRO2dDQUNSQyxTQUFTO29DQUNQLGdCQUFnQjtnQ0FDbEI7Z0NBQUdDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztvQ0FBQ1QsUUFBQUE7Z0NBQU07NEJBQ2pDOzs7d0JBTE1FLE1BQU07d0JBT0M7OzRCQUFNQSxJQUFJUSxJQUFJOzs7d0JBQXJCUCxPQUFPO3dCQUNiRixVQUFVRTs7Ozs7O1FBQ1o7ZUFYZVo7O0lBYWYsSUFBTW9CLGlCQUFpQixTQUFDQztRQUN0QixJQUFzQkEsWUFBQUEsRUFBRUMsTUFBTSxFQUF2QkMsT0FBZUYsVUFBZkUsTUFBTUMsUUFBU0gsVUFBVEc7UUFFYmQsVUFBV2UsU0FBQUE7bUJBQ1Qsc0lBQ0tBLFlBQ0gsb0VBQUNGLE1BQU1DOztJQUdiO0lBR0EscUJBQ0UsOERBQUNFOzswQkFDRyw4REFBQ0M7MEJBQUc7Ozs7OzswQkFDSiw4REFBQ0Q7Z0JBQUlFLFdBQVU7O2tDQUNmLDhEQUFDQzt3QkFBTUMsTUFBSzt3QkFBT0MsYUFBWTt3QkFBV1AsT0FBT2YsT0FBT0gsS0FBSzt3QkFBRWlCLE1BQUs7d0JBQVFTLFVBQVVaO3dCQUFnQlEsV0FBVTs7Ozs7O2tDQUVoSCw4REFBQy9CLHlEQUFnQkE7d0JBQUNXLFFBQVFDLE9BQU9ELE1BQU07d0JBQUV5QixXQUFZdkIsVUFBV3dCLFNBQUFBLE1BRWhFOzs7Ozs7Ozs7Ozs7MEJBRUEsOERBQUNMO2dCQUFNQyxNQUFLO2dCQUFPQyxhQUFZO2dCQUFvQlAsT0FBT2YsT0FBT0YsT0FBTztnQkFBRWdCLE1BQUs7Z0JBQVVTLFVBQVVaO2dCQUFnQlEsV0FBVTs7Ozs7OzBCQUM3SCw4REFBQ2hDLDBEQUFlQTtnQkFBQ3VDLE9BQU07Z0JBQVNDLFNBQVNwQzs7Ozs7Ozs7Ozs7O0FBR2pELEVBQUM7R0FwRFlGO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL1Byb2R1Y3QvUmV2aWV3cy9Xcml0ZVJldmlld0JveC50c3g/NjcyNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEJ1dHRvblNxdWFyZVJlZCB9IGZyb20gJy4uLy4uL0Jhbm5lckJ1dHRvbidcbmltcG9ydCB7IENyZWF0ZVN0YXJSYXRpbmcgfSBmcm9tICcuL1N0YXJSYXRpbmcnXG5pbXBvcnQgeyBQcm9kdWN0UmV2aWV3IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBXcml0ZVJldmlld0JveCA9ICgge3Byb2R1Y3RJZH06e3Byb2R1Y3RJZDpudW1iZXJ9ICkgPT4ge1xuXG4gIC8vIGNvbnN0IFtyYXRpbmcsIHNldFJhdGluZ10gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW3Jldmlldywgc2V0UmV2aWV3XSA9IHVzZVN0YXRlPFByb2R1Y3RSZXZpZXc+KHtcbiAgICAgIGlkOiAxLFxuICAgICAgY3JlYXRlZF9hdDogRGF0ZSgpLFxuICAgICAgcHJvZHVjdF9pZDogcHJvZHVjdElkLFxuICAgICAgdXNlcl9pZDogMCxcbiAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgY29udGVudDogXCJcIixcbiAgICAgIHJhdGluZzowLFxuICB9KVxuICBcbiAgYXN5bmMgZnVuY3Rpb24gY3JlYXRlUmV2aWV3KCkge1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9hcGkvcmV2aWV3cycsIHtcbiAgICAgIG1ldGhvZDogXCJwb3N0XCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LCBib2R5OiBKU09OLnN0cmluZ2lmeSh7cmV2aWV3fSksXG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICBzZXRSZXZpZXcoZGF0YSk7XG4gIH0gXG5cbiAgY29uc3QgaGFuZGxlT25DaGFuZ2UgPSAoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4gKSA9PiB7XG4gICAgY29uc3Qge25hbWUsIHZhbHVlfSA9IGUudGFyZ2V0O1xuXG4gICAgc2V0UmV2aWV3KCBvbGRSZXZpZXcgPT4gKFxuICAgICAge1xuICAgICAgICAuLi5vbGRSZXZpZXcsXG4gICAgICAgIFtuYW1lXTp2YWx1ZSxcbiAgICAgIH1cbiAgICApIClcbiAgfTtcblxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgICAgPGgzPkxlYXZlIGEgUmV2aWV3OjwvaDM+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGUtc3RhcnMgZmxleCBmbGV4LXJvdyBmbGV4LXdyYXAgaXRlbXMtYmFzZWxpbmUgIFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj0nVGl0bGUuLi4nIHZhbHVlPXtyZXZpZXcudGl0bGV9IG5hbWU9XCJ0aXRsZVwiIG9uQ2hhbmdlPXtoYW5kbGVPbkNoYW5nZX0gY2xhc3NOYW1lPSd3LTk2IGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1tZCBtYi04IHAtMicgLz5cbiAgICAgICAgey8qIDxJbnB1dEJveCB0eXBlPSd0ZXh0JyBwbGFjZWhvbGRlcj0nVGl0bGUuLi4nIC8+ICovfVxuICAgICAgICA8Q3JlYXRlU3RhclJhdGluZyByYXRpbmc9e3Jldmlldy5yYXRpbmd9IHNldFJhdGluZz17IHNldFJldmlldyggb2xkID0+IHtcblxuICAgICAgICB9ICl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj0nUmV2aWV3IGNvbnRlbnQuLi4nIHZhbHVlPXtyZXZpZXcuY29udGVudH0gbmFtZT1cImNvbnRlbnRcIiBvbkNoYW5nZT17aGFuZGxlT25DaGFuZ2V9IGNsYXNzTmFtZT0ndy1mdWxsIG1pbi1oLTcyIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1tZCBwLTInIC8+XG4gICAgICAgIDxCdXR0b25TcXVhcmVSZWQgbGFiZWw9J1N1Ym1pdCcgb25jbGljaz17Y3JlYXRlUmV2aWV3fSAvPlxuICAgIDwvZGl2PlxuICApXG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIkJ1dHRvblNxdWFyZVJlZCIsIkNyZWF0ZVN0YXJSYXRpbmciLCJXcml0ZVJldmlld0JveCIsInByb2R1Y3RJZCIsImNyZWF0ZVJldmlldyIsImlkIiwiY3JlYXRlZF9hdCIsIkRhdGUiLCJwcm9kdWN0X2lkIiwidXNlcl9pZCIsInRpdGxlIiwiY29udGVudCIsInJhdGluZyIsInJldmlldyIsInNldFJldmlldyIsInJlcyIsImRhdGEiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImpzb24iLCJoYW5kbGVPbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJuYW1lIiwidmFsdWUiLCJvbGRSZXZpZXciLCJkaXYiLCJoMyIsImNsYXNzTmFtZSIsImlucHV0IiwidHlwZSIsInBsYWNlaG9sZGVyIiwib25DaGFuZ2UiLCJzZXRSYXRpbmciLCJvbGQiLCJsYWJlbCIsIm9uY2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/Product/Reviews/WriteReviewBox.tsx\n"));

/***/ })

});