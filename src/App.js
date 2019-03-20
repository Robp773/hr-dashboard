import React, {Component} from 'react';

import {connect} from 'react-redux'
import {API_BASE_URL} from "./config";
import {setState, selectState, updateCities, updateEventData, updateAnalysis} from './actions';

import ActivationMain from './components/ActivationMain';
import ActivationList from './components/ActivationList';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.chooseActivation = this.chooseActivation.bind(this);
  }

  chooseActivation(activationName){
        fetch(`${API_BASE_URL}/activate/${activationName}`)
        .then((res) => {
          return res.json()
            .then((result) => {
              console.log(result)
              this.props.dispatch(setState(result));
            })
            .catch(error => {
              console.log(error);
            });
        })
  }

  render() {
    let activeComponent;
    if(this.props.activationChosen){
      activeComponent = <ActivationMain/>
    }
    else{
      activeComponent = <ActivationList chooseActivation={this.chooseActivation}/>
    }

    return (
      <div>
          {activeComponent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activationChosen: state.activationChosen
})

export default connect(mapStateToProps)(App)