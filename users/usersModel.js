const db = require("../data/dbConfig.js");

module.exports = { insert };

async function insert(user) {
  const [id] = await db("users").insert(user);
  return await db("users")
    .first()
    .select("username", "id")
    .where({ id });
}
