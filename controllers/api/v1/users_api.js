const User = require('../../../user');
const jwt = require('jsonwebtoken');


module.exports.createUserSession = async function(req, res){

    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid Username/Password"
            });
        }
        return res.json(200, {
            message: "Signed in successfully , here is ur token keep it safe",
            data : {
                token: jwt.sign(user.toJSON(),'joinow', {expiresIn: '100000000'}) 
            }
        });

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: "Internal server error"
        });
    }

}
