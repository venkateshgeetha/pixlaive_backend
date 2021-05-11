const express = require("express");
const router = express.Router();
const {
  checkRequestBodyParams,
  validateRequest,
} = require("../middlewares/validator");

const {
  create_post,
  get_post,
  user_posts,
  delete_post,
  search_user,
  feeds,
  all_feeds,
} = require("../controllers/Post");

router.post(
  "/post",
  checkRequestBodyParams("user_id"),
  validateRequest,
  create_post
);

// Get post by id
router.get("/post/:post_id", get_post);

// Get user posts
router.get("/posts/:user_id/", user_posts);

// Delete user Post
router.post("/delete_post", delete_post);

// get single user feed

router.get("/feeds", feeds);

// Get feed posts

router.get("/all_feeds", all_feeds);

// Search posts auto complete
router.get("/search_post", search_user);

module.exports = router;
