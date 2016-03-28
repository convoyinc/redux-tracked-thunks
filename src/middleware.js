export default function trackedThunkMiddleware({dispatch, getState}) {
  return next => action => {
    next(action);
  };
}
