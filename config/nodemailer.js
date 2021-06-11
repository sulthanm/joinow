const nodemailer = require('nodemailer');
const eje = require('ejs');
const path = require('path');
const env = require('./environment');

let transporter = nodemailer.createTransport(env.smtp);


let renderTemplate = (data, relativePath) =>{
    let mailHTML;
    eje.renderFile(
        path.join(__dirname,'../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log("Error in rendering template",err);
                return;
            }
            mailHTML = template;
        }
    );
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}