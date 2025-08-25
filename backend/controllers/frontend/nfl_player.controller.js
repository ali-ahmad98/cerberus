
const axios = require('axios');
const { sendResponseData, fileUpload, getFilePath } = require("../../util/Utility");
const config = require("../../config/config");
const NflPlayers = require("../../models/thirdPartySchema/nfl_player.model");
const NflPlayerStats = require('../../models/thirdPartySchema/nfl_player_stat.model');
const NflInjuries = require("../../models/thirdPartySchema/nfl_injuriy");
const NflRosters = require("../../models/thirdPartySchema/nfl_roster.model");
const NflTeamStat = require('../../models/thirdPartySchema/nfl_team_stat.model');
const NflScore = require('../../models/thirdPartySchema/nfl_score.model');
const NflStandings = require('../../models/thirdPartySchema/nfl_standings.model');
const FollowTeams = require('../../models/thirdPartySchema/follow_teams');
const weekListDate = require('../../config/helper/week_helper');
const nflDepthChart = require('../../models/thirdPartySchema/nfl_depth_chart.model');




const nflPlayerList = async (req, res) => {
    const nflPlayerList = await NflPlayers.find({})

    sendResponseData(res, 200, true, "NFL players list", nflPlayerList);
}


const getNflPlayerDetails = async (req, res) => {
    const playerId = req.params.playerId;
    const nflPlayerData = await NflPlayers.findOne({ player_id: playerId })
    nflPlayerData.profile_img = getFilePath(nflPlayerData.profile_img, 'nfl_players', 'player')

    sendResponseData(res, 200, true, "NFL player data", nflPlayerData);
}



const getNflTeamLeaderByTeamId = async (req, res) => {
    var teamId = req.query.team; // $_GET["team"]
    var year = (req.query.year) > 0 ? req.query.year : new Date().getFullYear(); // $_GET["year"]
    // console.log(typeof (teamId));

    // const teamLeaderList = await NflPlayerStats.aggregate([
    //     {
    //         $lookup:
    //         {
    //             from: 'nfl_players',
    //             localField: 'player_id',
    //             foreignField: 'player_id',
    //             as: 'playerDetails'
    //         }
    //     },
    //     { $unwind: { path: "$playerDetails", preserveNullAndEmptyArrays: false } },
    //     { $match: { team_id: Number(teamId), season: Number(year), rank: 1 } },
    // ]).exec();


    const teamLeaderList = await NflPlayerStats.aggregate([
        { $match: { team_id: Number(teamId), season: Number(year) } },
        {$sort:{rank:1}},
        {
            $lookup:
            {
                from: 'nfl_players',
                localField: 'player_id',
                foreignField: 'player_id',
                as: 'playerDetails'
            }
        },
        { $unwind: { path: "$playerDetails", preserveNullAndEmptyArrays: true } },
        {
            $project:
            {
                "_id": 1,
                "status": 1,
                "stat_id": 1,
                "team_id": 1,
                "player_id": 1,
                "season": 1,
                "stat_category": 1,
                "completion_pct": 1,
                "completions": 1,
                "interceptions": 1,
                "interceptions_pct": 1,
                "longest_pass": 1,
                "passing_attempts": 1,
                "passing_touchdowns": 1,
                "quaterback_rating": 1,
                "passing_touchdowns_pct": 1,
                "sacked_yards_lost": 1,
                "sacks": 1,
                "rank": 1,
                "yards": 1,
                "yards_per_game": 1,
                "yards_per_pass_avg": 1,
                "created_at": 1,
                "__v": 1,
                "gamePlayed": 1,
                fumbles: 1,
                fumbles_lost: 1,
                longest_rush: 1,
                over_20_yards: 1,
                rank: 1,
                rushing_attempts: 1,
                rushing_first_downs: 1,
                rushing_touchdowns: 1,
                yards_per_rush_avg: 1,
                fumbles: 1,
                fumbles_lost: 1,
                longest_reception: 1,
                over_20_yards: 1,
                receiving_first_downs: 1,
                receiving_targets: 1,
                receiving_touchdowns: 1,
                receiving_yards: 1,
                receptions: 1,
                yards_after_catch: 1,
                yards_per_game: 1,
                yards_per_reception_avg: 1,
                "playerDetails": { $ifNull: ["$playerDetails", "$player_name"] }
                
            }
        },
        {
            $group:
            {
                _id: "$stat_category",
                // minRank: { $min: "$rank" },
                "doc": { "$first": "$$ROOT" }
            },
        },
        { "$replaceRoot": { "newRoot": "$doc" } },
    ]).exec();
    if (teamLeaderList.length > 0) {
        teamLeaderList.forEach((element) => {
            if(element.playerDetails){

                element.playerDetails.profile_img = getFilePath(element.playerDetails.profile_img, 'nfl_players', 'player');
            }
        })
    }
    // console.log('teamLeaderList', teamLeaderList)

    sendResponseData(res, 200, true, "NFL Team Leaders list", teamLeaderList);
}



