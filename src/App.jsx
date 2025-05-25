import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DataUsers from './pages/DataUsers';
import LoginData from './pages/LoginData';
import SignUpData from './pages/SignUp';

import { BrowserRouter, Routes, Route, Link } from "react-router";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginData />} />
        <Route path='/signUp' element={<SignUpData />} />
        <Route path='/dataUsers' element={<DataUsers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
