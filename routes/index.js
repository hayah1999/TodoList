const express = require('express');
const todosRoutes = require('./api/todos');
const usersRoutes = require('./api/users');
const adminRoutes = require('./api/admin');

const router = express.Router();

router.use('/todos', todosRoutes);
router.use('/users', usersRoutes);
router.use('/admin', adminRoutes);



module.exports = router;