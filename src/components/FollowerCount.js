import React from 'react';

export default class FollowerCount extends React.Component{
render(){        

    let listData = [];
    for(let i = 0; i<this.props.followerCount.length; i++){
        listData.push(
         <tr className={`followerCount__tr ${i % 2 === 0 ? 'td-even' : ''}`} key={i}>
             <td className='followerCount__td'>{i + 1}</td>
             <td className='followerCount__td'><a target='#' href={`https://www.twitter.com/${this.props.followerCount[i].screen_name}`}>{this.props.followerCount[i].screen_name}</a></td>
             <td className='followerCount__td'>{this.props.followerCount[i].followers.toLocaleString()}</td>      
         </tr>
        )
    }  
        return(
            <div className='followerCount'>

                <table className='followerCount__table'> 
                    <tbody>
                        <tr className='followerCount__top-row'>
                            <th className='followerCount__th'>Rank</th>
                            <th className='followerCount__th followerCount__th--name'>User Name</th> 
                            <th className='followerCount__th'>Followers</th>
                        </tr>
                        {listData}
                    </tbody>
                </table>
                
            </div>
        )
    }
}