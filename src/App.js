import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import Example1 from './pages/example1';

function App() {
  return (
    <div>
      <Router>
        <div style={{ margin: '1rem 0 2rem' }}>
          <Link to="/">Home</Link>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/ex-1" component={Example1} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
