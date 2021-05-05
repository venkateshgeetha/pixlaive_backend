
exports.signup = (req,res,next) => {
    console.log("signup");
    try{
        return res.send(req.body);
    }

    catch(error)
    {
        return res.send(error);
    }
}