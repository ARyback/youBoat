import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from "../../hooks/useAuth"
import useCustomForm from '../../hooks/useCustomForm'
import axios from 'axios'

let initialValues = {
    boat_name: "",
    // owner: "", 
    // renter: "",
    capacity: 0, 
    description: "", 
    city: "",
    state: "",
    lake: "",
    picture: "",
    boat_rating: 0.00,
    boat_type: "", 
    option_one: "",
    option_two: "",
    option_three: "",
    is_active: "",
    renter_selection: "",
};

const AddBoatPage = () => {
    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, postNewBoat);

    async function postNewBoat(){
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/boats/`, formData, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            navigate("/")
        } catch (error) {
            console.log(error.message);
        }
    }

    return ( 
    <div className="container">
        <form className="form" onSubmit={handleSubmit}>
        <h2>Hello {user.first_name}! Your county is {user.state}</h2>
        <h3>Please add your new boat in the form below</h3>
          <label>
          Boat Name:{" "}
          <input
            type="text"
            name="boat_name"
            value={formData.boat_name}
            onChange={handleInputChange}
          />
          </label>
          <label>
          Boat Type:{" "}
          <input
            type="text"
            name="boat_type"
            value={formData.boat_type}
            onChange={handleInputChange}
          />
          </label>
          <label>
          Description:{" "}
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Capacity:{" "}
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
          />
        </label>
        <label>
          City:{" "}
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </label>
        <label>
          State{" "}
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Lake:{" "}
          <input
            type="text"
            name="lake"
            value={formData.lake}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Picture:{" "}
          <input
            type="text"
            // type="url" or "file"
            name="picture"
            value={formData.picture}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Boat Rating:{" "}
          <input
            type="text"
            name="boat_rating"
            value={formData.boat_rating}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Option One:{" "}
          <input
            type="text"
            name="option_one"
            value={formData.option_one}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Option Two:{" "}
          <input
            type="text"
            name="option_two"
            value={formData.option_two}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Option Three:{" "}
          <input
            type="text"
            name="option_three"
            value={formData.option_three}
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
        <label>
          Actively Used:{" "}
          <input
            type="checkbox"
            name="is_active"
            value={formData.is_active}
            onChange={handleInputChange}
          />
        </label>
            <button>Add Boat!</button>
        </form>
    </div> );
}
 
export default AddBoatPage;


// imagePath: "https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"