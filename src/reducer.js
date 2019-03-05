const initialState = {
  activationName: 'Loading',
  activeState: 0,
  cities: [
    []
  ],
  disasterType: 'Flooding',
  eventData: {
    headings: [{details: []}],
    stateData: [ {name: '', data: ['loading']} ],
  },
  level: 1,
  // State spreadsheet data + timezone + lat/long + twitter list
  regionalData: [ 
    {name: 'alaska', stateGovt: [], cities: [], counties: [], utilities: [], airports: [], ports: [], news: [], colleges: []},
    {},
    {}
  ],
};

export const reducer = (state = initialState, action) => {

  if (action.type === "SET_STATE") {
    return Object.assign({},
      state,
      action.state
    );
  }

  if (action.type === "SELECT_STATE") {
    return Object.assign({},
      state, {
        activeState: action.stateIndex
      }
    );
  }
  return state;
};