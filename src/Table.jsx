import React, { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    name: "",
    role: "",
    salary: "",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const API = "http://localhost:5000/users";

  // Handle Input Field
  const handleInput = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // FetchUser
  const fetchUsers = async () => {
    const response = await fetch(API);
    const result = await response.json();
    setUsers(result);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Submit
  const handleSubmit = async () => {
    if (!data.name || !data.role || !data.salary) {
      setError("Please fill all fields");
      return;
    }
    setError("");
    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      setEditId(null);
    } else {

      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    }
    setData({
      name: "",
      role: "",
      salary: ""
    });

    fetchUsers();
  };

  const deleteUser = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    fetchUsers();
  };


  const editUser = (user) => {
    setData({
      name: user.name,
      role: user.role,
      salary: user.salary
    });

    setEditId(user.id);
  };

  return (
    <div className="container">
      <h1>CRUD App</h1>
      <div className="Formcontainer">
        <label htmlFor="name">Name:</label>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={data.name}
          onChange={handleInput}
        />
        <label htmlFor="Role">Role:</label>
        <input
          type="text"
          name="role"
          placeholder="Enter Role"
          value={data.role}
          onChange={handleInput}
        />
        <label htmlFor="salary">Salary:</label>
        <input
          type="text"
          name="salary"
          placeholder="Enter Salary"
          value={data.salary}
          onChange={handleInput}
        />

        <button onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {/* Dispaly Data in table */}
      <table className="crud-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
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
              <td>
                <button onClick={() => editUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)} className="delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}