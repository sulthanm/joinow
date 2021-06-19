const fs= require('fs');
const rfs = require("rotating-file-stream");
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("file.log", {
 
  interval: "1d", // rotate daily
  path : logDirectory
  
});

const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie : 'blahsomthing',
    db : 'joinow_development',
    smtp : {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "sulthanmogal6129@gmail.com", // generated ethereal user
          pass: "Sulthan7866129$" // generated ethereal password
        },
    },
    google_client_ID : "414960248057-0brsgn8l01pd68ebopr96kn3538r7ktl.apps.googleusercontent.com",
    google_client_secret : "spNui9dUa4hGsZy2wTeW0li9",
    google_callback_URL : "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'joinow',
    morgan : {
        mode : 'dev',
        options : {stream:accessLogStream}
    },
    aws_bucket : 'myjoinowbucket',
    aws_bucket_region : 'us-east-2',
    aws_access_id : 'AKIAQ2JGIAHHHQQXNFXL',
    aws_access_key : 'pIGlznVzlMjqNW12ggABQfZKyGwSqaXZD9VdSWxV'
}

const production = {
    name : 'production',
    asset_path : process.env.JOINOW_PROD_ASSET_PATH,
    session_cookie : process.env.JOINOW_PROD_SESSION_COOKIE,
    db : process.env.JOINOW_PROD_DB,
    smtp : {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.JOINOW_PROD_USERNAME, // generated ethereal user
          pass: process.env.JOINOW_PROD_PASSWORD // generated ethereal password
        },
    },
    google_client_ID : process.env.JOINOW_PROD_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.JOINOW_PROD_GOOGLE_CLIENT_SECRET,
    google_callback_URL : process.env.JOINOW_PROD_GOOGLE_CALLBACK_URL,
    jwt_secret : process.env.JOINOW_PROD_GOOGLE_JWT_SECRET,
    morgan : {
      mode : 'combined',
      options : {stream:accessLogStream}
  }
}

module.exports = eval(process.env.JOINOW_PROD_ENVIRONMENT) == undefined ? development : eval(process.env.JOINOW_PROD_ENVIRONMENT);

