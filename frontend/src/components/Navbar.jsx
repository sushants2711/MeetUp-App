import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);


  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = `http://localhost:2450/event?query=${query}`
    const response = await fetch(url, {
      method: "GET",
      credentials: "include"
    })
    const result = await response.json();
    const { success, message, error, data } = result;
    console.log(data)

    if(success) {
      setSearchResult(data);
    }else {
      setSearchResult([])
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fst-italic text-danger" to="/">
          Meetup
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/add">
                Add
              </Link>
            </li>
          </ul>

          <form className="d-flex" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              name="query"
              placeholder="Search events..."
              value={query}
              onChange={handleChange}
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
