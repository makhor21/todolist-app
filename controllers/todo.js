const todoModel = require("../models/todo");

exports.getAllTodo = (req, res, next) => {
  try {
    const limit = 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    todoModel.getAllTodo(
      req.session.user.id,
      limit,
      offset,
      (err, total, todos) => {
        if (err) {
          res.send(err);
        }
        const total_pages = Math.ceil(total.length / limit);
        res.render("index", {
          todos,
          total_pages,
          current_page: page,
          user_fn: req.session.user.first_name,
          user_ln: req.session.user.last_name,
        });
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.getSingleTodo = (req, res, next) => {
  try {
    todoModel.getSingleTodo(req.params.id, (err, todo) => {
      if (err) {
        res.send(err);
      } else {
        console.log("todo", todo);
        res.send(todo);
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.createTodo = (req, res, next) => {
  try {
    if (!req.body) {
      req.status(400).send("please fill all fields");
    }
    const new_todo = {
      description: req.body.description,
      user_id: req.session.user.id,
    };
    todoModel.createTodo(new_todo, (err) => {
      if (err) {
        res.status(500).send("server error");
      }
      return res.redirect("/todo");
    });
  } catch (err) {
    next(err);
  }
};

exports.updateDoneTodo = (req, res, next) => {
  try {
    todoModel.updateDoneTodo(req.params.id, (err) => {
      if (err) {
        res.status(500).send("server error");
      }
      return res.redirect("/todo");
    });
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = (req, res, next) => {
  try {
    todoModel.updateTodo(req.body, req.params.id, (err, todo) => {
      if (err) {
        res.status(500).send("server error");
      }
      return res.json({ status: true, data: todo });
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = (req, res, next) => {
  try {
    todoModel.deleteTodo(req.params.id, (err) => {
      if (err) {
        res.status(500).send("server error");
      }
      return res.redirect("/todo");
    });
  } catch (err) {
    next(err);
  }
};
