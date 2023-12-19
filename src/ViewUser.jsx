import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function ViewUser() {
  const params = useParams();
  const [employeeDetail, setEmployeeDetails] = useState()
  const [error, setError] = useState()
  let fetchData = async () => {
    try {
      let employee = await axios.get(
        `http://localhost:3005/user/${params.id}`
      );
      
      setEmployeeDetails(employee.data)
    } catch (error) {
      setError("Something went wrong")
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>
    {
      employeeDetail ? <ul>
      <li>
      {employeeDetail?.username}
      </li>
      <li>
      {employeeDetail?.position}
      </li>
      <li>
      {employeeDetail?.office}
      </li>
      <li>
      {employeeDetail?.dob}
      </li>
      <li>
      {employeeDetail?.startDate}
      </li>
      <li>
      {employeeDetail?.salary}
      </li>
    </ul> : <div>
      <h3>Loading...</h3>
    </div>
    }

    {
      error && <h3>{error}</h3>
    }
  </div>;
}

export default ViewUser;
