import React from 'react';
// import moment from 'moment';

export default class Heading extends React.Component{
render(){        
    // let headingsArray = [
    //     <div className='heading__type-val-parent'>    
    //         <h3 className='heading__h3'>Disaster</h3>
    //         <div className='heading__value'>{this.props.headingInfo.type}</div>
    //     </div>
    // ];
    // for(let i =0; i<this.props.headingInfo.headings.length; i++){
    //     console.log('running')
    //     headingsArray.push(
    //         <div className='heading__type-val-parent'>
    //             <h3 className='heading__h3'>{this.props.headingInfo.headings[i].name}</h3>
    //             <div className='heading__value'>{this.props.headingInfo.headings[i].value}</div>
    //         </div>
    //     )
    // }
        return(
            <div className='heading'>

                <h1 className='heading__name'>{this.props.headingInfo.type}</h1>
                <div className='heading__states'>{this.props.impactedStates}</div>

                <div className='heading__headings-array'>
                    {/* {headingsArray} */}
                </div>
                
            </div>
        )
    }
}