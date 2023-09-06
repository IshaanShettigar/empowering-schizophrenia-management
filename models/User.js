const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "Username already exists"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email already exists"]
    },
    role: {
        type: String,
        enum: ["caretaker", "patient", "special", "admin"],
        default: "patient"
    }
})


userSchema.methods.genJWT = function () {
    return jwt.sign({ userId: this._id, username: this.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}


/*
For some reason using an arrow function here does not seem to work
I do not know why
*/
userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", userSchema)