"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trackedThunkMiddleware;
function trackedThunkMiddleware(_ref) {
  var dispatch = _ref.dispatch;
  var getState = _ref.getState;

  return function (next) {
    return function (action) {
      next(action);
    };
  };
}