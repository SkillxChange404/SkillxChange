import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import SearchPage from './components/SearchPage';
import ProfilePage from './components/ProfilePage';



const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
