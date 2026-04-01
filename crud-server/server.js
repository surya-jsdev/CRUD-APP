const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
let nextId=1;
let users = [
  // { id: 1, name: "Surya", role: "Developer" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = {
    id: nextId++,
    ...req.body
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  users = users.map(user =>
    user.id === id ? { ...user, ...req.body } : user
  );

  res.json({ message: "Updated successfully" });
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  users = users.filter(user => user.id !== id);

  res.json({ message: "Deleted successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});