import React, { Component } from 'react';

import PlayerSearch from './components/PlayerSearch';
import NavBar from './components/NavBar';
import Main from './components/Main'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {
  state = {}
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route path='/' exact component={Main} />
            <Route path='/playersearch' exact component={PlayerSearch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
