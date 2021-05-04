import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from "./reportWebVitals";
import './assets/stylesheets/index.css';
import App from "./App";
import {CreatorBlock} from "./components/editor/blocks/factory/CreatorBlock";

export const creatorBlocks = new CreatorBlock()
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
