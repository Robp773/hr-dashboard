import React from 'react';

export default class SocialMedia extends React.Component{
render(){
    return(
        <div className='component social-media'>
            <h2 className='component__h2'>Social Media</h2>
            <div className='social-media__btn-container'>
                <button className='social-media__btn'>Twitter</button>
                <button className='social-media__btn'>Facebook</button>
            </div>
            <div className='component__container'>User's can switch between Twitter/Facebook feeds. We can use feed from relevant Twitter lists.  Not sure how to get Facebook data yet.</div>
        </div>
    )
}
}