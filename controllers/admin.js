const Admin = require("../models/admin");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const Todo = require('../models/todo');

const createAdmin = async (data) => {
    const { username, firstName, lastName, password } = data;
    const adminExists = await Admin.findOne({ username });
    if (adminExists) {
        throw new Error("Admin already exists");
    }

    const salt = parseInt(bcrypt.genSalt(parseInt(process.env.SALTROUNDS)));
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.create({
        username,
        firstName,
        lastName,
        password: hashedPassword
    })

    if (admin) {
        console.log(admin);
        const token = jwt.sign({
            username: admin.username, adminId: admin._id
        }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
        return token;
    }
};

const adminLogin = async (data) => {
    const { username, password } = data;
    const adminExists = await Admin.findOne({ username });
    if (!adminExists) {
        throw new Error("username or password is wrong!");
    }
    const passwordCheck = await bcrypt.compare(password, adminExists.password);
    if (!passwordCheck) {
        throw new Error("username or password is wrong!");
    }

    const token = jwt.sign({
        username, adminId: adminExists._id
    }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
    return token;
};

const getAllUsers = async () => {
    return User.find({}, { firstName: 1, _id: 0 });
}

const getAllTodos = async () => {
    return Todo.find();
}
const getTodo = async (id) => { return await Todo.findById(id)};
const modifyTodo = async (id, data) => await Todo.findByIdAndUpdate(id, data, { new: true });
const deleteTodo = async (id) => await Todo.findByIdAndDelete(id);

module.exports = {  createAdmin , adminLogin, getAllUsers, getAllTodos, getTodo, modifyTodo, deleteTodo};
