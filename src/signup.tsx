// import React, { useState } from 'react';
// import { useNavigate  } from 'react-router-dom';

// const SignUp: React.FC = () => {
//   const [firstname, setFirstName] = useState<string>('');
//   const [lastname, setLastName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const navigate = useNavigate (); 

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       // Use the correct signup endpoint (/users/signup)
//       const response = await fetch('http://localhost:5000/users/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           firstname,
//           lastname,
//           email,
//           password,
//         }),
//       });

//       // Handling the response
//       const data = await response.json();
//       if (response.ok) {
//         alert('Sign up successful');
//         // Optionally store the token in localStorage or state
//         localStorage.setItem('token', data.token);

//         navigate('/profile');  // Redirect to Profile page on success
//       } else {
//         alert('Sign up failed: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred');
//     }
//   };

//   return (
//     <div className="signup-container">
//       <form onSubmit={handleSignUp}>
//         <label>Sign Up</label>
//         <input
//           type="text"
//           name="firstname"
//           placeholder="First Name"
//           required
//           value={firstname}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//         <input
//           type="text"
//           name="lastname"
//           placeholder="Last Name"
//           required
//           value={lastname}
//           onChange={(e) => setLastName(e.target.value)}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//       <button onClick={() => navigate('/login')}>Already have an account? Login</button>
//       </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import './landing.css';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send data to the Flask backend (no token needed for now)
      const response = await fetch('http://localhost:5000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Sign up successful');
        
        // Store token and user details in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        navigate('/profile');  // Redirect to Profile page after successful signup
      } else {
        alert('Sign up failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during sign up');
    }
  };

  return (
    <div className="landing-page">
    <div className="main">
      <form onSubmit={handleSignUp}>
        <label>Sign Up</label>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          required
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          required
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={() => navigate('/login')}>Already have an account? Login</button>
    </div>
    </div>
  );
};

export default SignUp;
