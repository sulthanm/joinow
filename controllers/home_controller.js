module.exports.homePage = function(req, res){
    return res.render('home',{
        title: "homepage"
    });
}