import React from "react";
import io from "socket.io-client";
import {
    API_BASE_URL
} from '../config';
import Tweet from './Tweet';
import Alert from 'react-s-alert';
import TwitterWidget from './TwitterWidget';

export default class SocialMedia extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                tweetData: [],
                connected: false,
                widgetActive: false
            };

            // eventually pass in activation name here
            let testStream = io(`${API_BASE_URL}/Test`);
            let tweetStream = io(`${API_BASE_URL}/tweetStream`);

            tweetStream.on("connect", () => {
                console.log("Connected to tweetStream socket"); // false
                // alert.show('Connected to Socket')
                this.setState({
                    connected: true
                })
                Alert.success('Connected to Twitter Stream', {
                    position: 'top-right',
                    effect: 'slide',
                    beep: '/sounds/notif.mp3',
                    timeout: 3000,
                    offset: 100
                });
            });

            tweetStream.on("disconnect", () => {
                console.log("Disconnected from tweetStream socket"); // false
            });

            tweetStream.on("newTweet", tweet => {
                // console.log(tweet)
                let copy = this.state.tweetData;
                let tweetComp = <Tweet key={`${tweet.screenName}-${tweet.time}-${new Date().getUTCMilliseconds()}`} data={tweet}/>

                if (this.state.tweetData.length < 10) {
                    copy.unshift(tweetComp)
                    this.setState({
                        tweetData: copy
                    })

                } else {
                    copy.splice(-1, 1);
                    copy.unshift(tweetComp)
                    this.setState({
                        tweetData: copy
                    })
                }
            });
        }

        onCheck() {
            this.setState({
                widgetActive: !this.state.widgetActive
            })
        }

  render() {
      let activeFeed = this.state.widgetActive ? <TwitterWidget twitterWidgets={this.props.twitterWidgets} /> : this.state.tweetData;

    return (
      <div className="component social-media">

        <div className='social-media__heading-parent'>
            <div className='social-media__heading'>Social Data</div>
                <div className="social-media__btn-container">
                
                    <span>Feed</span>
                    <label class="switch">
                        <input onChange={()=>this.onCheck()} type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                    <span>List</span>

                    <button className='social-media__chart-btn'><img alt='Pie chart button' src='images/pie-chart.png'/></button>
                </div>
        </div>

        <div id="parent">
          {activeFeed}
        </div>
      </div>
    );
  }
}
