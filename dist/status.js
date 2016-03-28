'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trackedThunkStatus;

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var DEFAULT_MOUNT_POINT = 'trackedThunks';

function trackedThunkStatus(actionCreatorId, actionId, state) {
  var path = arguments.length <= 3 || arguments[3] === undefined ? DEFAULT_MOUNT_POINT : arguments[3];

  var allStatuses = _.get(state, path);
  return _.get(allStatuses, [actionCreatorId, actionId]);
}