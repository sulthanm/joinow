const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const env = require('./environment');
const imagemin = require('gulp-imagemin');

const bucket   = env.aws_bucket;
const region = env.aws_bucket_region;
const accessKeyId = env.aws_access_id
const secretAccessKey = env.aws_access_key
// console.log("diofjgdfigjhdiogjoighjihgjfhij", bucket);
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

module.exports.uploadFile = async function(file){
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = ({
        Bucket : bucket,
        Body : fileStream,
        Key : file.filename,
        
    });
    console.log("diofjgdfigjhdiogjoighjihgjfhij", bucket);
   
    return s3.upload(uploadParams).promise();
}

module.exports.downloadFile = function(fileKey){
    const downloadFile = {
        Key : fileKey,
        Bucket : env.aws_bucket
    };
    return s3.getObject(downloadFile).createReadStream();
}
