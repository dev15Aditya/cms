import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {loggedIn ? (
          <Dashboard />
        ) : (
          <Routes>
            <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path="/register" element={<Registration />} />{' '}
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
