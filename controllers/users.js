const User = require('../models/user');
const Todo = require('../models/todo');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const create = async (data) => {
    const { username, firstName, lastName, password, dob } = data;
    const userExists = await User.findOne({ username });
    if (userExists) {
        throw new Error("User already exists");
    }

    const salt = parseInt(bcrypt.genSalt(parseInt(process.env.SALTROUNDS)));
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        username,
        firstName,
        lastName,
        password: hashedPassword,
        dob
    })

    if (user) {
        const token = jwt.sign({
            username: user.username, userId: user._id
        }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return token;
    }
};

const login = async (data) => {
    const { username, password } = data;
    const userExists = await User.findOne({ username });
    if (!userExists) {
        throw new Error("username or password is wrong!");
    }
    const passwordCheck = await bcrypt.compare(password, userExists.password);
    if (!passwordCheck) {
        throw new Error("username or password is wrong!");
    }

    const token = jwt.sign({
        username, userId: userExists._id
    }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
};


const getUser = async(id) => {
    return await User.findById(id);
}

const remove = async (id) => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error("User doesn't exist");
    }
    await User.findByIdAndDelete(id);
}
const modify = async (id, data) => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error("User doesn't exist");
    }

    await User.findByIdAndUpdate(id, data, { new: true });
}
const getUserTodos = (id) => Todo.find({ userId: { $eq: id } });


module.exports = { create, remove, modify, getUserTodos, getUser, login };