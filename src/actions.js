export const setState = (state) => ({
  type: 'SET_STATE',
  state: state
})

export const selectState = (index) => ({
  type: 'SELECT_STATE',
  stateIndex: index
})

export const updateCities = (data) => ({
  type: 'UPDATE_CITIES',
  data: data
})

export const updateEventData = (data) => ({
  type: 'UPDATE_EVENT_DATA',
  data: data
})

export const updateAnalysis = (data) => ({
  type: 'UPDATE_ANALYSIS',
  data: data
})

export const returnToList = () => ({
  type: 'RETURN_TO_LIST',
})