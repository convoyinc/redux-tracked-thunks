import * as _ from 'lodash';

const DEFAULT_MOUNT_POINT = 'trackedThunks';

export default function trackedThunkStatus(actionCreatorId, actionId, state, path = DEFAULT_MOUNT_POINT) {
  const allStatuses = _.get(state, path);
  return _.get(allStatuses, [actionCreatorId, actionId]);
}
