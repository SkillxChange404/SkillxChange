import React, { useState, useEffect } from 'react';
import './searchlisting.css';

interface Job {
  id: number;
  title: string;
  description: string;
  postedBy: string;
  datePosted: string;
}

const SearchListing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Fetch job listings from the backend
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/jobs');
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data); // Initialize with all jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(term) || job.description.toLowerCase().includes(term)
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="search-listing-page">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for jobs or services..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Services Section */}
      <div className="services-section">
        <h2>Services</h2>
        <ul>
          <li>Web Development</li>
          <li>Graphic Design</li>
          <li>Content Writing</li>
          <li>Digital Marketing</li>
          <li>Mobile App Development</li>
        </ul>
      </div>

      {/* Job Listings */}
      <div className="job-listings">
        <h2>Job Listings</h2>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>
                <strong>Posted By:</strong> {job.postedBy}
              </p>
              <p>
                <strong>Date Posted:</strong> {job.datePosted}
              </p>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchListing;
