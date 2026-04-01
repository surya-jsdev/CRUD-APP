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

  // CREATE + UPDATE
  const handleSubmit = async () => {
    const userData = { name, role, salary };
    if (!name || !role || !salary) {
      setError("please Fill All Field");
      return;

    } else {
      setError("")
    }
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
      {error && <p>{error}</p>}
      {users.map((user) => (
        <table>
          <th>
            <td>S:No</td>
            <td>Name</td>
            <td>Role</td>
            <td>Salary</td>
          </th>
          <tr>
            <td key={user.id}>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.role}</td>
            <td>{user.salary}</td>
            <td>
              <button onClick={() => editUser(user)}>
                Edit
              </button>
            </td>
            <td>
              <button onClick={() => deleteUser(user.id)}>
                Delete
              </button>
            </td>
          </tr>
        </table>
        // <div key={user.id}>
        //   <p>{user.id} {user.name} - {user.role} -{user.salary}</p>

        //   <button onClick={() => editUser(user)}>
        //     Edit
        //   </button>

        //   <button onClick={() => deleteUser(user.id)}>
        //     Delete
        //   </button>
        // </div>
      ))}
    </div>
  );
}