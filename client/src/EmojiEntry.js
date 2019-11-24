import React, { Component } from 'react';
import TextBox from './TextBox.js';
/**
 * EmojiEntry takes in JSON containing word, entry, 
 */
export default class EmojiEntry extends Component {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
        this.state = {
            id: this.props.data.id,
            word: this.props.data.word,
            emoji: this.props.data.emoji,
            absurdity: this.props.data.absurdity,
            vulgarity: this.props.data.vulgarity,
            description: this.props.data.description
        };
    }

    componentDidMount() {
    }

    // TODO:
    /**
     * handleWordChange()
     * handleEmojiChange()... etc.
     * Then, work on pinging database with new EmojiEntry vals
     * Then, work on deleting something
     * Then, work on creation
     * Then, client view
     * Then, authentication
     */

    handleChange(e) {
        this.setState({
            dbKey: e.target.value
            
        });
        console.log(this.state);
    }

    render() {
        return(
            <tr>
                <th scope="col">{ this.props.data.counter }</th>
                <th scope="col">
                    <TextBox 
                        dbKey="word"
                        value={ this.props.data.word }
                        handleChange = { this.handleChange }
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