const jwt = require("jsonwebtoken");

function setUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, process.env.SECRET);
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = {
  getUser,
  setUser,
};
