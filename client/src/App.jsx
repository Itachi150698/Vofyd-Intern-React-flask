import {  } from 'react';
import './App.css';
import Login from './pages/login/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefaultLayout from './pages/layout/defaultLayout';
import Organization from './pages/Organization';
import AdminDashboard from './pages/adminDashboard';


function App() {

  return (
    <> 
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<DefaultLayout />}>
          <Route path="/organization" element={<Organization />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>

      
    </>
  );
}

export default App;
