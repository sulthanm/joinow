module.exports.homePage = function(req, res){
    console.log(req.cookies);
    res.cookie('kkk', 333);
    return res.render('home',{
        title: "homepage"
    });
}