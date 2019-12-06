const fs = require('fs');
const { validateTodo } = require("../validateTodo.js");

module.exports = {createTodo, getOneTodo, getTodos, updateTodo, deleteTodo, markDone, markUndone};

const todos = JSON.parse(fs.readFileSync("todos.json", (err) => console.log(err)));

//createTodo
function createTodo(req, res, next) {
    try {
        const { error } = validateTodo(req.body);
        if (error) {
          res.status(400)
          next("Bad request. Fill in both fields: task and status");
          return;
        }     
          const newTodo = {
              id: Date.now().toString(),
              task: req.body.task,
              status: req.body.status
          };
    
          todos.push(newTodo);
          fs.writeFile("todos.json", 
                      `${JSON.stringify(todos)}`,
                      (err) => req.status(400) );
          res.status(200).json(newTodo);
        
    } catch(e) {
      throw e;
    }
  }


//getOneTodo
function getOneTodo(req, res, next) {
    try {
        const todo = todos.find(el => +el.id === parseInt(req.params.id));
        if(!todo) return res.status(404).send("Todo with the given ID doesn't exits.");
        
        res.send(todo);

    } catch(e) {
      throw e;
    }
  }

//getTodos
function getTodos(req, res, next) {
    try {       
        res.send(todos);
    } catch(e) {
      throw e;
    }
  }


//change Todo
function updateTodo(req, res, next) {
    try{

      let todo = todos.find(el => +el.id === parseInt(req.params.id));
      if(!todo) return res.status(404).send("Todo with the given ID doesn't exits.");
    
      req.body.task ? todo.task = req.body.task : todo.task;
      req.body.status ? todo.status = req.body.status : todo.status
            
      fs.writeFile("todos.json", 
                  `${JSON.stringify(todos)}`,
                  (err) => req.status(400) );
      res.status(200).send(todo);

    } catch(e) {
        throw e;
    }
};
   
 //removeTodo
function deleteTodo(req, res, next) {
    try{
        const todo = todos.find(el => +el.id === parseInt(req.params.id));
        if(!todo) return res.status(400).send("Todo with the given ID doesn't exits yet.");
        
        const index = todos.indexOf(todo);
        todos.splice(index,1);
    
        fs.writeFile('todos.json', `${JSON.stringify(todos)}`, (err) => req.status(400));
        res.status(200).send(todos);
    }catch(e) {
        throw e;
    }
};


// markDone
function markDone(req, res, next) {
    try{
      let todo = todos.find(el => +el.id === parseInt(req.params.id));
      if(!todo) return res.status(404).send("Todo with the given ID doesn't exits.");
      
      req.body.status === "done" ? todo.status = "done" : todo.status;
      fs.writeFile("todos.json", 
                  `${JSON.stringify(todos)}`,
                  (err) => req.status(400) );
      res.status(200).send(todo);
    } catch(e) {
        throw e;
    }
};
// markUnone
function markUndone(req, res, next) {

    try{
      let todo = todos.find(el => +el.id === parseInt(req.params.id));
      if(!todo) return res.status(404).send("Todo with the given ID doesn't exits.");
      
      req.body.status === "undone" ? todo.status = "undone" : todo.status;      
      fs.writeFile("todos.json", 
                  `${JSON.stringify(todos)}`,
                  (err) => req.status(400) );
      res.status(200).send(todo);
    } catch(e) {
        throw e;
    }
}

