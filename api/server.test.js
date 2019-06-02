const server = require("./server");
const request = require("supertest");
const db = require("../data/dbConfig");

const testServer = request(server);
describe("server", () => {
  describe("Post /users endpoint", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
    afterEach(async () => {
      await db("users").truncate();
    });
    it("returns the right response", () => {
      const user = { username: "tim", password: "1234" };
      const expect = { username: "tim", id: 1 };
      return testServer
        .post(`/api/users`)
        .send(user)
        .expect(expect);
    });
    it("returns with status code of 201", () => {
      const user = { username: "tim", password: "1234" };
      return testServer
        .post(`/api/users`)
        .send(user)
        .expect(201);
    });
  });
  describe("Delete /users/:id endpoint", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
    afterEach(async () => {
      await db("users").truncate();
    });
    it("adds and deletes a user", async () => {
      const user = { username: "tim", password: "1234" };
      const res = await testServer.post(`/api/users`).send(user);
      const newUser = JSON.parse(res.text);
      expect(newUser).toEqual({ username: "tim", id: newUser.id });
      return testServer.delete(`/api/users/${newUser.id}`).expect(202);
    });
    it("trys to deletes a user that cannot be found", async () => {
      return testServer.delete(`/api/users/3`).expect(404);
    });
  });
});
