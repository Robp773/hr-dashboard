import React from 'react';
import {
    API_BASE_URL
} from "../config";
import Select from 'react-select';


export default class CreateActivation extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                results: [],
                activationName: this.props.defaultVals.activationName,
                disasterType: this.props.defaultVals.disasterType,
                level: this.props.defaultVals.level,
                states: this.props.defaultVals.states,
                updateInterval: this.props.defaultVals.updateInterval / 60000,
                analysisInterval: this.props.defaultVals.analysisInterval / 60000,
                streamEnabled: this.props.defaultVals.streamEnabled
            }
        }

        componentDidMount() {
            fetch(`${API_BASE_URL}/states`)
                .then((res) => {
                    return res.json()
                        .then((result) => {
                            let optionsArray = []
                            for (let i = 0; i < result.length; i++) {
                                optionsArray.push({
                                    value: result[i],
                                    label: result[i]
                                })
                            }
                            this.setState({
                                results: optionsArray
                            })
                        })
                })
        }

        handleSubmit(e, reqType) {
            e.preventDefault();

            if (!this.state.activationName || !this.state.disasterType) {
                alert('Missing form data')
                return;
            }

            fetch(`${API_BASE_URL}/activate`, {
                    method: this.props.reqType,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        // search params
                        // twitter list 
                        activationName: this.state.activationName,
                        disasterType: this.state.disasterType,
                        level: this.state.level,
                        states: this.state.statesIncluded,
                        updateInterval: this.state.updateInterval * 60000,
                        analysisInterval: this.state.analysisInterval * 60000,
                        streamEnabled: this.state.streamEnabled
                    })
                })
                .then((res) => {
                    console.log(res)
                    this.props.checkActivations().then(()=>{
                        this.props.toggleForm()
                    })
                
                })

        }

        handleEditSubmit(){
            alert('edit')
        }

        handleSelectChange(e) {
            let statesIncluded = []
            console.log(e)
            for (let i = 0; i < e.length; i++) {
                console.log(`pushing ${e.value}`)
                statesIncluded.push(e[i].value)
            }
            this.setState({
                statesIncluded: statesIncluded
            })
        }

        handleDelete(activationName){

            fetch(`${API_BASE_URL}/activate`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    activationName: this.state.activationName,        
                })
            })

            .then((res) => {
                console.log(res)
                this.props.checkActivations().then(()=>{
                this.props.toggleForm()
                })
             
            })
        }

render(){        
    let disasterTypes = [{
        value: 'Flooding',
        label: 'Flooding'
    }, {
        value: 'Earthquake',
        label: 'Earthquake'
    }, {
        value: 'Hurricane',
        label: 'Hurricane'
    }, {
        value: 'Tornado',
        label: 'Tornado'
    }, ]

    console.log(this.state)
        let test = 'handleEditSubmit'
        return(
            <div className='createActivation'>

                <div className='modal-bg' onClick={(e)=>{this.props.toggleForm()}}>

                  <form onSubmit={(e)=>{this.handleSubmit(e, this.props.reqType)}} onClick={(e)=>{e.stopPropagation()}} className='createActivation__form'>
                  <button onClick={(e)=>{e.preventDefault(); this.props.toggleForm()}} className='createActivation__exit-btn'>X</button>

                    <h2 className='createActivation__heading'>{this.props.type} Activation</h2>

                    <div className='createActivation__label-input-parent'>
                        <label className='createActivation__label'>Activation Name: </label>
                        <input defaultValue={this.state.activationName} onChange={(e)=>{this.setState({activationName: e.currentTarget.value })}} className='createActivation__input' type='text' />
                    </div>

                    <div className='createActivation__label-input-parent'>
                        <label className='createActivation__label'>Disaster Type: </label>
                        <Select
                            defaultValue={this.state.disasterType === '' ? null : {value: this.state.disasterType, label:this.props.defaultVals.disasterType}}
                            onChange={(e)=>{this.setState({disasterType: e.value })}}
                            options={disasterTypes}
                        />
                    </div>  
                    
                    <div className='createActivation__label-input-parent'>
                        <label className='createActivation__label'>Activation Level: </label>
                        {/* <select defaultValue={this.state.level} onChange={(e)=>{this.setState({level: e.currentTarget.value })}}className='createActivation__input createActivation__input--select' type='number'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select> */}
                        <Select
                            defaultValue={this.state.level === '' ? null : {value: this.state.level, label: this.state.level}}
                            onChange={(e)=>{this.setState({level: e.value })}}
                            options={[
                                {value: 1, label: 1},
                                {value: 2, label: 2},
                                {value: 3, label: 3}
                                ]}>
                        </Select>
                    </div> 

                    <div className='createActivation__label-input-parent'>
                        <label className='createActivation__label'>State Data: </label>
                        <Select
                            defaultValue={this.state.states}
                            isMulti                            
                            onChange={(e)=>this.handleSelectChange(e)}
                            options={this.state.results}
                        />
                    </div>

                    <div className='createActivation__label-input-parent'>
                        <label className='createActivation__label'>Update Interval: </label>
                        <input className='createActivation__input' onChange={(e)=>{this.setState({updateInterval: e.currentTarget.value})}} type='range' defaultValue={this.state.updateInterval} min={10} max={180}/>
                        <div className='createActivation__interval-count'>{this.state.updateInterval} mins</div>  
                    </div>

                    <div className='createActivation__label-input-parent'>
                        <label className='createActivation__label'>Analysis Interval: </label>
                        <input className='createActivation__input' onChange={(e)=>{this.setState({analysisInterval: e.currentTarget.value})}} type='range' defaultValue={this.state.analysisInterval} min={10} max={180}/>
                        <div className='createActivation__interval-count'>{this.state.analysisInterval} mins</div>  
                    </div>

                    <div className='createActivation__label-input-parent'>
                        <label className='createActivation__label'>Stream Enabled: </label>
                        <div className='createActivation__input'>
                            <span>Off</span>
                            <label class="switch createActivation__switch">
                                <input checked = {this.state.streamEnabled ? true : false} onChange={()=>this.setState({streamEnabled: !this.state.streamEnabled})} type="checkbox"/>
                                <span class="slider round"></span>
                            </label>
                            <span>On</span>
                        </div>
                    </div>
                    <button className='createActivation__submit-btn' type='submit'>Submit</button>
                    {this.props.type === 'Edit' ? <button className='createActivation__delete-btn' onClick={()=>{this.handleDelete(this.state.activationName)}}>Delete</button> : null}
                  </form>
                
                </div>
                
            </div>
        )
    }
}