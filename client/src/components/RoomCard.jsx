import React, { useState, useEffect } from "react";
import "../styles/RoomCards.css";

function RoomCard({ room }) {
  const handleReserveClick = (room) => {
    // Placeholder logic for reserving the room
    console.log("Room reserved:", room);

    // Redirect to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="room-cards">
      <div className="room-card" key={room.id}>
        <img className="room-image" src={room.image_url} alt="Room" />
        <div className="room-details">
          <h2 className="room-number">{room.room_number}</h2>
          <p className="room-price">Price per night: ${room.price_per_night}</p>
          <p className="room-sleeps">Sleeps: {room.sleeps}</p>
          <p className="room-beds">Queen beds: {room.queen_beds}</p>
          <p className="room-pullout-beds">Couch pullout beds: {room.couch_pullout_beds}</p>
          <p className="room-view">Special view: {room.special_view}</p>
          <button className="choose-room-button" onClick={() => handleReserveClick(room)}>
            Reserve this room
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
