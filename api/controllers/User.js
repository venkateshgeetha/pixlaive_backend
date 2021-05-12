const moment = require('moment');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const { SendEmailVerificationLink } = require('../helpers/UniversalFunctions');
const jwt = require('jsonwebtoken');

//signup
exports.signup = async(req,res,next) => {
    
    try {
        let { username, email, password, confirm_password, phone, first_name, last_name, avatar } = req.body;
        if (password != confirm_password) {
            return res.json({
                success: false,
                message: 'Passwords must be the same!'
            });
        }

        const userInfo = await Users.findOne({
            $or : [
                {username : username},{email : email},{phone : phone}
            ]
        });

        if(userInfo)
        {
            if(username.toLowerCase() == userInfo.username.toLowerCase())
            {
                return res.json({
                    success: false,
                    message: 'Username taken!'
                });
            }
            else if(email == userInfo.email)
            {
                return res.json({
                    success: false,
                    message: 'Email already regitered!'
                });
            }
            else if(phone == userInfo.phone)
            {
                return res.json({
                    success: false,
                    message: 'Phone number already regitered!'
                });
            }
        }
        else
        {
            let otp = Math.floor(1000 + Math.random() * 9000);
            let otpExpirationTime = moment().add(5, 'm');
            console.log(otp);
            console.log(otpExpirationTime);
            let userData = {
                username : username,
                email : email,
                password: bcrypt.hashSync(password, 12),
                country_code: '+91',
                phone : phone,
                first_name : first_name,
                last_name : last_name,
                avatar : avatar,
                otp: otp,
                otp_verified: false,
                otpExpirationTime: otpExpirationTime.toISOString(),
                gcm_token: '',
                created_At : Date.now()
            };

            const data = new Users(userData);            
            const saveData = await data.save();
            if(saveData)
            {
                SendEmailVerificationLink(otp,req,saveData);
                return res.json({
                    success: true,
                    message: 'OTP sent successfully to your email'
                });
            }
            else
            {
                return res.json({
                    success: false,
                    message: 'Error occured!'
                });
            }
        } 
    }
    catch (error) {
        return res.json({
            success: false,
            message: 'Error occured!'
        });
    }

        
}

//otpVerify
exports.verifyOtp = async(req,res,next) => {

    try {
        let {user_id,otp} = req.body;
        //getUserInfo
        const getUserInfo = await Users.findById({_id : user_id});
        console.log(getUserInfo);
        let otpExpirationTime = getUserInfo.otpExpirationTime;
        console.log(otpExpirationTime);
        if(moment().isBefore(otpExpirationTime, 'second'))
        {
            console.log('inside time');
            if(otp == getUserInfo.otp)
            {
                console.log('inside otp');
                const updateData = await Users.findByIdAndUpdate(
                    {_id:user_id},
                    {
                        $set : {
                            otp : '',
                            otp_verified : true,
                            otpExpirationTime : ''
                        }
                    },
                    {new : true}
                );
                if(updateData)
                {
                    return res.json({
                        success: true,
                        message: 'Account registered successfully!'
                    });
                }
                else
                {
                    return res.json({
                        success: false,
                        message: 'Error occured!'
                    }); 
                }
            }
            else
            {
                return res.json({
                    success: false,
                    message: 'Entered OTP is incorrect'
                });
            }
        }
        else
        {
            return res.json({
                success: false,
                message: 'Entered OTP has been expired'
            });
        }

    } 
    catch (error) {
        return res.json({
            success: false,
            message: 'Error occured!'
        });
    }
}

//resendOtp
exports.resendotp = async(req,res,next) => {

    try 
    {
        let {user_id} = req.body;
        let otp = Math.floor(1000 + Math.random() * 9000);
        let otpExpirationTime = moment().add(5, 'm');
        console.log(otpExpirationTime);
        //findUserAndUpdate
        const findUserAndUpdate  = await Users.findByIdAndUpdate(
            {_id : user_id},
            {
                $set : {
                    otp : otp,
                    otpExpirationTime : otpExpirationTime.toISOString()
                }
            },
            {new : true}
        );
        if(findUserAndUpdate)
        {
            SendEmailVerificationLink(otp,req,findUserAndUpdate);
            return res.json({
                success: true,
                message: 'New OTP sent successfully to your email'
            });
        }     
        else
        {
            return res.json({
                success: false,
                message: 'Error occured!'
            });
        }
    } 
    catch (error) {
        return res.json({
            success: false,
            message: 'Error occured!'
        });
    }
}

