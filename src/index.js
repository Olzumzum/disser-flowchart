import React from 'react';
import ReactDOM from 'react-dom';
import {EditorApp} from './components/editor/EditorApp'
import reportWebVitals from "./reportWebVitals";
import './assets/stylesheets/index.css';
import App from "./App";


/**
 * Страртовая страница приложения,
 * здесь реакт подключает приложение
 */
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
