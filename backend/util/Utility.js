const config = require("../config/config");
var jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');
var buffer = require('buffer');
var noImg = config.file_path_start + '/../images/noImg.jpg';
var noPlayerImg = config.file_path_start + '/../images/noImgUser.png';

async function sendResponseData(res, statusCode, success, msg, data) {
  if (success == false) {
    console.log(data);
  }
  return res.status(statusCode).send({
    success: success,
    message: msg,
    response_data: data,
  })
}

async function generateValidationErrorResponse(res, error) {
  // console.log("error",error);
  if (error.name == 'ValidationError') {
    const errorArr = error.errors;
    var errorData = {};
    for (const [key, value] of Object.entries(errorArr)) {
      var errMsg = value.message.replace(/Path|`/g, '');
      errMsg = errMsg.replace('_', ' ').trim();
      errorData[key] = errMsg[0].toUpperCase() + errMsg.slice(1);;
    }
   // console.log(errorData);
    sendResponseData(res, 200, false, "Validation Error.", errorData);

  }

  //for unique validation error msg
  //  else if(error.name === 'MongoError' && error.code === 11000){
  //  let errMsg = Object.keys(error.keyValue)[0] + " already exists.";
  //  sendResponseData(res, 200, false, errMsg, error);

  //  }
  else {
    sendResponseData(res, 200, false, "Error", error);

  }
}

async function generateToken(_id) {
  let payload = { user_id: _id };
  const newToken = jwt.sign(payload, config.secretKey, { expiresIn: "5h" });
  return newToken;
}

exports.getImageExtension = (filePath) => {
  const extension = filePath.substr(filePath.lastIndexOf('.') + 1) || '';
  if (['jpg', 'jpeg', 'png', 'pdf'].includes(extension.toLowerCase())) {
    return extension.toLowerCase();
  }
  return extension;
}


async function fileUpload(req, uploadPath, prefix) {
  let tempPath = req.path;
  let originalFilename = (req.originalFilename).replace(/ /g, "_");
  const fileNamePath = `${uploadPath}/${prefix}_${Date.now()}_${originalFilename}`;
  let dirCreate = `public/uploads/${uploadPath}`;

  let targetPath = `public/uploads/${fileNamePath}`;
  // reqFiles.mv(config.uploadImagePath + filePath)
  let check = fs.existsSync(dirCreate);
  // console.log(check);
  if (check) {
    fs.copyFileSync(tempPath, targetPath);
  }
  else {
    fs.mkdirSync(dirCreate);
    fs.copyFileSync(tempPath, targetPath);
  }
  // fs.copyFileSync(tempPath, targetPath);

  return fileNamePath;
}


function getFilePath(fileName, dir = '', type = '') {
  // console.log(type, fileName);
  var dir = (dir == '') ? '' : dir + '/';
  const filePath = __dirname + '/../public/uploads/' + dir + fileName;

  if (fileName != '' && fileName != undefined && filePath && fs.existsSync(filePath)) {
    var pathName = `${config.file_path_start}/${dir}${fileName}`;
    return pathName;
  } else {
    // console.log();
    if (type == 'player') {
      return noPlayerImg;
    } else {
      return noImg;
    }
  }

}

// function getFilePath(fileName){
//   // console.log("fileName", fileName);
//   if(fileName == '' || fileName == undefined){
//     return "";
//   }else{
//     var pathName = `${config.file_path_start}/${fileName}`;
//     return pathName;
//   }
// }


function deleteFile(dirName, filename) {
  const deleteFilePath = __dirname + '/../public/uploads/' + dirName + '/' + filename;
  if (deleteFilePath && fs.existsSync(deleteFilePath)) {
    return fs.unlinkSync(deleteFilePath);
  } else {
    return '';
  }
}



function decode_base64_img(base64str, dirName, filename) {
  try {
    deleteFile(dirName, filename);
    var buf = Buffer.from(base64str, 'base64');
    fs.writeFile(path.join(__dirname, '/../public/uploads/' + dirName + '/', filename), buf, function (error) {
      if (error) {
        throw error;
      } else {
        console.log('File created from base64 string!');
        return true;
      }
    });
  } catch (error) {
    return false;
  }
}

module.exports = {
  sendResponseData,
  generateValidationErrorResponse,
  generateToken,
  fileUpload,
  getFilePath,
  deleteFile,
  decode_base64_img,
}