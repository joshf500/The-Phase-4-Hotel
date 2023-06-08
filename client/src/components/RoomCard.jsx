import React, { useState, useEffect } from "react";
import "../styles/RoomCards.css";

function RoomCard() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("/see_rooms")
      .then((response) => response.json())
      .then((data) => {
        setRooms(data.rooms);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, []);
