import React from 'react';

export default class entitiesAnalysis extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                activeTab: Object.keys(this.props.entities)[0]
            }
        }

        changeTab(tab) {
            this.setState({
                activeTab: tab
            })
        }

    render(){       
        let nameArray;
        let activeMsg
        let activeData;
        let dataArray = this.props.entities[this.state.activeTab];
        nameArray = []
        delete this.props.entities.snapShotTime
        for(let type in this.props.entities){
            let btnStatus;
            
            if(this.state.activeTab === type){
                btnStatus = 'active'
            }
            nameArray.push(<button key={type} className={btnStatus} onClick={()=>{this.changeTab(type)}}>{type} ({this.props.entities[type].length})</button>)
            
        activeData = []
            for(let i = 0; i<dataArray.length; i++){
                let colorClass;
                if(dataArray[i].confidence >= 75){
                    colorClass = 'green'
                }
                else if(dataArray[i].confidence >= 50){
                    colorClass = 'orange'
                }
                else{
                    colorClass = 'red'
                }
                activeData.push(
                        <tr key={`entities-${i}`} className='entities__tr' className={i % 2 === 0 ? 'td-even' : 'td-odd'}>
                            <td className='entities__td entities__td--entity-name'>{dataArray[i].normalized}</td>
                            <td className='entities__td'>{dataArray[i].count}</td> 
                            <td className={`entities__td ${colorClass}`}>{dataArray[i].confidence ? `${dataArray[i].confidence} %` : 'n/a'}</td>
                        </tr>
                )  
                }
        }
    
            return(
                <div className='entities'>
                    <div className='entities__btns-parent'>
                        {nameArray}
                    </div>
                    <table className='entities__table'> 
                        <tbody>
                            <tr className='entities__top-row'>
                                <th className='entities__th'>Entity</th>
                                <th className='entities__th'>Count</th>
                                <th className='entities__th'>Confidence</th>
                            </tr>
                        {activeData}
                       </tbody>
                     
                    </table>  
                    {activeMsg}
                </div>
            )
        }
    }
    
    