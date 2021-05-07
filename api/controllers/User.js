const moment = require('moment');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const { SendEmailVerificationLink } = require('../helpers/UniversalFunctions');


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