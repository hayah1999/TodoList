const express = require('express');
const asycnWrapper = require('../../utility/errorHandler');
const { add, modify, deleteTask, retrieve } = require('../../controllers/todos');
const { addSchema, modifySchema } = require("../../utility/todosValidation");
const { verifyAuth } = require('../../middleware/verifyUser');

const router = express.Router();



// @desc user can create a todo
// @route POST /todos
// @access Private


router.post('/', verifyAuth, async (req, res, next) => {

    const { error, value } = addSchema.validate(req.body);
    if (error) {
        return res.status(500).send("Invalid request input \n" + error);
    }
    value.userId = req.user._id;
    const addTodo = add(value);
    const [err, data] = await asycnWrapper(addTodo);
    if (err) return next(err);
    return res.json(data);
});

// @desc user can edit a todo
// @route PATCH /todos/:id
// @access Private


router.patch('/:id', verifyAuth, async (req, res, next) => {

    const { error, value } = modifySchema.validate(req.body);
    if (error) {
        return res.status(500).send("Invalid request input \n" + error);
    }
    const modifyTodo = modify(req.params.id, req.user._id, value);
    const [err, data] = await asycnWrapper(modifyTodo);
    if (err) return next(err);
    return res.json({ message: "it has been updated successfully", data });
});

// @desc user can delete a todo
// @route DELETE /todos/:id
// @access Private


router.delete('/:id', verifyAuth, async (req, res, next) => {

    const deleteTodo = deleteTask(req.params.id, req.user._id);
    const [err, data] = await asycnWrapper(deleteTodo);
    if (err) return next(err);
    return res.json("it has been deleted successfully");
});

// @desc get all todos based on queryParams for lab 4
// @route GET /todos/
// @access Public

router.get('/', async (req, res, next) => {

    if (!req.query.limit) req.query.limit = 10;
    const getTodo = retrieve(req.query);
    const [err, data] = await asycnWrapper(getTodo);
    if (err) return next(err);
    return res.json(data);

})

module.exports = router;