// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useState } from 'react';
import axios from "axios";


// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AddBoatPage from "./pages/AddBoatPage/AddBoatPage";
import SearchRentalPage from "./pages/SearchRentalPage/SearchRentalPage";
import ScheduleBoatRentalPage from "./pages/ScheduleBoatRentalPage/ScheduleBoatRentalPage";
import EditBoatPage from "./pages/EditBoatPage/EditBoatPage";
import DeleteBoatPage from "./pages/DeleteBoatPage/DeleteBoatPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import { BrowserRouter as Router } from "react-router-dom";
import RentalConfirmationPage from "./pages/RentalConfirmationPage/RentalConfirmationPage";

function App() {



  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addboat" element={<PrivateRoute><AddBoatPage /></PrivateRoute>} />
        <Route path="/editboat/:boatId" element={<PrivateRoute><EditBoatPage /></PrivateRoute>} />
        <Route path="/deleteboat/:boatId" element={<PrivateRoute><DeleteBoatPage /></PrivateRoute>} />
        <Route path="/searchrental" element={<PrivateRoute><SearchRentalPage /></PrivateRoute>} />
        <Route path="/schedule/:boatId" element={<PrivateRoute><ScheduleBoatRentalPage /></PrivateRoute>} />
        <Route path="/rentalconfirmation" element={<RentalConfirmationPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
