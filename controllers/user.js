const dbConnection = require("../config/db_config");
const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.createUser = (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ msg: "please fill all of the fields" });
    }
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
        console.log("add new user");
        return res.send("ok");
      }
    });
  } catch (err) {
    next(err);
  }
};
