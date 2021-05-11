const express = require("express");
const { signup, verifyOtp, resendotp, login, changepassword, facebook_sign, user_info, is_user, updateProfile, forgotpassword, resetpassword } = require("../controllers/User");
const router = express.Router();
const {checkRequestBodyParams , validateRequest, checkParam} = require("../middlewares/validator")

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

router.post('/login',
        checkRequestBodyParams('email'),
        checkRequestBodyParams('password'),
        validateRequest,
        login
        )      
        
router.post('/changepassword',
        checkRequestBodyParams('user_id'),
        checkRequestBodyParams('oldpassword'),
        checkRequestBodyParams('newpassword'),
        checkRequestBodyParams('confirmpassword'),
        validateRequest,
        changepassword
        )

router.post('/facebook',
        checkRequestBodyParams('username'),
        checkRequestBodyParams('email'),
        checkRequestBodyParams('password'),
        checkRequestBodyParams('confirm_password'),
        checkRequestBodyParams('phone'),
        checkRequestBodyParams('first_name'),
        checkRequestBodyParams('last_name'),
        validateRequest,
        facebook_sign
        )       

router.get('/:id',
        checkParam('id'),
        validateRequest,
        user_info
        );

router.post('/is_user',
        checkRequestBodyParams("phone"),
        is_user
        );

router.put('/updateProfile',
        checkRequestBodyParams("user_id"),
        validateRequest,
        updateProfile
        )

//reset_passwordstep1
router.post('/forgotpassword',
        checkRequestBodyParams('email'),
        validateRequest,
        forgotpassword
        )

//resetPassword
router.post('/resetPassword',
        checkRequestBodyParams('user_id'),
        checkRequestBodyParams('token'),
        checkRequestBodyParams('password'),
        checkRequestBodyParams('confirmPassword'),
        validateRequest,
        resetpassword
        )
module.exports = router
