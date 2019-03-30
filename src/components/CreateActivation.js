import React from 'react';
import {
    API_BASE_URL
} from "../config";
import Select from 'react-select';
import SelectEarthquake from './SelectEarthquake';

export default class CreateActivation extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                results: [],
                activationName: this.props.defaultVals.activationName,
                // disasterType: this.props.defaultVals.disasterType,
                disasterType: this.props.defaultVals.disasterType,
                level: this.props.defaultVals.level,
                states: this.props.defaultVals.states,
                updateInterval: this.props.defaultVals.updateInterval / 60000,
                analysisInterval: this.props.defaultVals.analysisInterval / 60000,
                streamEnabled: this.props.defaultVals.streamEnabled,
                streamParams: this.props.defaultVals.streamParams,
                searchParams: this.props.defaultVals.searchParams,
                earthquakeData: this.props.defaultVals.earthquakeData,
                earthquakeParams: this.props.defaultVals.earthquakeParams
            }
            this.setEarthquake = this.setEarthquake.bind(this);
            this.setEarthquakeRadius = this.setEarthquakeRadius.bind(this);
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
                        states: this.state.statesIncluded || this.props.defaultVals.stateNames,
                        updateInterval: this.state.updateInterval * 60000,
                        analysisInterval: this.state.analysisInterval * 60000,
                        streamEnabled: this.state.streamEnabled,
                        streamParams: this.state.streamParams,
                        searchParams: this.state.searchParams,
                        earthquakeParams: this.state.earthquakeParams
                    })
                })
                .then((res) => {
                    this.props.checkActivations().then(() => {
                        this.props.toggleForm()
                    })
                })
        }

        handleSelectChange(e) {
            let statesIncluded = []
            for (let i = 0; i < e.length; i++) {
                statesIncluded.push(e[i].value)
            }
            this.setState({
                statesIncluded: statesIncluded
            })
        }

        handleDelete() {

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
                    this.props.checkActivations().then(() => {
                        this.props.toggleForm()
                    })

                })
        }

        handleSearchSubmit(e) {
            e.preventDefault();
            e.stopPropagation();
            let currentState = this.state.searchParams.searchTerms;

            if (this.searchInput.value !== "") {
                currentState.push(this.searchInput.value)
                let state = Object.assign({}, this.state.searchParams, {
                    searchTerms: currentState
                })
                this.setState({
                    searchParams: state
                })
                this.searchInput.value = ''
            }
        }

        handleStreamSubmit(e) {
            e.preventDefault();
            e.stopPropagation();

            let userVal = this.streamUserInput.value
            let keywordVal = this.streamKeywordInput.value

            let userList = this.state.streamParams.users;
            let keywordList = this.state.streamParams.searchTerms;

            if (keywordVal !== "") {
                keywordList.push(keywordVal);
            }

            if (userVal !== "") {
                userList.push(userVal);
            }

            this.setState({
                streamParams: {
                    users: userList,
                    searchTerms: keywordList
                }
            });
            this.streamUserInput.value = "";
            this.streamKeywordInput.value = "";
        }

        onKeyPress(e) {
            if (e.which === 13) {
                this.handleStreamSubmit(e);
            }
        }

        handleItemDelete(e, stateLocation, index) {
            e.preventDefault();
            e.stopPropagation();
            let currentState;

            if (stateLocation === 'stream-users') {
                currentState = this.state.streamParams.users;
                currentState.splice(index, 1)
                let state = Object.assign({}, this.state.streamParams, {
                    users: currentState
                })
                this.setState({
                    streamParams: state
                })
            } 
            
            else if (stateLocation === 'stream-searchTerms') {
                currentState = this.state.streamParams.searchTerms;
                currentState.splice(index, 1)
                let state = Object.assign({}, this.state.streamParams, {
                    searchTerms: currentState
                })
                this.setState({
                    streamParams: state
                })
            } 
            
            else if (stateLocation === 'search-params') {
                currentState = this.state.searchParams.searchTerms;
                currentState.splice(index, 1);
                let state = Object.assign({}, this.state.searchParams, {
                    searchTerms: currentState
                })
                this.setState({
                    searchParams: state
                })
            }

        }

        setEarthquake(id, title){
            if(id){
                this.setState({earthquakeParams: {...this.state.earthquakeParams, id: id, title: title}})
            }
            // when "change" btn is clicked
            else{
                this.setState({earthquakeParams: {...this.state.earthquakeParams, id: null, title: null}})
            }
        }

        setEarthquakeRadius(radius){
            this.setState({earthquakeParams: {...this.state.earthquakeParams, radius: radius}})
        }

