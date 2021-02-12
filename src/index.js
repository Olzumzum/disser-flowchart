import React from 'react';
import ReactDOM from 'react-dom';
import {EditorApp} from './editor/EditorApp'
import reportWebVitals from "./reportWebVitals";

    ReactDOM.render(
        <React.StrictMode>
            <EditorApp/>
        </React.StrictMode>,
        document.getElementById('root')
);

reportWebVitals();
