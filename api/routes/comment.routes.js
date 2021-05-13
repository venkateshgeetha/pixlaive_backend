const express = require("express");
const router = express.Router();
const {
  checkRequestBodyParams,
  validateRequest,
} = require("../middlewares/validator");

const { add_comment } = require("../controllers/Comment");

router.post("/comment", userValidationRules("comment"), validate, add_comment);

router.get("/getpost_comments", getPost_comments);

router.get("/delete_comment", delete_comment);
