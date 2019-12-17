import React, { Component } from "react";
import Event from "./Event";
import Status from "./Status";
import Clock from "./Clock";
import Heading from "./Heading";
import RegionInfo from "./RegionInfo";
import { connect } from "react-redux";
import SocialFeed from "./SocialFeed";
import { API_BASE_URL } from "../config";
import { selectState, updateState, returnToList } from "../actions";
import io from "socket.io-client";
import Alert from "react-s-alert";
import states from "us-state-codes";

import { FiArrowLeft } from "react-icons/fi";
import MobileMenu from "./MobileMenu";

class ActivationMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileTab: "Social"
    };

    this.changeMobileTab = this.changeMobileTab.bind(this);

    this.dataStream = io(
      `${API_BASE_URL}/${this.props.activationName.replace(/\s+/g, "")}`
    );
    this.dataStream.on("connect", () => {
      Alert.success(
        `<h3>Connected to ${this.props.activationName} Data Stream</h3>`,
        {
          html: true,
          position: "top-right",
          effect: "slide",
          timeout: 3000,
          offset: 25
        }
      );
    });

    this.dataStream.on("disconnect", e => {
      Alert.error(
        `<h3>Disconnected from ${this.props.activationName} Data Stream</h3>`,
        {
          html: true,
          position: "top-right",
          effect: "slide",
          timeout: 3000,
          offset: 25
        }
      );
    });

    this.dataStream.on("test", msg => {
      Alert.success(`<h3>Data Updated</h3>`, {
        html: true,
        position: "top-right",
        effect: "slide",
        timeout: 3000,
        offset: 100
      });
      this.props.dispatch(updateState(msg));
    });

    this.disconnectSocket = this.disconnectSocket.bind(this);
  }

  disconnectSocket() {
    this.dataStream.disconnect();
  }

  returnToList() {
    this.props.dispatch(returnToList());
    this.disconnectSocket();
    window.clearInterval("tweetInterval");
  }

  changeMobileTab(mobileTab) {
    console.log("setting tab", mobileTab);
    this.setState({ mobileTab });
  }

  render() {
    let impactedStates = [];
    for (let i = 0; i < this.props.statesData.length; i++) {
      impactedStates.push(
        <button
          className={`heading__state-select-btn ${
            this.props.fullState.activeState === i
              ? "heading__active-state active"
              : ""
          }`}
          onClick={() => {
            this.props.dispatch(selectState(i));
          }}
          key={i}
        >
          {this.props.statesData[i].name !== "Mariana Islands"
            ? states.getStateCodeByStateName(this.props.statesData[i].name)
            : this.props.statesData[i].name}
        </button>
      );
    }

    return (
      <div>
        <div className="headerBar">
          <Status status={this.props.status} />
          <Heading
            impactedStates={impactedStates}
            headingInfo={this.props.headingInfo}
          />
          <Clock
            disconnectSocket={this.disconnectSocket}
            activationName={this.props.activationName}
            location={this.props.location}
            timeZone={this.props.timeZone}
          />
          <button
            onClick={() => this.returnToList()}
            className="clock__back-btn"
          >
            <FiArrowLeft size={"2.5rem"} />
          </button>
        </div>
        <MobileMenu
          activeTab={this.state.mobileTab}
          changeMobileTab={this.changeMobileTab}
        />
        <div className="infoBar">
          <span
            className={`mobileWrapper ${
              this.state.mobileTab === "Social"
                ? "mobileWrapper--active"
                : "mobileWrapper--inactive"
            }`}
          >
            <SocialFeed
              socialAnalysis={this.props.socialAnalysis}
              activationName={this.props.activationName}
              twitterList={
                this.props.twitterList[
                  Object.keys(this.props.twitterList)[this.props.activeState]
                ].list
              }
            />
          </span>
          <div className="weather__region-container">
            <span
              className={`mobileWrapper ${
                this.state.mobileTab === "Event"
                  ? "mobileWrapper--active"
                  : "mobileWrapper--inactive"
              }`}
            >
              <Event
                mapLayers={this.props.mapLayers}
                earthquakeData={this.props.earthquakeData}
                cities={this.props.cities}
                activeState={this.props.activeState}
                eventData={this.props.eventData}
                disasterType={this.props.disasterType}
                latLng={this.props.regionalData.latLng}
              />
            </span>
            <span
              className={`mobileWrapper ${
                this.state.mobileTab === "State"
                  ? "mobileWrapper--active"
                  : "mobileWrapper--inactive"
              }`}
            >
              <RegionInfo regionalData={this.props.regionalData} />
            </span>
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
  headingInfo: { name: state.activationName, type: state.disasterType },
  timeZone: state.regionalData[state.activeState].timeZone,
  location: state.regionalData[state.activeState].name,
  regionalData: state.regionalData[state.activeState],
  eventData: state.eventData,
  disasterType: state.disasterType,
  activeState: state.activeState,
  statesData: state.regionalData,
  stateNames: state.regionalData.map(state => {
    return state.name;
  }),
  cities: state.cities[state.activeState],
  socialAnalysis: state.socialAnalysis,
  earthquakeData: state.earthquakeData,
  mapLayers: state.mapLayers,
  twitterList: state.twitterList
});

export default connect(mapStateToProps)(ActivationMain);
