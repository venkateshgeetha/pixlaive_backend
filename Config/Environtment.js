const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
 
const ENVIRONMENT = process.env.NODE_ENV;

if(ENVIRONMENT)
{
    if (fs.existsSync(path.join(process.cwd(), '/.env'))) {
        dotenv.config({ path: ".env" });
    } else {
        process.exit(1);
    }
}

module.exports.SERVER = {
    MONGODB_URL: "mongodb+srv://pixalive:pixalive@123@cluster0.qbopx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    // MONGODB_URL: "mongodb://localhost:27017/pixalive_db"
}