const { getUser } = require("../service/auth");

function checkForUserAuthentication(req, res, next) {
  const tokenCookieValue = req.cookies?.token;
  req.user = null;

  if (!tokenCookieValue) {
    return next();
  }

  const user = getUser(tokenCookieValue);

  req.user = user;
  return next();
}

function roleRestrictedUser(roles) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }

    if (!roles.includes(req.user.role)) {
      return res.end("Unauthorized");
    }

    return next();
  };
}

module.exports = {
  checkForUserAuthentication,
  roleRestrictedUser,
};
