import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./form.css";

export default function Form({ addUser }) {
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    employee_name: "",
    employee_salary: "",
    employee_age: "",
  });
  const allUsersCount = useSelector((i) => {
    return i.users.length;
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      id: allUsersCount + 1,
      [name]: value,
    }));
  };
  const handleAddRow = () => {
    addUser(newEmployee);
    setNewEmployee({
      employee_name: "",
      employee_salary: "",
      employee_age: "",
    });
  };

  return (
    <>
      <h2>Add New Employee</h2>
      <div className="fromContainer">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="employee_name"
            value={newEmployee.employee_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            name="employee_salary"
            value={newEmployee.employee_salary}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="employee_age"
            value={newEmployee.employee_age}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-warning " onClick={handleAddRow}>
          Add Row
        </button>
      </div>
    </>
  );
}
