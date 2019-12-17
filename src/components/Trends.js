import React from "react";
import Hashtags from "./Hashtags";
import FollowerCount from "./FollowerCount";
import Locations from "./Locations";

export default class Trends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "hashtags"
    };
  }

  changeTab(tab) {
    this.setState({
      activeTab: tab
    });
  }

  render() {
    if (this.props.trends) {
      let activeComponent;
      if (this.state.activeTab === "hashtags") {
        activeComponent = <Hashtags hashtags={this.props.trends.hashtags} />;
      } else if (this.state.activeTab === "followerCount") {
        activeComponent = (
          <FollowerCount followerCount={this.props.trends.followerCount} />
        );
      } else if (this.state.activeTab === "locations") {
        activeComponent = (
          <Locations multiplier={1} locations={this.props.trends.locations} />
        );
      }

      return (
        <div className="socialAnalysis">
          <div className="trends">
            <div className="trends__btn-parent">
              <button
                onClick={() => {
                  this.changeTab("hashtags");
                }}
                className={`trends__btn ${
                  this.state.activeTab === "hashtags" ? "active" : ""
                }`}
              >
                Hashtags
              </button>
              <button
                onClick={() => {
                  this.changeTab("followerCount");
                }}
                className={`trends__btn ${
                  this.state.activeTab === "followerCount" ? "active" : ""
                }`}
              >
                Follower Count
              </button>
              <button
                onClick={() => {
                  this.changeTab("locations");
                }}
                className={`trends__btn ${
                  this.state.activeTab === "locations" ? "active" : ""
                }`}
              >
                Locations
              </button>
            </div>
            {activeComponent}
          </div>
        </div>
      );
    } else {
      return (
        <div className="socialAnalysis__no-data">Data collection is disabled</div>
      );
    }
  }
}
