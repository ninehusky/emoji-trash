import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EmojiTable from './EmojiTable.js';

class App extends Component {
    render() {
        return (
            <EmojiTable/>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);