import React, {Component} from 'react';
import Event from './components/Event';
import Status from './components/Status';
import Clock from './components/Clock';
import Heading from './components/Heading';
import RegionInfo from './components/RegionInfo';
import {connect} from 'react-redux'
import SocialMedia from './components/SocialMedia';
import {API_BASE_URL} from "./config";
import {setState, selectState} from './actions';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
  }
  };

  componentDidMount() {
    // temporarily getting db data from here
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
    // console.log(this.props.statesData)
    
    let impactedStates = [];
    let twitterWidgets = []
    for (let i = 0; i < this.props.statesData.length; i++) {
      twitterWidgets.push(
        <div className={this.props.activeState === i ? 'widgetActive': 'widgetInactive'} id='t'>
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
            <SocialMedia twitterWidgets={twitterWidgets} />
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
  headingInfo: {name: state.activationName, type: state.disasterType, headings: state.eventData.headings},
  timeZone: state.regionalData[state.activeState].timeZone,
  location: state.regionalData[state.activeState].name,
  regionalData: state.regionalData[state.activeState],
  eventData: state.eventData,
  disasterType: state.disasterType,
  activeState: state.activeState,
  statesData: state.regionalData,
  cities: state.cities[state.activeState]
})

export default connect(mapStateToProps)(App)