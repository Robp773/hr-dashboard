import React from 'react';
import {API_BASE_URL} from "../config";

export default class StateForm extends React.Component {

        constructor(props) {
            super(props);
            this.state = {

            }
        }
    handleSubmit(e) {
        e.preventDefault();

        fetch(`${API_BASE_URL}/clean-data`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:  JSON.stringify({
                    name: this.stateName.value,
                    twitterList: this.twitterList.value,
                    payload: this.rawData.value
                })
            })
            .then((res) => {
                return res.json()
                    .then((result) => {
                        console.log(result)
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
    }

render(){        
        return (
            <div className='modal-bg' onClick={(e)=>{this.props.toggleForm()}}>
                <form onSubmit={(e)=>{this.handleSubmit(e)}} className='state-form' onClick={(e)=>{e.stopPropagation()}}>
                    <button className='state-form__exit-btn' onClick={(e)=>{e.preventDefault(); this.props.toggleForm()}}>X</button>

                    <div className='state-form__label-input-parent'>
                        <label className='state-form__label'>State Name:</label>
                        <input className='state-form__input' type='text' ref={(textInput)=> this.stateName = textInput} placeholder='State Name' />
                    </div>

                    <div className='state-form__label-input-parent'>
                        <label className='state-form__label'>Twitter List Url:</label>
                        <input className='state-form__input' type='text' ref={(textInput)=> this.twitterList = textInput} placeholder='Twitter List Url' />
                    </div>

                    <div className='state-form__label-input-parent'>
                        <label className='state-form__label'>Raw Data:</label>
                        <textarea className='state-form__input' ref={(textInput)=> this.rawData = textInput} placeholder='State Name' />
                    </div>

                    <button type='submit' className='state-form__submit-btn'>Submit</button>

                </form>
            </div>
        )
    }
}