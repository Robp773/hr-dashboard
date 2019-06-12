import React from "react";
import io from "socket.io-client";
import { API_BASE_URL } from "../config";
import Tweet from "./Tweet";
import Alert from "react-s-alert";
import TwitterWidget from "./TwitterWidget";
import SocialAnalysis from "./SocialAnalysis";

export default class SocialFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweetData: [],
      activeView: this.props.streamEnabled ? "feed" : "widget",
      widgetActive: this.props.streamEnabled ? false : true,
      prevView: this.props.streamEnabled ? "widget" : "feed",
      analysisView: "trends",
      rateLimited: false
    };

    this.tweetList = [];

    if (this.props.streamEnabled) {
      this.tweetStream = io(`${API_BASE_URL}/tweetStream`);

      this.tweetStream.on("connect", () => {
        console.log("Connected to tweetStream socket");

        Alert.success("Connected to Twitter Stream", {
          position: "top-right",
          effect: "slide",
          beep: "/sounds/notif.mp3",
          timeout: 3000,
          offset: 100
        });
      });

      this.tweetStream.on("disconnect", () => {
        console.log("Disconnected from tweetStream socket");
      });

      this.tweetStream.on("newTweet", tweet => {
        let tweetComp = (
          <Tweet key={`${tweet.screenName}-${tweet.time}-${new Date().getUTCMilliseconds()}`} data={tweet} />
        );
        if (this.tweetList.length < 10) {
          this.tweetList.unshift(tweetComp);
        } else {
          this.tweetList.splice(-1, 1);
          this.tweetList.unshift(tweetComp);
        }
        if (!this.state.rateLimited) {
          this.pushNewTweets();
        }
      });
    }
  }

  onCheck() {
    let activeView;
    let prevView = this.state.activeView;
    if (this.state.widgetActive) {
      activeView = "feed";
    } else if (!this.state.widgetActive) {
      activeView = "widget";
    }
    this.setState({
      widgetActive: !this.state.widgetActive,
      activeView: activeView,
      prevView: prevView
    });
  }

  showAnalysis() {
    let prevView = this.state.activeView;
    this.setState({
      activeView: "analysis",
      prevView: prevView
    });
  }

  returnFromAnalysis(prevView) {
    this.setState({
      activeView: prevView,
      prevView: "analysis"
    });
  }

  changeAnalysisView(tab) {
    this.setState({
      analysisView: tab
    });
  }

  pushNewTweets() {
    let copy = this.state.tweetData;
    if (this.state.tweetData[0] !== this.tweetList[0]) {
      if (this.state.tweetData.length < 10) {
        copy.unshift(this.tweetList[0]);
        this.setState({
          tweetData: copy
        });
      } else {
        copy.splice(-1, 1);
        copy.unshift(this.tweetList[0]);
        this.setState({
          tweetData: copy
        });
      }
    }
  }

  toggleRate() {
    this.setState({ rateLimited: !this.state.rateLimited });
  }

  componentDidUpdate() {
    clearInterval(window.tweetInterval);
    if (this.state.rateLimited) {
      window.tweetInterval = setInterval(() => {
        this.pushNewTweets();
      }, 1500);
    }
  }

  render() {
    let activeFeed;
    let presetSlider;

    if (this.state.widgetActive) {
      presetSlider = <input checked onChange={() => this.onCheck()} type="checkbox" />;
    } else {
      presetSlider = <input onChange={() => this.onCheck()} type="checkbox" />;
    }

    let activeNavBtns = (
      <div className="social-feed__heading-parent">
        <div className="social-feed__heading">Social Data</div>
        <div className="social-feed__btn-container">
          <div className="social-feed__feed-toggle">
            <div className="social-feed__label">Feed</div>
            <label class="switch">
              {presetSlider}
              <span class="slider round" />
            </label>
            <div className="social-feed__label">List</div>
          </div>
          <button
            onClick={() => {
              this.showAnalysis();
            }}
            className="social-feed__chart-btn"
          >
            Trends
          </button>
          {this.state.activeView === "feed" ? (
            <div className="social-feed__speed-btn">
              <h4>Limit Speed</h4>
              <div className="social-feed__speed-btn-parent">
                <div className="social-feed__label">Off</div>
                <label class="switch switch--speed-btn">
                  <input
                    checked={this.state.rateLimited ? true : false}
                    onChange={() => {
                      this.toggleRate();
                    }}
                    type="checkbox"
                  />
                  <span class="slider round round--speed-btn" />
                </label>
                <div className="social-feed__label">On</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );

    if (this.state.activeView === "analysis") {
      if (!this.props.socialAnalysis.trends){
        activeFeed = (
          <h2 className="entities__no-data">Analysis will be shown after more data has been collected.</h2>
        );
      } else {
        activeFeed = (
          <SocialAnalysis
            socialAnalysis={this.props.socialAnalysis}
            analysisView={this.state.analysisView}
            prevView={this.state.prevView}
            returnFromAnalysis={this.returnFromAnalysis}
          />
        );
      }

      activeNavBtns = (
        <div className="social-feed__heading-parent">
          <div className="social-feed__heading">Social Data</div>
          <div className="social-feed__btn-container">
            <h2 className="social-feed__tab-h2">{this.state.analysisView === "trends" ? "Trends" : ""}</h2>
            {/* <button className={`social-feed__btn ${this.state.analysisView === 'entities' ? 'active' : ''}`} onClick={()=>{this.changeAnalysisView('entities')}}>Entities</button>                 */}
            {/* <button className={`social-feed__btn ${this.state.analysisView === 'trends' ? 'active' : ''}`} onClick={()=>{this.changeAnalysisView('trends')}}>Trends</button>                 */}
            {/* <button className={`social-feed__btn ${this.state.analysisView === 'word-clouds' ? 'active' : ''}`} onClick={()=>{this.changeAnalysisView('word-clouds')}}>Other</button>                 */}
            <button
              className="social-feed__back-btn"
              onClick={() => this.returnFromAnalysis(this.state.prevView)}
            >
              Back
            </button>
          </div>
        </div>
      );
    } else if (this.state.widgetActive) {
      activeFeed = <TwitterWidget twitterWidgets={this.props.twitterWidgets} />;
    } else if (this.state.activeView === "feed") {
      if (!this.props.streamEnabled) {
        activeFeed = <h2 className="social-feed__stream-disabled">Stream disabled for this dashboard.</h2>;
      } else {
        activeFeed = this.state.tweetData;
      }
    }

    return (
      <div className="component social-feed">
        {activeNavBtns}

        <div id="parent">{activeFeed}</div>
      </div>
    );
  }
}
