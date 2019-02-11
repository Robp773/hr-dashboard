import React, { Component } from 'react';
import Weather from './components/Weather';
import Status from './components/Status';
import Clock from './components/Clock';
import Heading from './components/Heading';
import RegionInfo from './components/RegionInfo';
import { connect } from 'react-redux'
import SocialMedia from './components/SocialMedia';
import { API_BASE_URL } from "./config";
import {setState} from './actions'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {activeState: 0}
    };

  componentDidMount() {
      fetch(`${API_BASE_URL}/activate/Test`)
        .then((res) => {
          return res.json()
            .then((result) => {
              this.props.dispatch(setState(result));
            })
            .catch(error => {
              console.log(error);
            });
        })

  }
  render() {
    console.log(this.props.fullState)
    return (
      <div>

        <div className='headerBar'>
          <Status status={this.props.status}/>
          <Heading headingInfo={this.props.disasterInfo}/>
          <Clock location={this.props.location} timeZone={this.props.timeZone}/>
        </div>

        <div className='infoBar'>

          <div className='row'>      
            <RegionInfo regionalData={this.props.regionalData}/>
            <Weather weatherInfo={this.props.weatherInfo}/>
          </div>

          <div className='row'>

            <SocialMedia/>
            <div className='component'>
              <h2 className='component__h2'>Not sure what to put here yet</h2>
              <div className='component__container'>
                <ul>
                  <li>This could be a section for tools/toolbar links</li>
                  <li>Graphs and other visual aids maybe</li>
                  <li>Could be a social media analysis tab</li>
                </ul>
              </div> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fullState: state,
  status: state.level,
  disasterInfo: {name: state.activationName, location: state.regionalData[state.activeState].name},
  timeZone: state.regionalData[state.activeState].timeZone,
  location: state.regionalData[state.activeState].name,
  weatherInfo: state.weatherInfo,
  regionalData: state.regionalData[state.activeState]
})

export default connect(mapStateToProps)(App)

