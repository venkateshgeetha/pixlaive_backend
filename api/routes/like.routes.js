const express = require("express");
const { add_like } = require("../controllers/like");
const { checkRequestBodyParams,validateRequest } = require("../middlewares/validator");
const router = express.Router();

router.post('/likePost',
            checkRequestBodyParams('post_id'),
            checkRequestBodyParams('user_id'),
            validateRequest,
            add_like
)

module.exports = router