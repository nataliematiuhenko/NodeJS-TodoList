const express = require('express');
const router = express.Router();

const todoController = require('../controllers/methods.js');

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getOneTodo);
router.put('/:id', todoController.updateTodo);
router.put('/:id/done', todoController.markDone);
router.put('/:id/undone', todoController.markUndone);

router.delete('/:id', todoController.deleteTodo);


module.exports = router;