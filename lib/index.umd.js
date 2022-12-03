(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof exports === 'object') exports['index'] = factory();
  else root['index'] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
  return /******/ (function() {
    // webpackBootstrap
    /******/ 'use strict'; // The require scope
    /******/ /******/ var __webpack_require__ = {}; /* webpack/runtime/define property getters */
    /******/

    /************************************************************************/
    /******/ /******/ !(function() {
      /******/ // define getter functions for harmony exports
      /******/ __webpack_require__.d = function(exports, definition) {
        /******/ for (var key in definition) {
          /******/ if (
            __webpack_require__.o(definition, key) &&
            !__webpack_require__.o(exports, key)
          ) {
            /******/ Object.defineProperty(exports, key, {
              enumerable: true,
              get: definition[key],
            });
            /******/
          }
          /******/
        }
        /******/
      };
      /******/
    })(); /* webpack/runtime/hasOwnProperty shorthand */
    /******/

    /******/ /******/ !(function() {
      /******/ __webpack_require__.o = function(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      };
      /******/
    })(); /* webpack/runtime/make namespace object */
    /******/

    /******/ /******/ !(function() {
      /******/ // define __esModule on exports
      /******/ __webpack_require__.r = function(exports) {
        /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/ Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module',
          });
          /******/
        }
        /******/ Object.defineProperty(exports, '__esModule', { value: true });
        /******/
      };
      /******/
    })(); /* webpack/runtime/publicPath */
    /******/

    /******/ /******/ !(function() {
      /******/ __webpack_require__.p = '';
      /******/
    })();
    /******/

    /************************************************************************/
    var __webpack_exports__ = {};
    // ESM COMPAT FLAG
    __webpack_require__.r(__webpack_exports__);

    // EXPORTS
    __webpack_require__.d(__webpack_exports__, {
      action: function() {
        return /* reexport */ action;
      },
      commonConfigs: function() {
        return /* reexport */ commonConfigs;
      },
      crudConfigs: function() {
        return /* reexport */ crudConfigs;
      },
      init: function() {
        return /* reexport */ init;
      },
      isLoading: function() {
        return /* reexport */ isLoading;
      },
    }); // CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js

    /* eslint-disable no-var */
    // This file is imported into lib/wc client bundles.

    if (typeof window !== 'undefined') {
      var currentScript = window.document.currentScript;
      if (false) {
        var getCurrentScript;
      }

      var src =
        currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
      if (src) {
        __webpack_require__.p = src[1]; // eslint-disable-line
      }
    }

    // Indicate to webpack that this file can be concatenated
    /* harmony default export */ var setPublicPath = null; // CONCATENATED MODULE: ./index.js

    const suffix = 'Async';

    const action = type => payload => ({
      type,
      payload,
    });

    const crudConfigs = [
      'getListAsync',
      'getItemAsync',
      'addItemAsync',
      'editItemAsync',
      'removeItemAsync',
      'removeItemsAsync',
    ];

    const commonConfigs = ['setSearchInfo', 'showFormModal', 'onCancel'];

    const isLoading = props => {
      const {
        config = [],
        extraLoading = [],
        path = '',
        actions = {},
        defConfig = [],
      } = props;
      const configs =
        config.length > 0 ? config : [...crudConfigs, ...extraLoading];
      return configs.some(asyncSuffix => {
        return actions[`${path}/${asyncSuffix}`];
      });
    };

    const init = (prefix, noDefault) => {
      const isCrudArr = noDefault ? [] : crudConfigs;
      const turnAction = (types = '') => payload => ({
        type: prefix + '/' + types,
        payload,
        action: action(types),
      });
      const createAction = (types = '') => payload => ({
        type: prefix + '/' + types,
        payload,
        action: action(types.split(suffix)[0]),
      });
      const transferActions = (config = []) => {
        const actions = {};
        config.forEach(types => (actions[types] = createAction(types)));
        return actions;
      };
      const createCRUD = (config = []) => {
        const actions = {};
        config.forEach(types => (actions[types] = createAction(types)));
        return actions;
      };
      const batchTurn = (config = []) => {
        const actions = {};
        config.forEach(types => (actions[types] = turnAction(types)));
        return actions;
      };
      const createDispatch = model => dispatch => {
        const actions = Object.keys(model.reducers);
        const asyncActions = Object.keys(model.effects);
        const dispatchActions = {};
        [...actions, ...asyncActions].forEach(
          types =>
            (dispatchActions[types] = data =>
              dispatch({
                type: `${prefix}/${types}`,
                payload: data,
              })),
        );
        return dispatchActions;
      };

      return {
        names: 'zyb',
        transferActions: (config = []) => transferActions(config),
        createCRUD: (config = []) => createCRUD([...isCrudArr, ...config]),
        turnAction,
        batchTurn: (config = []) => batchTurn([...commonConfigs, ...config]),
        createActions: (asyncConfig = [], config = []) => ({
          ...createCRUD([...isCrudArr, ...asyncConfig]),
          ...batchTurn([...commonConfigs, ...config, 'reset']),
        }),
        createAction: model => {
          const actions = Object.keys(model.reducers);
          const asyncActions = Object.keys(model.effects);
          return {
            ...batchTurn(actions),
            ...createCRUD(asyncActions),
          };
        },
        createDispatch,
      };
    }; // CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js

    /******/ return __webpack_exports__;
    /******/
  })();
});
//# sourceMappingURL=index.umd.js.map
