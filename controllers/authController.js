const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")
const bcrypt = require('bcryptjs')

let loginController = async (req, res) => {
    let { username, email, password } = req.body;
    if ((!username && !email) || !password) {
        let error = new Error("All fields were not supplied for Signup.")
        error.code = StatusCodes.BAD_REQUEST
        throw error;
    }

    // find user in database
    let user = null;
    if (username) {
        user = await User.findOne({ username: username })
    }

    if (email) {
        user = await User.findOne({ email: email })
    }
    console.log(`User ${user}`);
    if (user == null) {
        let error = new Error("Could not find user from username or email")
        error.code = StatusCodes.UNAUTHORIZED
        throw error;
    }

    let isMatch = await user.validatePassword(password)
    // console.log(isMatch, password);
    if (!isMatch) {
        throw new Error("WRONG PASSWORD")
    }
    var token = user.genJWT()
    // console.log("Pwd matched,token generated", token);
    res.status(200).json({ "USER": user, "JWT": token })
}

let signupController = async (req, res) => {
    let { username, password, email, role } = req.body

    if (!username || !password || !email) {
        let error = new Error("All fields were not supplied for Signup.")
        error.code = StatusCodes.BAD_REQUEST
        throw error;
    }

    if (!role) {
        role = "patient";
    }
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    let newUser = await User.create({ email: email, username: username, password: hashedPassword, role: role })
    res.status(200).json({ msg: newUser })
}

module.exports = { loginController, signupController }