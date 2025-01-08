// // App.tsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import './App.css';
// import SignUp from './signup'; // Import the SignUp component
// import Login from './login'; // Import the Login component
// import ProfilePage from './profilepage';
// import CreateProfile from './createprofile';
// // import HomePage from './HomePage';


// const App: React.FC = () => {
//   return (
//     <Router>
//       <div className="main">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/profile/createprofile" element={<CreateProfile />} />  {/* Profile creation page */}
//           <Route path="/profile" element={<ProfilePage />} />           {/* Profile view page */}
//           <Route path="/" element={<Navigate to="/login" />} />         {/* Redirect to login by default */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './signup';
import Login from './login';
import ProfilePage from './profilepage';
import CreateProfile from './createprofile';
import HomePage from './homepage';
import SearchListing from './searchlisting';

const App: React.FC = () => {
  
  return (
    <Router>
      <div className="main">
      <Routes>
          <Route path="/" element={<HomePage />} /> {/* Default route now points to HomePage */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile/createprofile" element={<CreateProfile />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchListing />} />
          <Route path="/home" element={<HomePage />} /> {/* Additional explicit home route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;