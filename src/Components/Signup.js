import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import ValidateField from "../validations";
import { Validation } from "../validations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup({ toggle }) {
  const [signUpData, setSignUpData] = useState({});

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    e.preventDefault();

    const { name, value } = e.target;

    setSignUpData({ ...signUpData, [name]: value });

    const keys = Object.keys(signUpData);

    const { username, email, password, cnf_password } = signUpData;

    const values = { username, email, password, cnf_password };

    let error = Validation(keys, values);  
    setErrors(error);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { username, email, password, cnf_password } = signUpData;
    const keys = Object.keys(signUpData);
    // console.log("---------------->", keys);
    const values = { username, email, password, cnf_password };

    let error = ValidateField(keys, values);
    // console.log(error);

    setErrors(error);

    let sendSignupData = async () => {
      try {
        let res = await axios.post(
          "https://client-backend-theta.vercel.app/api/user/register",
          signUpData
        );
        // console.log("Response data:", res);

        if (res.status == 200) {
          toast.success("Registerd Successfully!");
          document.form.reset();
          setTimeout(() => {
            toggle(true);
          }, 1000);
        }
      } catch (error) {
        // console.error('Error :', error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          // alert(error.response.data.error);
          toast.success(error.response.data.error);
        }
      }
    };

    sendSignupData();
  }

  return (
    <div className="signup-container">
      <ToastContainer />
      <div className="user-login-section">
        <div>
          <p>Already An Existing User ?</p>
        </div>
        <div className="login-button-container">
          <Button variant="outlined" className="login-button" onClick={toggle}>
            Login
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form-container" name="form">
        <div className="text-container">
          <p id="signup-text">Welcome 👋! SignUp Here... </p>
          <h2>Create An Account </h2>
        </div>
        <div className="main-form-container">
          <div className="lable-input-conatiner">
            <label>Full Name</label>
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Enter your Full Name"
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div className="lable-input-conatiner">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your mail ID"
            ></input>
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className="lable-input-conatiner">
            <label>Password</label>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Enter Password"
            ></input>
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className="lable-input-conatiner">
            <label>Confirm Password</label>
            <input
              name="cnf_password"
              onChange={handleChange}
              type="password"
            ></input>
            {errors.cnf_password && <p>{errors.cnf_password}</p>}
          </div>
          <div className="signup-btn-container">
            <Button type="submit" variant="contained" className="signup-btn">
              SignUp
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
