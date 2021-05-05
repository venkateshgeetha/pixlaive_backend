const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({

    username : {
        type : String
    },
    first_name : {
        type : String
    },
    last_name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    country_code : {
        type : String
    },
    phone : {
        type : Number
    },
    otp : {
        type : String
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