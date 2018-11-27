const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const UserController = require("../controllers/users");
/*
router.get('/', (req, res, next) => {
    User.find()
        .exec()
        .then(users => {
          return res.status(200).json(users);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
  });*/

router.post('/signup', UserController.users_post_createUser);

router.post('/login', UserController.user_post_login);

router.delete('/:userId', UserController.user_post_deleteUser);

module.exports = router;