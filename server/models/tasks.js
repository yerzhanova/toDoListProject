const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    title: String,
    description: String,
	userId: Schema.Types.ObjectId,
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('task', taskSchema, 'tasks');