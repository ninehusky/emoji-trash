import React, { Component } from 'react';

export default class TextBox extends Component {
    constructor(props) {
        super(props);
        // this.props.dbKey --> key in the database, e.g., word, emoji, etc.
        // this.props.value --> word
        this.state = {
            value: this.props.value
        };
    }


    handleClick = (e) => {
        let newValue = prompt('What would you like the value of ' + this.props.dbKey + ' to become?');
        this.setState({
            value: newValue
        });
    }

    render() {
        return(
            <div className="textBox"
                 onClick={ this.handleClick }
            >
                     { this.state.value }
            </div>
        );
    }
}