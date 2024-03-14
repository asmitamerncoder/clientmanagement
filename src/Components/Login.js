import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ toggle }) {
  let navigate = useNavigate();

  const [loginData, setLoginData] = useState({});

  // const tokenString = localStorage.getItem("token");

  // const token = JSON.parse(tokenString);

  // console.log(token);

  // const user = localStorage.getItem("user");

  // console.log(user);

  // let validateLoginToken = async () => {
  //   // console.log("inside token validation", user);
  //   let res = await axios.get("/", user);
  //   let response = res.data;
  //   console.log(response);
  // };




  //  getAllClient() ; 
 

  function handleChange(e) {
    e.preventDefault();

    const { name, value } = e.target;

    console.log(name, value);

    setLoginData({ ...loginData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let sendLoginData = async () => {
      try {
        let res = await axios.post(
          "https://client-backend-theta.vercel.app/api/user/login",
          loginData
        );

        console.log("Response data:", res.data);
        document.form.reset();
        toast.success("Loggedin Successfully!");   
               
        localStorage.setItem("token", JSON.stringify(res.data.token));

        // console.log("token", res.data.token);

        localStorage.setItem("user", JSON.stringify(res.data.user));

        // console.log("user", res.data.user);

        setTimeout(() => {
          navigate('/clientmanagement');
        }, 1000); 
                
      } catch (error) {
        console.error("Error :", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.success(error.response.data.error);
          // alert(error.response.data.error);
        } else {
          toast.success("Netwrok Error! Please try again later.");
          // alert("Netwrok Error! Please try again later.");
        }
      }
    };

    sendLoginData();
  }

  return (
    <div className="signup-container">
      <ToastContainer />
      <div className="user-login-section">
        <div>
          <p>Not Registered Yet ?</p>
        </div>
        <div className="login-button-container">
          <Button
            variant="outlined"
            className="login-button"
            onClick={() => toggle(false)}
          >
            SignUp
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form-container" name="form">
        <div className="text-container">
          <p id="signup-text">Welcome 👋! Login Here... </p>
          <h2>Login To Your Account.. </h2>
        </div>
        <div className="main-form-container">
          <div className="lable-input-conatiner">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your mail ID"
            ></input>
          </div>
          <div className="lable-input-conatiner">
            <label>Password</label>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Enter Password"
            ></input>
          </div>
          <div className="signup-btn-container">
            <Button type="submit" variant="contained" className="signup-btn">
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
