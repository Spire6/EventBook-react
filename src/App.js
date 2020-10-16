import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import "bootstrap/dist/css/bootstrap.min.css"
import BrowseEvents from './components/BrowseEvents';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddEvent from './components/Event/AddEvent';

function App() {
  return (
    <Router>
      <div className="App">

        <Header />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/createEvent" component={AddEvent} />
        <Route exact path="/browseEvents" component={BrowseEvents} />

      </div>
    </Router>

  );
}

export default App;
