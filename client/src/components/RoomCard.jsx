import React, { useState, useEffect } from "react";
import '..//styles/Bookings.css'

function RoomCard({ room }) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [price, setPrice] = useState(room.price);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoomData();
  }, []);

  const fetchRoomData = async () => {
    try {
      const response = await fetch(`/api/rooms/${room.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch room data');
      }
      const data = await response.json();
      setPrice(data.price);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  function handleClick() {
    setIsAvailable(!isAvailable);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission logic
    console.log("Form submitted");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }



export default RoomCard;
