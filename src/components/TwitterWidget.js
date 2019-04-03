import React from 'react';

export default class twitterWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {       
        window.twttr.widgets.load()
    }

    componentDidUpdate() {
        window.twttr.widgets.load()          
    }

    render() {

        return(
            <div id='twitterWidgets-parent'>{this.props.twitterWidgets}</div>
        )

    }
}