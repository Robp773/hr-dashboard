import React from 'react';
import WordCloudComponent from './WordCloudComponent';
export default class Locations extends React.Component {
        constructor(props) {

            super(props);
            this.state = {
                tableActive: true
            }
        }

        onCheck(){
            this.setState({tableActive: !this.state.tableActive})
        }

        render() {
            let activeTab;
            if(this.state.tableActive){
                let listData = [];
                       for(let i = 0; i<this.props.locations.length; i++){
                           listData.push(
                            <tr className={`${i % 2 === 0 ? 'td-even' : ''}`} key={i}>
                                <td className='standard__td'>{this.props.locations[i].name}</td>
                                <td className='standard__td'>{this.props.locations[i].count}</td>      
                            </tr>
                           )
                       }  
           
                activeTab = <table className='standard__table'> 
                                <tbody>
                                    <tr className='standard-row'>
                                        <th className='standard__th hashtags__th--name'>Location</th>
                                        <th className='standard__th'>Count</th>
                                    </tr>
                                    {listData}
                                </tbody>
                            </table>
            }
            else{
                activeTab = <WordCloudComponent multiplier={12.5} dataArray={this.props.locations}/>
            }
  
        return(
            <div className='standard__data-parent'>

                <div className='hashtags__toggle-btn-parent'>
                    <div className='hashtags__label'>Table</div>
                    <label class="switch">
                        <input onChange={()=>this.onCheck()} type="checkbox"/>
                        <span class={`slider round ${this.state.tableActive ? 'sliderSecondary' : 'sliderPrimary'}`}></span>
                    </label>
                    <div className='hashtags__label'>Cloud</div>
                </div>

                {activeTab}
                
            </div>
        )
    }
}