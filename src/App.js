import './assets/stylesheets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import React from "react";
import Editor from "./components/containers/editor/Editor";

function App({blockPosition}) {
  return (
        <Header/>
      <Editor blockPosition={blockPosition}/>
  );
}

export default App;
