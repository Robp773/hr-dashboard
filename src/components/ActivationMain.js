import React, {Component} from 'react';
import Event from './Event';
import Status from './Status';
import Clock from './Clock';
import Heading from './Heading';
import RegionInfo from './RegionInfo';
import {connect} from 'react-redux'
import SocialFeed from './SocialFeed';
import {API_BASE_URL} from "../config";
import {selectState, updateCities, updateEventData, updateAnalysis, updateEarthquakeData} from '../actions';
import io from "socket.io-client";
import Alert from 'react-s-alert';

class ActivationMain extends Component {
  constructor(props) {
    super(props);

    this.dataStream = io(`${API_BASE_URL}/${this.props.activationName.replace(/\s+/g, '')}`);
    this.dataStream.on("connect", () => {
      Alert.success(`Connected to ${this.props.activationName} Data Stream`, {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000,
        offset: 100
      });
    })

    this.dataStream.on("disconnect", (e) => {
      Alert.error(`Disconnected from ${this.props.activationName} Data Stream`, {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000,
        offset: 100
      });
    })

    this.dataStream.on("newCityData", msg => {
      console.log('new city data')
      Alert.success('Updating city weather data...', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000,
        offset: 100
      });
      this.props.dispatch(updateCities(msg))
    })

    this.dataStream.on("newEventData", msg => {
      Alert.success(`Updating weather alerts...`, {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000,
        offset: 100
      });
      this.props.dispatch(updateEventData(msg))
    })

    this.dataStream.on("tweetAnalysis", msg => {
      Alert.success('New Tweet Analysis', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000,
        offset: 100
      });
      this.props.dispatch(updateAnalysis(msg))
    })

    this.dataStream.on("newEarthquakeData", msg => {
      Alert.success('New Earthquake Data', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000,
        offset: 100
      });
      this.props.dispatch(updateEarthquakeData(msg))
    })

    this.disconnectSocket = this.disconnectSocket.bind(this)

  };

  disconnectSocket() {
    this.dataStream.disconnect();
  }

  render() {

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
          <Clock disconnectSocket={this.disconnectSocket} activationName={this.props.activationName} location={this.props.location} timeZone={this.props.timeZone}/>
        </div>


            <div className='infoBar'>
              <SocialFeed streamEnabled={this.props.streamEnabled} socialAnalysis={this.props.socialAnalysis} activationName={this.props.activationName} twitterWidgets={twitterWidgets} /> 
              
              <div className='weather-region-container'>
                <Event mapLayers={this.props.mapLayers} earthquakeData={this.props.earthquakeData} cities={this.props.cities} activeState={this.props.activeState} eventData={this.props.eventData} disasterType={this.props.disasterType} latLng={this.props.regionalData.latLng}/>
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
  streamEnabled: state.streamEnabled,
  socialAnalysis: state.socialAnalysis,
  earthquakeData: state.earthquakeData,
  mapLayers: state.mapLayers
})

export default connect(mapStateToProps)(ActivationMain)