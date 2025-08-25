 const nfl_standing = require("../../models/thirdPartySchema/nfl_standings.model");
 const ncaa_standing = require("../../models/thirdPartySchema/ncaa_standings.model");

const {  sendResponseData } = require("../../util/Utility");


// const getNflStanding = async (req, res) => { 

//     try {
//         const standingList = await nfl_standing.aggregate([
//             {
//                 $lookup: {
//                   from: "nfl_teams",
//                   localField: "team_id",
//                   foreignField: "team_id",
//                   as: "teamDetails"
//                 }
//               },
//         ]).exec();
        

//         sendResponseData(res, 200, true, "Standing list", standingList);
//     } catch (error) {
//         sendResponseData(res, 200, false, "Error", error);
//     }
// }

 
const getNcaaStanding = async (req, res) => { 

    try {
        let condition = {
            status: true, isDelete: false
        }
        let year = req.query.year;
        if (year) {
            condition = {
                $and: [{
                    ...condition,
                    season: Number(year)

                }]
            }

        }
        const standingList = await ncaa_standing.aggregate([
            // {$sort:{leag_name:1}},
            { $match: condition },
            {
                $lookup: {
                    from: "ncaa_teams",
                    localField: "team_id",
                    foreignField: "team_id",
                    as: "teamDetails"
                }
            },
            { $unwind: { path: "$teamDetails", preserveNullAndEmptyArrays: false } },
            {
                "$group": {
                    "_id": {
                        team_league: "$leag_name",
                    },
                    "leag_name": { $first: "$leag_name" },
                    // "team_division":{$push:"$team_division"},
                    "doc": { "$addToSet": "$$ROOT" }
                    
                }
    
            },
            
        ]).exec();
        if (standingList.length == 0) {
            sendResponseData(res, 200, true, "No data found", []);
        }
        else {
        sendResponseData(res, 200, true, "Standing list", standingList);
        }
        

    } catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
}

 



module.exports = {
    getNcaaStanding
};
