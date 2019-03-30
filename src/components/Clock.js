import React from 'react';
import moment from 'moment';
import { DateTime } from "luxon";
import {connect} from 'react-redux';
import {returnToList} from '../actions';

export class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localTime: moment().format('LTS'),
            localDate: moment().format("MMMM Do, YYYY"),
            disasterTime: DateTime.local().setZone(this.props.timeZone).toFormat('tt')};
        }

    clockTracker() {
        let localDate = moment().format("MMMM Do, YYYY");
        let localTime = moment().format('LTS');
        
        this.setState({
            localDate: localDate,
            localTime: localTime,
            disasterTime:  DateTime.local().setZone(this.props.timeZone).toFormat('tt')
        })
    }

    returnToList(){        
        this.props.dispatch(returnToList())
        this.props.disconnectSocket();
    }

    componentDidMount() {
        this.clockInterval = setInterval(() => this.clockTracker(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.clockInterval);
    }

    render() {
        return ( 
            <div className='clock' >
                    <h4>Local</h4>
                    <div>{this.state.localTime}</div>
                    <h4>{this.props.location}</h4>
                    <div>{this.state.disasterTime}</div>

                    <button onClick={()=>this.returnToList()} className='clock__back-btn'>Back</button>
            </div>
        )
    }
}

export default connect()(Clock)