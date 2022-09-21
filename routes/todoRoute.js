const router = require('express').Router();
const todoController = require('../controllers/todoController');
const authController = require('../controllers/authController');

router.get('/', authController.authenticate, todoController.getalltodo);
router.get('/:id', authController.authenticate, todoController.getTodoById);
router.post('/', authController.authenticate, todoController.createTodo);
router.put('/:id', authController.authenticate, todoController.updateTodo);
router.delete('/:id', authController.authenticate, todoController.deleteTodo);


module.exports = router;