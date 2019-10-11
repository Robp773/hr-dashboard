import React from "react";
import TwitterWidget from "./TwitterWidget";
import Trends from "./Trends";

export default class SocialFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetActive: true
    };
  }

  onCheck() {
    this.setState({ widgetActive: !this.state.widgetActive });
  }

  render() {
    return (
      <div className="component social-feed">
        <div className="social-feed__heading-parent">
          <div className="social-feed__heading">Social Data</div>
          <div className="social-feed__btn-container">
            <div className="social-feed__feed-toggle">
              <div className="social-feed__label">Tweets</div>
              <label className="switch">
                <input onChange={() => this.onCheck()} type="checkbox" />
                <span className="slider round" />
              </label>
              <div className="social-feed__label">Analysis</div>
            </div>
          </div>
        </div>
        <div id="parent">
          {this.state.widgetActive ? (
            <TwitterWidget twitterList={this.props.twitterList} />
          ) : (
            <Trends trends={this.props.socialAnalysis.trends} />
          )}
        </div>
      </div>
    );
  }
}
