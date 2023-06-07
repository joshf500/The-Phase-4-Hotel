import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import '../styles/styled.css';

import BookingPage from './BookingPage';
import UserPage from  './UserPage';
import Home from './Home';

import Header from "../components/Header";

function App() {
  return (
    <div id="App"> 
      <Router>
        <nav>
          <ul className="navBar">
            <li>
              <Link to='/'>home</Link>
            </li>
            <li>
              <Link to='/pages/BookingPage'> Book Now </Link>
            </li>
            <li>
              <Link to='/pages/UserPage'> UserPage </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/pages/BookingPage" component={BookingPage} />
          <Route path="/pages/UserPage" component={UserPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
