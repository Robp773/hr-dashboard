import React from 'react';
// import moment from 'moment';

export default class Heading extends React.Component{
render(){        
  
        return(
            <div className='heading'>

                <h1 className='heading__name'>{this.props.headingInfo.type}</h1>
                <div className='heading__states'>{this.props.impactedStates}</div>
                
            </div>
        )
    }
}