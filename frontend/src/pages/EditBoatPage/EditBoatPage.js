import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";

const EditBoatPage = () => {
  const [user, token] = useAuth();
  const { boatId } = useParams();
  const navigate = useNavigate();
  const [boat, setBoat] = useState({});
//   const [initialValues, setInitialValues] = useState({});
  let initialValues = {
    boat_name: boat.boat_name,
    capacity: boat.capacity, 
    description: boat.description, 
    city: boat.city,
    state: boat.state,
    lake: boat.lake,
    picture: boat.picture,
    boat_rating: boat.boat_rating,
    boat_type: boat.boat_type, 
    option_one: boat.option_one,
    option_two: boat.option_two,
    option_three: boat.option_three,
    is_active: boat.is_active,
    renter_selection: boat.renter_selection,
  };

//   const idDeleter = (obj) => {
//     delete obj.id;
//     return obj;
//   };

  useEffect(() => {
    const fetchBoat = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/boats/${boatId}/`, 
          {headers: {
            Authorization: 'Bearer ' + token
          },
      }
      );
        setBoat(response.data);
        // setInitialValues({
        //     ...idDeleter(response.data)
        // })
      } catch (error) {
        console.log(error)
      }
    }
    fetchBoat()
  }, [token, boatId])

  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    initialValues,
    editBoat
  );

  async function editBoat () {
    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/boats/${boatId}/`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }
    return ( 
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
            <h2>Hello {user.first_name}!</h2>
            <h3>Feel free to edit your new boat in the form below</h3>
              <label>
              Boat Name:{" "}
              {boat.boat_name}
              <input
                type="text"
                placeholder={boat.boat_name}
                name="boat_name"
                value={formData.boat_name}
                onChange={handleInputChange}
              />
              </label>
              <label>
              Boat Type:{" "}
              {boat.boat_type}
              <input
                type="text"
                placeholder={boat.boat_type}
                name="boat_type"
                value={formData.boat_type}
                onChange={handleInputChange}
              />
              </label>
              <label>
              Boat Description:{" "}
              {boat.description}
              <input
                type="text"
                placeholder={boat.description}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Boat Capacity:{" "}
              {boat.boat_capacity}
              <input
                type="number"
                placeholder={boat.capacity}
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Boat City:{" "}
              {boat.city}
              <input
                type="text"
                placeholder={boat.city}
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Boat State:{" "}
              {boat.state}
              <input
                type="text"
                placeholder={boat.state}
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Boat Lake:{" "}
              {boat.lake}
              <input
                type="text"
                placeholder={boat.lake}
                name="lake"
                value={formData.lake}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Boat Picture Url:{" "}
              <input
                type="text"
                name="picture"
                value={formData.picture}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Boat Rating:{" "}
              {boat.boat_rating}
              <input
                type="number"
                placeholder={boat.boat_rating}
                name="boat_rating"
                value={formData.boat_rating}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Time Option One:{" "}
              {boat.option_one}
              <input
                type="text"
                placeholder={boat.option_one}
                name="option_one"
                value={formData.option_one}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Time Option One:{" "}
              {boat.option_two}
              <input
                type="text"
                placeholder={boat.option_two}
                name="option_two"
                value={formData.option_two}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Time Option Three:{" "}
              {boat.option_three}
              <input
                type="text"
                placeholder={boat.option_three}
                name="option_three"
                value={formData.option_three}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Renter Selection:{" "}
              {boat.renter_selection}
              <input
                type="text"
                placeholder={boat.renter_selection}
                value={formData.renter_selection}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Actively Used:{" "}
              <input
                type="checkbox"
                name="is_active"
                placeholder={boat.is_active}
                value={formData.is_active}
                onChange={handleInputChange}
              />
            </label>
                <button>Edit Boat!</button>
            </form>
        </div> 
    );
}
 
export default EditBoatPage;
