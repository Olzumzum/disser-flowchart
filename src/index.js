import React from 'react';
import ReactDOM from 'react-dom';
import './assets/stylesheets/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {observe} from "./components/MoveToBlock";

observe((blockPosition) =>
    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById('root')
    )
);

reportWebVitals();
