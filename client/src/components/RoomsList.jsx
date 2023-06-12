import React, { useState, useEffect } from "react";
import RoomCard from "./RoomCard.jsx";
import "../styles/RoomCards.css";

function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("/see_rooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, []);

  if (!rooms) {
    return null; // Handle the case when rooms are not available
  }

  const arrayOfRooms = rooms.map((room) => {
    return <RoomCard room={room} key={room.id} />;
  });

  return (
    <div id="RoomListContainer">
      <ul className="room-grid">{arrayOfRooms}</ul>
    </div>
  );
}

export default RoomList;
