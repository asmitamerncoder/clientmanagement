import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, styled, Slide } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
// import Pagination from "./Pagination";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
} from "@mui/material";
import axios from "axios";
import { setRows } from "../feature/clientdataslice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Clmtooltipbtn from "./Clmtooltipbtn";

function Clientmanagement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [clientData, setClientData] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const tokenString = localStorage.getItem("token");

  const token = JSON.parse(tokenString);

  // console.log(token);

  const switchHandleChange = (id) => {
    setClientData((clientData) => {
      return clientData.map((data) => {
        if (data.id === id) {
          // Create a new object with the updated property
          return { ...clientData, checked: !data.checked };
        }
        return data; // For other items, return them unchanged
      });
    });
    // setChecked(el._id);
  };

  const handleClick = (id) => {
    setSelectedItem((previd) => {
      if (previd == id) {
        return null;
      }
      return id;
    });
  };

  const deleteClient = async () => {
    try {
      const response = await axios.delete(
        `https://client-backend-theta.vercel.app/api/client/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status == 200) {
        toast.success("Deleted Successfully!");
        setOpen(false);
        getAllClient();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  let rows = useSelector((e) => {
    // console.log(">>>>>>>>>>>>>>", e.client.rows);
    return e.client.rows;
  });

  // console.log("------------>", rows);

  const getAllClient = async () => {
    const constructedUrl = `https://client-backend-theta.vercel.app/api/client/?pageNo=${
      page + 1
    }&limit=${rowsPerPage}&search=${search}`;
    setLoading(true);
    const response = await axios.get(constructedUrl, {
      headers: { Authorization: "Bearer " + token },
    });
    const data = response.data.data;
    dispatch(setRows(data));
    // console.log("data", data);
    setClientData(rows);
    setLoading(false);
  };

  useEffect(() => {
    setClientData(rows);
  }, [rows, rowsPerPage]);

  // console.log("rows", rows);

  useEffect(() => {
    getAllClient();
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (search.length > 0) {
      const getData = setTimeout(() => {
        getAllClient();
      }, 500);

      return () => clearTimeout(getData);
    } else {
      getAllClient();
    }
  }, [search]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  // console.log("rows>>>>>>>>>>>>>>>>>>", rows);
  return (
    <div className="clientmanagement-main-div">
      <div className="title-section">
        <h1>Client Management List</h1>
        <div className="btn-container">
          <Button
            component="label"
            // role={undefined}
            variant="contained"
            // tabIndex={-1}
            startIcon={<CloudUploadOutlinedIcon />}
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              textTransform: "capitalize",
            }}
            className="topBtn"
          >
            Upload Bulk Clients
            <VisuallyHiddenInput type="file" />
          </Button>
          <Button
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              textTransform: "capitalize",
              margin: "10px",
            }}
            className="topBtn"
            variant="contained"
            startIcon={<ControlPointOutlinedIcon />}
            onClick={() => {
              navigate("/addnewclient");
            }}
          >
            {" "}
            New Client
          </Button>
        </div>
      </div>
      <div className="table--main-div">
        <div className="table-div">
          <input
            value={search}
            type="search"
            placeholder="Search..."
            className="searchInnput"
            onChange={handleChangeSearch}
          />

          <div className="filter-export-btn-conatiner">
            <ToastContainer />
            <button className="clientFormBtn">Filter</button>
            <button className="clientFormBtn">Export</button>
          </div>
        </div>
        <div>
          <TableContainer
            component={Card}
            sx={{
              // padding: "10px",
              width: "100%",
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
            }}
          >
            <Table>
              <TableHead>
                <TableRow className="t-head">
                  <TableCell
                    sx={{
                      gap: 2,
                      fontSize: "14px",
                      fontWeight: "600",
                      width: "50px",
                      height: "20px",
                    }}
                  >
                    S.NO
                  </TableCell>
                  <TableCell
                    sx={{
                      gap: 2,
                      fontSize: "14px",
                      fontWeight: "600",
                      width: "70px",
                      height: "20px",
                    }}
                  >
                    LOGO
                  </TableCell>
                  <TableCell
                    sx={{
                      gap: 2,
                      fontSize: "14px",
                      fontWeight: "600",
                      width: "70px",
                      height: "20px",
                    }}
                  >
                    CLIENT CODE
                  </TableCell>
                  <TableCell
                    sx={{
                      gap: 2,
                      fontSize: "14px",
                      fontWeight: "600",
                      width: "70px",
                      height: "20px",
                    }}
                  >
                    CLIENT NAME
                  </TableCell>
                  <TableCell
                    sx={{
                      gap: 2,
                      fontSize: "14px",
                      fontWeight: "600",
                      width: "70px",
                      height: "20px",
                    }}
                  >
                    EMAIL
                  </TableCell>
                  <TableCell
                    sx={{
                      gap: 2,
                      fontSize: "14px",
                      fontWeight: "600",
                      width: "70px",
                      height: "20px",
                    }}
                  >
                    ADDRESS
                  </TableCell>
                  <TableCell
                    sx={{
                      gap: 2,
                      fontSize: "14px",
                      fontWeight: "600",
                      width: "70px",
                      height: "20px",
                    }}
                  >
                    WEBSITE
                  </TableCell>
                  <TableCell
                    sx={{
                      gap: 2,
                      fontSize: "14px",
                      fontWeight: "600",
                      width: "70px",
                      height: "20px",
                    }}
                  >
                    STATE
                  </TableCell>
                  <TableCell
                    sx={{
                      gap: 2,
                      fontSize: "14px",
                      fontWeight: "600",
                      width: "70px",
                      height: "20px",
                    }}
                  >
                    ORGANISATION TYPE
                  </TableCell>
                  <TableCell
                    sx={{
                      gap: 2,
                      fontSize: "14px",
                      fontWeight: "600",
                      width: "70px",
                      height: "20px",
                    }}
                  >
                    POINT OF CONTACT
                  </TableCell>
                  <TableCell
                    sx={{
                      gap: 2,
                      fontSize: "14px",
                      fontWeight: "600",
                      width: "70px",
                      height: "20px",
                    }}
                  >
                    STATUS
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      width: "70px",
                      height: "20px",
                    }}
                  >
                    ACTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="t-body">
                {loading ? (
                  <>
                    <p>Loading....</p>
                  </>
                ) : clientData.length > 0 ? (
                  clientData?.map((el, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1 + page * rowsPerPage}</TableCell>
                      <TableCell>
                        <img
                          src={el?.url || "https://via.placeholder.com/100"}
                          width={40}
                          height={40}
                          style={{ borderRadius: "50%" }}
                        />
                      </TableCell>
                      <TableCell>{el?.code || "NA"}</TableCell>
                      <TableCell>{el?.name || "NA"}</TableCell>
                      <TableCell>{el?.email || "NA"}</TableCell>
                      <TableCell>{el?.address || "NA"}</TableCell>
                      <TableCell>{el?.website_link || "NA"}</TableCell>
                      <TableCell>{el?.state || "NA"}</TableCell>
                      <TableCell>{el?.organisation_type || "NA"}</TableCell>
                      <TableCell>{el?.contact || "NA"}</TableCell>
                      <TableCell>
                        <Switch
                          checked={el?.checked}
                          onChange={switchHandleChange}
                          inputProps={{ "aria-label": "controlled" }}
                          color="success"
                        />
                      </TableCell>
                      <TableCell>
                        {tooltip == false ? (
                          <div>
                            <Clmtooltipbtn
                              onClick={() => {
                                handleClick(el._id);
                              }}
                            />
                          </div>
                        ) : (
                          <div></div>
                        )}

                        {selectedItem == el._id ? (
                          <div>
                            <Tooltip title="Edit">
                              <IconButton>
                                <EditIcon
                                  sx={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textTransform: "capitalize",
                                    margin: "10px",
                                  }}
                                  onClick={() => {
                                    navigate(`/editclient/${el?._id || "NA"}`);
                                  }}
                                >
                                  Edit
                                </EditIcon>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton>
                                <DeleteIcon
                                  sx={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textTransform: "capitalize",
                                    margin: "10px",
                                  }}
                                  onClick={() => {
                                    handleOpen();
                                    setId(el?._id);
                                  }}
                                >
                                  Delete
                                </DeleteIcon>
                              </IconButton>
                            </Tooltip>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p>No Result Found</p>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div>
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure would you like to delete this profile from Database?
              This action cannot be undone.
            </Typography>
            <Button
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "capitalize",
                margin: "10px",
              }}
              variant="contained"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "capitalize",
                margin: "10px",
              }}
              variant="contained"
              onClick={() => {
                deleteClient();
              }}
            >
              Delete
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Clientmanagement;
