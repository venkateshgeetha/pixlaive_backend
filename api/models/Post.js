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
  url: {
    type: String,
  },
  created_at: {
    type: String,
  },
});

module.exports = mongoose.model("Posts", postSchema);
