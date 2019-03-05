import React from 'react';

export default class Earthquake extends React.Component{
render(){
    
        return(
            <div className='event__headers'>
            <div className='event__type-box event__type-box--name'>
                <h2>Earthquake</h2>
            </div>
            <div className='event__type-box'>
                <h3>Magnitude</h3>
                <div className='event__data-box'>4.2</div>
            </div>
            <div className='event__type-box'>
                <h3>Depth</h3>
                <div className='event__data-box'>4 miles</div>
            </div>
            <div className='event__type-box'>
                <h3>Tsunami Warning</h3>
                <div className='event__data-box'>None</div>
            </div>
        </div>
        )
    }
}