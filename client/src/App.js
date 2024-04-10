import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import User from'./pages/User';
import ErrorPage from'./pages/ErrorPage';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/user/:address' element={<User />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
