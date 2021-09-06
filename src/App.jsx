import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/home';
import Example1 from './pages/example1';
import Example2 from './pages/example2';
import store from './store';

function App() {
  return (
    <div>
      <Router>
        <Provider store={store}>
          <div style={{ margin: '1rem 0 2rem' }}>
            <Link to="/">Home</Link>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/ex-1" component={Example1} />
            <Route exact path="/ex-2" component={Example2} />
          </Switch>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
