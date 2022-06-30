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

  async function editBoat() {
    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/boats/${boatId}/`,
        {
            ...boat,
            boat_name: formData.boat_name, 
            capacity: formData.capacity, 
            description: formData.description, 
            city: formData.city,
            state: formData.state,
            lake: formData.lake,
            picture: formData.picture,
            boat_rating: formData.boat_rating,
            boat_type: formData.boat_type,
            option_one: formData.option_one,
            option_two: formData.option_two,
            option_three: formData.option_three,
            is_active: formData.is_active,
            renter_selection: formData.renter_selection, 
        },
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
                value={boat.boat_name & formData.boat_name}
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
                <button>Edit Boat!</button>
            </form>
        </div> 
    );
}
 
export default EditBoatPage;
