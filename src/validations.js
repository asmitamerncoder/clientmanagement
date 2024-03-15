export default function ValidateField(name, value) {
  const [username, email, password, cnf_password] = name;

  // const {username, email, password, cnf_password} = value;

  // console.log("value :", value);

  let error = {};

  if (value.username == "" || value.username == undefined) {
    error.username = "Enter Username";
  }

  if (value.email == "" || value.email == undefined) {
    error.email = "Enter Email";
  }

  if (value.password == "" || value.password == undefined) {
    error.password = "Enter Password";
  }

  if (value.cnf_password == "" || value.cnf_password == undefined) {
    error.cnf_password = "Enter Password";
  }

  // console.log(error);

  return error;
}

export function Validation(name, value) {
  const [username, email, password, cnf_password] = name;

  //   // const {username, email, password, cnf_password} = value;
  //  console.log(">>>>>>>>>>>")
  //   console.log("value :", value);
  //   console.log("name :", name)

  let error = {};

  if (value.username == "" || value.username == undefined) {
    error.username = "Enter Username";
  }

  if (value.email == "" || value.email == undefined) {
    error.email = "Enter Email";
  }

  if (value.password == "") {
    error.password = "Enter Password";
  }

  if (value.cnf_password == "") {
    error.cnf_password = "Enter Password";
  }

  // console.log("++++++++++++++",error);

  return error;
}
