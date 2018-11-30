const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const User = require("../models/user");
const UserController = require("../controllers/users");

router.get('/', UserController.user_get_all);

router.get('/:userId', UserController.users_get_userInfo);

router.post('/', UserController.users_post_createUser);

router.delete('/:userId', checkAuth, UserController.user_delete_deleteUser);

router.put('/:userId', UserController.user_put_modify);

router.post('/login', UserController.user_post_login);

module.exports = router;