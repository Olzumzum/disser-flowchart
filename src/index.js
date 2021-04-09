import React from 'react';
import ReactDOM from 'react-dom';
import {EditorApp} from './components/editor/EditorApp'
import reportWebVitals from "./reportWebVitals";
import './assets/stylesheets/index.css';
import App from "./App";
import Home from "./pages/Home";

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
