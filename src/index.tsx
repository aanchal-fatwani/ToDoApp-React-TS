import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import TodoApp from "./TodoApp";

function App(): JSX.Element {
 
  return (
      <TodoApp/>
  );
}

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
