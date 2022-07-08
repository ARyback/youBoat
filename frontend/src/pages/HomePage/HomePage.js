import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteBoatButton from "../../components/DeleteBoatButton/DeleteBoatButton";


const HomePage = () => {
  const [user, token] = useAuth();
  const [boats, setBoats] = useState([]);
  const navigate = useNavigate();

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
      <h1>Home Page for {user.first_name}</h1>
      <h2>List of Boats</h2>
      <br />
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
                <td>
                  <img
                    src={boat.picture}
                    alt="This is a boat"
                    width="100"
                    height="100"
                  />
                </td>
                <td>{boat.option_one}</td>
                <td>{boat.option_two}</td>
                <td>{boat.option_three}</td>
                <td>
                  {" "}
                  <Link to={`/editboat/${boat.id}`}>
                    {" "}
                    <button onClick={() => navigate(`/editboat/${boat.id}`)}>
                      Edit Boat
                    </button>
                  </Link>
                 </td>
                 <td><DeleteBoatButton id={boat.id} setBoats={setBoats}/></td>
                {/* <td>
                  {" "}
                  <Link to={`/deleteboat/${boat.id}`}>
                    {" "}
                    <button onClick={() => navigate(`/deleteboat/`)}>
                      Delete Boat
                    </button>
                  </Link>
                </td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
