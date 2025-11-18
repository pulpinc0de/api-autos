const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, select: false },
});

// Hash contraseña antes de guardar
userSchema.pre('save', function (next) {
	if (!this.isModified('password')) return next();
	this.password = bcrypt.hashSync(this.password, 10);
	next();
});

module.exports = mongoose.model('User', userSchema);