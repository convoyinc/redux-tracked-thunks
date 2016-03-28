'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackedThunkInteractions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _reduxInteractions = require('redux-interactions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var TrackedThunkInteractions = exports.TrackedThunkInteractions = (_class = function (_Interactions) {
  _inherits(TrackedThunkInteractions, _Interactions);

  function TrackedThunkInteractions() {
    _classCallCheck(this, TrackedThunkInteractions);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TrackedThunkInteractions).apply(this, arguments));
  }

  _createClass(TrackedThunkInteractions, [{
    key: 'start',
    value: function start(state, actionCreatorId, actionId) {
      return this._mergeStatus(state, actionCreatorId, actionId, {
        active: true,
        failure: false,
        success: false,
        error: null
      });
    }
  }, {
    key: 'success',
    value: function success(state, actionCreatorId, actionId) {
      return this._mergeStatus(state, actionCreatorId, actionId, {
        active: false,
        failure: false,
        success: true,
        error: null
      });
    }
  }, {
    key: 'failure',
    value: function failure(state, actionCreatorId, actionId, error) {
      return this._mergeStatus(state, actionCreatorId, actionId, {
        active: false,
        failure: true,
        success: false,
        error: error
      });
    }

    // Helpers

  }, {
    key: '_mergeStatus',
    value: function _mergeStatus(state, actionCreatorId, actionId, status) {
      return _extends({}, state, _defineProperty({}, actionCreatorId, _extends({}, state[actionCreatorId], _defineProperty({}, actionId, status))));
    }
  }]);

  return TrackedThunkInteractions;
}(_reduxInteractions.Interactions), (_applyDecoratedDescriptor(_class.prototype, 'start', [_reduxInteractions.reducer], Object.getOwnPropertyDescriptor(_class.prototype, 'start'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'success', [_reduxInteractions.reducer], Object.getOwnPropertyDescriptor(_class.prototype, 'success'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'failure', [_reduxInteractions.reducer], Object.getOwnPropertyDescriptor(_class.prototype, 'failure'), _class.prototype)), _class);
exports.default = new TrackedThunkInteractions();