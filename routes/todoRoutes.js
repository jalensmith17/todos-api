const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

router.get('/', todoController.indexTodo)
router.delete('/:id', todoController.deleteTodo)
router.put('/:id', todoController.updateTodo)
router.post('/', todoController.createTodo)
router.get('/:id', todoController.getTodo)

module.exports = router