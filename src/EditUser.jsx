import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
function EditUser() {
  const params = useParams();
  const [employee, setEmployee] = useState();

  let formik = useFormik({
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
        await axios.put(
          `http://localhost:3005/user/${params._id}`,
          values
        );
        alert("Data Updated");
      } catch (error) {
        console.error(error);
        alert("Something went wrong");
      }
    },
  });

  let getEmpData = async () => {
    const empData = await axios.get(`http://localhost:3005/user/${params._id}`);
    setEmployee(empData.data);
    delete empData.data._id;
    delete empData.data.createdAt;
    formik.setValues(empData.data);
  };

  useEffect(() => {
    getEmpData();
  }, []);
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
            />
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

export default EditUser;
