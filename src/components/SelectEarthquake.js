import React from 'react';
import moment from 'moment';

export default class SelectEarthquake extends React.Component{

    constructor(props) {

        super(props);
        this.state = {
            earthquakesList: [<tr><td>Loading</td></tr>],
            selectedEvent: null,
            earthquakeRadius: this.props.earthquakeParams.radius
        }
    }

    setEarthquake(id, title){
        this.props.setEarthquake(id, title)
    }

    componentDidMount(){
        fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=magnitude&limit=50&minlongitude=-170&maxlongitude=-65&maxlatitude=72&minlatitude=25')
        .then((res)=>{
            return res.json()
            .then((result)=>{
                let resultlist = result.features.map((item, i)=>{
                    return (
                        <tr onClick={()=>this.setEarthquake(item.id, item.properties.title)} className={`selectEarthquake__row ${i % 2 === 0 ? 'td-even' : ''}`} key={i}>
                            <td className='standard__td'>
                                {item.properties.title}
                            </td>
                         
                            <td className='standard__td'>
                                {item.properties.mag}
                            </td>   
                            <td className='standard__td'>
                                {moment(item.properties.time).format("hh:mm A MMM DD")}
                            </td>
                            <td className='standard__td'>
                                {item.properties.alert}
                            </td>
                        </tr>
                        )
                    }
                )
                this.setState({earthquakesList: resultlist})
                return;
            })
        })
    }

render(){        
        return(
            <div className='selectEarthquake'>
            {this.props.earthquakeParams.id ?
                <div>
                    <div className='createActivation__label-input-parent'>
                        <label className='selectEarthquake__label'>Selected Event: </label>
                        <div className='selectEarthquake__selected-title'>{this.props.earthquakeParams.title}</div>
                        <button className='selectEarthquake__changeEarthquake' onClick={()=>this.props.setEarthquake(null)}>Change</button>
                    </div>
                    <div className='createActivation__label-input-parent'>
                        <label className='createActivation__label'>Event Monitor Radius: </label>
                        <input className='createActivation__input' onChange={(e)=>{this.setState({earthquakeRadius: e.currentTarget.value}); this.props.setEarthquakeRadius(e.currentTarget.value)}} type='range' defaultValue={this.props.earthquakeParams.radius} max={300}/>
                        <div className='createActivation__interval-count'>{this.props.earthquakeParams.radius} km</div>  
                    </div>
                </div>
             :
                <div>
                    <h2 className='selectEarthquake__h2'>Select Earthquake</h2>
                    <table className = 'standard__table standard__table--earthquake' >
                        <tbody>
                            <tr className = 'standard__top-row' >
                                <th className = 'standard__th'>Name</th> 
                                <th className = 'standard__th'>Mag</th> 
                                <th className = 'standard__th'>Time</th> 
                                <th className = 'standard__th'>Alert</th> 
                            </tr> 
                            {this.state.earthquakesList}
                       
                        </tbody> 
                    </table> 
                </div>  
            }
            </div>
        )
    }
}