const getNflPlayerStatByTeamId = async (req, res) => {
    var teamId = req.query.team; // $_GET["team"]
    var year = req.query.year; // $_GET["team"]
    console.log(teamId, year);
    var returnDataArr = {};
    returnDataArr['passing_data_list'] = [];
    returnDataArr['rushing_data_list'] = [];
    returnDataArr['receiving_data_list'] = [];

    const dataList = await NflPlayerStats.aggregate([
        { $match: { team_id: Number(teamId), season: Number(year) } },
        {
            $lookup:
            {
                from: 'nfl_players',
                localField: 'player_id',
                foreignField: 'player_id',
                as: 'playerDetails'
            }
        },
        { $unwind: { path: "$playerDetails", preserveNullAndEmptyArrays: true } },
        {$match:{'playerDetails.status' : true}},
        {
            $lookup:
            {
                from: 'nfl_game_playeds',
                localField: 'player_id',
                foreignField: 'player_id',
                as: 'gamePlayed'
            }
        },
        { $addFields: { 
            gamePlayed: { $size: "$gamePlayed" }
        } },
        {
            $project:
            {
                "_id": 1,
                "status": 1,
                "stat_id": 1,
                "team_id": 1,
                "player_id": 1,
                "season": 1,
                "stat_category": 1,
                "completion_pct": 1,
                "completions": 1,
                "interceptions": 1,
                "interceptions_pct": 1,
                "longest_pass": 1,
                "passing_attempts": 1,
                "passing_touchdowns": 1,
                "quaterback_rating": 1,
                "passing_touchdowns_pct": 1,
                "sacked_yards_lost": 1,
                "sacks": 1,
                "rank": 1,
                "yards": 1,
                "yards_per_game": 1,
                "yards_per_pass_avg": 1,
                "created_at": 1,
                "__v": 1,
                "gamePlayed": 1,
                fumbles: 1,
                fumbles_lost: 1,
                longest_rush: 1,
                over_20_yards: 1,
                rank: 1,
                rushing_attempts: 1,
                rushing_first_downs: 1,
                rushing_touchdowns: 1,
                yards_per_rush_avg: 1,
                fumbles: 1,
                fumbles_lost: 1,
                longest_reception: 1,
                over_20_yards: 1,
                receiving_first_downs: 1,
                receiving_targets: 1,
                receiving_touchdowns: 1,
                receiving_yards: 1,
                receptions: 1,
                yards_after_catch: 1,
                yards_per_game: 1,
                yards_per_reception_avg: 1,
                "playerDetails": { $ifNull: ["$playerDetails", "$player_name"] }
                
            }
        },
        // {$sort:{yards:-1,receiving_yards:-1}}
    ]).exec();

    // dataList.sort(await dynamicSort("yards"));
//    dataList.sort(await dynamicSort("receiving_yards"));

    dataList.forEach(async (item) => {
        if (item.stat_category == 'Passing') {
            returnDataArr['passing_data_list'].push(item)
        //    returnDataArr['passing_data_list'].sort(await dynamicSort("yards"));
        returnDataArr['passing_data_list'].sort((a,b)=>
            (a?.Number(rank) < b.Number(rank)) ? -1 : ((b.Number(rank) > a.Number(rank)) ? 1 : 0)
            );
        } else if (item.stat_category == 'Rushing') {
            returnDataArr['rushing_data_list'].push(item)
            // returnDataArr['rushing_data_list'].sort(await dynamicSort("yards"));
            returnDataArr['rushing_data_list'].sort((a,b)=>
            (a.Number(rank) < b.Number(rank)) ? -1 : ((b.Number(rank) > a.Number(rank)) ? 1 : 0)
            );

        } else if (item.stat_category == 'Receiving') {
            returnDataArr['receiving_data_list'].push(item)
            returnDataArr['receiving_data_list'].sort((a,b)=>
            (a.Number(rank) < b.Number(rank)) ? -1 : ((b.Number(rank) > a.Number(rank)) ? 1 : 0)
            );
            // returnDataArr['receiving_data_list'].sort(dynamicSort("rank"));

        }
    })

    sendResponseData(res, 200, true, "NFL player stat list", returnDataArr);
}
function dynamicSort(property) {
    return function(a,b){

         (a[property] < b[property]) ? -1 : ((b[property] > a[property]) ? 1 : 0)
    }

    // var sortOrder = -1;
    // if(property[0] === "-") {
    //     sortOrder = -1;
    //     property = property.substr(1);
    // }
    // return function (a,b) {
    //    let yy =  (a[property] < b[property]) ? 1 : ((b[property] > a[property]) ? -1 : 0)
    // // let yy= (Number(a[property].replace(/,/g, "")) < Number(b[property].replace(/,/g, ""))) ? -1 : (Number((b[property].replace(/,/g, "")) > Number(a[property].replace(/,/g, ""))) ? 1 : 0)
    // //    console.log("------",Number(a[property].replace(/,/g, "")),Number(b[property].replace(/,/g, "")),"----------",yy);
    //    return yy // return (parseFloat(b[property]) - parseFloat(a[property]));
    // }
}
//return (Number(a[property]) < Number(b[property])) ? 1 : (Number((b[property]) > Number(a[property])) ? -1 : 0)

