export function actions(state = [], action) {
  if (action.type === '@@redux/INIT') return state;
  return [...state, action];
}
