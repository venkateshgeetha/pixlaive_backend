const postSchema = require("../models/Post");

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

    if (saveData) 
    {
      return res.json({
        success: true,
        message: "Post added",
      });
    } 
    else 
    {
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

exports.search_user = async (req, res, next) => {};
