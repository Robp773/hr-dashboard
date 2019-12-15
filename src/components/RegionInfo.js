import React from "react";

export default class RegionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeData: this.props.regionalData.stateGovt,
      activeTab: "stateGovt"
    };
  }

  tabSelect(tab) {
    this.setState({
      activeTab: tab,
      activeData: this.props.regionalData[tab]
    });
  }

  componentDidUpdate(prev) {
    if (this.props !== prev) {
      this.tabSelect("stateGovt");
    }
  }

  render() {
    let listData = [];
    if (this.state.activeData) {
      for (let i = 0; i < this.state.activeData.length; i++) {
        let twitterIcon;

        if (this.state.activeData[i].twitter.length <= 2) {
          twitterIcon = (
            <div>
              <img
                className="regionInfo__sm-icon"
                alt="Unknown twitter account"
                src="images/question-icon.png"
              />
            </div>
          );
        } else if (this.state.activeData[i].twitter.toLowerCase() === "none") {
          twitterIcon = (
            <div className="regionInfo__no-pointer">
              <img
                className="regionInfo__sm-icon"
                alt="No twitter account"
                src="images/blocked.png"
              />
            </div>
          );
        } else {
          twitterIcon = (
            <a
              target="#"
              href={
                this.state.activeData[i].twitter.trim().length > 2
                  ? this.state.activeData[i].twitter.trim()
                  : null
              }
            >
              <img
                className="regionInfo__sm-icon"
                alt="twitter"
                src="images/twitter.png"
              />
            </a>
          );
        }

        let facebookIcon;
        if (this.state.activeData[i].facebook.length <= 2) {
          facebookIcon = (
            <div>
              <img
                className="regionInfo__sm-icon"
                alt="Unknown facebook account"
                src="images/question-icon.png"
              />
            </div>
          );
        } else if (this.state.activeData[i].facebook.toLowerCase() === "none") {
          facebookIcon = (
            <div className="regionInfo__no-pointer">
              <img
                className="regionInfo__sm-icon"
                alt="No facebook account"
                src="images/blocked.png"
              />
            </div>
          );
        } else {
          facebookIcon = (
            <a
              target="#"
              href={
                this.state.activeData[i].facebook.trim().length > 2
                  ? this.state.activeData[i].facebook.trim()
                  : null
              }
            >
              <img
                className="regionInfo__sm-icon"
                alt="facebook"
                src="images/facebook.png"
              />
            </a>
          );
        }
        listData.push(
          <tr
            className={`regionInfo__tr ${i % 2 === 0 ? "td-even" : ""}`}
            key={i}
          >
            <td className="regionInfo__name">
              <a
                target="#"
                href={
                  this.state.activeData[i].website.trim().length > 2
                    ? this.state.activeData[i].website.trim()
                    : null
                }
              >
                {this.state.activeData[i].name}
              </a>
            </td>
            <td className="regionInfo__social-media">{twitterIcon}</td>
            <td className="regionInfo__social-media">{facebookIcon}</td>
          </tr>
        );
      }
    }

    return (
      <div className="regionInfo component facts">
        <div className="regionInfo__container component__container">
          <div className="regionInfo__btn-container">
            <div>State</div>
            {this.props.regionalData.stateGovt.length > 0 ? (
              <button
                onClick={() => {
                  this.tabSelect("stateGovt");
                }}
                className={`regionInfo__btn ${
                  this.state.activeTab === "stateGovt" ? "active" : "inactive"
                }`}
              >
                {`State Govt. (${this.props.regionalData.stateGovt.length}`})
              </button>
            ) : null}
            {this.props.regionalData.cities.length > 0 ? (
              <button
                onClick={() => {
                  this.tabSelect("cities");
                }}
                className={`regionInfo__btn ${
                  this.state.activeTab === "cities" ? "active" : "inactive"
                }`}
              >
                {`Largest Cities (${this.props.regionalData.cities.length}`})
              </button>
            ) : null}
            {this.props.regionalData.counties.length > 0 ? (
              <button
                onClick={() => {
                  this.tabSelect("counties");
                }}
                className={`regionInfo__btn ${
                  this.state.activeTab === "counties" ? "active" : "inactive"
                }`}
              >
                {`County Govt. (${this.props.regionalData.counties.length}`})
              </button>
            ) : null}
            {this.props.regionalData.utilities.length > 0 ? (
              <button
                onClick={() => {
                  this.tabSelect("utilities");
                }}
                className={`regionInfo__btn ${
                  this.state.activeTab === "utilities" ? "active" : "inactive"
                }`}
              >
                {`Utilities (${this.props.regionalData.utilities.length}`})
              </button>
            ) : null}
            {this.props.regionalData.ports.length > 0 ? (
              <button
                onClick={() => {
                  this.tabSelect("ports");
                }}
                className={`regionInfo__btn ${
                  this.state.activeTab === "ports" ? "active" : "inactive"
                }`}
              >
                {`Ports (${this.props.regionalData.ports.length}`})
              </button>
            ) : null}
            {this.props.regionalData.airports.length > 0 ? (
              <button
                onClick={() => {
                  this.tabSelect("airports");
                }}
                className={`regionInfo__btn ${
                  this.state.activeTab === "airports" ? "active" : "inactive"
                }`}
              >
                {`Airports (${this.props.regionalData.airports.length}`})
              </button>
            ) : null}
            {this.props.regionalData.news.length > 0 ? (
              <button
                onClick={() => {
                  this.tabSelect("news");
                }}
                className={`regionInfo__btn ${
                  this.state.activeTab === "news" ? "active" : "inactive"
                }`}
              >
                {`News Stations (${this.props.regionalData.news.length}`})
              </button>
            ) : null}
            {this.props.regionalData.colleges.length > 0 ? (
              <button
                onClick={() => {
                  this.tabSelect("colleges");
                }}
                className={`regionInfo__btn ${
                  this.state.activeTab === "colleges" ? "active" : "inactive"
                }`}
              >
                {`Colleges (${this.props.regionalData.colleges.length}`})
              </button>
            ) : null}
          </div>

          <table className="regionInfo__table">
            <tbody>
              <tr className="regionInfo__top-row">
                <th className="regionInfo__name-th">Name</th>
                <th className="regionInfo__social-media-th">
                  <img className="" alt="twitter" src="images/twitter.png" />
                </th>
                <th className="regionInfo__social-media-th">
                  <img className="" alt="facebook" src="images/facebook.png" />
                </th>
              </tr>
              {listData}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
