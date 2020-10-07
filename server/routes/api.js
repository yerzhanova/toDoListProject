const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');
const Task = require('../models/tasks');
const config = require('../../config/config.json');
const db = config.dataSources.mongo.url;
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectId;

mongoose.connect(db,  { useUnifiedTopology: true, useNewUrlParser: true }, err => {
	if (err) {
		console.error(err);
	} else {
		console.log('connected to mongodb');
	}
});

function verifyToken(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(401).send('Unauthorized request');
	}
	let token = req.headers.authorization.split(' ')[1];
	if (token === null) {
		return res.status(401).send('Unauthorized request');
	}
	console.log(jwt.malformed);
	let payload = jwt.verify(token, 'secretkey');
	if (!payload) {
		return res.status(401).send('Unauthorized request');
	}
	req.userId = payload.subject;
	next();
}

router.get('/', (req, res) => {
	res.send('from api route');
});

router.post('/register', (req, res) => {
	let userData = req.body;
	let user = new User(userData);
	User.find({email: user.email}, (err, registerRes) => {
		if (err) {
			console.log(err);
		} else if (registerRes) {
			if (registerRes.length > 0) {
				res.status(409).send('this email is almost registered');
			} else {
				user.save((err, registeredUser) => {
					if (err) {
						console.log(err);
					} else {
						let payload = {subject: registeredUser._id};
						let token = jwt.sign(payload, 'secretkey');
						res.status(200).send({token});
					}
				});
			}
		}
	})
});

router.post('/login', (req, res) => {
	let userData = req.body;
	User.findOne({email: userData.email}, (err, user) => {
		if (err) {
			console.log(err);
		} else {
			if (!user) {
				res.status(401).send('invalid email');
			} else {
				if (user.password !== userData.password) {
					res.status(401).send('Invalid password!');
				} else {
					let payload = {subject: user._id};
					let token = jwt.sign(payload, 'secretkey');
					res.status(200).send({token});
				}
			}
		}
	})
});

router.get('/tasks', verifyToken, (req, res) => {
	Task.find({}, (err, tasks) => {
		if (err) {
			console.log(err);
		} else {
			if (!tasks) {
				// res.status(400).send('bad request');
			} else {
				res.status(200).send(tasks);
			}
		}
	});
});

router.post('/addTask', (req, res) => {
	let taskData = req.body;
	let task = new Task(taskData);
	task.save((err, savedTask) => {
		if (err) {
			console.log(err);
        } else {
			res.status(200).send(savedTask);
		}
	})
});

router.get('/getTaskById/:id', (req, res) => {
	let id = req.params.id;
	Task.findOne({_id: ObjectID(id)}, (err, task) => {
		if (err) {
			console.log(err)
		} else {
			res.status(200).send(task);
		}
	})
});


module.exports = router;