const Todo = require('../models/todo');


const add = (data) => Todo.create(data);
const modify = async (id, userId, data) => {
    const checkUser = await Todo.findById(id);
    if (String(checkUser.userId) != String(userId)) {
        throw new Error("Can not update this todo. not owned by this user");
    }
    await Todo.findByIdAndUpdate(id, data, { new: true })
};
const deleteTask = async (id, userId) => {
    const checkUser = await Todo.findById(id);
    if (String(checkUser.userId) != String(userId)) {
        throw new Error("Can not delete this todo. not owned by this user");
    }
    await Todo.findByIdAndDelete(id);
}
const retrieve = (data ) => Todo.query(data);

module.exports = { add, modify, deleteTask, retrieve };