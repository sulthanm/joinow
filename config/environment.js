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
    asset_path : './assets/',
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
    }
}

const production = {
    name : 'production',
    asset_path : process.env.joinow_pro_asset_path,
    session_cookie : process.env.joinow_pro_session_cookie,
    db : process.env.joinow_pro_db,
    smtp : {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.joinow_pro_username, // generated ethereal user
          pass: process.env.joinow_pro_password // generated ethereal password
        },
    },
    google_client_ID : process.env.joinow_pro_google_client_ID,
    google_client_secret : process.env.joinow_pro_google_client_secret,
    google_callback_URL : process.env.joinow_pro_google_callback_URL,
    jwt_secret : process.env.joinow_pro_jwt_secret,
    morgan : {
      mode : 'combined',
      options : {stream:accessLogStream}
  }
}

module.exports = eval(process.env.joinow_pro_environment) == undefined ? development : eval(process.env.joinow_pro_environment);

//eval(process.env.joinow_pro_environment) == undefined ? development : eval(process.env.joinow_pro_environment);