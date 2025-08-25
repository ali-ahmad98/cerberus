const Cms = require("../../models/cms.model");
const { sendResponseData, fileUpload, getFilePath, generateValidationErrorResponse } = require("../../util/Utility");

const cmsList = async (req, res) => {
    try{
        const cmsList = await Cms.find().limit(20)
        .skip(0).sort({ _id: -1 });  
        sendResponseData(res, 200, true, "CMS list", cmsList);
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}


const cmsAdd = async (req, res) => {
  // console.log(req.body);
    try{
        
      var imgFileName = '';
      if (req.files) {
        console.log('images');
        if(req.files.image){
          var imgFile = req.files.image[0];
          imgFileName = await fileUpload(imgFile, 'cms', 'image');
        } 
      }

      const newCms = new Cms({
          cms_title: req.body.cms_title,
          cms_sub_title: req.body.cms_sub_title,
          cms_url: req.body.cms_url, 
          cms_description: req.body.cms_description, 
          meta_title: req.body.meta_title, 
          meta_keyword: req.body.meta_keyword, 
          meta_description: req.body.meta_description, 
          image: imgFileName, 
      });

      const cmsData = await newCms.save();
      sendResponseData(res, 200, true, "CMS added successfully", cmsData);
  }catch(error){
    await generateValidationErrorResponse(res, error);
  }
}


const cmsDetails = async (req, res) => {
    const cmsId = req.params.id;
    try{ 
        const cmsData = await Cms.findOne({ _id: cmsId }); 
        cmsData.image = await getFilePath(cmsData.image);
        sendResponseData(res, 200, true, "CMS data", cmsData);
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}


const cmsUpdate = async (req, res) => {
    const cmsId = req.body.id;
    try{ 
        if (
            !req.body.hasOwnProperty("id") ||
            !req.body.hasOwnProperty("cms_title") ||
            !req.body.hasOwnProperty("cms_sub_title") ||
            !req.body.hasOwnProperty("cms_url") ||
            !req.body.hasOwnProperty("cms_description") ||
            !req.body.hasOwnProperty("meta_title") ||
            !req.body.hasOwnProperty("meta_keyword") ||
            !req.body.hasOwnProperty("meta_description")
          ) {
            sendResponseData(res, 200, false, "Input validation failed", {});
          }  
          const rowData = await Cms.findOne({ _id: cmsId }); 
          var imgFileName = rowData.image; 
          if (req.files) {
            if(req.files.image){
              var imgFile = req.files.image[0];
              imgFileName = await fileUpload(imgFile, 'cms', 'image');
            }        
          }
          console.log('images', imgFileName);

          const cmsData = {
            cms_title: req.body.cms_title,
            cms_sub_title: req.body.cms_sub_title,
            cms_url: req.body.cms_url, 
            cms_description: req.body.cms_description, 
            meta_title: req.body.meta_title, 
            meta_keyword: req.body.meta_keyword, 
            meta_description: req.body.meta_description, 
            image: imgFileName, 
          }
       // const updateData = await Cms.updateOne({ _id: cmsId }, cmsData, { runValidators: true }); 
const updateData = await Cms.findOneAndUpdate({ _id: cmsId }, {$set:cmsData}, { runValidators: true ,context: 'query', new:true});

        sendResponseData(res, 200, true, "CMS updated successfully", updateData);
  }catch(error){
      await generateValidationErrorResponse(res, error);
  }
}

const cmsUpdateStatus = async (req, res) => {
  const id = req.params.id;
  try{ 
      const cmsData = await Cms.findOne({ _id: id }); 
      if(cmsData){
        const updateDataField = {
          status: !cmsData.status,
        } 
        const updateData = await Cms.updateOne({ _id: id }, updateDataField); 
        sendResponseData(res, 200, true, "Status updated successfully", updateData);
      }
  }catch(error){
        sendResponseData(res, 200, false, "Error", error);
  }
}


module.exports = { cmsList, cmsAdd, cmsDetails, cmsUpdate, cmsUpdateStatus }
