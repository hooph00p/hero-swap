/**
 * React Entry Point
 * More Info: https://github.com/hooph00p/hero-swap#readme
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Bulma from '../node_modules/bulma/css/bulma.css';
import Style from './style.sass';

class App extends React.Component {
    render() {
        return (
            <div>
                <p> Hello, world. </p>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);