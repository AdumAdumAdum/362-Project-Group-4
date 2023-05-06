import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Dashboard, Home, LogIn, SignUp, Feed } from './pages';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="log-in" element={<LogIn />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="feed" element={<Feed />} />
          <Route path="*" element={<p>We can't find that page!</p>} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
