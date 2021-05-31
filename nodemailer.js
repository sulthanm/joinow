const nodemailer = require('nodemailer');
const eje = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "sulthanmogal6129@gmail.com", // generated ethereal user
      pass: "Sulthan7866129$" // generated ethereal password
    },
  });


let renderTemplate = (data, relativePath) =>{
    let mailHTML;
    eje.renderFile(
        path.join(__dirname,'./views/mailers', relativePath),
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