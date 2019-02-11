const initialState = {
  activeState: 0,
  activationName: '',
  level: 1,
  regionalData: [{
 
  }],
  status: 0,
};

export const reducer = (state = initialState, action) => {

  if (action.type === "SET_STATE") {
    return Object.assign({},
      state,
      action.state
    );
  }
  return state;
};