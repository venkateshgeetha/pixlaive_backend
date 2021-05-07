const express = require("express");
const { signup, verifyOtp, resendotp } = require("../controllers/User");
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

router.post('/verify_otp',
        checkRequestBodyParams('otp'),
        checkRequestBodyParams('user_id'),
        validateRequest,
        verifyOtp
        )

router.post('/resendotp',
        checkRequestBodyParams('user_id'),
        validateRequest,
        resendotp
        )

module.exports = router
