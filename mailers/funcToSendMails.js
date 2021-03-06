const nodemailer = require('../config/nodemailer');

exports.sendMailForCreatingComment = function newComment(comment){
  
    let htmlString = nodemailer.renderTemplate({
        comment : comment
    }, '/comments/new_comment.ejs')
    nodemailer.transporter.sendMail({
        from: "sulthanmogal6129@gmail.com",
        to: comment.user.email,
        subject: "New Comment",
        html: htmlString
    },(err, info) => {
        
        if(err){
            console.log("Error in sending mail",err);return;
        }
        // console.log("Message sent",info);
        return;
    });
}

exports.sendMailForCreatingPost  = function newPost(post){
    // console.log("inmsdie sendMail");

    nodemailer.transporter.sendMail({
        from: "sulthanmogal6129@gmail.com",
        to: post.userss.email,
        subject: "New Post",
        html: "<h1> Yup your Post is now published</h1>"
    },(err, info) => {
        
        if(err){
            console.log("Error in sending mail",err);return;
        }
        // console.log("Message sent",info);
        return;
    });
}