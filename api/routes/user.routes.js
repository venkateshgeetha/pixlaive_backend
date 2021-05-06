const express = require("express");
const { signup } = require("../controllers/User");
const router = express.Router();
const {checkRequestBodyParams , validateRequest} = require("../middlewares/validator")

//signup
router.post('/signup',
        checkRequestBodyParams('username'),
        checkRequestBodyParams('email'),
        checkRequestBodyParams('password'),
        checkRequestBodyParams('confirm_password'),
        checkRequestBodyParams('phone'),
        checkRequestBodyParams('first_name'),
        checkRequestBodyParams('last_name'),
        validateRequest,
        signup
)

module.exports = router