//facebook_signin
exports.facebook_sign = async(req,res,next) => {
    
    try {
        let { username, email, password, confirm_password, phone, first_name, last_name, avatar } = req.body;
        if (password != confirm_password) {
            return res.json({
                success: false,
                message: 'Passwords must be the same!'
            });
        }

        const userInfo = await Users.findOne({
            $or : [
                {username : username},{email : email},{phone : phone}
            ]
        });
        console.log(userInfo);
        if(userInfo)
        {
            if(username.toLowerCase() == userInfo.username.toLowerCase())
            {
                return res.json({
                    success: false,
                    message: 'Username taken!'
                });
            }
            else if(email == userInfo.email)
            {
                return res.json({
                    success: false,
                    message: 'Email already regitered!'
                });
            }
            else if(phone == userInfo.phone)
            {
                return res.json({
                    success: false,
                    message: 'Phone number already regitered!'
                });
            }
        }
        else
        {
            let userData = {
                username : username,
                email : email,
                password: bcrypt.hashSync(password, 12),
                country_code: '+91',
                phone : phone,
                first_name : first_name,
                last_name : last_name,
                otp_verified : true,
                avatar : avatar,
                gcm_token: '',
                created_At : Date.now(),
                facebook_signin : true
            };

            const data = new Users(userData);            
            const saveData = await data.save();
            if(saveData)
            {
                return res.json({
                    success: true,
                    message: 'Account registered! You can now login from same email.'
                });
            }
            else
            {
                return res.json({
                    success: false,
                    message: 'Error occured!'
                });
            }
        } 
    }
    catch (error) {
        return res.json({
            success: false,
            message: 'Error occured!'
        });
    }

        
}

//login
exports.login = async (req, res, next) => {

    try {
        let { email, password } = req.body;
        const data = await Users.findOne({ email, otp_verified: true }).exec();
        console.log(data);
        if (data) 
        {
            const matched = await bcrypt.compare(password,data.password);
            if(!matched)
            {
                return res.json({
                    success: false,
                    message: "Invalid credentials!", })
            }
            else
            {
                const payload = {
                    user: {
                        id: data._id
                    }
                };
                const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "90d" });
                if (token) 
                {
                    console.log(token)
                    return res.json({ 
                        success : true,
                        result : {data,token: token},
                        message: "you have logged in successfully",
                     })
                }
            }
            
        }
        else
        {
        return res.json({
             success: false,
             message: "you are not registered with us!", })
        }

    } catch (error) {
        return res.json({
            success: false,
            message: 'Error occured!'
        });
    }

}

//changePassword
exports.changepassword = async (req, res, next) => {
    
    try {
        console.log('cp');
        const { oldpassword, newpassword, confirmpassword, user_id } = req.body;
        //getUserInfo
        const getUserInfo = await Users.findById({ _id: user_id });
        const matched = await bcrypt.compare(oldpassword,getUserInfo.password);

        if (!matched) 
        {
            return res.json({
                success: false,
                message: "old password is incorrect", })
        }
        else
        {
            if (newpassword == confirmpassword) 
            {
                const data = await Users.findByIdAndUpdate({ _id: user_id },
                    {
                        $set: {password:bcrypt.hashSync(newpassword , 12)}
                    },
                    {new:true}
                );
                if(data)
                {
                    return res.json({
                        success: true,
                        message: "Password successfully changed!", })
                }
                else
                {
                    return res.json({
                        success: false,
                        message: "Error occured!", })
                }
            }
            else 
            {
                return res.json({
                    success: false,
                    message: "Passwords are doesn't matched", })
            } 
        }

    } catch (error) {
        return res.json({
            success: false,
            message: 'Error occured!'
        });
    }
}

