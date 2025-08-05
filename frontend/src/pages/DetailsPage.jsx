import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { handleSuccess } from '../toast_message/successMessage';
import { handleError } from '../toast_message/errorMessage';
import { ToastContainer } from 'react-toastify';

export const DetailsPage = () => {
  const [eventData, setEventData] = useState("");
  const [error, setError] = useState(null);
  const [showExtra, setShowExtra] = useState(false);
  const { id } = useParams();

  const fetchDataMethod = async () => {
    try {
      const url = `http://localhost:2450/event/${id}`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include"
      });
      const result = await response.json();

      const { success, message, data, error } = result;

      if (success) {
        setEventData(data);
        handleSuccess(message)
      } else {
        setError(message || error || "Error occurred while fetching the data through API");
        handleError(message || error || "Error occurred while fetching the data through API")
      }
    } catch (err) {
      setError(err);
      handleError(err)
    }
  };

  useEffect(() => {
    fetchDataMethod();
  }, [id]);

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  if (!eventData) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <img
          src={eventData.image}
          className="card-img-top img-fluid rounded"
          alt={eventData.title}
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h3 className="card-title">{eventData.title}</h3>
          <p className="card-text"><strong>Description:</strong> {eventData.description}</p>
          <p className="card-text"><strong>Type:</strong> {eventData.event}</p>
          <p className="card-text"><strong>Date:</strong> {new Date(eventData.date).toLocaleString()}</p>
          <p className="card-text"><strong>Price:</strong> ₹{eventData.price}</p>

          <button
            className="btn btn-primary mt-3"
            onClick={() => setShowExtra(!showExtra)}
          >
            {showExtra ? "Hide Extra Info" : "Show Extra Info"}
          </button>

          {showExtra && (
            <div className="mt-3 p-3 bg-light border rounded">
              <p><strong>Dress Code:</strong> {eventData.dressCode}</p>
              <p><strong>Speaker:</strong> {eventData.speaker}</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
