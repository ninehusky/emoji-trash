import React, { Component } from 'react';

/**
 * EmojiEntry takes in JSON containing word, entry, 
 */
export default class EmojiEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "children": []
        };
        // props initialized
        // this.props.data.forEach((value) => {
        //     this.state.children.append(/* new textbox */);
        // });
    }

    render() {
        return(
            <p>I am an EmojiEntry</p>
        );
    }
}