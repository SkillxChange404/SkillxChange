import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './SearchPage.css'; // Ensure this is imported

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [distance, setDistance] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [searchType, setSearchType] = useState(''); // New state for search type (services or skills)

  const availableSkills = ['Concrete', 'Electrical', 'Plumbing', 'Drafting', 'Software Engineer', 'Graphic Designer', 'Product Manager'];

  const profiles = [
    { id: 1, name: "John Doe", description: "A software engineer", photo: "https://via.placeholder.com/150", skill: "Software Engineer", zipCode: "10001" },
    { id: 2, name: "Jane Smith", description: "A graphic designer", photo: "https://via.placeholder.com/150", skill: "Graphic Designer", zipCode: "10002" },
    { id: 3, name: "Mark Johnson", description: "A product manager", photo: "https://via.placeholder.com/150", skill: "Product Manager", zipCode: "10003" },
    { id: 4, name: "Lucas Lee", description: "A plumbing expert", photo: "https://via.placeholder.com/150", skill: "Plumbing", zipCode: "10004" },
    { id: 5, name: "Emma Williams", description: "Concrete specialist", photo: "https://via.placeholder.com/150", skill: "Concrete", zipCode: "10005" },
    { id: 6, name: "Sarah Brown", description: "Electrical engineer", photo: "https://via.placeholder.com/150", skill: "Electrical", zipCode: "10006" },
    { id: 7, name: "Chris Davis", description: "Drafting professional", photo: "https://via.placeholder.com/150", skill: "Drafting", zipCode: "10007" },
    { id: 8, name: "Amanda Green", description: "Software developer", photo: "https://via.placeholder.com/150", skill: "Software Engineer", zipCode: "10008" },
    { id: 9, name: "David Martinez", description: "Project manager", photo: "https://via.placeholder.com/150", skill: "Product Manager", zipCode: "10009" },
    { id: 10, name: "Emily Garcia", description: "Graphic designer", photo: "https://via.placeholder.com/150", skill: "Graphic Designer", zipCode: "10010" },
    { id: 11, name: "Jason Wilson", description: "Plumber", photo: "https://via.placeholder.com/150", skill: "Plumbing", zipCode: "10011" },
    { id: 12, name: "Rachel Taylor", description: "Electrical technician", photo: "https://via.placeholder.com/150", skill: "Electrical", zipCode: "10012" },
    { id: 13, name: "Brian Lee", description: "Concrete laborer", photo: "https://via.placeholder.com/150", skill: "Concrete", zipCode: "10013" },
    { id: 14, name: "Sophia Clark", description: "Software engineer", photo: "https://via.placeholder.com/150", skill: "Software Engineer", zipCode: "10014" },
    { id: 15, name: "Michael Robinson", description: "Project manager", photo: "https://via.placeholder.com/150", skill: "Product Manager", zipCode: "10015" },
    { id: 16, name: "Olivia Martinez", description: "Drafting technician", photo: "https://via.placeholder.com/150", skill: "Drafting", zipCode: "10016" },
    { id: 17, name: "Daniel Hernandez", description: "Electrical contractor", photo: "https://via.placeholder.com/150", skill: "Electrical", zipCode: "10017" },
    { id: 18, name: "Natalie King", description: "Plumbing specialist", photo: "https://via.placeholder.com/150", skill: "Plumbing", zipCode: "10018" },
    { id: 19, name: "Steven Adams", description: "Concrete designer", photo: "https://via.placeholder.com/150", skill: "Concrete", zipCode: "10019" },
    { id: 20, name: "Charlotte Baker", description: "Product management professional", photo: "https://via.placeholder.com/150", skill: "Product Manager", zipCode: "10020" },
    { id: 21, name: "Luke Harris", description: "Drafting specialist", photo: "https://via.placeholder.com/150", skill: "Drafting", zipCode: "10021" },
    { id: 22, name: "Grace Carter", description: "Electrical expert", photo: "https://via.placeholder.com/150", skill: "Electrical", zipCode: "10022" },
    { id: 23, name: "Jack Lewis", description: "Plumbing technician", photo: "https://via.placeholder.com/150", skill: "Plumbing", zipCode: "10023" },
    { id: 24, name: "Lily Walker", description: "Graphic design expert", photo: "https://via.placeholder.com/150", skill: "Graphic Designer", zipCode: "10024" },
    { id: 25, name: "Ethan Allen", description: "Software development professional", photo: "https://via.placeholder.com/150", skill: "Software Engineer", zipCode: "10025" },
    { id: 26, name: "Madison Scott", description: "Electrical engineer", photo: "https://via.placeholder.com/150", skill: "Electrical", zipCode: "10026" },
    { id: 27, name: "Benjamin Wright", description: "Product management expert", photo: "https://via.placeholder.com/150", skill: "Product Manager", zipCode: "10027" },
    { id: 28, name: "Abigail Hill", description: "Plumbing expert", photo: "https://via.placeholder.com/150", skill: "Plumbing", zipCode: "10028" },
    { id: 29, name: "Samuel Robinson", description: "Concrete contractor", photo: "https://via.placeholder.com/150", skill: "Concrete", zipCode: "10029" },
    { id: 30, name: "Zoe Mitchell", description: "Graphic designer", photo: "https://via.placeholder.com/150", skill: "Graphic Designer", zipCode: "10030" }
  ];

  useEffect(() => {
    if (zipCode) {
      fetchCoordinates(zipCode);
    }
  }, [zipCode]);

  const fetchCoordinates = async (zip) => {
    const response = await fetch(`https://us1.locationiq.com/v1/search.php?key=pk.325ce2542fe937103a952cb3a8e24be1=${zip}&format=json`);
    const data = await response.json();
    if (data && data[0]) {
      setUserCoordinates({
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      });
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const handleZipCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 5) {
      setZipCode(value);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!zipCode) {
      alert("Please enter a valid zip code.");
      return;
    }

    const filteredProfiles = profiles.filter(profile => {
      const matchesSearchQuery = searchQuery ? profile.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
      const matchesSkill = selectedSkill ? profile.skill === selectedSkill : true;
      const matchesDistance = userCoordinates && distance
        ? calculateDistance(userCoordinates.lat, userCoordinates.lon, parseFloat(profile.zipCode), 0) <= parseInt(distance)
        : true;

      return matchesSearchQuery && matchesSkill && matchesDistance;
    });

    setSearchResults(filteredProfiles);
  };

  return (
    <div className="container-fluid pt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-4 p-4">
          <form onSubmit={handleSearch}>
            <h4 className="mb-4">Search</h4>
            <div className="mb-3">
              <label htmlFor="search" className="form-label">Name or Keyword</label>
              <input
                type="text"
                id="search"
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ color: 'black' }} // Ensuring black text color in search bar
              />
            </div>
            <div className="mb-3">
              <label htmlFor="searchType" className="form-label">Search By</label>
              <div className="d-flex justify-content-between">
                <div className="form-check">
                  <input
                    type="radio"
                    id="services"
                    name="searchType"
                    value="services"
                    checked={searchType === 'services'}
                    onChange={() => setSearchType('services')}
                  />
                  <label htmlFor="services" className="form-check-label">Services</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="skills"
                    name="searchType"
                    value="skills"
                    checked={searchType === 'skills'}
                    onChange={() => setSearchType('skills')}
                  />
                  <label htmlFor="skills" className="form-check-label">Exchange Skills</label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="skill" className="form-label">Service Type</label>
              <select
                id="skill"
                className="form-select"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              >
                <option value="">All Services</option>
                {availableSkills.map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="zipCode" className="form-label">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                className="form-control"
                value={zipCode}
                onChange={handleZipCodeChange}
                maxLength="5"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="distance" className="form-label">Distance (km)</label>
              <input
                type="number"
                id="distance"
                className="form-control"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Search</button>
          </form>
        </div>

        {/* Search Results or Placeholder Cards */}
        <div className="col-md-8">
          <div className="row">
            {Array.from({ length: 12 }, (_, index) => {
              const profile = searchResults[index];
              return profile ? (
                <div key={profile.id} className="col-md-3 mb-4">
                  <Card>
                    <Card.Img variant="top" src={profile.photo} />
                    <Card.Body>
                      <Card.Title>{profile.name}</Card.Title>
                      <Card.Text>{profile.description}</Card.Text>
                      <p>Skill: {profile.skill}</p>
                    </Card.Body>
                  </Card>
                </div>
              ) : (
                <div key={`placeholder-${index}`} className="col-md-3 mb-4">
                  <Card className="under-construction-card">
                    <Card.Img variant="top" src="https://via.placeholder.com/150" />
                    <div className="construction-banner">Under Construction</div>
                    <Card.Body>
                      <Card.Title>Under Construction</Card.Title>
                      <Card.Text>This profile is under construction.</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
