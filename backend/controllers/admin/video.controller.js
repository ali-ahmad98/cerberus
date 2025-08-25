const Video = require("../../models/video.model");
const { sendResponseData, fileUpload, getFilePath, generateValidationErrorResponse } = require("../../util/Utility");
var multer = require('multer');
 
const upload = multer({ dest: "public/files" });
 
const videoList = async (req, res) => {
    try{
        const videoList = await Video.find().sort({ _id: -1 }); 

        videoList.forEach(element => {
          element.thumbnail_image =  getFilePath(element.thumbnail_image);
          element.video =  getFilePath(element.video);
        });

        sendResponseData(res, 200, true, "Video list", videoList);
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}


const videoAdd = async (req, res) => { 
    try{ 
      var imgFileName = '';
      var videoFileName = '';
      if (req.files) {
        if(req.files.thumbnail_image){
          var imgFile = req.files.thumbnail_image[0];
          imgFileName = await fileUpload(imgFile, 'video', 'thumbnail_image');
        } 
        if(req.files.video){
          var audioFile = req.files.video[0];
          videoFileName = await fileUpload(audioFile, 'video', 'video');
        }
      }

        const newVideo = new Video({
          title: req.body.title,
          sub_title: req.body.sub_title, 
          description: req.body.description, 
          video_view_on: req.body.video_view_on, 
          thumbnail_image: imgFileName, 
          video: videoFileName, 
        });
         
        const videoData = await newVideo.save();
        sendResponseData(res, 200, true, "Video added successfully", videoData);
  }catch(error){
    await generateValidationErrorResponse(res, error);
  }
}


const videoDetails = async (req, res) => {
    const id = req.params.id;
    try{ 
        const videoData = await Video.findOne({ _id: id }); 
        videoData.thumbnail_image =  getFilePath(videoData.thumbnail_image); 
        videoData.video =  getFilePath(videoData.video); 

        sendResponseData(res, 200, true, "Video data", videoData);
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}


const videoUpdate = async (req, res) => {
    const id = req.body.id;
    try{ 
        if (
            !req.body.hasOwnProperty("id") ||
            !req.body.hasOwnProperty("title") ||
            !req.body.hasOwnProperty("sub_title") ||
            !req.body.hasOwnProperty("description")
          ) {
            sendResponseData(res, 200, false, "Input validation failed", {});
          }  
        const rowData = await Video.findOne({ _id: id }); 
          var imgPath = rowData.thumbnail_image;
          var audioPath= rowData.video;

          var imgFileName = imgPath;
          var videoFileName = audioPath;

          if (req.files) {
            if(req.files.thumbnail_image){
              var imgFile = req.files.thumbnail_image[0];
              imgFileName = await fileUpload(imgFile, 'video', 'thumbnail_image');
            } 
            if(req.files.video){
              var videoFile = req.files.video[0];
              videoFileName = await fileUpload(videoFile, 'video', 'video');
            }       
          }

 
        const videoData = {
          title: req.body.title,
          sub_title: req.body.sub_title, 
          description: req.body.description, 
          thumbnail_image: imgFileName, 
          video: videoFileName, 
          video_view_on: req.body.video_view_on, 
        }
        
        const updateData = await Video.updateOne({ _id: id }, videoData, { runValidators: true }); 
        sendResponseData(res, 200, true, "Video updated successfully", updateData);
  }catch(error){
    await generateValidationErrorResponse(res, error);
  }
}


const videoUpdateStatus = async (req, res) => {
  const id = req.params.id;
  try{ 
      const videoData = await Video.findOne({ _id: id }); 
      if(videoData){
        const updateDataField = {
          status: !videoData.status,
        }
        // console.log(updateDataField);
        const updateData = await Video.updateOne({ _id: id }, updateDataField); 
        sendResponseData(res, 200, true, "Status updated successfully", updateData);
      }
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}


const videoDelete = async (req, res) => {
  const id = req.params.id;
  try{ 
      const videoData = await Video.findOne({ _id: id }); 
      if(videoData){
        const deleteData = await Video.deleteOne({ _id: id }); 
        
        // console.log(updateDataField);
        sendResponseData(res, 200, true, "Deleted successfully");
      }
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}


module.exports = { videoList, videoAdd, videoDetails, videoUpdate, 
  videoUpdateStatus, videoDelete 
 }