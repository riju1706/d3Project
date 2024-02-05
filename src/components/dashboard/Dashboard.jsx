import axios from "axios";
import "./dashboard.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserOne, allUser } from "../../redux/userSlice";
import Form from "../form/Form";
import BarChart from "../chart/BarChart";
import PieChart from "../chart/PieChart";

const Dashboard = () => {
  // Hook ==================================================

  const [employeeData, setEmployeeData] = useState([]);
  const [newEmployee, setNewEmployee] = useState({});
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);
  const allUsers = useSelector((i) => {
    return i.users;
  });

  // function and handeler ====================================
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://dummy.restapiexample.com/api/v1/employees"
      );
      if (res.data.status == "success") {
        dispatch(allUser(res.data.data));
      }
      error("");
    } catch (err) {
      if (err.name == "AxiosError") {
        setError(
          "Error Message: Unable to refresh frequently. Please try again later."
        );
      }
    }
  };

  const addUser = (details) => {
    setNewEmployee(details);
    dispatch(addUserOne(details));
  };

  return (
    <>
      <h1 style={{ color: "red", textAlign: "center" }}>{error}</h1>
      {/* <h1>Employee Dashboard</h1> */}
      <div className="dashboardContainer">
        <table>
          <thead>
            <tr className="tableRow">
              <th className="colId">ID</th>
              <th className="colName">Name</th>
              <th className="colSalary">Salary</th>
              <th className="colAge">Age</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((employee, id) => (
              <tr key={id} className="tableRow">
                <td className="colId">{employee.id}</td>
                <td className="colName">{employee.employee_name}</td>
                <td className="colSalary">{employee.employee_salary}</td>
                <td className="colAge">{employee.employee_age}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="dashboardFromSvg">
          <Form addUser={addUser} />
          <BarChart data={allUsers} />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <PieChart allData={allUsers} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
