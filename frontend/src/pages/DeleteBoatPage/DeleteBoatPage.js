import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const DeleteBoatPage = () => {
  const [user, token] = useAuth();
  const [boats, setBoats] = useState([]);
  const navigate = useNavigate();
  const { boatId } = useParams();

  async function deleteNewBoat() {
    try {
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/boats/${boatId}`,
        // formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setBoats(response.data);
      navigate("/deleteconfirmation");
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      Boat is deleted!
    </div>
  )
};

export default DeleteBoatPage;
