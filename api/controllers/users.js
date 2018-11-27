//const User = require("../models/user");
//const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

var users = [{"id":1,"mail":"test@test.it", "password":"test", "name":"test"},{"id":2,"mail":"test2@test.it", "password":"test2", "name":"test2"}];

var id_count = 2;

exports.user_get_all = (req, res, next) => {
	/*
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
	*/
	return res.status(200).json(users);
};

exports.users_get_userInfo = (req, res, next) => {

	var user_found = undefined;
	users.forEach(user => {
		if(user["id"] == req.params.userId){
			user_found = user;
		}
	});

	if(user_found != undefined){
		return res.status(200).json({
			user_found
		});
	}else{
		return res.status(404).json({
			message: "User not found!"
		});
	}

};

exports.users_post_createUser = (req, res, next) => {
	
	//check all fields
	if(req.body.name == undefined || req.body.password == undefined || req.body.mail == undefined){
		return res.status(401).json({
			message: "Bad parameters"
		});
	}
	if(req.body.name.length == 0 || req.body.password.length == 0){
		return res.status(401).json({
			message: "Bad parameters"
		});
	}
	
	// check existing mail
	users.forEach(user => { 
		if(user["mail"] == req.body.mail){
			return res.status(409).json({
				message: "User already exists!"
			});
		}
	});

	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if (err) {
			return res.status(500).json({
				error: err
			});
		} else {
			id_count++;
			users.push({"id":id_count, "mail":req.body.mail, "password":hash, "name":req.body.name});

			res.status(201).json({
				message: "User created"
			});
		}
	});

	/*
	User.find({
			email: req.body.email
		})
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
	*/
};

exports.user_post_login = (req, res, next) => {
	/*
	User.find({
			email: req.body.email
		})
		.exec()
		.then(user => {
			if (user.length < 1) {
				// 401 is better than 404, so I can avoid mail brute force listing
				return res.status(401).json({
					message: "Athentication failed!"
				});
			}

			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
					return res.status(401).json({
						message: "Athentication failed!"
					});
				}
				if (result) {
					// create json token
					const token = jwt.sign({
							email: user[0].email,
							userId: user[0]._id
						},
						process.env.JWT_KEY, {
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
		*/
};

exports.user_post_deleteUser = (req, res, next) => {
	/*
	User.remove({
			_id: req.params.id
		})
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
		*/
};