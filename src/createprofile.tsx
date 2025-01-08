import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const CreateProfile: React.FC = () => {
  const [bio, setBio] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    twitter: '',
    instagram: '',
    facebook: ''
  });
  const navigate = useNavigate(); // Used to navigate to another page

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
  
      const response = await fetch('http://localhost:5000/profile/createprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token
        },
        body: JSON.stringify({
          bio,
          avatar_url: avatarUrl,
          location,
          contact_number: contactNumber,
          job_title: jobTitle,
          social_links: socialLinks
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 201) {
        alert('Profile created successfully');
        navigate('/profile'); // Redirect to profile page after success
      } else if (response.status === 401) {
        alert('Unauthorized: Please log in again');
        navigate('/login'); // Redirect to login page
      } else {
        alert('Profile creation failed: ' + (data.message || data.error));
      }
    } catch (error) {
      console.error('Error during profile creation:', error);
      alert('Profile creation failed');
    }
  };
  
  

  return (
    <div className="landing-page">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <label>Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

          <label>Avatar URL</label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />

          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label>Contact Number</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />

          <label>Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <label>Social Links</label>
          <input
            type="url"
            placeholder="GitHub URL"
            value={socialLinks.github}
            onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
          />
          <input
            type="url"
            placeholder="Twitter URL"
            value={socialLinks.twitter}
            onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
          />
          <input
            type="url"
            placeholder="Instagram URL"
            value={socialLinks.instagram}
            onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
          />
          <input
            type="url"
            placeholder="Facebook URL"
            value={socialLinks.facebook}
            onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
          />

          <button type="submit">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;


