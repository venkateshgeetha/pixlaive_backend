const follow_unfollow = require("../models/follow_unfollow");
const Users = require("../models/Users");

exports.createFollow = async(req,res,next) => {

    try
    {
        let followerId = req.body.user_id;
        let followingId = req.body.following_id;
        console.log(followingId);
        const data = new follow_unfollow({
            followerId : followerId,
            followingId : followingId,
            status : 1,
            created_at : Date.now()
        });
        const saveData = await data.save();
        if(saveData)
        {
            //increase followingCount
            const updateFollowingCount = await Users.updateOne(
                {_id : followerId},
                {$inc : {followingCount : 1}},
                {new : true}
            );
            //increase followerCount
            const updateFollowerCount = await Users.updateOne(
                {_id : followingId},
                {$inc : {followersCount : 1}},
                {new : true}
            );
            if(updateFollowingCount && updateFollowerCount)
            {
                return res.json({
                    success:true,
                    message:"successfully followed"
                })
            }
        }
    }
    catch(error)
    {
        return res.json({
            success:false,
            message:"Error Occured!!!" + error,
        })
    }
}