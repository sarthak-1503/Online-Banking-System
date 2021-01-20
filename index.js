import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from "./registerServiceWorker";
import app from "./app";
import Hello from "./Components/hello";

ReactDOM.render(<Hello />, document.getElementById("obshome"));
registerServiceWorker();