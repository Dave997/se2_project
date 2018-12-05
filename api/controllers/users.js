const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../config');

exports.user_get_all = (req, res, next) => {

	User.find({deleted:0})
		.exec()
		.then(users => {

			var response = [];

			users.forEach(user => {
				response.push({
					id:user._id,
					email:user.email,
					name:user.name
				});				
			});

			return res.status(200).json({
				count: response.length,
				users: response
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
};

exports.users_get_userInfo = (req, res, next) => {
	User.find({
			_id: req.params.userId
		})
		.exec()
		.then(user => {
			if (user.length < 1 || user[0].deleted == 1) {
				return res.status(401).json({
					message: "User not found!"
				});
			}

			return res.status(200).json({
				"id": user[0]._id,
				"email": user[0].email,
				"password": user[0].password,
				"name": user[0].name
			});
		})
		.catch(err => {
			return res.status(400).json({
				message: "Invalid id"
			});
		});
};

exports.users_post_createUser = (req, res, next) => {
	//check all fields
	if (req.body.name == undefined || req.body.password == undefined || req.body.email == undefined) {
		return res.status(401).json({
			message: "Bad parameters"
		});
	}
	if (req.body.name.length == 0 || req.body.password.length == 0) {
		return res.status(401).json({
			message: "Bad parameters"
		});
	}
	
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
						user.save()
							.then(result => {
								console.log(result);
								res.status(201).json({
									message: "User created",
									user: user
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

exports.user_delete_deleteUser = async (req, res, next) => {
	const id = req.params.userId;

	// check if user exists
	User.find({
		_id: id,
		deleted : 0 
	})
	.exec()
	.then(user => {

		if (user.length < 1) {
			return res.status(401).json({
				message: "User not found!"
			});
		}

		// set deleted bit
		User.update({
			_id: id
		}, {
			deleted: 1
		})
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'User ' + id + ' deleted!'
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
	})
	.catch(err => {
		return res.status(401).json({
			message: "User not found!"
		});
	});	
};

exports.user_put_modify = (req, res, next) => {
	const id = req.params.userId;

	var new_user = {};
	if(req.body.email)
		new_user.email = req.body.email;
	if(req.body.name)
		new_user.name = req.body.name;

	if(Object.keys(new_user).length	== 0)
		return res.status(401).json({
			message: "Bad parameters"
		});	

	// check if user exists
	User.find({
			_id: id,
			deleted : 0 
		})
		.exec()
		.then(user => {
			if (user.length < 1) {
				return res.status(401).json({
					message: "User not found!"
				});
			}

			User.update({_id:id},{$set:new_user})
			.exec()
			.then(result => {
				return res.status(200).json({
					message:'user ' + id + ' updated!',
					new_fields:new_user
				})
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
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

exports.user_post_login = (req, res, next) => {

	User.find({
			email: req.body.email
		})
		.exec()
		.then(user => {
			if (user.length < 1 || user[0].deleted == 1) {
				return res.status(401).json({
					message: "Athentication failed!"
				});
			}

			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
					console.log("ok");

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
						config.JWT_KEY, {
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