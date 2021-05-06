const postSchema = require("../models/Post");

exports.create_post = async (req, res, next) => {
  console.log(process.env.JWT_KEY);
  try {
    var { image, body, thumbnail, user_id } = req.body;
    const updateFavourtie = postSchema({
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

exports.get_post = async (req, res, next) => {
  console.log("enter");
  try {
    const id = req.params.id;
    console.log(id);

    if (id == undefined) {
      return res.json({
        success: false,
        message: "Please insert post id!",
      });
    }

    const userPost = await postSchema.findOne({ _id: id });
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
    const user_id = req.params.id;
    console.log(user_id);

    if (user_id == undefined) {
      return res.json({
        success: false,
        message: "Please insert post id!",
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
    const id = req.body.id;
    console.log(id);

    if (id == undefined) {
      return res.json({
        success: false,
        message: "Please insert post id!",
      });
    }

    const userPost = await postSchema.findOneAndDelete({ _id: id });
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
