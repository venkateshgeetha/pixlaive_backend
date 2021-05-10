const mongoose = require("mongoose");

const follow_unfollow = new mongoose.Schema({
  followerId: {
    type: String,
  },
  followingId: {
      type: String
  },
  status: {
    type: Number, 
    default:0 
  },
  created_at: {
    type: Date
  },
});

module.exports = mongoose.model("follow_unfollows", follow_unfollow);
