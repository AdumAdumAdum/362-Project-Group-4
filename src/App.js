import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="sign-up" element={<p>Sign up</p>} />
          <Route path="log-in" element={<p>Log in</p>} />
          <Route path="*" element={<p>We can't find that page!</p>} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
