'use strict';
var AWS = require('aws-sdk');
var config = new AWS.Config({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});
var s3 = new AWS.S3(config);

module.exports.listObjects = (event, context, callback) => {
  listAllKeys(null, null);
  
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Request submitted successfully!',
      input: event,
    }),
  };
  callback(null, response);
  
}

var allKeys = [];
function listAllKeys(token, cb) {
  var opts = { Bucket: process.env.bucketName, MaxKeys: 10 };
  if (token) opts.ContinuationToken = token;

  s3.listObjectsV2(opts, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      allKeys = allKeys.concat(data.Contents);

      if (data.IsTruncated)
        listAllKeys(data.NextContinuationToken, cb);
      else {
        console.log(allKeys);
        for (var val of allKeys) {
          console.log(val.Key)
        }
      }
    }

  });
}

//Global function
listAllKeys(null, null);
