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
};

export const reducer = (state = initialState, action) => {

  if (action.type === "SET_STATE") {
    return Object.assign({},
      state,{activationChosen: true},
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


  if (action.type === "UPDATE_CITIES") {
    console.log(action.data)
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
    console.log(action.data)
    return Object.assign({},
      state, {
        socialAnalysis: action.data
      }
    );
  }

  return state;
};