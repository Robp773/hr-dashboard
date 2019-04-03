import React from 'react';
import WeatherAlert from './WeatherAlert'

export default class WeatherEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'initial'
        }
    }

    handleClick(key){
        this.setState({tab: key})
    }
    
    componentDidMount() {
        if ('data' in this.props.eventData[this.props.activeState]) {
            let firstAlert = Object.keys(this.props.eventData[this.props.activeState].data)[0];
            this.setState({
                tab: firstAlert
            })
        }
    }

    componentDidUpdate(prev) {
        if ('data' in this.props.eventData[this.props.activeState]) {
            let firstAlert = Object.keys(this.props.eventData[this.props.activeState].data)[0];
            if (this.props.activeState !== prev.activeState) {
                this.setState({
                    tab: firstAlert
                })
            }
        }
    }

    render() {

        let buttons = [];
        let alertsArray = []
        let btnStatus;
          if(this.props.eventData[this.props.activeState].data){   

            if(Object.keys(this.props.eventData[this.props.activeState].data).length === 0){
                alertsArray = <div className='weather-event__no-alerts' key='key-no-alerts'>{`No Alerts`}</div>
            }

            else{
                let alertsObj = this.props.eventData[this.props.activeState].data

                for (let key in alertsObj) {        
                    let active;
                    if(this.state.tab){
                        if(this.state.tab === key){
                        active = 'active'
                        }
                    }    
                
                    buttons.push(
                        <button onClick={()=>{this.handleClick(key)}} className={`weather-event__alerts-h2 ${active}`} key={`${key}${this.props.activeState}-header`}>{key} 
                            <span className='weather-event__alerts-count'> ({alertsObj[key].length})</span>
                        </button>
                    )
                }

                if(alertsObj[this.state.tab]){
                        for(let i =0; i < alertsObj[this.state.tab].length; i++){
                        alertsArray.push(
                        <WeatherAlert key={i} index={i} alertsObj={alertsObj[this.state.tab][i]}/>
                        )
                    }
                }

            }
        }
        else{
            alertsArray = <div className='weather-event__no-alerts' key='key-no-alerts'>{`No Alerts`}</div>
        }

        return ( 
            <div className='weather-event' >

                <div className='weather-event__container'>
                    <div className={`weather-event__btns-container ${btnStatus}`}>
                         {buttons}
                    </div>
                    <div className='weather-event__alerts-container'>
                        {alertsArray}
                    </div>
                </div>

            </div>    
        )
    }
}
