import React from 'react';
import WeatherEvent from './WeatherEvent';
import Earthquake from './Earthquake';
import CitiesWeather from './CitiesWeather';
import Map from './Map';

export default class Weather extends React.Component {

        constructor(props) {

            super(props);
            this.state = {
                activeTab: 'radar'
            }
        }

        changeTab(tab) {
            this.setState({
                activeTab: tab
            })
        }

render(){
    
    let headerPos;
    let activeComponent;
    let eventComponents = {
        Weather: <WeatherEvent activeState={this.props.activeState} eventData={this.props.eventData}/>,
        Earthquake: <Earthquake earthquakeData={this.props.earthquakeData} />
    } 
    
    if (this.state.activeTab === 'alerts') {
        // if (this.props.disasterType === 'Flooding' || 'Typhoon') {
            activeComponent = eventComponents.Weather
        // }
    }

    else if (this.state.activeTab === 'radar') {
        headerPos = 'weather__heading--absolute';
        activeComponent = <Map latLng={this.props.latLng}/>
    }

    else if(this.state.activeTab === 'cities'){
        activeComponent = <CitiesWeather cities={this.props.cities}/>
    }   
    else if(this.state.activeTab === 'event'){
        if(this.props.disasterType === 'Earthquake'){
            activeComponent = eventComponents.Earthquake
        }
    }

    return(
        <div className='facts component weather'>
            <div className={`weather__heading ${headerPos}`}> 
                <div className='weather__event-heading'>Event Data</div>
                <div className='weather__btn-parent'>
                    <button onClick={()=>{this.changeTab('radar')}} className={`weather__btn ${this.state.activeTab === 'radar' ? 'active' : ''}`}>Radar</button>
                    <button onClick={()=>{this.changeTab('alerts')}} className={`weather__btn ${this.state.activeTab === 'alerts' ? 'active' : ''}`}>Alerts</button>
                    <button onClick={()=>{this.changeTab('cities')}} className={`weather__btn ${this.state.activeTab === 'cities' ? 'active' : ''}`}>Cities</button>
                    {this.props.disasterType === 'Earthquake' ? <button onClick={()=>{this.changeTab('event')}} className={`weather__btn ${this.state.activeTab === 'event' ? 'active' : ''}`}>Event</button> : null}
                </div>
            </div>
            
            {activeComponent}

        </div>
    )
    }
    }