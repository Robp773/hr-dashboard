import React from 'react';

export default class Status extends React.Component{
render(){
    let statusColor;
    if(this.props.status === 1){
        statusColor = {background: 'green'};
    }
    else if(this.props.status === 2){
        statusColor = {color: 'yellow'};
    }
    else if(this.props.status === 3){
        statusColor = {background: 'red'};
    }

    return(
        <div  className='status' >  
            <div className='status__alert' style={statusColor}>{this.props.status}</div>
        </div>
    )
}
}