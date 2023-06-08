import React from "react";
import RoomCard from "./RoomCard.jsx";

function RoomList({ rooms }) {
  if (!rooms) {
    return null; // Handle the case when rooms are not available
  }

  const arrayOfRooms = rooms.map((room) => {
    return <RoomCard room={room} key={room.id} />;
  });

  return (
    <div id="RoomListContainer">
      <ul>{arrayOfRooms}</ul>
    </div>
  );
}

export default RoomList;
