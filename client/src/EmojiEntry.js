import React, { Component } from 'react';
import TextBox from './TextBox.js';
/**
 * EmojiEntry takes in JSON containing word, entry, 
 */
export default class EmojiEntry extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.data.vulgarity);
    }

    render() {
        return(
            <tr>
                <th scope="col">{ this.props.data.counter }</th>
                <th scope="col">
                    <TextBox 
                        dbKey="word"
                        value={ this.props.data.word }
                    />
                </th>
                <th scope="col">
                    <TextBox
                        dbKey="emoji"
                        value={ this.props.data.emoji }
                    />
                </th>
                <th scope="col">{ this.props.data.vulgarity.toString() }</th>
                <th scope="col">{ this.props.data.absurdity }</th>
                <th scope="col">{ this.props.data.description}</th>
            </tr>
        );
    }
}