const express = require("express")
let { loginController, signupController } = require("../controllers/authController")

const router = express.Router()

router.post('/login', loginController)
router.post('/signup', signupController)

module.exports = router;