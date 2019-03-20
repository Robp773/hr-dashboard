import React from 'react';
import moment from 'moment';

export default class Tweet extends React.Component {

        render() {
            let hashtags = [];
            for(let i = 0; i <this.props.data.hashtags.length; i++){
                hashtags.push(<div className='tweet__hashtag' key={`hashtag-${i}`}>#{this.props.data.hashtags[i].text}</div>)
            }
   
        return(
            <div className={`tweet`} >
                <img alt='Twitter profile' className='tweet__profile-img' src={this.props.data.profileImg} />
                
                <div className='tweet__info-parent'>

                    <div className='tweet__profile-info'>
                        <div>{this.props.data.screenName}</div>
                        <div>{this.props.data.verified ? <img alt='Twitter verified symbol' src='images/checked.png' /> : null}</div>
                        <div>{this.props.data.followersCount}</div>
                        <div>{moment(Number(this.props.data.time)).format("hh:mm A MMM DD")}</div>
                    </div>

                    <div className='tweet__text'>{this.props.data.text}</div>
                    <div className='tweet__hashtag-parent'>{hashtags}</div>

                </div>
            </div>
        )
    }
}