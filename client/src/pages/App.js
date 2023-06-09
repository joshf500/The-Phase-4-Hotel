import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import '../styles/styled.css';
import '../styles/Nav.css';

import BookingPage from './BookingPage';
import UserPage from  './UserPage';
import Home from './Home';

import Header from "../components/Header";

function App() {

  // const [data, setData] = useState('');

  //   useEffect(() => {
  //       fetch('/see_rooms') //  edit 
  //           .then(response => response.json())
  //           .then(data => setData(data.message))
  //           .catch(error => console.error(error));
  //   }, []);

  return (
    <div id="App">
      <Router>
        <nav className="navBar">
        <div className="navBar__indicator">
            <ul>
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/pages/BookingPage"> Book Now </Link>
              </li>
              <li>
                <Link to="/pages/UserPage"> Login </Link>
              </li>
            </ul>
          </div>
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




