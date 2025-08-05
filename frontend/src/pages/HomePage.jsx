import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../toast_message/successMessage";
import { handleError } from "../toast_message/errorMessage";
import { ToastContainer } from "react-toastify";

export const HomePage = ({ searchResult }) => {
  const [eventData, setEventData] = useState([]);
  const [error, setError] = useState(null);
  const [drop, setDrop] = useState("Both");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setDrop(e.target.value);
  };

  const fetchDataMethod = async () => {
    const url = "https://meetup-app-sushant.onrender.com/event";

    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      // console.log(result);

      const { success, message, data, error } = result;

      if (success) {
        if (drop === "Both") {
          setEventData(data);
        } else {
          const filterOut = eventData.filter((curr) => curr.event === drop);
          setEventData(filterOut);
        }

        handleSuccess(message);
      } else {
        setError(message || error || "Error occured while calling an api");
        handleError(message || error || "Error occured while calling an api");
      }
    } catch (err) {
      setError(err.message);
      handleError(err.message);
    }
  };

  useEffect(() => {
    if (searchResult && searchResult.length > 0) {
      setEventData(searchResult);
    } else {
      fetchDataMethod();
    }
  }, [searchResult, drop]);

  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Meetup Events</h1>

        <select name="event" onChange={handleChange}>
          <option value="" disabled>
            Select value
          </option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Both">Both</option>
        </select>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        {eventData.map((event) => (
          <div
            key={event._id}
            className="col-lg-4 col-md-6 mb-4"
            onClick={() => handleClick(event._id)}
          >
            <div className="card shadow-sm h-100">
              <img
                src={event.image}
                className="card-img-top img-fluid rounded"
                alt={event.title}
              />
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">
                  {new Date(event.date).toLocaleString()}
                </p>
                <span className="badge bg-danger">{event.event}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {eventData.length === 0 && !error && (
        <div className="text-center mt-5">
          <p>Loading events...</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
