import React from "react";
import RoomCard from './RoomCard.jsx';

/* list of rooms */

function RoomList({ rooms }){

    const ArrayOfRooms = rooms.map((room) => {
        return <RoomCard room={room} key={room.name}/>
    })

    return (
        <div id="RoomListContainer">
            <ul>
                {ArrayOfRooms}
            </ul>
        </div>
    );
}

export default RoomList;