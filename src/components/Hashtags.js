import React from 'react';
// import WordCloudComponent from './WordCloudComponent';
import {
    Pie
} from 'react-chartjs-2';

export default class Hashtags extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            tableActive: true
        }
    }

    changeTab(tab) {
        this.setState({
            activeTab: tab
        })
    }

    onCheck() {
        this.setState({
            tableActive: !this.state.tableActive
        })
    }

    render() {

        const data = {
            labels: this.props.hashtags.labels,
            datasets: [{
                data: this.props.hashtags.data,
                backgroundColor: [
                    '#e6194B',
                    '#f58231', 
                    'purple',
                    'lightgreen',
                    '#3cb44b',
                    '#42d4f4', 
                    'blue',
                    '#aaffc3', 
                    '#bfef45',
                    '#000075', 
                    'orange',
                    '#4363d8', 
                    '#ffe119',
                    '#469990', 
                    'teal',
                ],
                hoverBackgroundColor: [
                    'rgb(243, 142, 32)',
                    'rgb(243, 142, 32)',
                    'rgb(243, 142, 32)',
                    'rgb(243, 142, 32)', 'rgb(243, 142, 32)',
                    'rgb(243, 142, 32)', 'rgb(243, 142, 32)',
                    'rgb(243, 142, 32)', 'rgb(243, 142, 32)',
                    'rgb(243, 142, 32)', 'rgb(243, 142, 32)',
                    'rgb(243, 142, 32)', 'rgb(243, 142, 32)',
                    'rgb(243, 142, 32)',
                ]
            }]
        };


        let activeTab;
        if (this.state.tableActive) {
            let listData = [];
            for (let i = 0; i < this.props.hashtags.data.length; i++) {
                listData.push( 
                    <tr className = {`${i % 2 === 0 ? 'td-even' : ''}` }key = {i} >
                        <td className = 'standard__td' > {[i+1]} </td> 
                        <td className = 'standard__td' > {this.props.hashtags.labels[i]} </td> 
                        <td className = 'standard__td' > {this.props.hashtags.data[i]} </td>
                    </tr>
                )
            }

            activeTab = 
                <table className = 'standard__table' >
                    <tbody>
                        <tr className = 'standard__top-row' >
                        <th className = 'standard__th standard' >Rank</th> 
                        <th className = 'standard__th standard__th--name' >Hashtag</th> 
                        <th className = 'standard__th' >Count</th> 
                    </tr> 
                    {listData} 
                    </tbody> 
                </table>
        } else {
            let options =  {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        fontSize: 20
                    }
                }
            }
            activeTab = <Pie width={200} data = {data} options={options} />
        }

        return ( 
            <div className = 'standard__data-parent hashtags' >

                <div className = 'hashtags__toggle-btn-parent' >
                    <div className = 'hashtags__label' > Table </div> 
                    <label class = "switch" >
                    <input onChange = {() => this.onCheck()} type = "checkbox" />
                    <span class = {`slider round ${this.state.tableActive ? 'sliderSecondary' : 'sliderPrimary'}`} > </span> 
                    </label> 
                    <div className = 'hashtags__label' >Chart</div>
                </div >

                    {activeTab}

            </div>
        )
    }
}