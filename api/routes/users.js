const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const UserController = require("../controllers/users");

router.get('/', UserController.user_get_all);

router.get('/:userId', UserController.users_get_userInfo);

router.post('/', UserController.users_post_createUser);

router.post('/login', UserController.user_post_login);

router.delete('/:userId', UserController.user_post_deleteUser);

module.exports = router;