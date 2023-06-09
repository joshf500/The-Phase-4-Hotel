import React from 'react';

import RoomList from '../components/RoomsList.jsx';
import BookingForm from '../components/BookingForm';

const BookingPage = () => {
  return (
    <div>
      <BookingForm />
      <RoomList />
    </div>
  );
};

export default BookingPage;
