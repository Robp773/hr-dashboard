import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class RegionInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            //   activeData: this.props.regionalData.stateGovt
       activeTab: 'stateGovt'
            
        }
    }
    
    tabSelect(tab) {
        this.setState({
            activeTab: tab,
            activeData: this.props.regionalData[tab]
        })
    }
    
render(){
    let listData = []
    console.log(this.state.activeData)
    if (this.state.activeData) {
        for(let i = 0; i <this.state.activeData.length; i++){
            listData.push(

                <tr key={i}>
                    <td  className='regionInfo__name' ><a target='#' href={this.state.activeData[i].Website}>{this.state.activeData[i].Name}</a></td>
                    <td className='regionInfo__social-media'>
                        <a href={`https://twitter.com/${this.state.activeData[i].Twitter}`}><img alt='Twitter' src='images/twitter.png'/></a>
                    </td>

                    <td className='regionInfo__social-media'>
                        <a href={this.state.activeData[i].Facebook}><img alt='Facebook' src='images/facebook.png'/></a>
                    </td>

                </tr>
            )
        }
    }
    

    return(
        <div className='regionInfo component facts' >
            <h2 className='component__h2'>Regional/State Info</h2> 
                <div className='regionInfo__container component__container'>
                    <div className='regionInfo__btn-container'>
                        <button  onClick={()=>{this.tabSelect('stateGovt')}} className={`regionInfo__btn ${this.state.activeTab === 'stateGovt' ? 'active' : ''}`}>State Govt.</button>
                        <button onClick={()=>{this.tabSelect('cities')}} className={`regionInfo__btn ${this.state.activeTab === 'cities' ? 'active' : ''}`}>5 Largest Cities</button>
                        <button onClick={()=>{this.tabSelect('counties')}} className={`regionInfo__btn ${this.state.activeTab === 'counties' ? 'active' : ''}`}>County Govt.</button>
                        <button onClick={()=>{this.tabSelect('utilities')}} className={`regionInfo__btn ${this.state.activeTab === 'utilities' ? 'active' : ''}`}>Utilities</button>
                        <button onClick={()=>{this.tabSelect('ports')}} className={`regionInfo__btn ${this.state.activeTab === 'ports' ? 'active' : ''}`}>Ports</button>
                        <button onClick={()=>{this.tabSelect('airports')}}className={`regionInfo__btn ${this.state.activeTab === 'airports' ? 'active' : ''}`}>Airports</button>
                        <button onClick={()=>{this.tabSelect('news')}} className={`regionInfo__btn ${this.state.activeTab === 'news' ? 'active' : ''}`}>News Stations</button>
                        <button onClick={()=>{this.tabSelect('colleges')}} className={`regionInfo__btn ${this.state.activeTab === 'colleges' ? 'active' : ''}`}>Colleges/University</button>
                    </div> 

                    <table className='regionInfo__table'> 
                        <tbody>
                        <tr>
                            <th className='regionInfo__name-th'>Name</th>
                            <th className='regionInfo__social-media-th'>Twitter</th>
                            <th className='regionInfo__social-media-th'>Facebook</th>
                        </tr>
                       {listData}
                       </tbody>
                    </table>
                  
                    </div>
        </div>
    )
}
}