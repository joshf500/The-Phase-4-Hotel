import React from 'react';
import ParallaxHeader from '../components/npc-ParallaxHeader';
import CalanderForm from '../components/CalanderForm';
import RoomFilter from '../components/RoomFilter';

import RoomList from '../components/RoomList';
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
