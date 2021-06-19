const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const env = require('./environment');

const bucket   = env.aws_bucket;
const region = env.aws_bucket_region;
const accessKeyId = env.aws_access_id
const secretAccessKey = env.aws_access_key

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

module.exports.uploadFile = function(file){
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = ({
        Bucket : bucket,
        Body : fileStream,
        Key : file.filename
    });
    return s3.upload(uploadParams).promise();
}

module.exports.downloadFile = function(fileKey){
    const downloadFile = {
        Key : fileKey,
        Bucket : 'myjoinowbucket'
    };
    return s3.getObject(downloadFile).createReadStream();
}
