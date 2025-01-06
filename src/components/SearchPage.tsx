import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import CompanyLogo from "../assets/company-logo.png";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [distance, setDistance] = useState('');
  const [minRating, setMinRating] = useState('');

  const availableSkills = ['Concrete', 'Electrical', 'Plumbing', 'Drafting', 'Computer'];

  const handleZipCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 5) {
      setZipCode(value);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ searchQuery, selectedSkill, zipCode, distance, minRating });
  };

  return (
    <div className="container min-vh-100 py-4">
      <h1 className="text-center mb-4">Search Service Providers</h1>
      <div className="row">
        {/* Search Sidebar */}
        <div className="col-md-4 mb-4">
          <form onSubmit={handleSearch} className="card p-4 shadow">
            <div className="mb-3">
              <label htmlFor="search" className="form-label">
                Search by Name or Keyword
              </label>
              <input
                type="text"
                id="search"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="skill" className="form-label">
                Select Service Type
              </label>
              <select
                id="skill"
                className="form-select"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              >
                <option value="">All Services</option>
                {availableSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="zipCode" className="form-label">
                Enter Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                className="form-control"
                placeholder="Zip Code"
                value={zipCode}
                onChange={handleZipCodeChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="distance" className="form-label">
                Search Radius
              </label>
              <select
                id="distance"
                className="form-select"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              >
                <option value="">Select Distance</option>
                <option value="5">Within 5 miles</option>
                <option value="10">Within 10 miles</option>
                <option value="25">Within 25 miles</option>
                <option value="50">Within 50 miles</option>
                <option value="100">Within 100 miles</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Minimum Rating
              </label>
              <select
                id="rating"
                className="form-select"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Search
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="col-md-8">
          <h2>Search Results</h2>
          <p className="text-muted">Results will appear here after performing a search.</p>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => (
  <div className="container min-vh-100 py-4">
    <h1 className="text-center mb-4">Profile Page</h1>
    <p className="text-muted text-center">This is where user profile details will be displayed.</p>
  </div>
);

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand d-flex align-items-center" to="/">
      <img
  src="/assets/company-logo.png"
  alt="Company Logo"
  style={{ width: '40px', marginRight: '10px' }}
/>

        ServiceFinder
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/search" element={<SearchPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  </Router>
);

export default App;
