const express = require('express');
const asycnWrapper = require('../../utility/errorHandler');
const { create, get, remove, modify, getUserTodos, getUser, login } = require('../../controllers/users');
const { addSchema, modifySchema, loginSchema } = require("../../utility/usersValidation");
const { verifyAuth } = require('../../middleware/verifyUser');
const router = express.Router();


// @desc user can  register 
// @route POST /users
// @access Public

router.post('/', async (req, res, next) => {

    const { error, value } = addSchema.validate(req.body);
    if (error) {
        return res.status(400).send("Invalid request input \n" + error);
    }
    const createUser = create(value);
    const [err, data] = await asycnWrapper(createUser);
    if (err) return next(err);
    return res.json(data);
});

// @desc user can  login
// @route POST /users/login
// @access Public

router.post('/login', async (req, res, next) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).send("Invalid request input \n" + error);
    }

    const logUser = login(value);
    const [err, data] = await asycnWrapper(logUser);
    if (err) return next(err);
    return res.json(data);
})


// @desc user can GET her/his information 
// @route GET /users/:id
// @access Private

router.get('/:id', verifyAuth, async (req, res, next) => {
    if (String(req.user._id) === req.params.id) {
        const getUserinfo = getUser(req.params.id);
        const [err, data] = await asycnWrapper(getUserinfo);
        if (err) return next(err);
        return res.json(data);
    }
    return res.status(401).json("You are not authorized to get information of this user");
});

// @desc user can delete themselves
// @route DELETE /users/:id
// @access Private

router.delete('/:id', verifyAuth, async (req, res, next) => {
    if (String(req.user._id) === req.params.id) {
        const deleteUser = remove(req.params.id);
        const [err, data] = await asycnWrapper(deleteUser);
        if (err) return next(err);
        return res.json("user has been deleted successfully");
    }
    return res.status(401).json("You are not authorized to delete this user");
});

// @desc user can update themselves
// @route PATCH /users/:id
// @access Private

router.patch('/:id', verifyAuth, async (req, res, next) => {

    const { error, value } = modifySchema.validate(req.body);
    if (error) {
        return res.status(400).send("Invalid request input \n" + error);
    }
    if (String(req.user._id) === req.params.id) {
        const modifyUser = modify(req.params.id, value);
        const [err, data] = await asycnWrapper(modifyUser);
        if (err) return next(err);
        return res.json({
            message: " Updated successfully",
            user: data
        });
    }

    return res.status(401).json("You are not authorized to edit this user");
});


// @desc user can get their own todos only 
// @route GET /users/todos
// @access Private

router.get('/todos', verifyAuth, async (req, res, next) => {
    const gettodos = getUserTodos(req.user._id);
    const [err, data] = await asycnWrapper(gettodos);
    if (err) return next(err);
    return res.json(data);
});

module.exports = router;