render(){        
    let searchResults;
    if(this.state.streamEnabled){
        let userList = [];
        let searchTermList = [];

        for(let i = 0; i < this.state.streamParams.users.length; i++){
            userList.push(<button onClick={(e)=>{this.handleItemDelete(e, 'stream-users', i)}} className='createActivation__single-search-item'>{this.state.streamParams.users[i]}</button>)
        }

        for(let i = 0; i < this.state.streamParams.searchTerms.length; i++){
            searchTermList.push(<button onClick={(e)=>{this.handleItemDelete(e, 'stream-searchTerms', i)}} className='createActivation__single-search-item'>{this.state.streamParams.searchTerms[i]}</button>)
        }

        searchResults = 
        <div>
            <div>
                <h2>User Ids</h2>
                <div className='createActivation__search-item-category'>{userList}</div>
            </div>   
            <div>
                <h2>Search Terms</h2>
                <div className='createActivation__search-item-category'>{searchTermList}</div>
            </div>
        </div>
    }

    else{
        let searchTermList = [];
        for(let i = 0; i < this.state.searchParams.searchTerms.length; i++){
            searchTermList.push(<button onClick={(e)=>{this.handleItemDelete(e, 'search-params', i)}} className='createActivation__single-search-item'>{this.state.searchParams.searchTerms[i]}</button>)
        }
        searchResults =   
        <div>
            <div>
                <h2>Search Terms</h2>
                <div className='createActivation__search-item-category'>{searchTermList}</div>
            </div>
        </div>
    }
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
        
    let searchParamsForm;

    if(this.state.streamEnabled){
        searchParamsForm = 
        <form onSubmit={(e)=>{ this.handleStreamSubmit(e)}} className='createActivation__search-form createActivation__search-form--stream'>
                <input onKeyPress={(e)=>{this.onKeyPress(e)}} type="submit" ref={node => (this.streamUserInput = node)} className='createActivation__input createActivation__input--search-form' type='text' placeholder='User Id'/>
                <input onKeyPress={(e)=>{this.onKeyPress(e)}} type="submit" ref={node => (this.streamKeywordInput = node)} className='createActivation__input createActivation__input--search-form'  type='text' placeholder='Keywords, phrases, hashtags'/>
        </form>
    }
    else{
        searchParamsForm = 
        <form onSubmit={(e)=>{ this.handleSearchSubmit(e)}} className='createActivation__search-form createActivation__search-form--search'>
            <div className='createActivation__input-wrapper'>
                <input ref={node => (this.searchInput = node)} className='createActivation__input createActivation__input--search-form'  type='text' placeholder='Keywords, phrases, hashtags'/>
                {/* <button type='submit' className='createActivation__add-search-btn'>Add</button> */}
            </div>
        </form>
    }
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


                {this.state.disasterType === 'Earthquake' ?   
                    <SelectEarthquake earthquakeParams={this.state.earthquakeParams} setEarthquake={this.setEarthquake} setEarthquakeRadius={this.setEarthquakeRadius}/> 
                : null }
                 
                    
                    <div className='createActivation__label-input-parent'>
                        <label className='createActivation__label'>Activation Level: </label>
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
                        <label className='createActivation__label'>Data Retrieval: </label>
                        <div className='createActivation__input'>
                            <span>Search</span>
                            <label class="switch createActivation__switch">
                                <input checked = {this.state.streamEnabled ? true : false} onChange={()=>this.setState({streamEnabled: !this.state.streamEnabled})} type="checkbox"/>
                                <span class="slider round"></span>
                            </label>
                            <span>Stream</span>
                        </div>
                    </div>      

                    <div className='createActivation__label-input-parent'>
                        <label className='createActivation__label'>Data Parameters: </label>
                        {searchParamsForm}
                    </div>          

                    <div className='createActivation__search-params-totals'>
                        {searchResults}
                    </div>    

                    <button className='createActivation__submit-btn' type='submit'>Submit</button>
                    {this.props.type === 'Edit' ? <button className='createActivation__delete-btn' onClick={(e)=>{e.preventDefault(); this.handleDelete()}}>Delete</button> : null}
                  </form>                
                    
                </div>
                
            </div>
        )
    }
}