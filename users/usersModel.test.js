const db = require("../data/dbConfig.js");
const Users = require("./usersModel");

describe("usersModel", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  afterEach(async () => {
    await db("users").truncate();
  });
  describe("insert", () => {
    it("inserts user into db", async () => {
      const user = {
        username: "Connor",
        password: "1234"
      };
      const newUser = await Users.insert(user);
      expect(newUser).toEqual({ ...user, id: newUser.id });
    });
  });
});
