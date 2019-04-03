import React from 'react';
import moment from 'moment';

export default function Tweet(props){
    let hashtags = [];

    for(let i = 0; i <props.data.hashtags.length; i++){
        hashtags.push(<div className='tweet__hashtag' key={`hashtag-${i}`}>#{props.data.hashtags[i].text}</div>)
    }
     
    return(

        <div className={`tweet`} >

            <img alt='Twitter profile' className='tweet__profile-img' src={props.data.profileImg} />
            
            <div className='tweet__info-parent'>

                <div className='tweet__profile-info'>
                    <div>{props.data.screenName}</div>
                    <div>{props.data.verified ? <img alt='Twitter verified symbol' src='images/checked.png' /> : null}</div>
                    <div>{props.data.followersCount}</div>
                    <div>{moment(Number(props.data.time)).format("hh:mm A MMM DD")}</div>
                </div>

                <div className='tweet__text'>{props.data.text}</div>
                <div className='tweet__hashtag-parent'>{hashtags}</div>

            </div>

        </div>
    )
}