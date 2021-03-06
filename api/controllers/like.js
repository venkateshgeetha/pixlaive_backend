const Like = require('../models/like');
const Post = require('../models/Post');

exports.add_like = async (req, res, next) => {

    try {
      let { user_id, post_id } = req.body; 
        if(req.body.type == 1)
        {
          //Update like
          const updateLike = new Like({
          post_id: post_id,
          user_id: user_id,
          isLike : 1,
          created_at: Date.now(),
          });
          const saveData = await updateLike.save();
          if(saveData){
              //update likeCount
              const updateLikeCount = await Post.updateOne(
                      {_id : post_id},
                      {$inc : {likeCount :1}},
                      {new :true}
              );
              if(updateLikeCount)
              {
                  return res.json({
                      success: true,
                      message:"Like Added successfully"
                  })
              }
              else
              {
                  return res.json({
                      success:false,
                      message:"Error In liking Post"
                  })
              }
          }
        else
        {
          return res.json({
            success:false,
            message:"Error In liking Post"
          })
        } 
        }
        else if(req.body.type == 0)
        {
          //deleteLike
          const deleteLike = await Like.findOneAndDelete({
            post_id: post_id,
            user_id: user_id,
          });
          if(deleteLike)
          {
            //update likeCount
            const updateLikeCount = await Post.updateOne(
              {_id : post_id},
              {$inc : {likeCount : -1}},
              {new :true}
          );
          if(updateLikeCount)
          {
              return res.json({
                  success: true,
                  message:"unlike successfully"
              })
          }
          }

        }
    } 
    catch (error) {
        return res.json({
            success:false,
            message:"Error occured"+error
          })
    }
    
    }