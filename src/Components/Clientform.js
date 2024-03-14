import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Clientform() {
  const navigate = useNavigate();

  const [clientData, setClientData] = useState({});
  const [checked, setChecked] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const tokenString = localStorage.getItem("token");

  const token = JSON.parse(tokenString);

  // console.log("checking token>>>>>>>>>>>>>>>", token);

  function handleChange(e) {
    e.preventDefault();

    const { name, value } = e.target;

    setClientData({ ...clientData, [name]: value });

    // console.log(clientData);
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  let sendClientData = async () => {
    const formData = new FormData();
    for (const key in clientData) {
      formData.append(key, clientData[key]);
    }

    if (selectedFile) {
      formData.append("logo", selectedFile);
    }

    // const clientPayLoad = new  FormData() ;
    const clientPayLoad = {};

    for (const pair of formData.entries()) {
      clientPayLoad[pair[0]] = pair[1];
    }

    // console.log("clientPayLoad", clientPayLoad);

    try {
      // console.log(
      //   "insideHandleSubmit>>>>>>>>",
      //   clientPayLoad
      //   // "file---------->",
      //   // selectedFile
      // );
      let res = await axios.post(
        "https://client-backend-theta.vercel.app/api/client/addclient",
        clientPayLoad,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Client data:", res.data);

      // console.log(res);

      if (res.status == 200) {
        document.form.reset();
        toast.success('Client Added Successfully!');
        setTimeout(() => {
          navigate('/clientmanagement');
        }, 1000); 
     
      }
    } catch (error) {
      // console.error('Error :', error);

      if (error.response && error.response.data && error.response.data.error) {
        toast.success(error.response.data.error);
      } else {
        toast.success("Netwrok Error! Please try again later.");
      }
    }
  };

  const switchhandleChange = (event) => {
    setChecked(event.target.checked);

    if (event.target.checked == true) {
      let fileInput = document.querySelector(".file_input");
      fileInput.style.display = "flex";
    } else {
      let fileInput = document.querySelector(".file_input");
      fileInput.style.display = "";
    }
  };

  return (
    <div className="main-container">
      <h1 className="clientForm-title">
        <p
          onClick={() => {
            navigate("/clientmanagement");
          }}
        >
          &lt;
        </p>
        <p>Client Form</p>
        <ToastContainer />
      </h1>
      <div className="form-warppar">
        <p className="clientInfo">CLIENT INFO</p>
        <form className="form" name="form">
          <div className="label_input_container">
            <label>Client Name*</label>
            <input
              placeholder="Enter Client Name"
              type="text"
              onChange={handleChange}
              name="name"
            ></input>
          </div>
          <div className="label_input_container">
            <label>Client Code*</label>
            <input
              placeholder="Enter Client Code"
              type="text"
              onChange={handleChange}
              name="code"
            ></input>
          </div>
          <div></div>
          <div className="label_input_container">
            <label>Email*</label>
            <input
              placeholder="Enter Email here"
              type="email"
              onChange={handleChange}
              name="email"
            ></input>
          </div>
          <div className="label_input_container">
            <label>Client Number*</label>
            <input
              placeholder="Enter Contact No."
              type="text"
              onChange={handleChange}
              name="contact"
            ></input>
          </div>
          <div></div>
          <div className="label_input_container">
            <label>Landline Number</label>
            <input
              placeholder="Enter Landline No."
              type="text"
              onChange={handleChange}
              name="landline_number"
            ></input>
          </div>
          <div className="label_input_container">
            <label>Website Link</label>
            <input
              placeholder="Enter Website Link"
              type="url"
              onChange={handleChange}
              name="website_link"
            ></input>
          </div>
          <div></div>
          <div className="label_input_container">
            <label>Address*</label>
            <input
              placeholder="Enter Client Address"
              type="text"
              className="addressInput"
              onChange={handleChange}
              name="address"
            ></input>
          </div>
          <div></div>
          <div></div>
          <div className="label_input_container">
            <label>State*</label>
            <select
              onChange={handleChange}
              name="state"
              className="optional-input"
            >
              {/* <optgroup label="Select State" > */}
              <option>Select State</option>
              <option>Andhra Pradesh</option>
              <option>Arunachal Pradesh</option>
              <option>Assam</option>
              <option>Bihar</option>
              <option>Chhattisgarh</option>
              <option>Goa</option>
              {/* </optgroup> */}
            </select>
          </div>
          <div className="label_input_container">
            <label>City*</label>
            <select
              onChange={handleChange}
              name="city"
              className="optional-input"
            >
              {/* <optgroup label="Select State" > */}
              <option>Enter City Name</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Ahmedabad</option>
              <option>Chennai</option>
              {/* </optgroup> */}
            </select>
          </div>
          <div></div>
          <div className="label_input_container">
            <label>Pincode*</label>
            <input
              placeholder="Enter Pincode"
              type="text"
              onChange={handleChange}
              name="pincode"
            ></input>
          </div>
          <div className="label_input_container">
            <label>Organisation Type*</label>
            <select
              onChange={handleChange}
              name="organisation_type"
              className="optional-input"
            >
              {/* <optgroup label="Select State" > */}
              <option className="options">Select Organisation Type</option>
              <option className="options">Private</option>
              <option className="options">Government</option>
              <option className="options">Others</option>
              {/* </optgroup> */}
            </select>
          </div>
          <div></div>
          <div className="swiper">
            <label>Upload Logo</label>
            <Switch
              checked={checked}
              onChange={switchhandleChange}
              inputProps={{ "aria-label": "controlled" }}
              color="success"
            />
          </div>
          <div></div>
          <div></div>
          <div className="file_input">
            <input
              type="file"
              name="logo"
              className="fileattach-input"
              onChange={handleFileChange}
            ></input>
          </div>
        </form>
      </div>
      <div className="clnt-form-btns">
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/clientmanagement");
          }}
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            textTransform: "capitalize",
            margin: "10px",
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            sendClientData();
            // document.form.reset()
          }}
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            textTransform: "capitalize",
            margin: "10px",
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Clientform;
