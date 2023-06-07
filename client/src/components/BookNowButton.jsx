import React from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import BookingPage from '../pages/BookingPage';

const BookNowButton = () => {
  return (
    <div>
 <Router>
      <nav>
        <button>
          <Link to="../pages/BookingPage">Book Now</Link>
        </button>
      </nav>

        <Route path="../pages/BookingPage" element={<BookingPage />} />
      </Router>
    </div>
  );
};

export default BookNowButton;


