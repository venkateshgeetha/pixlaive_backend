const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  body: {
    type: String,
  },
  user_id: {
    type: String,
  },
  Url: {
    type: String,
  },
  created_at: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postSchema);
