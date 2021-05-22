const dbConnection = require("../config/db_config");

const todo = function (todo) {
  this.name = todo.name;
  this.description = todo.description;
  this.done = todo.done ? todo.done : "no";
  this.createAt = new Date();
  this.updateAt = new Date();
};

todo.getAllTodo = (result) => {
  dbConnection.query("SELECT * FROM todos", (err, res) => {
    if (err) {
      console.log("error", err);
      result(null, err);
    } else {
      console.log("successfully");
      result(null, res);
    }
  });
};

todo.getSingleTodo = (id, result) => {
  dbConnection.query("SELECT * FROM todos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error", err);
      result(null, err);
    } else {
      console.log("successfully");
      result(null, res);
    }
  });
};

todo.createTodo = (todoReqData, result) => {
  dbConnection.query("INSERT INTO todos SET ? ", todoReqData, (err, res) => {
    if (err) {
      console.log("error", err);
      result(null, err);
    } else {
      console.log("insert new todo");
      result(null, res);
    }
  });
};

todo.updateDoneTodo = (id, result) => {
  dbConnection.query(
    "UPDATE todos SET done = 'yes' WHERE id = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(null, err);
      } else {
        console.log("successfully");
        result(null, res);
      }
    }
  );
};

todo.updateTodo = (todoReqData, id, result) => {
  dbConnection.query(
    "UPDATE todos SET name=?, description=? WHERE id=?",
    [todoReqData.name, todoReqData.description, id],
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(null, err);
      } else {
        console.log("successfully");
        result(null, res);
      }
    }
  );
};

todo.deleteTodo = (id, result) => {
  dbConnection.query("DELETE FROM todos WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("error", err);
      result(null, err);
    } else {
      console.log("successfully deleted");
      result(null, res);
    }
  });
};

module.exports = todo;
