const env =require('./environment');
const fs =require('fs');
const path =require('path');

module.exports = (app) =>{
    app.locals.assetPath =function(filePath){
        if(env.name=='development'){
            // console.log("------------------",filePath);
            return '/'+filePath;
        }
        // console.log(filePath,"fsdujkhbsdkuj",'/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath]);
        console.log("------------------",filePath);
        
        return  '/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];
    }
}