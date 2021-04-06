import React from 'react';
import ReactDOM from 'react-dom';
import {EditorApp} from './components/editor/EditorApp'
import reportWebVitals from "./reportWebVitals";
import './assets/stylesheets/index.css';

    ReactDOM.render(
        <React.StrictMode>
            <EditorApp/>
        </React.StrictMode>,
        document.getElementById('root')
);

reportWebVitals();
