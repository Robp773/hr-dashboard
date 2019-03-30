import React from 'react';

export default class Earthquake extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            feedOpen: false,
            earthquakeList: []
        }
    }

    componentDidMount(){
        if(this.props.earthquakeData.eventList[0]){
            
        let earthquakeList = this.props.earthquakeData.eventList.map((item, index)=>{
            if(item){
            return (
                <tr key={`earthquake-row-${index}`} className={`earthquake__feed-item-parent ${item.alert ? item.alert : ''} ${index % 2 === 0 ? 'td-even' : ''}`}>
                    <td className='earthquake__td earthquake__td--name'>
                        <a target='#' href={item.customPage}>{item.title}</a>
                    </td>
                    <td className='earthquake__td'>{item.alert ? item.alert.toUpperCase() : 'No alert'}</td>
                    <td className='earthquake__td'>{item.time}</td>
                </tr>
            )
            }
            else{
                console.log(item)
            }
        })
    
        this.setState({earthquakeList: earthquakeList})
    }   
}
    
    onCheck(){
        this.setState({feedOpen: !this.state.feedOpen})
    }

render(){    
        return(
            <div className='earthquake'>
                <div className='earthquake__feed-toggle'>
                        <div className='social-feed__label'>Event</div>
                        <label class="switch">
                            <input onChange={()=>{this.onCheck()}} type="checkbox"/>  
                            <span class="slider round"></span>
                        </label>
                        <div className='social-feed__label'>Feed</div>
                </div>
                {!this.state.feedOpen ? 
                    <div className='earthquake__original-event'>
                        <div className='earthquake__type-box earthquake__type-box--title'>
                            <h3>Title</h3>
                            <div className='earthquake__data-box'>{this.props.earthquakeData.originalEventData.title}</div>
                        </div>
                          <div className='earthquake__type-box'>
                            <h3>Time</h3>
                            <div className='earthquake__data-box'>{this.props.earthquakeData.originalEventData.time}</div>
                        </div>
                        <div className='earthquake__type-box earthquake__type-box--25'>
                            <h3>Magnitude</h3>
                            <div className='earthquake__data-box'>{this.props.earthquakeData.originalEventData.magnitude}</div>
                        </div>    
                        <div className='earthquake__type-box earthquake__type-box--25'>
                            <h3>USGS Page</h3>
                            <div className='earthquake__data-box'><a target='#' href={this.props.earthquakeData.originalEventData.customPage}>Visit</a></div>
                        </div>   
                        <div className='earthquake__type-box earthquake__type-box--25'>
                            <h3>Felt</h3>
                            <div className='earthquake__data-box'>{this.props.earthquakeData.originalEventData.felt}</div>
                        </div>
                        <div className={`earthquake__type-box earthquake__type-box--25 ${this.props.earthquakeData.originalEventData.alert ? this.props.earthquakeData.originalEventData.alert : '' }`}>
                            <h3>Alert</h3>
                            <div className={`earthquake__data-box`}>{this.props.earthquakeData.originalEventData.alert ? this.props.earthquakeData.originalEventData.alert.toUpperCase() : ' No alert' }</div>
                        </div>    
                        <div className='earthquake__type-box'>
                            <h3>Tsunami Info</h3>
                            <div className='earthquake__data-box'>{this.props.earthquakeData.originalEventData.tsunami ? <a target='#' href={this.props.earthquakeData.originalEventData.tsunami}>Visit</a> : 'N/A'}</div>
                        </div>
                        <div className='earthquake__type-box'>
                            <h3>Coordinates</h3>
                            <div className='earthquake__data-box'>{this.props.earthquakeData.originalEventData.geometry.coordinates[0]}, {this.props.earthquakeData.originalEventData.geometry.coordinates[1]}</div>
                        </div>
                        <div className='earthquake__type-box'>
                            <h3>Last Update</h3>
                            <div className='earthquake__data-box'>{this.props.earthquakeData.originalEventData.updated}</div>
                        </div>
                    </div>
                :    
                <table className='standard__table standard__table--earthquake-feed'> 
                    <h2 className='earthquake__feed-h2'>Area Seismic Events</h2>
                    <tbody>
                        <tr className='earthquake__top-row'>
                            <th className='standard__th standard__th--earthquake'>Name</th>
                            <th className='standard__th standard__th--earthquake'>Time</th>
                        </tr>
                        {this.state.earthquakeList[0] ? this.state.earthquakeList : null}
                    </tbody>
                    {this.state.earthquakeList[0] ? null : <h2 className='earthquake__no-events'>No Events</h2>}

                </table>}
            </div>
        )
    }
}