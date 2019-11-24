import React, { Component } from 'react';

export default class TextBox extends Component {
    constructor(props) {
        super(props);
        // this.props.dbKey --> key in the database, e.g., word, emoji, etc.
        // this.props.value --> word
    }


    handleClick = (e) => {
        this.props.handleChange(e);
    }

    render() {
        return(
            <div className="textBox"
                 onClick={ this.handleClick }
            >
                     { this.props.value }
            </div>
        );
    }
}