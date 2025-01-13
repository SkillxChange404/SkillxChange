// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';
import './profile.css'; // Import the extracted CSS file

// Define the UserProfile interface
interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  mobile: string;
  address: string;
  avatarUrl: string;
  jobTitle: string;
  location: string;
  socialLinks: {
    github: string;
    twitter: string;
    instagram: string;
    facebook: string;
  };
}

const ProfilePage: React.FC = () => {
  // State hooks
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          setProfile(data);
        } else if (response.status === 404) {
          navigate('/profile/createprofile');
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Unable to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display empty state
  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <section className="profile-section">
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="profile-breadcrumb">
              <MDBBreadcrumbItem>
                <a href="/">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/profile">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="profile-card">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={profile.avatarUrl || 'https://via.placeholder.com/150'}
                  alt="avatar"
                  className="profile-avatar"
                  fluid
                />
                <h5>{profile.fullName}</h5>
                <p className="text-muted mb-1">{profile.jobTitle || 'N/A'}</p>
                <p className="text-muted mb-4">{profile.location || 'N/A'}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn color="primary">Follow</MDBBtn>
                  <MDBBtn outline color="secondary" className="ms-1">
                    Message
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="profile-details-card">
              <MDBCardBody>
                {Object.entries(profile).map(([key, value]) => (
                  <div key={key}>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText className="profile-label">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {value || 'N/A'}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                  </div>
                ))}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default ProfilePage;