async function dynamicSort_99(property) {
    var sortOrder = -1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        return Number(b[property]) - Number(a[property]);
    }
  }
const getNflInjuriesByTeamId = async (req, res) => {
    var teamId = req.query.teamId;

    const NflInjuryList = await NflInjuries.aggregate([
        { $match: { teamId: Number(teamId) } },
        {
            $lookup: {
                from: 'nfl_players',
                localField: 'player_id',
                foreignField: 'player_id',
                as: 'players'

            }
        },
        { $unwind: { path: "$players", preserveNullAndEmptyArrays: false } },

    ]);
    if (NflInjuryList.length > 0) {
        NflInjuryList.forEach((element) => {
            element.players.profile_img = getFilePath(element.players.profile_img, 'nfl_players', 'player');
        })
    }
    sendResponseData(res, 200, true, "NFL Injury data teamwise", NflInjuryList);


}

const getNflRosterByTeamId = async (req, res) => {
    var teamId = req.query.teamId;

    const NflRosterList = await NflRosters.aggregate([
        { $match: { teamId: Number(teamId) } },
        {
            $lookup: {
                from: 'nfl_players',
                localField: 'player_id',
                foreignField: 'player_id',
                as: 'playerDetails'
            }
        },
        { $unwind: { path: "$playerDetails", preserveNullAndEmptyArrays: false } },

        {
            $group:
            {
                _id: { "team_position": "$team_position" },
                "team_position": { $first: "$team_position" },
                "doc": { "$addToSet": "$$ROOT" }
            }
        },
    ])
    const NflRosterListSort = [];
    if (NflRosterList.length > 0) {
        NflRosterList.forEach((element) => {
            if (element.doc.length > 0) {
                element.doc.forEach((ele) => {
                    ele.playerDetails.profile_img = getFilePath(ele.playerDetails.profile_img, 'nfl_players', 'player');
                })
            }

            if (element.team_position == 'Offense') {
                NflRosterListSort[0] = element;
            } else if (element.team_position == 'Defense') {
                NflRosterListSort[1] = element;
            } else {
                NflRosterListSort[2] = element;
            }
        })
    }

    sendResponseData(res, 200, true, "NFL Rosters data teamwise", NflRosterListSort);
}

const getNflTeamStatByTeamId = async (req, res) => {
    var teamId = req.query.teamId;
    var year = req.query.year;
    var returnDataArr = {};

    returnDataArr['passing'] = [];
    returnDataArr['rushing'] = [];
    returnDataArr['down'] = [];
    returnDataArr['returning'] = [];
    returnDataArr['kicking'] = [];

    const NflTeamStatList = await NflTeamStat.aggregate([
        { $match: { team_id: Number(teamId), season: Number(year) } },

    ]).exec();
    // NflTeamStatList.forEach((item) => {
    //     console.log("Passing",item);
    //     if (item.stat_category == 'Passing') {
    //         returnDataArr['passing'].push(item)
    //     } else if (item.stat_category == 'Rushing') {
    //         returnDataArr['rushing'].push(item)
    //     } else if (item.stat_category == 'Downs') {
    //         returnDataArr['down'].push(item)
    //     }
    //     else if (item.stat_category == 'Returning') {
    //         returnDataArr['returning'].push(item)
    //     }
    //     else if (item.stat_category == 'Kicking') {
    //         returnDataArr['kicking'].push(item)
    //     }
    // })

    sendResponseData(res, 200, true, "NFL teamwise stat data", NflTeamStatList);

}

