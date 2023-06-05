import React from "react";
import  RoomsList from './RoomsList.jsx';

/* page that contains all the info for  the rooms */

function ExploreRooms(){
    return(
        <div id="ExploreRoomsContainer">
            <main>
                <h2> explore our rooms </h2>
                <RoomsList/>
            </main>
        </div>
    )
}
export default ExploreRooms;