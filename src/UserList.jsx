import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function UserList() {
  const [employees, setEmployees] = useState([]);
  
  async function getData() {
    try {
      const employeList = await axios.get(
        "https://b52-nodejs.onrender.com/users"
      );
      setEmployees([...employeList.data]);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  let handleDelete = async (id) => {
    try {
      await axios.delete(`https://b52-nodejs.onrender.com/user/${id}`);
      getData();
      alert("Data Deleted");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Users List</h1>

        <Link
          to="/create-user"
          class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i class="fas fa-download fa-sm text-white-50"></i> Create User
        </Link>
      </div>

      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
          <div class="card-body">
            <div class="table-responsive">
              <table
                class="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Age</th>
                    <th>Start date</th>
                    <th>Salary</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Age</th>
                    <th>Start date</th>
                    <th>Salary</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {employees.map((employee) => {
                    return (
                      <tr>
                        <td>{employee.username}</td>
                        <td>{employee.position}</td>
                        <td>{employee.office}</td>
                        <td>{employee.dob}</td>
                        <td>{employee.startDate}</td>
                        <td>{employee.salary}</td>
                        <td>
                          <Link
                            to={`/view-user/${employee._id}`}
                            className="btn btn-sm btn-info"
                          >
                            View
                          </Link>
                          <Link
                            to={`/edit-user/${employee._id}`}
                            className="btn btn-sm btn-warning ml-2"
                          >
                            Edit
                          </Link>
                          <button onClick={() => handleDelete(employee._id)} className="btn btn-sm btn-danger ml-2">
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;
