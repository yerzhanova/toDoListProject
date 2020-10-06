const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/users');
const config = require('../../config/config.json');
const db = config.dataSources.mongo.url;
const jwt = require('jsonwebtoken');
mongoose.connect(db,  { useUnifiedTopology: true, useNewUrlParser: true }, err => {
	if (err) {
		console.error(err);
	} else {
		console.log('connected to mongodb');
	}
});
router.get('/', (req, res) => {
	res.send('from api route');
});
router.post('/register', (req, res) => {
	let userData = req.body;
	let user = new User(userData);
	user.save((err, registeredUser) => {
		if (err) {
			console.log(err);
		} else {
			let payload = {subject: registeredUser._id};
			let token = jwt.sign(payload, 'secretkey');
			res.status(200).send({token});
		}
	});
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

router.get('/tasks', (req, res) => {
	let events = [
		{
			"_id": "1",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "2",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "3",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "4",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "5",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "6",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		}
		];
	res.json(events);
});

router.get('/special', (req, res) => {
	let events = [
		{
			"_id": "1",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "2",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "3",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "4",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "5",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "6",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		}
	];
	res.json(events);
})
module.exports = router;