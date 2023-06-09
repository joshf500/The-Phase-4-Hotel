import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "../styles/Bookings.css";

function BookingForm() {
  const [people, setPeople] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [roomId, setRoomId] = useState(""); // State to hold the selected room ID

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      people,
      check_in: checkIn.toISOString(),
      check_out: checkOut.toISOString(),
      room_id: roomId, // Assign the selected room ID
    };

    // Rest of the code...

  };

  return (
    <form className="BookingForm" onSubmit={handleSubmit}>
      <h2>Book a Reservation</h2>
      <div>
        <label htmlFor="people" className="BookingInput">
          Number of People
        </label>
        <input
          id="people"
          className="BookingInput"
          type="number"
          min="1"
          required
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />
      </div>
      <div>
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
          <option value="1">Room 1</option>
          <option value="2">Room 2</option>
          {/* Add more room options as needed */}
        </select>
      </div>
      <button type="submit" className="BookingButton">
        Book Reservation
      </button>
    </form>
  );
}

export default BookingForm;
