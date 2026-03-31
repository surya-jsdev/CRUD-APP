import React, { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [editId, setEditId] = useState(null);

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
    const userData = { name, role };

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

      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>

      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name} - {user.role}</p>

          <button onClick={() => editUser(user)}>
            Edit
          </button>

          <button onClick={() => deleteUser(user.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}