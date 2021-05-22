const todoModel = require("../models/todo");

exports.getAllTodo = (req, res, next) => {
  const limit = 10;
  const page = req.query.page || 1;
  const offset = (page - 1) * limit;
  todoModel.getAllTodo(limit, offset, (err, total, todos) => {
    if (err) {
      res.send(err);
    }
    const total_pages = Math.ceil(total.length / limit);
    res.render("index", { todos, total_pages, current_page: page });
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
  if (!req.body) {
    req.status(400).send("please fill all fields");
  }
  const new_todo = new todoModel(req.body);
  todoModel.createTodo(new_todo, (err) => {
    if (err) {
      res.status(500).send("server error");
    }
    return res.redirect("/");
  });
};

exports.updateDoneTodo = (req, res, next) => {
  todoModel.updateDoneTodo(req.params.id, (err) => {
    if (err) {
      res.status(500).send("server error");
    }
    return res.redirect("/");
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
