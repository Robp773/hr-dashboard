import React from 'react';

export default function Citiescities(props){
let listData = []
    for (let i = 0; i < props.cities.length; i++) {
            if(props.cities[i].name){
                listData.push(
                <tr className={`cities__tr ${i % 2 === 0 ? 'td-even' : null}`} key={`cities-${i}`}>
                    <td className='cities__td cities__city'>{props.cities[i].name}</td>
                    <td className='cities__td'>{props.cities[i].description}</td>
                    <td className='cities__td'>{props.cities[i].temperature} &#8457;</td>
                    <td className='cities__td'>{props.cities[i].windSpeed}</td>
                    <td className='cities__td'>{props.cities[i].humidity}%</td>
                    <td className='cities__td'>{props.cities[i].visibility} mi</td>
                </tr>
                )
            }
        }  
        return(
                <div className='cities'>
                    <table className='cities__table'> 
                        <tbody>
                            <tr className='cities__top-row'>
                                <th key='city' className='cities__th'>City</th>
                                <th key='cities' className='cities__th'>Weather</th>
                                <th key='temp' className='cities__th'>Temp</th>
                                <th key='wind' className='cities__th'>Wind</th>
                                <th key='hum' className='cities__th'>Hum</th>
                                <th key='vis' className='cities__th'>Vis</th>
                            </tr>
                            {listData}
                        </tbody>
                    </table>
                </div>
        )
}