import React from 'react';
import moment from 'moment';

export default class WeatherAlert extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClick(){
        this.setState({open: !this.state.open})
        console.log('click')
    }
    // close any open and reused components when switching states
    componentWillUpdate(prev){
        if(this.props !== prev){
            this.setState({open: false})
        }
    }
    
    render(){
        let openClose;
        if(this.state.open){
            openClose = 'open';
        }

        else{
            openClose = 'close';
        }
 
    return(
        <div onClick={()=>{this.handleClick()}} key={`${this.props.index}-${this.props.activeState}`} className={`weather-alert__alerts-parent ${openClose}`}>
                        
        <div className='weather-alert__time-locations-parent'>
            <div className='weather-alert__time-parent'>
                <div className='weather-alert__clock-item'>Start: {moment(this.props.alertsObj.onset).format("h:mm A, ddd")}</div>        
                {this.props.alertsObj.ends ? <div className='weather-alert__clock-item'>End: {moment(this.props.alertsObj.ends).format("h:mm A, ddd")}</div> : null}
            </div>

            <div className='weather-alert__locations-parent'>
                <div className='weather-alert__alerts-div'>{this.props.alertsObj.areaDesc}</div>
            </div>
        </div>

        <div className='weather-alert__desc'>{this.props.alertsObj.description}</div>
    </div>
    )
}
}