const express = require("express");
const { createFollow } = require("../controllers/follow_unfollow");
const { checkRequestBodyParams, validateRequest } = require("../middlewares/validator");
const router = express.Router();

router.post('/follow',
            checkRequestBodyParams('user_id'),
            checkRequestBodyParams('following_id'),
            validateRequest,
            createFollow
            )

module.exports = router