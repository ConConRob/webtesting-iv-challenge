const express = require("express");
const Users = require("../users/usersModel");

const server = express();
server.use(express.json());

server.post("/api/users", async (req, res) => {
  const user = await Users.insert(req.body);
  res.status(201).json(user);
});

server.use(express.json());
module.exports = server;
