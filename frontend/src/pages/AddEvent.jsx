import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleError } from "../toast_message/errorMessage";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../toast_message/successMessage";
import { useNavigate } from "react-router-dom";

export const AddEvent = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        event: "",
        date: "",
        image: "",
        dressCode: "",
        speaker: "",
        price: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.description ||
            !formData.event ||
            !formData.date ||
            !formData.image ||
            !formData.speaker
        ) {
            return handleError(
                "title, description, date, image, event, speaker fields are required."
            );
           
        }

        const url = "http://localhost:2450/event/add";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
        });
        const result = await response.json();

        const { success, message, error } = result;

        if (success) {
            handleSuccess(message);
            setFormData({
                title: "",
                description: "",
                event: "",
                date: "",
                image: "",
                dressCode: "",
                speaker: "",
                price: "",
            });
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } else {
            handleError(message || error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Add New Event</h2>

            <form
                onSubmit={handleSubmit}
                className="border p-4 shadow-sm rounded bg-light"
            >
                <div className="mb-3">
                    <label className="form-label">Event Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter event title"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Event Type</label>
                    <select
                        name="event"
                        className="form-select"
                        value={formData.event}
                        onChange={handleChange}
                    >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                        type="datetime-local"
                        name="date"
                        className="form-control"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        className="form-control"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Paste image URL"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Dress Code</label>
                    <select
                        name="dressCode"
                        className="form-select"
                        value={formData.dressCode}
                        onChange={handleChange}
                    >
                        <option value="Formal">Formal</option>
                        <option value="Casual">Casual</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Speaker Name</label>
                    <input
                        type="text"
                        name="speaker"
                        className="form-control"
                        value={formData.speaker}
                        onChange={handleChange}
                        placeholder="Enter speaker name"
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Price (₹)</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter event price"
                    />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary px-4 ">
                        Submit
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};
