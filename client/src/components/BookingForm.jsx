import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "../styles/Bookings.css";

function BookingForm() {
  const [people, setPeople] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      people,
      check_in: checkIn.toISOString(),
      check_out: checkOut.toISOString(),
    };

    fetch("/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful booking
          console.log("Booking successful");
        } else {
          // Handle booking error
          console.log("Booking error");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
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
      <button type="submit" className="BookingButton">
        Book Reservation
      </button>
    </form>
  );
}

export default BookingForm;
