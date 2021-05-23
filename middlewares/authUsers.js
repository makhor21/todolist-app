const jwt = require("jsonwebtoken");

exports.authUsers = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.redirect("/logout");
    }
    jwt.verify(
      req.session.user.token,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, decoded) {
        if (!decoded) {
          res.redirect("/logout");
        }
      }
    );
    next();
  } catch (err) {
    next(err);
  }
};
