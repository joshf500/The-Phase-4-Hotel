import React, { useState, useEffect } from "react";
import "../styles/Bookings.css";

function BookingForm() {
  const [people, setPeople] = useState(0);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // fetching data to data of rooms

  useEffect(() => {
    fetch("/see_rooms")
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    setCheckIn(checkIn=>e.target["check_in"].value)
    setCheckOut(checkOut=>e.target["check_out"].value)
    console.log(checkIn)
    console.log(checkOut)
    const requestData = {
      people,
      check_in: e.target["check_in"].value,
      check_out: e.target["check_out"].value,
      room_id: roomId, // Assign the selected room ID
    };
    
    
    console.log(requestData)
    fetch("/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log("Reservation created:", data);
        setBookingConfirmed(true);
      })
      .catch((error) => {
        console.error("Error creating reservation:", error);
      });
  };

  return (
    <div className="BookingFormContainer">
      <form className="BookingForm" onSubmit={handleSubmit}>
        <h2>Book a Reservation</h2>
        {bookingConfirmed ? (
          <p>Your booking is confirmed! </p>
        ) : null}
        <div>
          <label htmlFor="people" className="BookingInput">
            Number of People
          </label>
          <input
            id="people"
            className="BookingInput"
            type="number"
            min="1"
            max="6"
            required
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </div>
        
      {/*  <div>
          <label htmlFor="checkIn" className="BookingInput">
            Check-in Date
          </label>
          <DatePicker
            id="checkIn"
            className="BookingInput datepicker"
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>
        <div>
          <label htmlFor="checkOut" className="BookingInput">
            Check-out Date
          </label>
          <DatePicker
            id="checkOut"
            className="BookingInput datepicker"
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            dateFormat="yyyy-MM-dd"
            required
          />
        </div> */}
        <div>
        <label htmlFor="checkin date" className="BookingInput">
            check in date 
          </label>
          <input
          type="date"
          name="check_in"
          required
          />
        </div>
        <div>
        <label htmlFor="checkout date" className="BookingInput">
            check out date 
          </label>
          <input
          type="date"
          name="check_out"
          required
          />
        </div>
        <div>
          <label htmlFor="room" className="BookingInput">
            Select Room
          </label>
          <select
            id="room"
            className="BookingInput"
            required
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            <option value="">Select a room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.room_number}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="BookingButton">
          Book Reservation
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
