'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trackedThunk;

var _uniqueType = require('unique-type');

var _uniqueType2 = _interopRequireDefault(_uniqueType);

var _interactions = require('./interactions');

var _interactions2 = _interopRequireDefault(_interactions);

var _status = require('./status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

/**
 *
 */
function trackedThunk(target, key, descriptor) {
  if (typeof target === 'function') {
    return _applyTrackedThunk.bind(this, target);
  }
  return _applyTrackedThunk.call(this, _defaultIdentityMapper, target, key, descriptor);
}

function _applyTrackedThunk(identityMapper, target, key, descriptor) {
  var actionCreator = descriptor.value;
  if (typeof actionCreator !== 'function') {
    throw new TypeError('@tracked can only decorate methods');
  }
  var actionCreatorId = _actionCreatorId(target, key);

  descriptor.value = function trackedThunkActionCreator() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var actionId = identityMapper.apply(undefined, args);

    return function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(dispatch, getState) {
        var thunk, promise, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dispatch(_interactions2.default.start(actionCreatorId, actionId));

                thunk = actionCreator.call.apply(actionCreator, [target].concat(args));

                if (!(typeof thunk !== 'function')) {
                  _context.next = 4;
                  break;
                }

                throw new TypeError('@tracked can only decorate async thunked action creators.  ' + ('Got ' + thunk + ' for ' + actionCreatorId + ' (' + actionId + ')'));

              case 4:
                promise = thunk(dispatch, getState);

                if (!(!promise || typeof promise.then !== 'function')) {
                  _context.next = 7;
                  break;
                }

                throw new TypeError('@tracked can only decorate async thunked action creators.  ' + ('Got a non-Promise result: ' + promise + ' for ' + actionCreatorId + ' (' + actionId + ')'));

              case 7:
                _context.prev = 7;
                _context.next = 10;
                return promise;

              case 10:
                result = _context.sent;

                dispatch(_interactions2.default.success(actionCreatorId, actionId));
                return _context.abrupt('return', result);

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](7);

                dispatch(_interactions2.default.failure(actionCreatorId, actionId, _context.t0));

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 15]]);
      }));

      function trackedThunkAction(_x, _x2) {
        return ref.apply(this, arguments);
      }

      return trackedThunkAction;
    }();
  };

  descriptor.value.status = function trackedThunkStatusCreator() {
    var actionId = identityMapper.apply(undefined, arguments);
    return function trackedThunkStatus(state, path) {
      return (0, _status2.default)(actionCreatorId, actionId, state, path);
    };
  };
}

function _actionCreatorId(target, key) {
  return (0, _uniqueType2.default)(target.constructor.name + ':' + key);
}

function _defaultIdentityMapper() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return JSON.stringify(args);
}