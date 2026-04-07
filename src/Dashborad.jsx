import React, { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState();
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const API = "http://localhost:5000/users";


  // READ
  const fetchUsers = async () => {

    const response = await fetch(API);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create And Update

  const handleSubmit = async () => {
    const userData = { name, role, salary };
    if (!name || !role || !salary) {
      setError("Please fill all fields");
      return;
    }
    setError("")
    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      setEditId(null);
    } else {
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
    }

    setName("");
    setRole("");
    setSalary("");
    fetchUsers();
  };

  // DELETE
  const deleteUser = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    fetchUsers();
  };

  // EDIT
  const editUser = (user) => {
    setName(user.name);
    setRole(user.role);
    setSalary(user.salary);
    setEditId(user.id);
  };


  return (
    <div className="container">
      <div>
        <h1>CRUD App using Fetch</h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      <table className="crud-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>S:No</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('role')}>Role</th>
            <th onClick={() => handleSort('salary')}>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}.</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.salary}</td>
              <td className="actions">
                <button onClick={() => editUser(user)}>Edit</button>
                <button className="deletebtn" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}