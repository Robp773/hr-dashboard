export const setState = state => ({
  type: "SET_STATE",
  state: state
});

export const selectState = index => ({
  type: "SELECT_STATE",
  stateIndex: index
});

export const returnToList = () => ({
  type: "RETURN_TO_LIST"
});

export const updateState = update => ({
  type: "UPDATE_STATE",
  update
});
