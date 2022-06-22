import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  // const [cars, setCars] = useState([]);
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/boats/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setBoats(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchBoats();
  }, [token]);
  return (
    <div className="container">
      <h1>Home Page for {user.first_name}!</h1>
      <Link to="/addboat">Add Boat</Link>
      <br />
      <Link to="/searchrental">Search Rentals</Link>
      {/* {boats &&
        boats.map((boat) => (
          <p key={boat.id}>
            {boat.boat_type}
            {boat.description} 
            {boat.capaciity} 
            {boat.city} 
            {boat.state} 
            {boat.lake}
            {boat.boat_rating} 
            <img src={boat.picture} /> 
          </p>
        ))} */}
      <table>
        <thead>
          <tr>
            <th>Boat Name</th>
            <th>Boat Type</th>
            <th>Description</th>
            <th>Capacity</th>
            <th>Boat Rating</th>
            <th>City</th>
            <th>State</th>
            <th>Lake</th>
            <th>Picture</th>
            <th>Option One</th>
            <th>Option Two</th>
            <th>Option Three</th>
            <th>Actively Used</th>
          </tr>
        </thead>
        <tbody>
          {boats &&
            boats.map((boat) => (
                  <tr key={boat.id}>
                    <td>{boat.boat_name}</td>
                    <td>{boat.boat_type}</td>
                    <td>{boat.description}</td>
                    <td>{boat.capacity}</td>
                    <td>{boat.boat_rating}</td>
                    <td>{boat.city}</td>
                    <td>{boat.state}</td>
                    <td>{boat.lake}</td>
                    <td><img src={boat.picture} alt="This is a boat" width="100" height="100" /></td>
                    <td>{boat.option_one}</td>
                    <td>{boat.option_two}</td>
                    <td>{boat.option_three}</td>
                    <td>{boat.is_active}</td>
                  </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
};

export default HomePage;
