const quickLink  = require("../../models/quicklink.model");
const {  sendResponseData } = require("../../util/Utility");


const quickLinkList = async(req,res)=>{
    try{
    const pageBy = req.query.page;
        let query = {
            status: true
          };
      
          if (pageBy) {
            query = {
              $and: [{ status: true }, { quicklink_view_on: { $regex: pageBy, $options: 'i' } }]
            }
      
          }
        const list = await quickLink.find(query);

        if(list.length == 0){
            sendResponseData(res, 200, true, "No data found", []);
        }else{
            sendResponseData(res, 200, true, "quickLink List",list );

        }

    }
    catch(error){
        sendResponseData(res,200,false,"Error",error)
    }
}

module.exports={
    quickLinkList
}