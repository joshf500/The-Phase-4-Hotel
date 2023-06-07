import React, { useState, useEffect } from "react";
import DatePicker from 'react-modern-calendar-datepicker';
import RoomList from "./RoomsList";
import '..//styles/Bookings.css'

/*  the classnames need to be readjusted so they dont override any other styling  */

function RoomFilter() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filters, setFilters] = useState({
    price: "",
    peoplePerRoom: "",
    startDate: null,
    endDate: null,
    scenery: "",
  });
  
  useEffect(() => {
    fetchRooms();
  }, []);

  // update! 
  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/rooms"); // update! 
      if (!response.ok) {
        throw new Error("Failed to fetch room data"); // update! 
      }
      const data = await response.json(); // update! 
      setRooms(data);
      setFilteredRooms(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const filterRooms = () => {
    let filtered = [...rooms];

    if (filters.price !== "") {
      filtered = filtered.filter((room) => room.price <= filters.price);
    }

    if (filters.peoplePerRoom !== "") {
      filtered = filtered.filter(
        (room) => room.peoplePerRoom === parseInt(filters.peoplePerRoom)
      );
    }

    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter((room) => {
        return true; 
      });
    }

    if (filters.scenery !== "") {
      filtered = filtered.filter((room) =>
        room.scenery.includes(filters.scenery)
      );
    }

    setFilteredRooms(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filterRooms();
  };

/*  the classnames need to be readjusted so they dont override any other styling  */

  return (
    <div>
      <h2>Room Filter</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="price">Price:</label>
            <button
            className={filters.price === "75-125" ? "active" : ""}
            onClick={() => handleFilterChange("price", "75-125")}
            >
            $75 - $125
            </button>
            <button
            className={filters.price === "125-200" ? "active" : ""}
            onClick={() => handleFilterChange("price", "125-200")}
            >
            $125 - $200
            </button>
            <button
            className={filters.price === "200-350" ? "active" : ""}
            onClick={() => handleFilterChange("price", "200-350")}
            >
            $200 - $350
            </button>

        </div>
        <div>
          <label htmlFor="peoplePerRoom">People per Room:</label>
          <button
            className={filters.peoplePerRoom === "1" ? "active" : ""}
            onClick={() => handleFilterChange("peoplePerRoom", "1")}
          >
            1
          </button>
          <button
            className={filters.peoplePerRoom === "2" ? "active" : ""}
            onClick={() => handleFilterChange("peoplePerRoom", "2")}
          >
            2
          </button>
          <button
            className={filters.peoplePerRoom === "3" ? "active" : ""}
            onClick={() => handleFilterChange("peoplePerRoom", "3")}
          >
            3
          </button>
          <button
            className={filters.peoplePerRoom === "4" ? "active" : ""}
            onClick={() => handleFilterChange("peoplePerRoom", "4")}
          >
            4
          </button>
          <button
            className={filters.peoplePerRoom === "5" ? "active" : ""}
            onClick={() => handleFilterChange("peoplePerRoom", "5")}
          >
            5
          </button>
          <button
            className={filters.peoplePerRoom === "6" ? "active" : ""}
            onClick={() => handleFilterChange("peoplePerRoom", "6")}
          >
            6
          </button>
        </div>
        <div>
          <label htmlFor="date">Date Range:</label>
          <DatePicker
            value={filters.startDate}
            onChange={(selectedDay) =>
              handleFilterChange("startDate", selectedDay)
            }
            inputPlaceholder="Start Date"
            shouldHighlightWeekends
          />
          <DatePicker
            value={filters.endDate}
            onChange={(selectedDay) =>
              handleFilterChange("endDate", selectedDay)
            }
            inputPlaceholder="End Date"
            shouldHighlightWeekends
          />
        </div>
        <div>
          <label htmlFor="scenery">Scenery:</label>
          <button
            className={filters.scenery === "ocean" ? "active" : ""}
            onClick={() => handleFilterChange("scenery", "ocean")}
          >
            Ocean
          </button>
          <button
            className={filters.scenery === "jungle" ? "active" : ""}
            onClick={() => handleFilterChange("scenery", "jungle")}
          >
            Mountain
          </button>
          <button
            className={filters.scenery === "moutain top" ? "active" : ""}
            onClick={() => handleFilterChange("scenery", "mountain top")}
          >
            City
          </button>
        </div>
        <button type="submit">Apply Filters</button>
      </form>

      <h3>Filtered Rooms:</h3>
      {filteredRooms.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        <ul>
          {filteredRooms.map((room) => (
            <li key={room.id}>
              <h4>{room.name}</h4>
              <p>Price: {room.price}</p>
              <p>People per Room: {room.peoplePerRoom}</p>
              <p>Availability: {room.availability}</p>
              <p>Scenery: {room.scenery.join(", ")}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RoomFilter;
