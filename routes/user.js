const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

/* GET REGISTER PAGE */
router.get("/register", userController.registerPage);

/* GET LOGIN PAGE */
router.get("/login", userController.loginPage);

/* REGISTER USERS */
router.post("/register", userController.createUser);

/* LOGIN USERS */
router.post("/login", userController.loginUser);

module.exports = router;
