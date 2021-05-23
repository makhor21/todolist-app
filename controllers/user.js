const dbConnection = require("../config/db_config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerPage = (req, res, next) => {
  res.render("register", { registerError: req.flash("registerError") });
};

exports.loginPage = (req, res, next) => {
  res.render("login", {
    loginError: req.flash("loginError"),
  });
};

exports.createUser = (req, res, next) => {
  try {
    if (!req.body) {
      req.flash("registerError", "registerError");
      return res.status(400).redirect("/user/register");
    }
    const saltRounds = 10;
    const new_user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, saltRounds),
    };
    dbConnection.query("INSERT INTO users SET ? ", new_user, (err) => {
      if (err) {
        if (err.sqlMessage.includes("Duplicate entry")) {
          return res.status(404).json({ msg: "user duplicate" });
        } else {
          return res.status(500).json({ msg: "server error" });
        }
      } else {
        return res.redirect("/user/login");
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = (req, res, next) => {
  try {
    if (!req.body)
      return res.status(400).json({ msg: "please fill all of the fields" });
    const user = { user: req.body.username };
    dbConnection.query(
      "SELECT * FROM users WHERE username = ?",
      req.body.username,
      (err, result) => {
        if (err) return res.status(500).json({ msg: "server error" });
        bcrypt.compare(
          req.body.password,
          result[0].password,
          function (err, isMatch) {
            if (err) {
              return res.status(500).json({ msg: "server error" });
            }
            if (isMatch) {
              const accessToken = jwt.sign(
                user,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: 24 * 7 * 60 * 60 }
              );
              req.session.user = result[0];
              req.session.user.token = accessToken;
              return res.redirect("/todo");
            } else {
              req.flash("loginError", "loginError");
              return res.redirect("/user/login");
            }
          }
        );
      }
    );
  } catch (err) {
    next(err);
  }
};
