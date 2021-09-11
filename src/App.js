import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import './App.css';

import Home from './views/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={createBrowserHistory()}>
          <div className="route">
            <Route exact path="/" component={Home} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;