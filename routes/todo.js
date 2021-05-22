const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo");

/* GET All TODO */
router.get("/", todoController.getAllTodo);

/* GET SINGLE TODO */
router.get("/:id", todoController.getSingleTodo);

/* CREATE NEW TODO */
router.post("/", todoController.createTodo);

/* UPDATE TODO TO DONE */
router.patch("/:id", todoController.updateDoneTodo);

/* UPDATE TODO */
router.put("/:id", todoController.updateTodo);

/* DELETE TODO */
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
