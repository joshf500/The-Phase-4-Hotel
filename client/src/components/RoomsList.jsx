import React from "react";
import RoomCard from './RoomCard.jsx';

function RoomList({ rooms }) {
  if (!rooms) {
    return null; // Handle the case when rooms are not available
  }

  const ArrayOfRooms = rooms.map((room) => {
    return <RoomCard room={room} key={room.name} />;
  });

  return (
    <div id="RoomListContainer">
      <ul>{ArrayOfRooms}</ul>
    </div>
  );
}

export default RoomList;
