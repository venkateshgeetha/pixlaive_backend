const postSchema = require("../models/Post");

// ************* Create post Using user_Id ***************//

exports.create_post = async (req, res, next) => {
  console.log(process.env.JWT_KEY);
  try {
    let { image, body, thumbnail, user_id } = req.body;
    const updateFavourtie = new postSchema({
      thumbnail: thumbnail,
      image: image,
      body: body,
      user_id: user_id,
      created_at: new Date(),
    });

    const saveData = await updateFavourtie.save();

    if (saveData) {
      return res.json({
        success: true,
        message: "Post added",
      });
    } else {
      return res.json({
        success: false,
        message: "Error adding post",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Error adding post",
    });
  }
};

// ************* Get post Using Post_id ***************//

exports.get_post = async (req, res, next) => {
  console.log("enter");
  try {
    const post_id = req.params.post_id;
    console.log(post_id);

    if (post_id == undefined) {
      return res.json({
        success: false,
        message: "Please insert post id!",
      });
    }

    const userPost = await postSchema.findOne({ _id: post_id });
    console.log(userPost);
    if (userPost) {
      return res.json({
        success: true,
        post: userPost,
      });
    } else {
      return res.json({
        success: false,
        message: "Error occured! ",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Error occured! " + error,
    });
  }
};

// ************* Get all post of the user Using user_Id ***************//

exports.user_posts = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    console.log(user_id);

    if (user_id == undefined) {
      return res.json({
        success: false,
        message: "Please insert user id!",
      });
    }

    const userPost = await postSchema.find({ user_id: user_id });
    console.log(userPost);
    if (userPost) {
      return res.json({
        success: true,
        post: userPost,
      });
    } else {
      return res.json({
        success: false,
        message: "Error occured! ",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Error occured! " + error,
    });
  }
};

// ************* delete post Using post_ID ***************//

exports.delete_post = async (req, res, next) => {
  console.log(req.body);
  try {
    const post_id = req.body.post_id;
    console.log(post_id);

    if (post_id == undefined) {
      return res.json({
        success: false,
        message: "Please insert post id!",
      });
    }

    const userPost = await postSchema.findOneAndDelete({ _id: post_id });
    console.log(userPost);
    if (userPost) {
      return res.json({
        success: true,
        message: "Post Removed Successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Error occured! ",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Error occured! " + error,
    });
  }
};

// Get user feeds using user_id and fix offset

exports.feeds = async (req, res, next) => {
  try {
    var { offset, user_id } = req.query;
    var row = 20;
    const get_userfeeds = await (await postSchema.find({ user_id: user_id }))
      .reverse()
      .splice(offset == undefined ? 0 : offset, row);
    return res.json({
      success: true,
      feeds: get_userfeeds,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error occured! " + error,
    });
  }
};

// ************* get all feed of all users ***********//
exports.all_feeds = async (req, res, next) => {
  try {
    var { offset } = req.query;
    var row = 20;

    const all_feeds = await postSchema
      .find()
      .reverse()
      .splice(offset == undefined ? 0 : offset, row);
    return res.json({
      success: true,
      feeds: all_feeds,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error occured! " + error,
    });
  }
};
exports.search_user = async (req, res, next) => {
  try {
    const search = req.query.search_word;
    var reg = new RegExp(search);
    const all_feeds = await userSchema.find({
      $or: [{ username: reg }, { first_name: reg }, { email: reg }],
    });
    console.log(all_feeds);

    const user_id = req.query.user_id;
    const data_follower = await followSchema.distinct("followingId", {
      followerId: user_id,
    });
    const data_following = await followSchema.distinct("followerId", {
      followingId: user_id,
    });
    var array3 = data_follower.concat(data_following);
    var uniq_id = [...new Set(array3)];
    console.log(uniq_id);

    all_feeds.forEach((data) => {
      uniq_id.forEach((main_data) => {
        if (main_data == data.user_id) {
          data.follow = true;
          console.log(data);
        }
      });
    });
    return res.json({
      success: true,
      feeds: all_feeds,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error occured! " + error,
    });
  }
};

// sort by date
function sortFunction(a, b) {
  var dateA = new Date(a.date).getTime();
  var dateB = new Date(b.date).getTime();
  return dateA > dateB ? 1 : -1;
}
