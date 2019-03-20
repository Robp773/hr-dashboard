import React, {Component} from 'react';
import Event from './Event';
import Status from './Status';
import Clock from './Clock';
import Heading from './Heading';
import RegionInfo from './RegionInfo';
import {connect} from 'react-redux'
import SocialFeed from './SocialFeed';
import {API_BASE_URL} from "../config";
import {setState, selectState, updateCities, updateEventData, updateAnalysis} from '../actions';
import io from "socket.io-client";
import Alert from 'react-s-alert';

class ActivationMain extends Component {
  constructor(props) {
    super(props);

    let dataStream = io(`${API_BASE_URL}/${this.props.activationName}`);
    dataStream.on("connect", () => {

      Alert.success(`Connected to ${this.props.activationName} Data Stream`, {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000,
        offset: 100
      });
    })

      dataStream.on("disconnect", (e) => {
        Alert.error(`Disconnected from ${this.props.activationName} Data Stream`, {
          position: 'top-right',
          effect: 'slide',
          // beep: '/sounds/notif.mp3',
          timeout: 3000,
          offset: 100
        });
      })

      dataStream.on("newCityData", msg => {
        Alert.success('Updating city weather data...', {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000,
          offset: 100
        });
        console.log(msg)
        this.props.dispatch(updateCities(msg))
      })

      dataStream.on("newEventData", msg => {
        Alert.success(`Updating weather alerts...`, {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000,
          offset: 100
        });
        this.props.dispatch(updateEventData(msg))
      })

      dataStream.on("tweetAnalysis", msg => {
        Alert.success('New Tweet Analysis', {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000,
          offset: 100
        });
        // console.log(msg)
        this.props.dispatch(updateAnalysis(msg))
      })
    
  };



  

  render() {
    console.log(`------------------RENDERED STATE FROM APP.JS--------------------`)
    console.log(this.props.fullState)
    let impactedStates = [];
    let twitterWidgets = []
    for (let i = 0; i < this.props.statesData.length; i++) {
      
      twitterWidgets.push(
        <div key={`widget-${i}`} className={this.props.activeState === i ? 'widgetActive': 'widgetInactive'} id='t'>
            <a id='twitterWidget' class="twitter-timeline" data-chrome="noscrollbar noheader transparent"
            href={`https://twitter.com/DAFNReady/lists/${this.props.statesData[i].name}`}>
            </a>
        </div>
      )

      impactedStates.push(
        <button className={`heading__state-select-btn ${this.props.fullState.activeState === i ? 'heading__active-state active' : ''}`} onClick={()=>{this.props.dispatch(selectState(i))}} key={i}>{this.props.statesData[i].name}</button>
        )
    }

    return (
      <div>

        <div className='headerBar'>
          <Status status={this.props.status}/>
          <Heading impactedStates={impactedStates} headingInfo={this.props.headingInfo}/>
          <Clock location={this.props.location} timeZone={this.props.timeZone}/>
        </div>

        <div className='infoBar'>
              <SocialFeed socialAnalysis={this.props.socialAnalysis} activationName={this.props.activationName} twitterWidgets={twitterWidgets} /> 
            <div className='weather-region-container'>
              <Event cities={this.props.cities} activeState={this.props.activeState} eventData={this.props.eventData} disasterType={this.props.disasterType} latLng={this.props.regionalData.latLng}/>
              <RegionInfo regionalData={this.props.regionalData}/>
            </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  fullState: state,
  status: state.level,
  activationName: state.activationName,
  headingInfo: {name: state.activationName, type: state.disasterType},
  timeZone: state.regionalData[state.activeState].timeZone,
  location: state.regionalData[state.activeState].name,
  regionalData: state.regionalData[state.activeState],
  eventData: state.eventData,
  disasterType: state.disasterType,
  activeState: state.activeState,
  statesData: state.regionalData,
  cities: state.cities[state.activeState],
  socialAnalysis: state.socialAnalysis
})

export default connect(mapStateToProps)(ActivationMain)