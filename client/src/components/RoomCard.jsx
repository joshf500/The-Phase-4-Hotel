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

  return (
    <li className="card">
      <img src={room?.image} alt={room?.name} />
      <h4>{room?.name}</h4>
      <p>nigtly cost: {price}</p>
      <p>sleeps {room?.sleeps}</p>
      {isAvailable ? (
        <button onClick={handleClick} className="primary">
          Available
        </button>
      ) : (
        <button onClick={handleClick}>Booked</button>
      )}
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
    </li>
  );
}

export default RoomCard;
