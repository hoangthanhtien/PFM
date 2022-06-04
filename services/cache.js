const redis = require("redis");
const { REDIS_HOST, REDIS_PORT } = process.env;

const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});
client.on("error", (e) => {
  console.log("Error: Redis is not running", e);
});
client.on("connect", () => {
  console.log("Cache initialized successfully");
});
module.exports = client;
