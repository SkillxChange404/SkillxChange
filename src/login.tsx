// // Login.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();

//     if (response.ok) {
//       // Successfully logged in
//       localStorage.setItem('token', data.token);  // Store token
//       alert('Login successful');
//       navigate('/home');  // You can replace this with a more sophisticated success message or notification
//     } else {
//       // Failed to log in
//       alert('Login failed: ' + data.message || 'Please check your credentials.');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert('An error occurred while logging in.');
//   }
// };
//   return (
//     <div className="login">
//       <form onSubmit={handleLogin}>
//         <label htmlFor="chk" aria-hidden="true">Login</label>
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
//         <a href="#">Forgot password?</a>
//         <button type="submit">Login</button>
//       </form>
//       <button onClick={() => navigate('/signup')}>Don't have an account? Sign Up</button>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from 'react';
import './landing.css';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

   // Add landing-page class to body on component mount
   useEffect(() => {
    document.body.classList.add('landing-page');
    return () => {
      document.body.classList.remove('landing-page'); // Cleanup on component unmount
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();


    // Validate input
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        console.log('Token:', data.token);
        console.log('User:', data.user);

        // Redirect based on whether the profile exists
        if (data.user.hasProfile) {
          navigate('/home'); // Redirect to homepage if the user has a profile
        } else {
          navigate('/profile/createprofile'); // Redirect to create profile if no profile exists
        }
      } else {
        alert('Login failed: ' + (data.message || 'Unknown error occurred'));
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
      <div className="main">
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <button onClick={() => navigate('/signup')}>Don't have an account</button>
        </form>
      </div>
  );
  
};

export default Login;
