import React from 'react';
import moment from 'moment';

export default class Heading extends React.Component{
render(){
    return(
        <div className='heading'>  
          <h2>{this.props.headingInfo.name}</h2>
          <h3>{this.props.headingInfo.location}</h3>
          <h4>{moment().format("MMMM Do, YYYY")}</h4>
        </div>
    )
}
}