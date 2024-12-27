// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import SignUp from './signup'; // Import the SignUp component
import Login from './login'; // Import the Login component
import ProfilePage from './profilepage';
// import HomePage from './HomePage';


// const App: React.FC = () => {
//   const [isLogin, setIsLogin] = useState<boolean>(true); // Track if it's in Login mode or SignUp mode

//   return (
//     <div className="main">
//       <input type="checkbox" id="chk" aria-hidden="true" />
      
//       {/* Conditional Rendering */}
//       {isLogin ? (
//         <Login /> // Render Login component when in login mode
//       ) : (
//         <SignUp /> // Render SignUp component when in sign up mode
//       )}

//       <button onClick={() => setIsLogin(!isLogin)} className="btn">
//         {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
//       </button>
//     </div>
//   );
// };

// export default App;
const App: React.FC = () => {
  return (
    <Router>
      <div className="main">
        <Routes>
          {/* Route for Login */}
          <Route path="/login" element={<Login />} />

          {/* Route for Sign Up */}
          <Route path="/signup" element={<SignUp />} />

          {/* Route for Profile Page */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Route for Home Page */}
          {/* <Route path="/home" element={<HomePage />} /> */}

          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
