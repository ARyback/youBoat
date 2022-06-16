import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    zipcode: 0,
    number: "",
    is_owner: false,
    is_renter: false,
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  const [checkedOne, setCheckedOne] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);
  const handleCheckOne = () => {
    setCheckedOne(!checkedOne);
  };
  const handleCheckTwo = () => {
    setCheckedTwo(!checkedTwo);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="text"
            name="password"
            value={formData.password}
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
          State:{" "}
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Zipcode:{" "}
          <input
            type="number"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Number:{" "}
          <input
            type="number"
            name="text"
            value={formData.number}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Owner:{" "}
          <input
            type="checkbox"
            name="is_owner"
            value={checkedOne.is_owner}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Renter:{" "}
          <input
            type="checkbox"
            name="is_renter"
            value={checkedTwo.is_renter}
            onChange={handleInputChange}
          />
        </label>
        <p style={{ fontSize: "12px" }}>
          NOTE: Make this an uncommon password with characters, numbers, and
          special characters!
        </p>
        <button>Register!</button>
      </form>
    </div>
  );
};

export default RegisterPage;
