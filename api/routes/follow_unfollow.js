const express = require("express");
const { createFollow, mutualFriendList, get_following, get_followers } = require("../controllers/follow_unfollow");
const { checkSession } = require("../middlewares/checkAuth");
const { checkRequestBodyParams, validateRequest, checkParam, checkQuery } = require("../middlewares/validator");
const router = express.Router();

router.post('/follow',
            checkSession,
            checkRequestBodyParams('type').isIn(['1', '0']),
            checkRequestBodyParams('user_id'),
            checkRequestBodyParams('following_id'),
            validateRequest,
            createFollow
            )

router.get('/mutuals',
            checkSession,
            checkQuery('id'),
            checkQuery('uid'),
            validateRequest,
            mutualFriendList
            )

router.get('/get_following',
            checkSession,
            checkQuery('id'),
            checkQuery('uid'),
            validateRequest,
            get_following
            )

router.get('/get_followers',
            checkSession,
            checkQuery('id'),
            checkQuery('uid'),
            validateRequest,
            get_followers
            )

module.exports = router