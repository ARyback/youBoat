import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import RentBoatBar from "../../components/RentBoatBar/RentBoatBar";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SearchRentalPage = (props) => {
  const [boats, setBoats] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserInput(e.target.value);
  };
  const [county, setCounty] = useState(null);

  const getCounty = async () => {
    let response = await axios
      .get(`http://127.0.0.1:8000/api/auth/userview/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setCounty(res.data.county));
      return response;
  };

  useEffect(() => {
    getCounty();
    getAllBoats();
  }, []);

  async function getAllBoats() {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/boats/all/");
      setBoats(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div>
        <SearchBar
          userInput={userInput}
          setUserInput={setUserInput}
          handleChange={handleChange}
        />
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
              <th>Rental Selection</th>
            </tr>
          </thead>
          <tbody>
            {boats &&
              boats
                .filter((boat) =>
                  (boat.county.includes(user.county) &&
                  (boat.boat_name
                    .toLowerCase()
                    .includes(userInput.toLowerCase()) ||
                  boat.boat_type
                    .toLowerCase()
                    .includes(userInput.toLowerCase()) ||
                  boat.description
                    .toLowerCase()
                    .includes(userInput.toLowerCase()) ||
                  boat.capacity.toString().includes(userInput.toLowerCase()) ||
                  boat.boat_rating
                    .toLowerCase()
                    .includes(userInput.toLowerCase()) ||
                  boat.city.toLowerCase().includes(userInput.toLowerCase()) ||
                  boat.state.toLowerCase().includes(userInput.toLowerCase()) ||
                  boat.lake.toLowerCase().includes(userInput.toLowerCase()) ||
                  boat.option_one
                    .toLowerCase()
                    .includes(userInput.toLowerCase()) ||
                  boat.option_two
                    .toLowerCase()
                    .includes(userInput.toLowerCase()) ||
                  boat.option_three
                    .toLowerCase()
                    .includes(userInput.toLowerCase()) ||
                  boat.is_active.toString().includes(userInput.toLowerCase()) ||
                  boat.renter_selection
                    .toLowerCase()
                    .includes(userInput.toLowerCase())))
                    ? boat
                    : null
                )
                .map((boat) => {
                  return (
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
                      <td>{boat.is_active.toString()}</td>
                      <td>{boat.renter_selection}</td>
                      <td>
                        {" "}
                        <Link to={`/schedule/${boat.id}`}>
                          {" "}
                          <button onClick={() => navigate(`/schedule/${boat.id}`)}>
                            Schedule
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SearchRentalPage;