const getNflScore = async (req, res) => {
    try {

        let condition = {};

        const searchYear = req.body.year;
        const searchWeek = req.body.week;

        // console.log(typeof(searchYear),searchYear);

        if (searchYear) {
            condition = {
                $and: [{
                    matchDate: {
                        $gte: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
                        $lte: new Date(searchYear, 11, 31)
                    }
                }]
            }
        }        
        
        if (searchYear && searchWeek ) {
            let d1;
            let d2;
            let getDates = weekListDate.getDates(searchYear, searchWeek);
            console.log(getDates);
            
                d1 =  getDates[0];
                d2 =  getDates[1];
    
            let startDate = searchYear + '-'+ d1;
            let endDate = searchYear + '-'+ d2;
            
            console.log(startDate, endDate);

            condition = {
                $and: [{
                    matchDate: {
                        $gte: new Date(`${startDate}T00:00:00.000Z`), 
                        $lte: new Date(`${endDate}T23:59:59.999Z`)
                    }
                }]
            }
        }
        
        
        const getNflScoreList = await NflScore.aggregate([
            // { $sort: { matchDate: -1 } },
            { $match: { status: true, isDelete: false } },
            { $match: condition },

            // home team
            {
                $lookup: {
                    from: "nfl_teams",
                    localField: "homeTeam",
                    foreignField: "team_id",
                    as: "homeTeam"
                }
            },
            { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
            //awayTeam
            {
                $lookup: {
                    from: "nfl_teams",
                    localField: "awayTeam",
                    foreignField: "team_id",
                    as: "awayTeam"
                }
            },
            { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
            // { $sort: { matchDate: -1 } },

            //------------------------rushing---------------------
            // { $addFields: {
            //     rush:{
            //         maxAway: {
            //             "$arrayElemAt": [
            //                 "$rushing.awayteam.player",
            //                 { "$indexOfArray": ["$rushing.awayteam.player.average", { "$max": "$rushing.awayteam.player.average" }] }
            //             ]
            //         },
            //         maxHome: {
            //             "$arrayElemAt": [
            //                 "$rushing.hometeam.player",
            //                 { "$indexOfArray": ["$rushing.hometeam.player.average", { "$max": "$rushing.hometeam.player.average" }] }
            //             ]
            //         }
            //    }
            // }},
            // { $addFields: {
            //     recv:{

            //         maxAway: {
            //             "$arrayElemAt": [
            //                 "$receiving.awayteam.player",
            //                 { "$indexOfArray": ["$receiving.awayteam.player.yards", 
            //                 { $max: "$receiving.awayteam.player.yards" }
            //             ] }
            //             ]
            //         },
            //         maxHome: {
            //             "$arrayElemAt": [
            //                 "$receiving.hometeam.player",
            //                 { "$indexOfArray": ["$receiving.hometeam.player.yards", 
            //                 { $max: "$receiving.hometeam.player.yards" }
            //             ] }
            //             ]
            //         }
            //    }
            // }},
            // {
            //     $project:{
            //         recv:1,
            //         rush:1,
            //         matchDate:1,
            //         homeTeam:1,
            //         awayTeam:1,
            //         matchVenue:1,
            //         matchTime:1,
            //         date:1,
            //         awayTeamScore:1,
            //         homeTeamScore:1,
            //         maxPass:1
            //     }
            // },
            {
                $group: {
                    _id: "$matchDate",
                    // _id:{"matchDate":"$matchDate"},
                    // "matchDate":{$first:"$matchDate"},
                    "doc": { "$addToSet": "$$ROOT" }
                },
            },
            { $sort: { _id: 1 } },


        ])

        // console.log(getNflScoreList.length);


        if (getNflScoreList.length == 0) {
            sendResponseData(res, 200, true, "No data found", []);
        } else {

            getNflScoreList.forEach((each, index) => {
                // console.log("each", each, "index", index);

                if (each.doc.length > 0) {
                    each.doc.map((scorItem, index) => {
                        if(scorItem.passing){

                            const passing_awayteam_players = scorItem.passing.awayteam.player;
                            const passing_hometeam_players = scorItem.passing.hometeam.player;
                            scorItem.maxPassing = {
                                "awayteam": {
                                    "player": (passing_awayteam_players.length >= 2) ? getMaxAvgPlayer(passing_awayteam_players) : passing_awayteam_players,
                                },
                                "hometeam": {
    
                                    "player": (passing_hometeam_players.length >= 2) ? getMaxAvgPlayer(passing_hometeam_players) : passing_hometeam_players,
                                }
                            };
                        }

                        if(scorItem.rushing){

                            const rushing_awayteam_players = scorItem.rushing.awayteam.player;
                            const rushing_hometeam_players = scorItem.rushing.hometeam.player;
                            scorItem.maxRushing = {
                                "awayteam": { "player": (rushing_awayteam_players.length >= 2) ? getMaxAvgPlayer(rushing_awayteam_players) : rushing_awayteam_players },
                                "hometeam": { "player": (rushing_hometeam_players.length >= 2) ? getMaxAvgPlayer(rushing_hometeam_players) : rushing_hometeam_players },
                            };
                        }

                        if(scorItem.receiving){

                            const receiving_awayteam_players = scorItem.receiving.awayteam.player;
                            const receiving_hometeam_players = scorItem.receiving.hometeam.player;
                            scorItem.maxReceiving = {
                                "awayteam": { "player": (receiving_awayteam_players.length >= 2) ? getMaxAvgPlayer(receiving_awayteam_players) : receiving_awayteam_players },
                                "hometeam": { "player": (receiving_hometeam_players.length >= 2) ? getMaxAvgPlayer(receiving_hometeam_players) : receiving_hometeam_players },
                            };
                        }

                        // console.log('passing_awayteam_players.length', scorItem.passing.awayteam.player);
                    })
                }
            })




            sendResponseData(res, 200, true, "NFL Schedule list", getNflScoreList);

        }
    }
    catch (error) {
        sendResponseData(res, 200, false, "Error", error);

    }

}


function getMaxAvgPlayer(playerList = {}) { // Get max avarage player for score NFL 
    let maxId = 0;
    let maxObj;

    playerList.forEach(element => {
        if (Number(element.yards) > maxId) {
            maxId = Number(element.yards);
            maxObj = element;
        }
    });
    return maxObj;
}




const getNflStandings = async (req, res) => {
    try {
        let condition = {
            status: true, isDelete: false
        }
        let year = req.body.year;
        if (year) {
            condition = {
                $and: [{
                    ...condition,
                    season: Number(year)

                }]
            }


        }

        let NflStandingList = await NflStandings.aggregate([
            { $match: condition },
            {
                $lookup: {
                    from: 'nfl_teams',
                    localField: 'team_id',
                    foreignField: 'team_id',
                    as: 'team'

                }
            },
            { $unwind: { path: "$team", preserveNullAndEmptyArrays: false } },
            {
                $group:
                {
                    // _id:{"team_leag":"$team_leag","team_division":"$team_division"},
                    _id: { "team_leag": "$team_leag" },

                    "team_leag": { $first: "$team_leag" },
                    // "team_division":{$push:"$team_division"},
                    "doc": { "$addToSet": "$$ROOT" }
                }
            },

            //=====================please dont delete=====================
            // {
            //     "$group": {
            //         "_id": {
            //             team_league: "$team_leag",
            //             team_division: "$team_division",
            //         },
            //         "v": {
            //             "$addToSet": "$$ROOT"
            //         }
            //     }

            // },
            // {
            //     $group: {
            //         _id: {
            //             team_league: "$_id.team_league",
            //         },
            //         v: {
            //             "$addToSet": {
            //                 k: "$_id.team_division",
            //                 v: "$v"
            //             }
            //         }
            //     }
            // },
            // {
            //     "$addFields": {
            //         "v": {
            //             "$arrayToObject": "$v"
            //         }
            //     }
            // },

            // {
            //     $group: {
            //         _id: null,
            //         v: {
            //             "$addToSet": {
            //                 k: "$_id.team_league",
            //                 v: "$v"
            //             }
            //         }
            //     }
            // },
            // {
            //     "$addFields": {
            //         "v": {
            //             "$arrayToObject": "$v"
            //         }
            //     }
            // },
            // {
            //     "$replaceRoot": {
            //         "newRoot": "$v"
            //     }
            // },

        ])


        if (NflStandingList.length == 0) {
            sendResponseData(res, 200, true, "No data found", []);
        }
        else {
            sendResponseData(res, 200, true, "NFL Schedule list", NflStandingList);

        }

    }
    catch (error) {
        sendResponseData(res, 200, false, "Error", error);

    }
}


const getNflPlayerStatLeaderList = async (req, res) => {
    var teamId = req.query.teamId;
    console.log(teamId);
    var year = req.query.year;
    const nflPlayerStatList = await NflPlayerStats.aggregate([
        { $match: { team_id: Number(teamId), season: Number(year) } },
        {
            $lookup: {
                from: 'nfl_players',
                localField: 'player_id',
                foreignField: 'player_id',
                as: 'playerDetails'

            }
        },
        { $unwind: { path: "$playerDetails", preserveNullAndEmptyArrays: false } },
        {
            $project:
            {
                _id: 1,
                stat_id: 1,
                team_id: 1,
                player_id: 1,
                season: 1,
                stat_category: 1,
                yards: 1,
                receiving_yards: 1,
                playerDetails: 1
            }
        },
        {
            $group:
            {
                _id: { "stat_category": "$stat_category" },
                "stat_category": { $first: "$stat_category" },
                "doc": { "$addToSet": "$$ROOT" }
            }
        },
    ]).exec();

    sendResponseData(res, 200, true, "nflPlayerStatList", nflPlayerStatList);

}

const getNflLatestScore = async (req, res) => {
    try {
        let currentDate = new Date();
        let beforeDate = new Date(new Date().setDate(new Date().getDate() - 5));
        const getNflScoreList = await NflScore.aggregate([
            { $sort: { matchDate: -1 } },
            // { $match: { status: true, isDelete: false, matchDate: { $gte: beforeDate, $lt: currentDate }  }},

            // // home team
            // {
            //     $lookup: {
            //         from: "nfl_teams",
            //         localField: "homeTeam",
            //         foreignField: "team_id",
            //         as: "homeTeam"
            //     }
            // },
            // { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
            // //awayTeam
            // {
            //     $lookup: {
            //         from: "nfl_teams",
            //         localField: "awayTeam",
            //         foreignField: "team_id",
            //         as: "awayTeam"
            //     }
            // },
            // { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
            {
                $group: {
                    _id: "$matchDate",
                    // _id:{"matchDate":"$matchDate"},
                    // "matchDate":{$first:"$matchDate"},
                    "doc": { "$addToSet": "$$ROOT" }
                },
            },

        ])
        sendResponseData(res, 200, true, "NFL Schedule list", getNflScoreList);

    }
    catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }

}

const getNflPlayerGameLog = async (req, res) => {
    try {
        let playerId = req.query.playerId;
        let searchYear = req.query.year;

        console.log(playerId);
        let playerGameLog = await NflScore.aggregate([
            {
                $lookup: {
                    from: 'nfl_teams',
                    localField: 'awayTeam',
                    foreignField: 'team_id',
                    as: 'awayTeamDetails'
                }
            },
            {
                $unwind: { path: '$awayTeamDetails', preserveNullAndEmptyArrays: false }
            },
            {
                $lookup: {
                    from: 'nfl_teams',
                    localField: 'homeTeam',
                    foreignField: 'team_id',
                    as: 'homeTeamDetails'
                }
            },
            {
                $unwind: { path: '$homeTeamDetails', preserveNullAndEmptyArrays: false }
            },
            {
                $match:
                {
                    $and:
                        [
                            {
                                $or: [
                                    { "passing.awayteam.player.id": { $in: [playerId] } },
                                    { "passing.hometeam.player.id": { $in: [playerId] } }
                                ],
                                // },
                                // {
                                $or: [
                                    { "rushing.awayteam.player.id": { $in: [playerId] } },
                                    { "rushing.hometeam.player.id": { $in: [playerId] } }
                                ]

                            },
                            {
                                matchDate: {
                                    $gt: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
                                    $lt: new Date(searchYear, 11, 31)
                                }
                            }

                        ]
                }
            },

            {
                $project: {
                    matchDate: 1,
                    awayTeamScore: 1,
                    homeTeamScore: 1,
                    awayTeamDetails: 1,
                    homeTeamDetails: 1,
                    rushing1: {
                        $filter: {
                            input: '$rushing.awayteam.player',
                            cond: {
                                $eq: [
                                    '$$this.id', playerId
                                ]
                            }
                        },

                    },
                    rushing2: {
                        $filter: {
                            input: '$rushing.hometeam.player',
                            cond: {
                                $eq: [
                                    '$$this.id', playerId
                                ]
                            }
                        },

                    },
                    passing: 1,
                },

            },
            {
                $unwind: {
                    path: '$rushing1', preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$rushing2', preserveNullAndEmptyArrays: true
                }
            },


        ]);


        if (playerGameLog.length == 0) {
            sendResponseData(res, 200, true, "No data found", []);
        }
        else {
            sendResponseData(res, 200, true, "players game log", playerGameLog);
        }

    }
    catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
}

const getNflDepthChart = async (req,res)=>{
    try{
        var teamId = req.query.teamId;
    console.log(teamId);
/*
    let NflDepthChartList = await nflDepthChart.aggregate([
        {$match:{team_id: Number(teamId)}},
        { $sort: { section_name: 1 } },

        {
            $lookup: {
                from: 'nfl_players',
                localField: 'starter_p_id',
                foreignField: 'player_id',
                as: 'starterPlayer'

            }
        },
        { $unwind: { path: "$starterPlayer", preserveNullAndEmptyArrays: true } }, //starter player
        {$match:{'starterPlayer.status' : true}},
        {
            $lookup: {
                from: 'nfl_players',
                localField: 'second_p_id',
                foreignField: 'player_id',
                as: 'secondPlayer'

            }
        },
        { $unwind: { path: "$secondPlayer", preserveNullAndEmptyArrays: true } }, //second player
        {$match:{'secondPlayer.status' : true}},
        {
            $lookup: {
                from: 'nfl_players',
                localField: 'third_p_id',
                foreignField: 'player_id',
                as: 'thirdPlayer'

            }
        },
        { $unwind: { path: "$thirdPlayer", preserveNullAndEmptyArrays: true } }, //third player
        {$match:{'thirdPlayer.status' : true}},
        {
            $lookup: {
                from: 'nfl_players',
                localField: 'fourth_p_id',
                foreignField: 'player_id',
                as: 'fourthPlayer'

            }
        },
        { $unwind: { path: "$fourthPlayer", preserveNullAndEmptyArrays: true } }, //fourth player
        {$match:{'fourthPlayer.status' : true}},

        // {
        //     $project: {
        //         _id: 1,
        //         isDelete: 1,
        //         team_id: 1,
        //         section_name: 1,
        //         position_name: 1,
        //         starterPlayer: 1,
        //         secondPlayer: 1,
        //         thirdPlayer: 1,
        //         fourthPlayer: 1, // Include the matched item if needed
        //     },
        // },
        // {
        //     $match: {
        //         "starterPlayer.third_p_id": { $ne: 0 },
        //         "starterPlayer.fourth_p_id": { $ne: 0 }

        //         //   "productDetails.category": { $ne: "Category A" }
        //         //   "productDetails.category": { $ne: "Category A" }
        //         //   "productDetails.category": { $ne: "Category A" }

        //     }
        // },
        {
            $group:
            {
                _id: { "section_name": "$section_name" },

                "section_name": { $first: "$section_name" },
                // "team_division":{$push:"$team_division"},
                "doc": { "$addToSet": "$$ROOT" }
            }
        },
        // { $sort: { position_name:-1} },

    ])
    */

    // let NflDepthChartList = await nflDepthChart.aggregate([
    //     { $match: { team_id: Number(teamId) } },
    //     { $sort: { section_name: 1 } },
    
    //     // Lookup for starter player
    //     {
    //         $lookup: {
    //             from: 'nfl_players',
    //             localField: 'starter_p_id',
    //             foreignField: 'player_id',
    //             as: 'starterPlayer'
    //         }
    //     },
    //     {
    //         $addFields: {
    //             starterPlayer: {
    //                 $arrayElemAt: [
    //                     {
    //                         $filter: {
    //                             input: "$starterPlayer",
    //                             as: "player",
    //                             cond: { $eq: ["$$player.status", true] }
    //                         }
    //                     }, 0
    //                 ]
    //             }
    //         }
    //     },
    
    //     // Lookup for second player
    //     {
    //         $lookup: {
    //             from: 'nfl_players',
    //             localField: 'second_p_id',
    //             foreignField: 'player_id',
    //             as: 'secondPlayer'
    //         }
    //     },
    //     {
    //         $addFields: {
    //             secondPlayer: {
    //                 $arrayElemAt: [
    //                     {
    //                         $filter: {
    //                             input: "$secondPlayer",
    //                             as: "player",
    //                             cond: { $eq: ["$$player.status", true] }
    //                         }
    //                     }, 0
    //                 ]
    //             }
    //         }
    //     },
    
    //     // Lookup for third player
    //     {
    //         $lookup: {
    //             from: 'nfl_players',
    //             localField: 'third_p_id',
    //             foreignField: 'player_id',
    //             as: 'thirdPlayer'
    //         }
    //     },
    //     {
    //         $addFields: {
    //             thirdPlayer: {
    //                 $arrayElemAt: [
    //                     {
    //                         $filter: {
    //                             input: "$thirdPlayer",
    //                             as: "player",
    //                             cond: { $eq: ["$$player.status", true] }
    //                         }
    //                     }, 0
    //                 ]
    //             }
    //         }
    //     },
    
    //     // Lookup for fourth player
    //     {
    //         $lookup: {
    //             from: 'nfl_players',
    //             localField: 'fourth_p_id',
    //             foreignField: 'player_id',
    //             as: 'fourthPlayer'
    //         }
    //     },
    //     {
    //         $addFields: {
    //             fourthPlayer: {
    //                 $arrayElemAt: [
    //                     {
    //                         $filter: {
    //                             input: "$fourthPlayer",
    //                             as: "player",
    //                             cond: { $eq: ["$$player.status", true] }
    //                         }
    //                     }, 0
    //                 ]
    //             }
    //         }
    //     },
    
    //     // Group by section_name
    //     {
    //         $group: {
    //             _id: "$section_name",
    //             section_name: { $first: "$section_name" },
    //             docs: { $push: "$$ROOT" }
    //         }
    //     },
    //     { $sort: { "docs.position_name": -1 } } // Sorting by position_name within each section
    // ]);
    
    let NflDepthChartList = await nflDepthChart.aggregate([
        { $match: { team_id: Number(teamId) } },
        { $sort: { section_name: 1 } },
    
        // Lookup for starter player
        {
            $lookup: {
                from: 'nfl_players',
                localField: 'starter_p_id',
                foreignField: 'player_id',
                as: 'starterPlayer'
            }
        },
        {
            $addFields: {
                starterPlayer: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: "$starterPlayer",
                                as: "player",
                                cond: { $eq: ["$$player.status", true] }
                            }
                        }, 0
                    ]
                }
            }
        },
        {
            $addFields: {
                starterPlayer: { $ifNull: ["$starterPlayer", null] }
            }
        },
    
        // Lookup for second player
        {
            $lookup: {
                from: 'nfl_players',
                localField: 'second_p_id',
                foreignField: 'player_id',
                as: 'secondPlayer'
            }
        },
        {
            $addFields: {
                secondPlayer: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: "$secondPlayer",
                                as: "player",
                                cond: { $eq: ["$$player.status", true] }
                            }
                        }, 0
                    ]
                }
            }
        },
        {
            $addFields: {
                secondPlayer: { $ifNull: ["$secondPlayer", null] }
            }
        },
    
        // Lookup for third player
        {
            $lookup: {
                from: 'nfl_players',
                localField: 'third_p_id',
                foreignField: 'player_id',
                as: 'thirdPlayer'
            }
        },
        {
            $addFields: {
                thirdPlayer: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: "$thirdPlayer",
                                as: "player",
                                cond: { $eq: ["$$player.status", true] }
                            }
                        }, 0
                    ]
                }
            }
        },
        {
            $addFields: {
                thirdPlayer: { $ifNull: ["$thirdPlayer", null] }
            }
        },
    
        // Lookup for fourth player
        {
            $lookup: {
                from: 'nfl_players',
                localField: 'fourth_p_id',
                foreignField: 'player_id',
                as: 'fourthPlayer'
            }
        },
        {
            $addFields: {
                fourthPlayer: {
                    $arrayElemAt: [
                        {
                            $filter: {
                                input: "$fourthPlayer",
                                as: "player",
                                cond: { $eq: ["$$player.status", true] }
                            }
                        }, 0
                    ]
                }
            }
        },
        {
            $addFields: {
                fourthPlayer: { $ifNull: ["$fourthPlayer", null] }
            }
        },
    
        // Group by section_name
        {
            $group: {
                _id: "$section_name",
                section_name: { $first: "$section_name" },
                doc: { $push: "$$ROOT" }
            }
        },
        { $sort: { "docs.position_name": -1 } } // Sorting by position_name within each section
    ]);
    
    
    sendResponseData(res, 200, true, "nfl Depth Chart List", NflDepthChartList);

    }
    catch(error){
        sendResponseData(res, 200, false, "Error", error);
    }
}




module.exports = {
    nflPlayerList,
    getNflPlayerDetails,
    getNflTeamLeaderByTeamId,
    getNflPlayerStatByTeamId,
    getNflInjuriesByTeamId,
    getNflRosterByTeamId,
    getNflTeamStatByTeamId,
    getNflPlayerStatLeaderList,
    getNflScore,
    getNflStandings,
    getNflLatestScore,
    getNflPlayerGameLog, 
    getNflDepthChart

}