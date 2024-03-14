import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Editclientform() {
  let navigate = useNavigate();

  const [clientData, setClientData] = useState({});
  const [checked, setChecked] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const tokenString = localStorage.getItem("token");
  const token = JSON.parse(tokenString);
  const params = useParams();

  useEffect(() => {
    // console.log(clientData);
  }, [clientData]);

  useEffect(() => {
    const fetchIdBasedData = async () => {
      try {
        const response = await axios.get(
          `https://client-backend-theta.vercel.app/api/client/${params?.clientId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log(response?.data?.data);
        setClientData(response.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchIdBasedData();
  }, []);

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
    // console.log(clientData);
    const formData = new FormData();

    for (const key in clientData) {
      formData.append(key, clientData[key]);
      // formData.delete(key,clientData[_v]);
    }

    if (selectedFile) {
      formData.append("logo", selectedFile);
    }

    const clientPayLoad = {};

    for (const pair of formData.entries()) {
      clientPayLoad[pair[0]] = pair[1];
    }

    let finalPaylaod = delete clientPayLoad.__v;
    let deleteId = delete clientPayLoad._id;

    // console.log("clientPayLoad", finalPaylaod);
    // console.log("clientPayLoad", clientPayLoad);

    try {
      // console.log("insideHandleSubmit>>>>>>>>", clientPayLoad);
      let res = await axios.put(
        `https://client-backend-theta.vercel.app/api/client/updateclient/${params?.clientId}`,
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
        toast.success("Client Updated Successfully!");
        setTimeout(() => {
          navigate("/clientmanagement");
        }, 1000);
      }
    } catch (error) {
      // console.error('Error :', error);

      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        toast.success("Netwrok Error! Please try again later...");
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
        <p>Edit Client Form</p>
      </h1>
      <ToastContainer />
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
              value={clientData?.name}
            ></input>
          </div>
          <div className="label_input_container">
            <label>Client Code*</label>
            <input
              placeholder="Enter Client Code"
              type="text"
              onChange={handleChange}
              name="code"
              value={clientData?.code}
            ></input>
          </div>
          <div></div>
          <div className="label_input_container">
            <label>Email Address*</label>
            <input
              placeholder="Enter Email here"
              type="email"
              onChange={handleChange}
              name="email"
              value={clientData?.email}
            ></input>
          </div>
          <div className="label_input_container">
            <label>Contact Number*</label>
            <input
              placeholder="Enter Contact No."
              type="text"
              onChange={handleChange}
              name="contact"
              value={clientData?.contact}
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
              value={clientData?.landline_number}
            ></input>
          </div>
          <div className="label_input_container">
            <label>Website Link</label>
            <input
              placeholder="Enter Website Link"
              type="url"
              onChange={handleChange}
              name="website_link"
              value={clientData?.website_link}
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
              value={clientData?.address}
            ></input>
          </div>
          <div></div>
          <div></div>
          <div className="label_input_container">
            <label>Pincode*</label>
            <input
              placeholder="Enter Pincode"
              type="text"
              onChange={handleChange}
              name="pincode"
              value={clientData?.pincode}
            ></input>
          </div>
          <div className="label_input_container">
            <label>Organisation Type*</label>
            <select
              onChange={handleChange}
              name="organisation_type"
              value={clientData?.organisation_type}
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
          }}
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            textTransform: "capitalize",
            margin: "10px",
          }}
        >
          Update
        </Button>
      </div>
    </div>
  );
}

export default Editclientform;
