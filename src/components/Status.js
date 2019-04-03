import React from 'react';

export default function Status(props){  
    
    let statusColor;
    if(props.status === 1){
        statusColor = {background: 'green'};
    }
    else if(props.status === 2){
        statusColor = {color: 'yellow'};
    }
    else if(props.status === 3){
        statusColor = {background: 'red'};
    }

    return(
        <div className='status' >  
            <div className='status__alert' style={statusColor}>{props.status}</div>
        </div>
    )

}