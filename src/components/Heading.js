import React from 'react';

export default function Heading(props){
       
        return(
            <div className='heading'>

                <h1 className='heading__name'>{props.headingInfo.type}</h1>
                <div className='heading__states'>{props.impactedStates}</div>
                
            </div>
        )
}