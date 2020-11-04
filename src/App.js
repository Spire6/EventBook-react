import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import "bootstrap/dist/css/bootstrap.min.css"
import BrowseEvents from './components/BrowseEvents';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddEvent from './components/Event/AddEvent';
import { Provider } from "react-redux";
import store from './store';
import EventItemDetails from './components/EventItemDetails';
import UpdateEvent from './components/Event/UpdateEvent';
import Register from './components/UserManagement/Register';
import Login from './components/UserManagement/Login';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          {
            //Public Routes
          }
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/browseEvents" component={BrowseEvents} />
          <Route exact path="/eventDetails/:id" component={EventItemDetails} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          {
            //Private Routes
          }
          <Route exact path="/createEvent" component={AddEvent} />
          <Route exact path="/updateEvent/:id" component={UpdateEvent} />

        </div>
      </Router>
    </Provider>
  );
}

export default App;
