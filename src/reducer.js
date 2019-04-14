const initialState = {
  activationChosen: false,
  activationName: null,
  activeState: 0,
  cities: [],
  disasterType: 'Flooding',
  eventData: [{
    name: '',
    data: ['loading']
  }],
  socialAnalysis: {
    entities: {
      placeholderKey: [{
        type: 'placeholder'
      }]
    }
  },
  level: 1,
  // State spreadsheet data + timezone + lat/long + twitter list
  regionalData: [{
      name: 'alaska',
      stateGovt: [],
      cities: [],
      counties: [],
      utilities: [],
      airports: [],
      ports: [],
      news: [],
      colleges: []
    },
    {},
    {}
  ],
  earthquakeData: {},
  mapLayers: []
};

export const reducer = (state = initialState, action) => {

  if (action.type === "SET_STATE") {
    return Object.assign({},
      state, {
        activationChosen: true
      },
      action.state
    );
  }

  if (action.type === "RETURN_TO_LIST") {
    return Object.assign({},
      state, {
        activationChosen: false
      }
    );
  }

  if (action.type === "SELECT_STATE") {
    return Object.assign({},
      state, {
        activeState: action.stateIndex
      }
    );
  }

  if (action.type === "UPDATE_CITIES") {
    return Object.assign({},
      state, {
        cities: action.data
      }
    );
  }

  if (action.type === "UPDATE_EVENT_DATA") {
    return Object.assign({},
      state, {
        eventData: action.data
      }
    );
  }

  if (action.type === "UPDATE_ANALYSIS") {
    return Object.assign({},
      state, {
        socialAnalysis: action.data
      }
    );
  }

  if (action.type === "UPDATE_EARTHQUAKE_DATA") {
    return Object.assign({},
      state, {
        earthquakeData: action.data
      }
    );
  }

  return state;
};