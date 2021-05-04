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
    MONGODB_URL: "mongodb+srv://Pixalive_Master:Pixalive_Master@cluster0.ewrhm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
}