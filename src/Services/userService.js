const User = require("../Models/userModel.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require("../config/index.js");
const { findUserByIdAndCheck } = require("../utils/userHelpers.js");

const createUser = async (userData) => {
    const name = userData.name;
    const password = userData.password;
    const email = userData.email;

    if (!email || !password || !name) {
        const error = new Error('Faltan campos requeridos');
        error.statusCode = 400;
        throw error;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        const error = new Error("Ya existe un usuario con este email");
        error.statusCode = 400;
        throw error;
    }

    const newUser = new User({
        name,
        email,
        password,
    });

    const savedUser = await newUser.save();

    const payload = {
        userId: savedUser._id,
        userEmail: savedUser.email,
    };
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

    return {
        user: {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
        },
        token: token,
    };
};

const getUsers = async () => {
    const users = await User.find().select('-password');

    if (users.length === 0) {
        const error = new Error("No hay usuarios");
        error.statusCode = 204;
        throw error;
    }

    return users;
};

const validateUser = async (email, password) => {
    if (!(email && password)) {
        const error = new Error("Falta un campo");
        error.statusCode = 400;
        throw error;
    }

    const userFound = await User.findOne({ email }).select('+password');

    if (!userFound) {
        const error = new Error("Usuario o contraseña incorrectos");
        error.statusCode = 400;
        throw error;
    }

    if (!bcrypt.compareSync(password, userFound.password)) {
        const error = new Error("Usuario o contraseña incorrectos");
        error.statusCode = 400;
        throw error;
    }

    const payload = {
        userId: userFound._id,
        userEmail: userFound.email,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

    const userResponse = {
        _id: userFound._id,
        name: userFound.name,
        email: userFound.email,
    };

    return { message: "Sesión iniciada", user: userResponse, token };
};

const deleteUser = async (userId) => {
    await findUserByIdAndCheck(userId);
    await User.findByIdAndDelete(userId);
    return { message: "Usuario eliminado correctamente" };
};

const updateUser = async (userId, updateData) => {
    await findUserByIdAndCheck(userId);
    if (updateData.password) {
        updateData.password = bcrypt.hashSync(updateData.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        updateData,
        { new: true }
    ).select('-password');

    return updatedUser;
};

const findByEmail = async (email) => {
    return await User.findOne({ email }).select('+password');
};

const checkPassword = async (user, password) => {
    if (!user) return false;
    return await bcrypt.compare(password, user.password);
};

module.exports = {
    createUser,
    getUsers,
    validateUser,
    deleteUser,
    updateUser,
    findByEmail,
    checkPassword,
};