const User = require("../models/user");
const mongoose = require("mongoose");

exports.users_post_createUser = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
          //conflict response, user already existing!
        return res.status(409).json({
          message: "User already exists!"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_post_login = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
          if(user.length < 1){
            // 401 is better than 404, so I can avoid mail brute force listing
            return res.status(401).json({
              message: "Athentication failed!"
            });
          }
  
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
              return res.status(401).json({
                message: "Athentication failed!"
              });
            }
            if(result){
              // create json token
              const token = jwt.sign(
                {
                  email: user[0].email,
                  userId: user[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
              );
              return res.status(200).json({
                message: "Auth successful",
                token: token
              });
            }
  
            return res.status(401).json({
              message: "Athentication failed!"
            });
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
  };

exports.user_post_deleteUser = (req, res, next) => {
    User.remove({_id: req.params.id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "User deleted"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
};