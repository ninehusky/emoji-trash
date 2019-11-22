import React, { Component } from 'react';

/**
 * EmojiEntry takes in JSON containing word, entry, 
 */
export default class EmojiEntry extends Component {
    constructor(props) {
        super(props);
        
        // props initialized
        // this.props.data.forEach((value) => {
        //     this.state.children.append(/* new textbox */);
        // });
    }

    componentDidMount() {
    }

    render() {
        return(
            <tr>
                <th scope="col">{ this.props.data.counter }</th>
                <th scope="col">{ this.props.data.word }</th>
                <th scope="col">{ this.props.data.emoji }</th>
                <th scope="col">{ this.props.data.vulgarity }</th>
                <th scope="col">{ this.props.data.absurdity }</th>
                <th scope="col">{ this.props.data.description}</th>
            </tr>
        );
    }
}