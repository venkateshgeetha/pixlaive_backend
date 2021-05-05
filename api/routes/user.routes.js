const express = require("express");
const { signup } = require("../controllers/User");
const router = express.Router();
const {checkRequestBodyParams , validateRequest} = require("../middlewares/validator")

router.post('/signup',
        checkRequestBodyParams('email'),
        validateRequest,
        signup
)

module.exports = router
