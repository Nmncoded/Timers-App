import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/style.css';
import App from './components/App.js'
// import { useState } from 'react';

function Main () {
    return <App />
}

ReactDOM.render(<Main />,document.getElementById(`root`));