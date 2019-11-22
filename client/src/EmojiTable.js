import React, { Component } from 'react';
import EmojiEntry from './EmojiEntry.js';

class EmojiTable extends Component {
    constructor(props) {
        super(props);
        // i dont think this will be necessary
        let myVal = {'prop': 'val'};
        this.state = {
            emojiEntries: <EmojiEntry data={this.myval}/>
        }
    }

    componentDidMount() {
        // ping API for all emojis
        // create list of EmojiEntries
    }

    render() {
        return (
            <div className="container">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Word</th>
                            <th scope="col">Emoji</th>
                            <th scope="col">Vulgarity</th>
                            <th scope="col">Absurdity</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.emojiEntries }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EmojiTable;