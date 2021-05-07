const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({

    username : {
        type : String,
        default : ''
    },
    first_name : {
        type : String,
        default : ''
    },
    last_name : {
        type : String,
        default : ''
    },
    email : {
        type : String,
        default : ''
    },
    password : {
        type : String,
        default : ''
    },
    country_code : {
        type : String,
        default : ''
    },
    phone : {
        type : String,
        default : ''
    },
    otp : {
        type : String,
        default : ''
    },
    otp_verified  : {
        type : Boolean,
        default : false
    },
    otpExpirationTime : {
        type : String
    },
    gcm_token : {
        type : String
    },
    avatar : {
        type : String
    },
    created_At : {
        type : Date
    },
    updated_At : {
        type : Date
    }
});

module.exports = mongoose.model("users",user_schema)