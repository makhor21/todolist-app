const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo");
const auth = require("../middlewares/authUsers");

/* GET All TODO */
router.get("/", auth.authUsers, todoController.getAllTodo);

/* GET SINGLE TODO */
router.get("/:id", auth.authUsers, todoController.getSingleTodo);

/* CREATE NEW TODO */
router.post("/", auth.authUsers, todoController.createTodo);

/* UPDATE TODO TO DONE */
router.patch("/:id", auth.authUsers, todoController.updateDoneTodo);

/* UPDATE TODO */
router.put("/:id", auth.authUsers, todoController.updateTodo);

/* DELETE TODO */
router.delete("/:id", auth.authUsers, todoController.deleteTodo);

module.exports = router;
