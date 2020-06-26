import React from 'react';
import './styles/main.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import List from './pages/List';
import Post from './pages/Post';

function App() {
  return (
    <div className="App">
      <div className="Content">
        <Router>
          <Switch>
            <Route path="/" exact component={List} />
            <Route path="/post/" exact component={Post} />
            <Route path="/post/:id" component={Post} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
