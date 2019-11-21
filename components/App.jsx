import React from 'react';
import Header from '../components/Header';
import Feed from '../components/Feed';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" component={Feed} exact />
        {/* <Route path="/frame" component={Frame} exact /> */}
      </div>
    </Router>
  );
};

export default App;
