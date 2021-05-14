const express = require("express");
const {
  signup,
  verifyOtp,
  resendotp,
  login,
  changepassword,
  facebook_sign,
  user_info,
  is_user,
  updateProfile,
  forgotpassword,
  resetpassword,
  resetPasswordVerifyOtp,
  gcm_token_updation,
  search_user,
} = require("../controllers/User");
const { checkSession } = require("../middlewares/checkAuth");
const router = express.Router();
const {
  checkRequestBodyParams,
  validateRequest,
  checkParam,
  checkQuery
} = require("../middlewares/validator");

//signup
router.post(
  "/signup",
  checkRequestBodyParams("username"),
  checkRequestBodyParams("email"),
  checkRequestBodyParams("password"),
  checkRequestBodyParams("confirm_password"),
  checkRequestBodyParams("phone"),
  checkRequestBodyParams("first_name"),
  checkRequestBodyParams("last_name"),
  validateRequest,
  signup
);

router.post(
  "/verify_otp",
  checkRequestBodyParams("otp"),
  checkRequestBodyParams("user_id"),
  validateRequest,
  verifyOtp
);

router.post(
  "/resendotp",
  checkRequestBodyParams("user_id"),
  validateRequest,
  resendotp
);

router.post(
  "/login",
  checkRequestBodyParams("email"),
  checkRequestBodyParams("password"),
  validateRequest,
  login
);

router.post(
  "/changepassword",
  checkSession,
  checkRequestBodyParams("user_id"),
  checkRequestBodyParams("oldpassword"),
  checkRequestBodyParams("newpassword"),
  checkRequestBodyParams("confirmpassword"),
  validateRequest,
  changepassword
);

router.post(
  "/facebook",
  checkRequestBodyParams("username"),
  checkRequestBodyParams("email"),
  checkRequestBodyParams("password"),
  checkRequestBodyParams("confirm_password"),
  checkRequestBodyParams("phone"),
  checkRequestBodyParams("first_name"),
  checkRequestBodyParams("last_name"),
  validateRequest,
  facebook_sign
);

router.get("/userInfo",checkSession, checkQuery("user_id"), validateRequest, user_info);

router.post("/is_user",checkSession, checkRequestBodyParams("phone"),validateRequest, is_user);

router.put(
  "/updateProfile",
  checkSession,
  checkRequestBodyParams("user_id"),
  validateRequest,
  updateProfile
);

//reset_passwordstep1
router.post(
  "/forgotpassword",
  checkRequestBodyParams("email"),
  validateRequest,
  forgotpassword
);

//resetPasswordVerifyOtp
router.post(
  "/resetPasswordVerifyOtp",
  checkRequestBodyParams("user_id"),
  checkRequestBodyParams("otp"),
  checkRequestBodyParams("token"),
  validateRequest,
  resetPasswordVerifyOtp
);

//resetPassword
router.post(
  "/resetPassword",
  checkRequestBodyParams("user_id"),
  checkRequestBodyParams("token"),
  checkRequestBodyParams("password"),
  checkRequestBodyParams("confirmPassword"),
  validateRequest,
  resetpassword
);

//UpdateGcmtoken
router.post(
  "/update_gcmToken",
  checkSession,
  checkRequestBodyParams("user_id"),
  checkRequestBodyParams("token"),
  validateRequest,
  gcm_token_updation
);

// Search user
router.get("/search_user",
            checkSession,
            checkQuery("user_id"),
            checkQuery("search_word"),
            search_user);

module.exports = router;
