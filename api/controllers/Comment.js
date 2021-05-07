const commentSchema = require("../models/comments");
const postSchema = require("../models/Post");
const notificationSchema = require("../models/Notification");

// ************create comment*******************

exports.add_comment = async (req, res, next) => {
  try {
    //    get id and comment
    var { user_id, comment, post_id } = req.body;
    if (id == undefined) {
      return res.json({
        success: false,
        message: "Invalid post id",
      });
    }

    // create document for user in db
    const updateComment = commentSchema({
      post_id: post_id,
      user_id: user_id,
      comment: comment,
      created_at: new Date(),
    });
    const saveData = await updateComment.save();

    if (saveData) {
      const userPost = await postSchema.findOne({ _id: post_id });
      if (userPost) {
        if (user_id != userPost.user_id) {
          const updateNotification = notificationSchema({
            sender_id: user_id,
            receiver_id: userPost.user_id,
            post_id: post_id,
            type: 1,
            seen: 0,
          });
          const saveNotificationData = await updateNotification.save();
          if (saveNotificationData) {
            sendNotification(user_id, userPost.user_id, 1);
            return res.json({
              success: true,
              message: "Comment added",
            });
          }
        } else {
          return res.json({
            success: true,
            message: "Comment added",
          });
        }
      } else {
      }
    } else {
      return res.json({
        success: true,
        message: "Comment added",
      });
    }
  } catch (error) {
    //  if error through error message
    return res.json({
      success: false,
      message: "Error adding Comment" + error,
    });
  }
};

function sendNotification(sender, receiver, type) {
  var message;
  var title;

  if (type == 0) {
    title = "New like";
    message = " liked your post";
  } else if (type == 1) {
    title = "New comment";
    message = " commented on your post";
  } else {
    title = "New follow";
    message = " started following you";
  }
}
