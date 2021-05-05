const moment = require('moment');
const { now } = require('mongoose');
const Users = require('../models/Users');

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