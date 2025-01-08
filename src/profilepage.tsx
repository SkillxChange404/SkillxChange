// import React, { useState, useEffect } from 'react';
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
//   MDBBtn,
//   MDBBreadcrumb,
//   MDBBreadcrumbItem,
// //   MDBListGroup,
// //   MDBListGroupItem
// } from 'mdb-react-ui-kit';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// interface UserProfile {
//   fullName: string;
//   email: string;
//   phone: string;
//   mobile: string;
//   address: string;
//   avatarUrl: string;
//   jobTitle: string;
//   location: string;
//   socialLinks: {
//     github: string;
//     twitter: string;
//     instagram: string;
//     facebook: string;
//   };
// }

// const ProfilePage: React.FC = () => {
//   // State to hold user data
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const navigate = useNavigate();

//   // Fetch user data from API
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/users/profile', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass the token
//           },
//         });

//         if (response.status === 200) {
//           setProfile(response.data);
//         } else {
//           // If profile is missing, redirect to profile creation
//           navigate('/profile');
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         // If profile doesn't exist, navigate to profile creation page
//         navigate('/profile');
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Render a loading state until the data is fetched
//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <section style={{ backgroundColor: '#eee' }}>
//       <MDBContainer className="py-5">
//         <MDBRow>
//           <MDBCol>
//             <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
//               <MDBBreadcrumbItem>
//                 <a href="#">Home</a>
//               </MDBBreadcrumbItem>
//               <MDBBreadcrumbItem>
//                 <a href="#">User</a>
//               </MDBBreadcrumbItem>
//               <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
//             </MDBBreadcrumb>
//           </MDBCol>
//         </MDBRow>

//         <MDBRow>
//           <MDBCol lg="4">
//             <MDBCard className="mb-4">
//               <MDBCardBody className="text-center">
//                 <MDBCardImage
//                   src={profile.avatarUrl}
//                   alt="avatar"
//                   className="rounded-circle"
//                   style={{ width: '150px' }}
//                   fluid
//                 />
//                 <p className="text-muted mb-1">{profile.jobTitle}</p>
//                 <p className="text-muted mb-4">{profile.location}</p>
//                 <div className="d-flex justify-content-center mb-2">
//                   <MDBBtn>Follow</MDBBtn>
//                   <MDBBtn outline className="ms-1">Message</MDBBtn>
//                 </div>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//           <MDBCol lg="8">
//             <MDBCard className="mb-4">
//               <MDBCardBody>
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Full Name</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">{profile.fullName}</MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr />
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Email</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">{profile.email}</MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr />
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Phone</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">{profile.phone}</MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr />
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Mobile</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">{profile.mobile}</MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr />
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Address</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">{profile.address}</MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </section>
//   );
// };

// export default ProfilePage;


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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Fix: Initialize loading state
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (!token) {
        // If no token, navigate to login
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          setProfile(data);
        } else if (response.status === 404) {
          // Redirect to create profile if no profile is found
          navigate('/profile/createprofile');
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Unable to fetch profile. Please try again.');
        navigate('/profile/createprofile'); // Navigate to create profile on error
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <>
      <style>
        {`
        .profile-section {
          background-color: #1d2a44;
          color: #fff;
          padding: 20px 0;
          min-height: 100vh;
        }
        .profile-breadcrumb {
          background-color: rgb(79, 42, 246);
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 20px;
          color: #fff;
        }
        .profile-card, .profile-details-card {
          background-color: #2c3e50;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        .profile-avatar {
          width: 150px;
          border-radius: 50%;
          margin: 0 auto 15px;
          display: block;
        }
        .profile-job-title, .profile-location {
          margin: 10px 0;
          text-align: center;
          color: #fff;
        }
        .text-muted {
          color: rgb(19, 19, 19) !important;
        }
        `}
      </style>
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
                    className="rounded-circle profile-avatar"
                    fluid
                  />
                  <p className="profile-job-title">{profile.jobTitle || 'N/A'}</p>
                  <p className="profile-location">{profile.location || 'N/A'}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn>Follow</MDBBtn>
                    <MDBBtn outline className="ms-1">
                      Message
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="profile-details-card">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profile.fullName || 'N/A'}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profile.email || 'N/A'}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profile.phone || 'N/A'}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profile.mobile || 'N/A'}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{profile.address || 'N/A'}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
};

export default ProfilePage;