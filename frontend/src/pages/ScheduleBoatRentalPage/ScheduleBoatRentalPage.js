import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";

let initialValues = {
    is_active: "",
    renter_selection: "",
    renter: 0
}

const ScheduleBoatRentalPage = (props) => {
  const [user, token] = useAuth();
  const { boatId } = useParams();
  const navigate = useNavigate();
  const [boat, setBoat] = useState({});
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    initialValues,
    scheduleBoat
  );

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
        setBoat(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBoat()
  }, [token], [boatId])

  async function scheduleBoat() {
    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/boats/${boatId}/`,
        {
            ...boat, renter_selection: formData.renter_selection, is_active: formData.is_active, renter_id: user.id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate(`/rentalconfirmation`);
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className="container">
      <h2>Hello {user.first_name}! Your id is {user.id}</h2>
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

export default ScheduleBoatRentalPage;

//   useEffect(() => {
//     async function getBoatById(id){
//         try {
//             let response = await axios.get(`http://127.0.0.1:8000/api/boats/${id}`, {...boats, renter_selection:formData, is_active:formData}, {
//                 headers: {
//                     Authorization: 'Bearer ' + token
//                 },
//             });
//             setBoats(response.data);
//         } catch (error) {
//             console.log(error.message);
//         }
//     };
//     getBoatById();
//   }, [token]);}


