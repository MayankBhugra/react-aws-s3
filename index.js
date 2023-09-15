const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

let S3_BUCKET;
let REGION;
let accessKeyId;
let secretAccessKey;

function setCredentials(bucketName, region, accessKey, secretAccesskey) {
  S3_BUCKET = bucketName;
  REGION = region;
  accessKeyId = accessKey;
  secretAccessKey = secretAccesskey;
}

async function ReactAWSS3(file) {
  AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  });
  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const params = {
    Bucket: S3_BUCKET,
    Key: file.name, // file directory -> basePath/uuid/filename
    Body: file,
    //file name Variable
  };

  var upload = s3
    .putObject(params)
    .on("httpUploadProgress", (evt) => {
      // File uploading progress
      console.log(
        "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
      );
    })
    .promise();
  try {
    await upload.then((err, data) => {
      // Fille successfully uploaded
      alert("File uploaded successfully.");
    });
  } catch (err) {
    console.log("Something went Wrong");
  }
}
module.exports = { ReactAWSS3, setCredentials };
