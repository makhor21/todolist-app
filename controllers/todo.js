const todoModel = require("../models/todo");

exports.getAllTodo = (req, res, next) => {
  todoModel.getAllTodo((err, todos) => {
    if (err) {
      res.send(err);
    }
    res.render("index", { todos });
  });
};

exports.getSingleTodo = (req, res, next) => {
  todoModel.getSingleTodo(req.params.id, (err, todo) => {
    if (err) {
      res.send(err);
    } else {
      console.log("todo", todo);
      res.send(todo);
    }
  });
};

exports.createTodo = (req, res, next) => {
  const new_todo = new todoModel(req.body);
  console.log(new_todo);
  if (!req.body) {
    req.status(400).send("please fill all fields");
  } else {
    console.log("valid");
    todoModel.createTodo(new_todo, (err, todo) => {
      if (err) {
        res.status(500).send("server error");
      }
      return res.json({ status: true, data: todo });
    });
  }
};

exports.updateDoneTodo = (req, res, next) => {
  todoModel.updateDoneTodo(req.params.id, (err) => {
    if (err) {
      res.status(500).send("server error");
    }
    return res.send("successfully");
  });
};

exports.updateTodo = (req, res, next) => {
  todoModel.updateTodo(req.body, req.params.id, (err, todo) => {
    if (err) {
      res.status(500).send("server error");
    }
    return res.json({ status: true, data: todo });
  });
};

exports.deleteTodo = (req, res, next) => {
  todoModel.deleteTodo(req.params.id, (err) => {
    if (err) {
      res.status(500).send("server error");
    }
    return res.redirect("/");
  });
};
