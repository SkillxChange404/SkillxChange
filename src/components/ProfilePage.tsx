// ProfilePage.tsx
import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  // State to hold the form values
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [contractorsLicense, setContractorsLicense] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [socialMedia, setSocialMedia] = useState({
    facebook: '',
    linkedin: '',
    twitter: ''
  });

  // Handle file upload
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'phone') setPhone(value);
    if (name === 'contractorsLicense') setContractorsLicense(value);
  };

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>, platform: string) => {
    setSocialMedia(prevState => ({ ...prevState, [platform]: e.target.value }));
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <div className="profile-container">
        {/* Profile Picture Section */}
        <div className="profile-pic-container">
          <label htmlFor="profile-pic">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : '/assets/default-profile.jpg'}
              alt="Profile"
              className="profile-pic"
            />
            <input
              type="file"
              id="profile-pic"
              accept="image/*"
              onChange={handleProfilePicChange}
              hidden
            />
            <span>Click to upload picture</span>
          </label>
        </div>

        {/* Personal Details Section */}
        <div className="profile-details">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contractorsLicense">Contractor's License:</label>
              <input
                type="text"
                id="contractorsLicense"
                name="contractorsLicense"
                value={contractorsLicense}
                onChange={handleInputChange}
                placeholder="Enter your contractor's license"
              />
            </div>

            <div className="form-group">
              <label htmlFor="details">Details About Yourself:</label>
              <textarea
                id="details"
                name="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Enter details about yourself"
              />
            </div>
          </form>
        </div>

        {/* Social Media Links Section */}
        <div className="social-media-links">
          <h2>Social Media</h2>
          <div className="form-group">
            <label htmlFor="facebook">Facebook:</label>
            <input
              type="url"
              id="facebook"
              value={socialMedia.facebook}
              onChange={(e) => handleSocialMediaChange(e, 'facebook')}
              placeholder="Enter your Facebook URL"
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn:</label>
            <input
              type="url"
              id="linkedin"
              value={socialMedia.linkedin}
              onChange={(e) => handleSocialMediaChange(e, 'linkedin')}
              placeholder="Enter your LinkedIn URL"
            />
          </div>

          <div className="form-group">
            <label htmlFor="twitter">Twitter:</label>
            <input
              type="url"
              id="twitter"
              value={socialMedia.twitter}
              onChange={(e) => handleSocialMediaChange(e, 'twitter')}
              placeholder="Enter your Twitter URL"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
