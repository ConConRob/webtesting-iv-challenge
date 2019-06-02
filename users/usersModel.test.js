const db = require("../data/dbConfig.js");
const Users = require("./usersModel");

describe("usersModel", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  afterEach(async () => {
    await db("users").truncate();
  });
  describe("insert", async () => {
    it("inserts user into db", async () => {
      const user = {
        username: "Connor",
        password: "1234"
      };
      const newUser = await Users.insert(user);
      expect(newUser).toEqual({ username: "Connor", id: newUser.id });
      const allUsers = await db("users");
      expect(allUsers).toHaveLength(1);
    });
  });
  describe("delete", () => {
    it("deletes a user", async () => {
      const user = {
        username: "Connor1",
        password: "1234"
      };
      const newUser = await Users.insert(user);
      const numDelete = await Users.destroy(newUser.id);
      expect(numDelete).toBe(1);
    });
  });
});
