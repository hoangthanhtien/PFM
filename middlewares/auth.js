const { redisClient } = require("../services");

const authUser = async (req, res, next) => {
  const { access_token: accessToken } = req.headers;
  if (!accessToken) {
    return res.status(401).send({
      message: "Access token is required",
    });
  }
  let userData = await redisClient.get(accessToken);
  if (userData) {
    userData = JSON.parse(userData);
  }
  if (!userData) {
    return res.status(401).send({
      message: "Invalid access token",
    });
  }
  req.user = userData;
  next();
};

module.exports = {
  authUser,
};
