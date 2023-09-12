const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_401 } = require("../utils/errors");
module.exports.handleAuthError = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);
  console.log(authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(ERROR_401).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(ERROR_401).send({ message: "Invalid Token" });
  }

  req.user = payload;
  return next();
};
