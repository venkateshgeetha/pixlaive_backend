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

exports.mutualFriendList = async(req,res,next)=> {
    
    try 
    {
        let user_id = req.query.uid;
        let id = req.query.id
        
        //getFollowingIdByUserid
        let getFollowingIdByUserid = await follow_unfollow.distinct('followingId',{followerId:user_id});
        //getFollowerIdByUserid
        let getFollowerIdByUserid = await follow_unfollow.distinct('followerId',{followingId:user_id});
        let a = getFollowingIdByUserid.concat(getFollowerIdByUserid);
        let totalIdByUserid = a.map(String);
        //getFollowingIdByid
        let getFollowingIdByid = await follow_unfollow.distinct('followingId',{followerId:id});
        // getFollowerIdByid
        let getFollowerIdByid = await follow_unfollow.distinct('followerId',{followingId:id});
        let b = getFollowingIdByid.concat(getFollowerIdByid);
        let totalIdByid = b.map(String);
        //filterData
        const totalUserIdArray = totalIdByUserid.filter(Set.prototype.has, new Set(totalIdByid));
        //getMutualFriendsData
        const getMutualFriendsData = await Users.find({_id : {$in : totalUserIdArray}}).exec();
        if(getMutualFriendsData)
        {
            return res.json({
                success:true,
                result : getMutualFriendsData, 
                message:"Mutual friends fetched successfully"
            }) 
        }
        else
        {
            return res.json({
                success:false,
                message:"Error Occured!!!" + error,
            })
        } 
    } 
    catch (error) {
        return res.json({
            success:false,
            message:"Error Occured!!!" + error,
        })
    }
}