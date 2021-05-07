const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: {
    type: String,
    default : ''
  },
  body: {
    type: String,
    default: ''
  },
  user_id: {
    type: String,
    default : ''
  },
  url: {
    type: String,
    default : ''
  },
  created_at: {
    type: String,
  },
});

module.exports = mongoose.model("Posts", postSchema);
