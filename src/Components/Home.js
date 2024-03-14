import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

function Home() {

  const [login, setShowLogin] = useState(true);

  const toggleComponent = (action) => {

    setShowLogin(action);
  };


  return (
    <div className="homeScreen">
      <div className="logo-Container">
        <div className="bg-container">
          <h3>
            Unleash Your Potential <br />
            with Modernized Skill
            <br /> Assessments.
          </h3>
          <p id="landingpagetext">
            Testa offers an AI-Driven Online Assessment Platform for
            <br /> corporates, Educational institutes, &amp; government
            organizations.
          </p>
          <div className="slider-indicator">
            <div className="slider-bg"></div>
            <div id="active-slide"></div>
            <div className="slider-bg"></div>
          </div>
        </div>
      </div>
      
{login ? (<Login toggle={toggleComponent}/>): (<Signup toggle={toggleComponent} />)}
    </div>
  );
}

export default Home;
