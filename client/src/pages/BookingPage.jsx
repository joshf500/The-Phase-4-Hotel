import React from 'react';
import ParallaxHeader from '../components/npc-ParallaxHeader';
import CalanderForm from '../components/CalanderForm';
import RoomFilter from '../components/RoomFilter';
import RoomList from '../components/RoomsList';

const BookingPage = () => {
  return (
    <div>
      <CalanderForm />
      <RoomFilter />
      <RoomList />
    </div>
  );
};

export default BookingPage;
