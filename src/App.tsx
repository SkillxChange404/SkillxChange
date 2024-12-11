import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Ensure BrowserRouter is imported correctly
import ProfilePage from './ProfilePage'; // Correct import

interface RouteParams {
  id: string;
}

const App = () => {
  return (
    <Router> {/* Make sure Router is wrapped around your Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profilepage" element={<ProfilePage />} /> {/* Correctly use the imported ProfilePage component */}
      </Routes>
    </Router> 
  );
};

const HomePage = () => {
  return <h1>Home Page</h1>;
};


export default App;
