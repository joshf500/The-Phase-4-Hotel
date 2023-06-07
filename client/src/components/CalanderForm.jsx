import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import { useState, useEffect } from 'react';

const CalanderForm = () => {
  const [guests, setGuests] = useState(1);
  const [selectedDays, setSelectedDays] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      // Cleanup function to remove event listeners
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleGuestsChange = (e) => {
    setGuests(parseInt(e.target.value));
  };

  const handleDateChange = (selectedDay) => {
    setSelectedDays(selectedDay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      guests: guests,
      startDate: selectedDays ? selectedDays.from : null,
      endDate: selectedDays ? selectedDays.to : null,
    };

    fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          // Handle successful response
          console.log('Booking submitted successfully!');
        } else {
          // Handle error response
          console.log('Failed to submit booking.');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('An error occurred:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="guests">Number of Guests:</label>
      <input
        type="number"
        id="guests"
        value={guests}
        onChange={handleGuestsChange}
        min="1"
      />

      <label htmlFor="date">Date Range:</label>
      <DatePicker
        value={selectedDays}
        onChange={handleDateChange}
        inputPlaceholder="Select a date range"
        shouldHighlightWeekends
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Book Now'}
      </button>
    </form>
  );
};

export default CalanderForm;
