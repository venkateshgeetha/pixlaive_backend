const postSchema = require("../models/Post");

exports.create_post = async (req, res, next) => {
  try {
    var { image, body, thumbnail, user_id } = req.body;
    const updateFavourtie = postSchema({
      thumbnail: thumbnail,
      image: image,
      body: body,
      user_id: user_id,
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
  const id = req.params.id;
  console.log(id);
};

exports.delete_post = async (req, res, next) => {};
