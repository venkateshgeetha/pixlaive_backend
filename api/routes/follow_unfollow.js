const express = require("express");
const { createFollow, mutualFriendList } = require("../controllers/follow_unfollow");
const { checkRequestBodyParams, validateRequest, checkParam, checkQuery } = require("../middlewares/validator");
const router = express.Router();

router.post('/follow',
            checkRequestBodyParams('user_id'),
            checkRequestBodyParams('following_id'),
            validateRequest,
            createFollow
            )

router.get('/mutuals',
            checkQuery('id'),
            checkQuery('uid'),
            validateRequest,
            mutualFriendList
            )

module.exports = router