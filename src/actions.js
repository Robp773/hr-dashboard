export const setState = (state) => ({
    type: 'SET_STATE',
    state: state
  })

  export const selectState = (index) => ({
    type: 'SELECT_STATE',
    stateIndex: index
  })