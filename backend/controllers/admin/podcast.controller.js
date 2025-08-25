const Podcast = require("../../models/porcast.model");
const { sendResponseData, fileUpload, getFilePath,generateValidationErrorResponse } = require("../../util/Utility");
var multer = require('multer');
 
const upload = multer({ dest: "public/files" });
 
const podcastList = async (req, res) => {
    try{
        const podcastList = await Podcast.find().sort({ _id: -1 }); 

        podcastList.forEach(element => {
          element.image =  getFilePath(element.image);
          element.audio =  getFilePath(element.audio);
 
        });

        sendResponseData(res, 200, true, "Podcast list", podcastList);
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}


const podcastAdd = async (req, res) => {
    console.log('podcastAdd', req.body); 
    try{
      // if (req.files) {
      //   for (const [key, value] of Object.entries(req.files)) {
      //     if (req.files && `req.files.${key}`) {
      //       for (let index = 0; index < req.files[key].length; index++) {
      //         let path = req.files[key][index].path;
      //         let originalFilename = req.files[key][index].originalFilename;
      //         const filePath = `podcast/${key}_${Date.now()}.${originalFilename}`;
      //         const uploadRes = await uploadImage(filePath, path);

      //         if (key == 'image') {
      //           req.body.image = filePath;
      //         } 
      //         if (key == 'audio') { 
      //           req.body.audio = filePath;
      //         }

      //       }
      //     }
      //   }
      // }

      var imgFileName = '';
      var audioFileName = '';
      if (req.files) {
        if(req.files.image){
          var imgFile = req.files.image[0];
          imgFileName = await fileUpload(imgFile, 'podcast', 'image');
        } 
        if(req.files.audio){
          var audioFile = req.files.audio[0];
          audioFileName = await fileUpload(audioFile, 'podcast', 'audio');
        }
      }
      const podcastViewOnArray = req.body.podcast_view_on.split(',');

        const newPodcast = new Podcast({
          title: req.body.title,
          sub_title: req.body.sub_title, 
          podcast_time: req.body.podcast_time, 
          image: imgFileName, 
          audio: audioFileName, 
          // podcast_view_on: req.body.podcast_view_on, 
          podcast_view_on: podcastViewOnArray, 

        });
         
        const podcastData = await newPodcast.save();
        sendResponseData(res, 200, true, "Podcast added successfully", podcastData);
  }catch(error){
        // sendResponseData(res, 200, false, "Error", error);
        await generateValidationErrorResponse(res, error);

  }
}


const podcastDetails = async (req, res) => {
    const id = req.params.id;
    try{ 
        const podcastData = await Podcast.findOne({ _id: id }); 
        podcastData.image =  getFilePath(podcastData.image); 

        sendResponseData(res, 200, true, "Podcast data", podcastData);
  }catch(error){
        // sendResponseData(res, 200, false, "Error", error);
        await generateValidationErrorResponse(res, error);
  }
}


const podcastUpdate = async (req, res) => {
    const id = req.body.id;
    try{ 
        if (
            !req.body.hasOwnProperty("id") ||
            !req.body.hasOwnProperty("title") ||
            !req.body.hasOwnProperty("sub_title") ||
            !req.body.hasOwnProperty("podcast_time")
          ) {
            sendResponseData(res, 200, false, "Input validation failed", {});
          }  
        const rowData = await Podcast.findOne({ _id: id }); 
          var imgPath = rowData.image;
          var audioPath= rowData.audio;

          var imgFileName = imgPath;
          var audioFileName = audioPath;

          if (req.files) {
            if(req.files.image){
              var imgFile = req.files.image[0];
              imgFileName = await fileUpload(imgFile, 'podcast', 'image');
            } 
            if(req.files.audio){
              var audioFile = req.files.audio[0];
              audioFileName = await fileUpload(audioFile, 'podcast', 'audio');
            }       
          }

          const podcastViewOnArray = req.body.podcast_view_on.split(',');

        const podcastData = {
          title: req.body.title,
          sub_title: req.body.sub_title, 
          podcast_time: req.body.podcast_time, 
          image: imgFileName, 
          audio: audioFileName, 
          podcast_view_on: podcastViewOnArray, 

        }
        
       // const updateData = await Podcast.updateOne({ _id: id }, podcastData, { runValidators: true }); 
const updateData = await Podcast.findOneAndUpdate({ _id: id }, {$set:podcastData}, { runValidators: true ,context: 'query', new:true});


        sendResponseData(res, 200, true, "Podcast updated successfully", updateData);
  }catch(error){
        //sendResponseData(res, 200, false, "Error", error);
await generateValidationErrorResponse(res, error);
  }
}


const podcastUpdateStatus = async (req, res) => {
  const id = req.params.id;
  try{ 
      const podcastData = await Podcast.findOne({ _id: id }); 
      if(podcastData){
        const updateDataField = {
          status: !podcastData.status,
        }
        // console.log(updateDataField);
        const updateData = await Podcast.updateOne({ _id: id }, updateDataField); 
        sendResponseData(res, 200, true, "Status updated successfully", updateData);
      }
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}


const podcastDelete = async (req, res) => {
  const id = req.params.id;
  try{ 
      const podcastData = await Podcast.findOne({ _id: id }); 
      if(podcastData){
        const deleteData = await Podcast.deleteOne({ _id: id }); 
        
        // console.log(updateDataField);
        sendResponseData(res, 200, true, "Deleted successfully");
      }
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}


module.exports = { podcastList, podcastAdd, podcastDetails, podcastUpdate, 
  podcastUpdateStatus, podcastDelete 
 }
