const express = require("express");
const cors = require("cors");
const port = 5000;
const app = express();
app.use(cors({
  origin: "https://crud-app-silk-one.vercel.app"
}));
app.use(express.json());

let nextId = 1;
let users = [{ id: nextId, name: "Surya", role: "Developer", salary: "3LPA" }];
nextId++

// get Users
app.get("/users", (req, res) => {
  res.json(users);
});

// Post Users
app.post("/users", (req, res) => {
  const newUser = {
    id: nextId++,
    ...req.body
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update Users
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  users = users.map(user =>
    user.id === id ? { ...user, ...req.body } : user
  );

  res.json({ message: "Updated successfully" });
});

// Delete Users
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  users = users.filter(user => user.id !== id);
  res.json({ message: "Deleted successfully" });
});

// Port
app.listen(port, () => {
  console.log("Server running on port 5000");
});