//Get user info
exports.user_info = async (req,res,next) => {
    console.log(req.params);
    try {       
        const getUserInfo = await Users.findById({_id:req.params.id});
        console.log(getUserInfo);
        if(getUserInfo)
        {
            return res.json({
                success:true,
                message:"successfully fetched user information"
            })
        }
        else
        {
            return res.json({
                success:false,
                message:"User not found"
            });
        }
    }
    catch(error){
            return res.json({
                success:false,
                message:"Error Occured!!!" + error,
            })
        }
}

//is_user
exports.is_user = async(req,res,next)=>{

    try 
    {
        const getUserData = await Users.findOne({phone:req.body.phone});
        console.log(getUserData);
        if(getUserData)
        {
            return res.json({
                success:true,
                message:"successfully fetched user information"
            })
        }
        else
        {
            return res.json({
                success:false,
                message:"User not found"
            });
        }
    } 
    catch (error) {
        return res.json({
            success:false,
            message:"Error Occured!!!" + error,
        })
    }
}

exports.updateProfile = async(req,res,next) => {

    try 
    {
       let user_id = req.body.user_id;
       let editData = {};
       editData = req.body;
       editData['updated_At'] = Date.now();
       console.log("editData",editData);
       const updateData = await Users.findByIdAndUpdate(
           {_id:user_id},
           {
               $set:editData
           },
           {new:true}
       );
       if(updateData)
       {
        return res.json({
            success:true,
            result : updateData,
            message:"Profile updated successfully"
        }) 
       }
       else
       {
        return res.json({
            success:false,
            message:"Error occured"+error
        })
       }
    }
    catch (error) 
    {
        return res.json({
            success:false,
            message:"Error occured"+error
        })
    }
}

exports.forgotpassword = async(req,res,next)=>{
    try
    {
    
        let email = req.body.email;        
        let getUserInfo = await Users.findOne({email:email});
        if (getUserInfo) 
        {
            let otp = Math.floor(1000 + Math.random() * 9000);
            let otpExpirationTime = moment().add(5, 'm');
            const payload = {
                user: {
                    id: getUserInfo._id
                }
            };
            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "10m" });
            
            const data = await Users.findOneAndUpdate({ email: req.body.email},
                            {
                                $set: {
                                    otp:otp,
                                    otpExpirationTime:otpExpirationTime.toISOString(),
                                    passwordResetToken:token
                                }
                            },{new:true}
                        );
            if(data)    
            {
                SendEmailVerificationLink(otp,req,data);
                return res.json({
                    success: true,
                    passwordResetToken: data.passwordResetToken,
                    message: 'OTP has been sent successfully'
                })
            } 
            else
            {
                return res.json({
                    success:false,
                    message:"user not found"
                })
            }                          
        }
        else
        {
            return res.json({
                success:false,
                message:"Error occured"+error
            })
        }               
    }
    catch(error)
    {
        return res.json({
            success:false,
            message:"Error occured"+error
        })
    }
}

exports.resetpassword = async(req,res,next)=>{
    try
    {
        let {token,password,confirmPassword}=req.body;
        let user_id = req.body.user_id;
        const getUserInfo = await Users.findById({ _id: user_id });
        
        if (getUserInfo.passwordResetToken == token) 
        {
            if (password == confirmPassword) 
            {
                const passwordUpdate = await Users.findByIdAndUpdate({ _id: user_id },
                    {
                        $set: {
                            password: bcrypt.hashSync(password, 12),
                            passwordResetToken: ''
                        }
                    },{new:true}
                );
                if(passwordUpdate)
                {
                    return res.json({
                        success:true,
                        message:"Password changed successfully"
                    }) 
                }
                else
                {
                    return res.json({
                        success:false,
                        message:"Error occured"+error
                    })
                }
            }
            else 
            {
                return res.json({
                    success:false,
                    message:"password must be the same"
                })
            }
        }
        else 
        {
            return res.json({
                success:false,
                message:"Token mismatching"
            })
        }
    }
    catch(error){
        return res.json({
            success:false,
            message:"Error occured"+error
        })
    }
}
