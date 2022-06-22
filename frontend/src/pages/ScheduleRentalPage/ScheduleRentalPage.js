import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";

const ScheduleBoatRental = (props) => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    initialValues,
    scheduleBoat
  );

  const [boats, setBoats] = useState([]);

  useEffect(() => {
    async function getBoatById(id){
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/boats/${id}`, {...boats, renter_selection:formData, is_active:formData}, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            });
            setBoats(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };
    getBoatById();
  }, [token]);


  async function scheduleBoat(id) {
    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/boats/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/api/boats/${id}");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="container">
      <h2>Hello {user.first_name}!</h2>
      <table>
        <thead>
          <tr>
            <th>Boat Name</th>
            <th>Option One</th>
            <th>Option Two</th>
            <th>Option Three</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>{boat.boat_name}</td>
                <td>{boat.option_one}</td>
                <td>{boat.option_two}</td>
                <td>{boat.option_three}</td>
            </tr>
        </tbody>
        </table>
      <h3>Please enter your option below based on the options above!</h3>
      <form className="form" onSubmit={handleSubmit}>
        {/* <h2>Hello {user.first_name}!</h2>
        <h3>Please edit the information below!</h3> */}
        <label>
          Confirm Selection:{" "}
          <input
            type="checkbox"
            name="is_active"
            value={formData.is_active}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Renter Selection:{" "}
          <input
            type="text"
            name="renter_selection"
            value={formData.renter_selection}
            onChange={handleInputChange}
          />
        </label>
        <button>Submit Selection from Choices Above</button>
      </form>
    </div>
  );
};

export default ScheduleBoatRental;
