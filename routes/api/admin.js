const express = require('express');
const asycnWrapper = require('../../utility/errorHandler');
const { verifyAdmin } = require('../../middleware/verifyAdmin');
const { addSchema, loginSchema, modifySchema } = require('../../utility/adminValidation');
const { createAdmin, adminLogin, getAllUsers, modifyTodo, getAllTodos, getTodo, deleteTodo} = require('../../controllers/admin');
const router = express.Router();

// @desc create admin
// @route POST /admin
// @access Public

router.post('/', async (req, res, next) => {
    const { error, value } = addSchema.validate(req.body);
    if (error) {
        return res.status(400).send("Invalid request input \n" + error);
    }
    const adminCreation = createAdmin(value);
    const [err, data] = await asycnWrapper(adminCreation);
    if (err) return next(err);
    return res.json(data);
});

// @desc admin can  login
// @route POST /admin/login
// @access Public

router.post('/login', async (req, res, next) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).send("Invalid request input \n" + error);
    }

    const logAdmin = adminLogin(value);
    const [err, data] = await asycnWrapper(logAdmin);
    if (err) return next(err);
    return res.json(data);
});

// @desc get all users name for lab 4 
// @route GET /admin/users
// @access Private

router.get('/users', verifyAdmin, async (req, res, next) => {
    const getUsers = getAllUsers();
    const [err, data] = await asycnWrapper(getUsers);
    if (err) return next(err);
    return res.json(data);
});

// @desc get all todos
// @route GET /admin/todos
// @access Private

router.get('/todos', verifyAdmin, async (req, res, next) => {
    const getTodos = getAllTodos();
    const [err, data] = await asycnWrapper(getTodos);
    if (err) return next(err);
    return res.json(data);
});

// @desc admin can get a todo
// @route GET /admin/todos/:id
// @access Private


router.get('/todos/:id', verifyAdmin, async (req, res, next) => {
    const todo = getTodo(req.params.id);
    const [err, data] = await asycnWrapper(todo);
    if (err) return next(err);
    return res.json({ data });
});


// @desc admin can edit a todo
// @route PATCH /admin/todos/:id
// @access Private


router.patch('/todos/:id', verifyAdmin, async (req, res, next) => {

    const { error, value } = modifySchema.validate(req.body);
    if (error) {
        return res.status(400).send("Invalid request input \n" + error);
    }
    const todoModification = modifyTodo(req.params.id, value);
    const [err, data] = await asycnWrapper(todoModification);
    if (err) return next(err);
    return res.json({ message: "it has been updated successfully", data });
});


// @desc admin can delete a todo
// @route DELETE /admin/todos/:id
// @access Private


router.delete('/todos/:id', verifyAdmin, async (req, res, next) => {
    const deleteTask = deleteTodo(req.params.id);
    const [err, data] = await asycnWrapper(deleteTask);
    if (err) return next(err);
    return res.json("it has been deleted successfully");
});

module.exports = router;