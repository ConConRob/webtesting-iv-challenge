const express = require("express");
const Users = require("../users/usersModel");

const server = express();
server.use(express.json());

server.post("/api/users", async (req, res) => {
  const user = await Users.insert(req.body);
  res.status(201).json(user);
});
server.delete("/api/users/:id", (req, res) => {
  Users.destroy(req.params.id)
    .then(numDes => {
      if (numDes === 0) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.sendStatus(202);
      }
    })
    .catch();
});
server.use(express.json());
module.exports = server;
