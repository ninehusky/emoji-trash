import React, { Component } from 'react';
import EmojiEntry from './EmojiEntry.js';

const URL_BASE = 'http://localhost:8000';

class EmojiTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emojiEntries: []
        }
    }

    componentDidMount() {
        fetch(URL_BASE + '/api/getAll')
            .then((data) => {
                let allEmojiData = data.json();
                return allEmojiData;
            })
            .then((allEmojiData) => {
                console.log(allEmojiData);
                let emojiEntries = [];
                let counter = 1;
                allEmojiData.forEach((emojiData) => {
                    emojiData.counter = counter++;
                    emojiEntries.push(<EmojiEntry data={emojiData} key={emojiData._id}/>);
                });
                this.setState({
                    emojiEntries: emojiEntries
                });
            })
            .catch(console.error);
    }

    render() {
        return (
            <div className="container">
                <table className="table">
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