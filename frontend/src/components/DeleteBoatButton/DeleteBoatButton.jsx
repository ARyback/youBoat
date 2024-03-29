import React, { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DeleteBoatButton = (props) => {

  const [user, token] = useAuth();
  const [boats, setBoats] = useState([]);
  const navigate = useNavigate();

  async function deleteBoat(boatId){
    try {
        let response = await axios.delete(`http://127.0.0.1:8000/api/boats/${boatId}/`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        props.fetchBoats();
    } catch (error) {
        console.log(error.message);
    }
}
    return ( 
        <div>
            <button onClick={() => deleteBoat(props.boatId)}>Delete</button>
        </div>
     );
}
 
export default DeleteBoatButton;