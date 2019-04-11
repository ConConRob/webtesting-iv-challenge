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
      const expect = { username: "tim", id: 1 };
      return testServer
        .post(`/api/users`)
        .send(user)
        .expect(201);
    });
  });
});
