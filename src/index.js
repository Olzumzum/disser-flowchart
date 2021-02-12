import React from 'react';
import ReactDOM from 'react-dom';
import {EditorApp} from './EditorApp'
import reportWebVitals from "./reportWebVitals";

    ReactDOM.render(
        <React.StrictMode>
            <EditorApp/>
        </React.StrictMode>,
        document.getElementById('root')
);

reportWebVitals();
