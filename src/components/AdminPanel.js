import React from 'react';
import {
    API_BASE_URL
} from "../config";
import states from "us-state-codes";
import CreateActivation from './CreateActivation';


export default class AdminPanel extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                results: [],
                editIndex: 0,
                createFormOpen: false,
                editFormOpen: false
            }

            this.toggleCreateForm = this.toggleCreateForm.bind(this);
            this.toggleEditForm = this.toggleEditForm.bind(this);
            this.checkActivations = this.checkActivations.bind(this);
        }

        componentDidMount() {
            fetch(`${API_BASE_URL}/activations/all`)
                .then((res) => {
                    return res.json()
                        .then((result) => {
                            this.setState({
                                results: result
                            })
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
        }

        reactivateActivation(activationName) {

            fetch(`${API_BASE_URL}/reactivate`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    activationName: activationName
                })
            })
            .then(()=>{
                this.checkActivations()
            })
        }

        deactivateActivation(activationName) {
            fetch(`${API_BASE_URL}/deactivate`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    activationName: activationName
                })
            })
            .then(()=>{
                this.checkActivations()
            })
        }

        async checkActivations() {
            console.log('checking ')
            fetch(`${API_BASE_URL}/activations/all`)
                .then((res) => {
                    return res.json()
                        .then((result) => {
                            this.setState({
                                results: result
                            })
                            return;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
        }

        toggleCreateForm(){
            this.setState({createFormOpen: !this.state.createFormOpen, editFormOpen: false})
        }

        toggleEditForm(){
            this.setState({editFormOpen: !this.state.editFormOpen, createFormOpen: false})
        }

        handleEdit(resultsIndex){
            this.setState({editFormOpen: true, editIndex: resultsIndex})
        }

render(){        
    let formModal;    
    
    let defaultVals = {
            activationName: '',
            disasterType: '',
            level: '',
            states: [],
            updateInterval: 300000,
            analysisInterval: 300000,
            streamEnabled: false
        }
    if(this.state.createFormOpen){
        formModal = <CreateActivation reqType='POST' type='Create' defaultVals={defaultVals} checkActivations={this.checkActivations} toggleForm={this.toggleCreateForm}/>
    }
    else if(this.state.editFormOpen && this.state.results.length > 0){

        let curActivation = this.state.results[this.state.editIndex];
        let statesArray = [];
        for(let i = 0; i <curActivation.states.length; i++){
            statesArray.push(
               {value: curActivation.states[i], label: curActivation.states[i]}
            )
        }

        defaultVals = {
            activationName: curActivation.activationName,
            disasterType: curActivation.disasterType,
            level: curActivation.level,
            states: statesArray,
            updateInterval: curActivation.updateInterval,
            analysisInterval: curActivation.analysisInterval,
            streamEnabled: curActivation.streamEnabled
        }
    
        formModal = <CreateActivation reqType='PUT' type='Edit' defaultVals={defaultVals} checkActivations={this.checkActivations} toggleForm={this.toggleEditForm}/>
    }
    let activationsArray = [];
    for(let i =0; i < this.state.results.length; i++){   
        let enabledIndicator = <div className='activationList__stream-indicator activationList__stream-indicator--enabled'></div>
        let disabledIndicator = <div className='activationList__stream-indicator activationList__stream-indicator--disabled'></div>
        let activationStatus;
        let activationBtn;
        if(this.state.results[i].status){
            activationBtn = <td className='activationList__td activationList__td--deactivate'><button onClick={()=>{this.deactivateActivation(this.state.results[i].activationName)}}>Deactivate</button></td>
            activationStatus = 'activationList__td--active';
        } 
        else{
            activationBtn = <td className='activationList__td activationList__td--activate'><button onClick={()=>{this.reactivateActivation(this.state.results[i].activationName)}}>Activate</button></td>
            activationStatus = 'activationList__td--inactive'
        }
        let levelClass;
        if (this.state.results[i].level === 1) {
            levelClass = 'green'
        }
        else if (this.state.results[i].level === 2) {
            levelClass = 'yellow'
        }
        else if (this.state.results[i].level === 3) {
            levelClass = 'red'
        }   
        let levelIndicator = <div className={`activationList__level-indicator activationList__level-indicator--${levelClass}`}>{this.state.results[i].level}</div>

        let statesArray = []
        for(let b =0; b <this.state.results[i].states.length; b++){
            statesArray.push(<span key={`state-${b}`}>{states.getStateCodeByStateName(this.state.results[i].states[b])} </span>)
        }
        activationsArray.push(
            <tr className={`activationList__tr`} key={`all-activation-${i}`}>
                <td className='activationList__td'>{this.state.results[i].activationName}</td>
                <td className={`activationList__td ${activationStatus}`}>{this.state.results[i].status ? "Active" : "Inactive"}</td>
                <td className='activationList__td'>{this.state.results[i].disasterType}</td>
                <td className='activationList__td'>{statesArray}</td>
                <td className='activationList__td'>{this.state.results[i].streamEnabled && this.state.results[i].status ? enabledIndicator: disabledIndicator}</td>
                <td className={`activationList__td activationList__level`}>{levelIndicator}</td>
                <td className='activationList__td activationList__td--edit'><button onClick={()=>{this.handleEdit(i)}}>Edit</button></td>
                {activationBtn}
            </tr>
        )
    }  

        return(
            <div className='adminPanel'>
                {formModal}
                <button className='admin-panel__back-btn' onClick={()=>this.props.toggleAdmin()}>Back</button>                

                <div className='admin-panel__parent'>
                    <h1 className='admin-panel__heading'>Admin Panel</h1>

                    <button onClick={()=>{this.toggleCreateForm()}} className='admin-panel__create-btn'>New Activation</button>
                
                    <table className='activationList__table activationList__table--admin-panel'> 
                        <tbody>
                        <tr className='activationList__top-row'>
                            <th className='activationList__th'>Activation</th>
                            <th className='activationList__th'>Status</th>
                            <th className='activationList__th'>Type</th>
                            <th className='activationList__th'>States</th>
                            <th className='activationList__th'>Stream</th>
                            <th className='activationList__th'>Level</th>
                        </tr>    
                        {activationsArray}
                       </tbody>
                    </table>
                
                </div>
            </div>
        )
    }
}