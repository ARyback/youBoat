import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {KEY} from "../localKey.js"

const AuthContext = createContext();

export default AuthContext;

function setUserObject(user) {
  if (!user) {
    return null;
  }
  return {
    username: user.username,
    id: user.user_id,
    first_name: user.first_name,
    county: user.county,
    state: user.state,
  };
}

export const AuthProvider = ({ children }) => {
  const BASE_URL = "http://127.0.0.1:8000/api/auth";
  const userToken = JSON.parse(localStorage.getItem("token"));
  const decodedUser = userToken ? jwtDecode(userToken) : null;
  const [token, setToken] = useState(userToken);
  const [user, setUser] = useState(setUserObject(decodedUser));
  const [isServerError, setIsServerError] = useState(false);
  const navigate = useNavigate();

  const getCounty = async (registerData) => {
   let county = await axios
    .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${registerData.address}${registerData.city}${registerData.state}${registerData.zipcode}&key=${KEY}`)
    .then(res => res.data.results[0].address_components[3].long_name);
  return county;
  };

  const registerUser = async (registerData) => {
    try {
      let finalData = {
        username: registerData.username,
        password: registerData.password,
        email: registerData.email,
        first_name: registerData.firstName,
        last_name: registerData.lastName,
        address: registerData.address,
        city: registerData.city,
        state: registerData.state,
        zipcode: parseInt(registerData.zipcode),
        number: registerData.number,
        is_owner: registerData.is_owner,
        is_renter: registerData.is_renter,
        county: await getCounty(registerData),
      };
      console.log(finalData);
      let response = await axios.post(`${BASE_URL}/register/`, finalData);
      if (response.status === 201) {
        console.log("Successful registration! Log in to access token");
        setIsServerError(false);
        navigate("/login");
      } else {
        navigate("/register");
      }
    } catch (error) {
      // console.log(error.response.data);
      console.log(error);
    }
  };

  const loginUser = async (loginData) => {
    try {
      let response = await axios.post(`${BASE_URL}/login/`, loginData);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.access));
        setToken(JSON.parse(localStorage.getItem("token")));
        let loggedInUser = jwtDecode(response.data.access);
        setUser(setUserObject(loggedInUser));
        setIsServerError(false);
        navigate("/");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error);
      setIsServerError(true);
      navigate("/register");
    }
  };

  const logoutUser = () => {
    if (user) {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      navigate("/");
    }
  };

  const contextData = {
    user,
    token,
    loginUser,
    logoutUser,
    registerUser,
    isServerError,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
