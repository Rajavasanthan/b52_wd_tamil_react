import { useFormik } from "formik";
import React from "react";
import axios from "axios"
function CreateUser() {
  const formik = useFormik({
    initialValues: {
      username: "",
      position: "",
      office: "",
      dob: "",
      startDate: "",
      salary: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.username === "") {
        errors.username = "Please enter the User name";
      }

      if (values.username.length <= 3 || values.username.length > 15) {
        errors.username = "User Name should be between 3 to 15";
      }

      if (values.position === "") {
        errors.position = "Please enter the Position";
      }

      if (values.office === "") {
        errors.office = "Please enter the Office";
      }

      if (values.dob === "") {
        errors.dob = "Please enter the DOB";
      }

      let enteredDate = new Date(values.dob);
      let currentDate = new Date();
      if (currentDate.getFullYear() - enteredDate.getFullYear() <= 18) {
        errors.dob = "Age should greater than 18";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        await axios.post("https://b52-nodejs.onrender.com/user",values)
        alert("Data Posted")
      } catch (error) {
        console.error(error)
        alert("Something went wrong")
      }
    },
  });
  return (
    <div className="container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-4">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            
            {
              (formik.getFieldMeta('username').touched && formik.errors.username) ? <span style={{ color: "red" }}>{formik.errors.username}</span> : null
            }
          </div>
          <div className="col-lg-4">
            <label>Position</label>
            <input
              type="text"
              className="form-control"
              name="position"
              value={formik.values.position}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-lg-4">
            <label>Office</label>
            <input
              type="text"
              className="form-control"
              name="office"
              value={formik.values.office}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-lg-4">
            <label>Age</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
            />
            <span style={{color:'red'}}>{formik.errors.dob}</span>
          </div>
          <div className="col-lg-4">
            <label>Start Date</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-lg-4">
            <label>Salary</label>
            <input
              type="text"
              className="form-control"
              name="salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-lg-12 mt-4">
            <input type="submit" className="btn btn-primary" value={"Submit"} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
