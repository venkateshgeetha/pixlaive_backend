const express = require("express");
const { createFollow, mutualFriendList, get_following, get_followers } = require("../controllers/follow_unfollow");
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

router.get('/get_following',
            checkQuery('id'),
            checkQuery('uid'),
            validateRequest,
            get_following
            )

router.get('/get_followers',
            checkQuery('id'),
            checkQuery('uid'),
            validateRequest,
            get_followers
            )

module.exports = router