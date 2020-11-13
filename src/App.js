import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import BrowseEvents from './components/BrowseEvents';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddEvent from './components/Event/AddEvent';
import { Provider } from "react-redux";
import store from './store';
import EventItemDetails from './components/EventItemDetails';
import UpdateEvent from './components/Event/UpdateEvent';
import Register from './components/UserManagement/Register';
import Login from './components/UserManagement/Login';
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions';
import SecuredRoute from "./securityUtils/SecureRoute";



//token from the local storage
const jwtToken = localStorage.jwtToken;
const currentTime = Date.now() / 1000;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decode_jwtToken = jwt_decode(jwtToken);

  //dispatch back to the state
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decode_jwtToken
  });

  if (decode_jwtToken.exp < currentTime) {
    store.dispatch(logout())
    window.location.href = "/";
  }

}


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
          <Switch>
            <SecuredRoute exact path="/createEvent" component={AddEvent} />
            <SecuredRoute exact path="/updateEvent/:id" component={UpdateEvent} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
