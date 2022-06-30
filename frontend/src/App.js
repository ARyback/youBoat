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

  const [boatsCollection, setBoatsCollection] = useState(null);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const getBoats = async () =>{
     await axios.get("http://127.0.0.1:8000/api/boats/all/").then(res => setBoatsCollection(res.data));
    }



    // date
    // start time
    // end time


  return (
    <div>
    {/* <button onClick={()=>getBoats()}>Click Me!</button>
    <label for="appt">Choose a time for your meeting:</label>
    <input onChange={ e=> setTime(e.target.value) } type="time" id="appt" name="appt" min="09:00" max="18:00" required value={time}/>

    <label for="start">Start date:</label>

<input onChange = {e => setDate(e.target.value) }type="date" id="start" name="trip-start"
       
       min="2018-01-01" max="2018-12-31" value={date}/>

<small>Office hours are 9am to 6pm</small>
    {boatsCollection&&<img src={boatsCollection[10].picture}/>} */}
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addboat" element={<PrivateRoute><AddBoatPage /></PrivateRoute>} />
        <Route path="/editboat" element={<PrivateRoute><EditBoatPage /></PrivateRoute>} />
        <Route path="/deleteboat" element={<PrivateRoute><DeleteBoatPage /></PrivateRoute>} />
        <Route path="/searchrental" element={<PrivateRoute><SearchRentalPage /></PrivateRoute>} />
        <Route path="/schedule/:boatId" element={<PrivateRoute><ScheduleBoatRentalPage /></PrivateRoute>} />
        <Route path="/rentalconfirmation" element={<RentalConfirmationPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
