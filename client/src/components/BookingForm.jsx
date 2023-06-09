import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Bookings.css";

function BookingForm() {
  const [people, setPeople] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [numNights, setNumNights] = useState("");
  const [totalCost, setTotalCost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBookingData = {
      people,
      check_in: checkIn.toISOString(),
      check_out: checkOut.toISOString(),
      room_id: roomId,
    };

    // Simulate an API request
    setTimeout(() => {
      // Display the success notification
      toast.success(
        `Your room is now reserved:
        User Name: ${username}
        Nights: ${numNights}
        Total Cost: ${totalCost}`
      );
    }, 1000);
  };

  const handleRoomChange = (e) => {
    const selectedRoomId = e.target.value;
    const selectedRoom = rooms.find((room) => room.id === selectedRoomId);
    setRoomId(selectedRoomId);
    setTotalCost(selectedRoom.price_per_night * numNights);
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
          onChange={handleRoomChange}
        >
          <option value="">Select a room</option>
          {/* Add more room options as needed */}
        </select>
      </div>
      <button type="submit" className="BookingButton">
        Book Reservation
      </button>

      <ToastContainer />
    </form>
  );
}

export default BookingForm;
