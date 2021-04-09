import './assets/stylesheets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import Header from "./components/Header";


/**
 * Приложение основное, подключается только шапка
 * Содержимое ссылок шапки указывается в файлах, описывающих эти страницы.
 * По умолчанию стартовая Home
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  return (
    <Header/>
  );
}

export default App;

/** Я хочу закончить вуз */