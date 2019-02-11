import React from 'react';

export default class Weather extends React.Component{
render(){
    return(
        <div className='facts component weather'>
            <h2 className='component__h2'>Weather</h2>
            <div className='component__container'>
                <div className='weather__data'>Weather data will go here</div>
                <img className='weather__image' alt='weather' src='https://radblast.wunderground.com/cgi-bin/radar/WUNIDS_composite?&centerlat=63.2008&centerlon=-148.4937&radius=475&type=N0R&frame=0&num=10&delay=10&width=640&height=480&newmaps=1&r=1210555939&smooth=1&rainsnow=1&lat=63.2008&lon=-148.4937&severe=1&showstorms=15&brand=mobile&showids=0&noclutter=1'/>
            </div>
        </div>
    )
}
}