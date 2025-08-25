const NcaaTeam = require("../../models/thirdPartySchema/ncaa_team.model");
const NcaaSchedule = require("../../models/thirdPartySchema/ncaa_schedule.model")
const { sendResponseData, getFilePath } = require("../../util/Utility");
const NcaaPlayerStats = require("../../models/thirdPartySchema/ncaa_player_stat.model");
const NcaaRosters = require('../../models/thirdPartySchema/ncaa_roster.model');
const config = require('../../config/config');
const NcaaScore = require("../../models/thirdPartySchema/ncaa_score.model");
const NcaaPlayers = require('../../models/thirdPartySchema/ncaa_player.model');
const weekListDate = require('../../config/helper/week_helper');
const NcaaTeamRanking = require("../../models/thirdPartySchema/ncaa_team_ranking.model");


const getNcaaTeamList = async (req, res) => {

  const ncaaTeamList = await NcaaTeam.find({ status: true, isDelete: false }).sort({ team_name: 1 });
  ncaaTeamList.forEach(element => {
    element.logo_standard = getFilePath(element.logo_standard);
  });
  sendResponseData(res, 200, true, "NCAA team list", ncaaTeamList);
}

const getNcaaTeamList_leagueGr_1 = async (req, res) => {

  let filePath = config.file_path_start;
  const ncaaTeamList = await NcaaTeam.aggregate([
    {
      $project:
      {
        logo_standard: 1,
        logo_standard: { $concat: [filePath, "/", "$logo_standard"] },
        team_league: 1,
        team_id: 1,
        team_name: 1,
        team_division: 1,
        created_at: 1,
        updated_at: 1,
        __v: 1,
        _id: 1,
        isDelete: 1,
        status: 1,
        v: 1,
        k: 1,

      }
    },

    { $sort: { team_league: 1 } },
    {
      "$group": {
        "_id": {
          team_league: "$team_league",
          team_division: "$team_division",
        },
        "v": {
          "$addToSet": "$$ROOT"
        }
      }

    },
    {
      $group: {
        _id: {
          team_league: "$_id.team_league",
        },
        v: {
          "$addToSet": {
            k: "$_id.team_division",
            v: "$v"
          }
        }
      }
    },
    {
      "$addFields": {
        "v": {
          "$arrayToObject": "$v"
        }
      }
    },

    {
      $group: {
        _id: null,
        v: {
          "$addToSet": {
            k: "$_id.team_league",
            v: "$v"
          }
        }
      }
    },
    {
      "$addFields": {
        "v": {
          "$arrayToObject": "$v"
        }
      }
    },
    {
      "$replaceRoot": {
        "newRoot": "$v"
      }
    },
  ])

  sendResponseData(res, 200, true, "NCAA team list", ncaaTeamList);
}

const getNcaaTeamList_leagueGr = async (req, res) => {

  let filePath = config.file_path_start;
  const ncaaTeamList = await NcaaTeam.aggregate([
    {
      $project:
      {
        logo_standard: 1,
        logo_standard: { $concat: [filePath, "/", "$logo_standard"] },
        team_league: 1,
        team_id: 1,
        team_name: 1,
        team_division: 1,
        created_at: 1,
        updated_at: 1,
        __v: 1,
        _id: 1,
        isDelete: 1,
        status: 1,
        v: 1,
        k: 1,

      }
    },

    { $sort: { team_league: 1 } },
    {
      "$group": {
        "_id": {
          team_league: "$team_league",
          team_division: "$team_division",
        },
        "v": {
          "$addToSet": "$$ROOT"
        }
      }

    },
    {
      $group: {
        _id: {
          team_league: "$_id.team_league",
        },
        v: {
          "$addToSet": {
            k: "$_id.team_division",
            v: "$v"
          }
        }
      }
    },
    {
      "$addFields": {
        "v": {
          "$arrayToObject": "$v"
        }
      }
    },

    {
      $group: {
        _id: null,
        v: {
          "$addToSet": {
            k: "$_id.team_league",
            v: "$v"
          }
        }
      }
    },
    {
      "$addFields": {
        "v": {
          "$arrayToObject": "$v"
        }
      }
    },
    {
      "$replaceRoot": {
        "newRoot": "$v"
      }
    },
  ])

  sendResponseData(res, 200, true, "NCAA team list", ncaaTeamList);
}

const getNcaaTeamList_divisionGr = async (req, res) => {

  // const ncaaTeamList = await NcaaTeam.find({ status: true, isDelete: false }).sort({ team_league: 1, team_division: 1, team_name: 1 });
  const ncaaTeamList = await NcaaTeam.aggregate([
    {
      "$group": {
        "_id": {
          team_league: "$team_league",
          team_division: "$team_division",
        },
        "v": {
          "$addToSet": "$$ROOT"
        }
      }

    },
    {
      $group: {
        _id: {
          team_division: "$_id.team_division",
        },
        v: {
          "$addToSet": {
            k: "$_id.team_league",
            v: "$v"
          }
        }
      }
    },
    {
      "$addFields": {
        "v": {
          "$arrayToObject": "$v"
        }
      }
    },

    {
      $group: {
        _id: null,
        v: {
          "$addToSet": {
            k: "$_id.team_division",
            v: "$v"
          }
        }
      }
    },
    {
      "$addFields": {
        "v": {
          "$arrayToObject": "$v"
        }
      }
    },
    {
      "$replaceRoot": {
        "newRoot": "$v"
      }
    }

  ])

  sendResponseData(res, 200, true, "NCAA team list", ncaaTeamList);
}

const getNcaaTeamDetails = async (req, res) => {
  const teamId = req.params.teamId;
  const ncaaTeamDetails = await NcaaTeam.findOne({ team_id: teamId });

  ncaaTeamDetails.logo_standard = getFilePath(ncaaTeamDetails.logo_standard);

  sendResponseData(res, 200, true, "NCAA team details", ncaaTeamDetails);
}

const getNcaaTeamLeaderByTeamId = async (req, res) => {
  var teamId = req.query.team; // $_GET["team"]
  var year = (req.query.year) > 0 ? req.query.year : new Date().getFullYear(); // $_GET["year"]
  // console.log(year);

  const teamLeaderList = await NcaaPlayerStats.aggregate([
    { $match: { team_id: Number(teamId), season: Number(year) } },
    {$sort:{rank:1}},
    {
      $lookup:
      {
        from: 'ncaa_players',
        localField: 'player_id',
        foreignField: 'player_id',
        as: 'playerDetails'
      }
    },
    { $unwind: { path: '$playerDetails', preserveNullAndEmptyArrays: true } },
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
          "player_name":1,
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
        // minRank: { $max: "$rank" },
        "doc": { "$first": "$$ROOT" }
      },
    },
    { "$replaceRoot": { "newRoot": "$doc" } },
  ]).exec();

  teamLeaderList.forEach((each) => {
    if(each.playerDetails){
    each.playerDetails.profile_img = getFilePath(each.playerDetails.profile_img, 'ncaaf_players', 'player');
    }
  })

  sendResponseData(res, 200, true, "Ncaa Team Leaders list", teamLeaderList);
}

const getNcaaPlayerStatByTeamId = async (req, res) => {
  var teamId = req.query.team; // $_GET["team"]
  var year = req.query.year; // $_GET["team"]
  // console.log(teamId);
  var returnDataArr = {};
  returnDataArr['passing_data_list'] = [];
  returnDataArr['rushing_data_list'] = [];
  returnDataArr['receiving_data_list'] = [];

  const dataList = await NcaaPlayerStats.aggregate([
    // { $unwind: { path: "$playerDetails", preserveNullAndEmptyArrays: false } },
    { $match: { team_id: Number(teamId), season: Number(year) } },
    
    // { $sort: { yards: -1  } },
    // { $sort: {  receiving_yards: -1,  } },
    {
      $lookup:
      {
        from: 'ncaa_game_playeds',
        localField: 'player_id',
        foreignField: 'player_id',
        as: 'gamePlayed'
      }
    },
    {
      $addFields: {
        gamePlayed: { $size: "$gamePlayed" }
      }
    },
    // {
    //   $addFields: {
    //     yards_1: {$convert: {input:"$yards",to:'int'}}
    //   }
    // },
    // { $project:{
    //   stat_id: 1,
    //   team_id: 1,
    //   player_id: 1,
    //   player_name: 1,
    //   season: 1,
    //   stat_category: 1,
    //   completion_pct: 1,
    //   completions: 1,
    //   interceptions: 1,
    //   interceptions_pct: 1,
    //   longest_pass: 1,
    //   passing_attempts: 1,
    //   passing_touchdowns: 1,
    //   passing_touchdowns_pct: 1,
    //   quaterback_rating: 1,
    //   sacked_yards_lost: 1,
    //   sacks: 1,
    //   rank: 1,
    //   yards: 1,
    //   yards_per_game: 1,
    //   yards_per_pass_avg: 1,
    //   fumbles: 1,
    //   fumbles_lost: 1,
    //   longest_rush: 1,
    //   over_20_yards: 1,
    //   rank: 1,
    //   rushing_attempts: 1,
    //   rushing_first_downs: 1,
    //   rushing_touchdowns: 1,
    //   yards: 1,
    //   yards_per_game: 1,
    //   yards_per_rush_avg: 1,
    //   fumbles: 1,
    //   fumbles_lost: 1,
    //   longest_reception: 1,
    //   over_20_yards: 1,
    //   receiving_first_downs: 1,
    //   receiving_targets: 1,
    //   receiving_touchdowns: 1,
    //   receiving_yards: 1,
    //   receptions: 1,
    //   yards_after_catch: 1,
    //   yards_per_game: 1,
    //   yards_per_reception_avg: 1,
    //   gamePlayed:1,
    //   // yards_1:1
    // }},
    
  ]).exec();
  //dataList.sort(await dynamicSort("yards"));
 // dataList.sort(await dynamicSort("receiving_yards"));

  // dataList.forEach((item) => {
  //   if (item.stat_category == 'Passing') {
  //     returnDataArr['passing_data_list'].push(item)
  //   } else if (item.stat_category == 'Rushing') {
  //     returnDataArr['rushing_data_list'].push(item)
  //   } else if (item.stat_category == 'Receiving') {
  //     returnDataArr['receiving_data_list'].push(item)
  //   }
  // })


  dataList.forEach((item) => {
    if (item.stat_category == 'Passing') {
      returnDataArr['passing_data_list'].push(item)
      returnDataArr['passing_data_list'].sort((a,b)=>
      (a.rank < b.rank) ? -1 : ((b.rank > a.rank) ? 1 : 0)
      );
    } else if (item.stat_category == 'Rushing') {
      returnDataArr['rushing_data_list'].push(item)
      returnDataArr['rushing_data_list'].sort((a,b)=>
      (a.rank < b.rank) ? -1 : ((b.rank > a.rank) ? 1 : 0)
      );
    } else if (item.stat_category == 'Receiving') {
      returnDataArr['receiving_data_list'].push(item)
      returnDataArr['receiving_data_list'].sort((a,b)=>
      (a.rank < b.rank) ? -1 : ((b.rank > a.rank) ? 1 : 0)
      );
    }
  })

  sendResponseData(res, 200, true, "NCAA player stat list", returnDataArr);
}

async function dynamicSort(property) {
  var sortOrder = -1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      return Number(b[property]) - Number(a[property]);
  }
}

const NcaaScheduleList = async (req, res) => {

  try {
    let condition = {};
    // let cond = {};

    console.log("============", req.body);
    const searchYear = req.body.year;
    const searchTeam = Number(req.body.team);
    const searchWeek = req.body.week;
    const league = req.body.league;
    //only year
    if (searchYear) {
      condition = {
        $and: [{
          sheduleDate: {
            $gte: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
            $lte: new Date(searchYear, 11, 31)
          }

        }]
      }
    }
    //only team
    if (searchTeam) {
      condition = {
        $or: [{ "homeTeam.team_id": searchTeam }, { "awayTeam.team_id": searchTeam }]

      }
    }
    //only week 
    if (searchWeek) {
      condition = {
        scheduleWeek: searchWeek
      }
    }
    //league
    if (league) {
      // cond={"homeTeam.team_league":league}
      condition = {
        $or: [{ "homeTeam.team_league": league }, { "awayTeam.team_league": league }]
      }
    }
    //---------------ncaa schedule condition start--------------------
    //year and league and week
    if (searchYear && searchWeek && league) {
      console.log("9999999999999999999999999", searchYear, league, searchWeek);
      condition = {
        $and: [
          {
            sheduleDate: {
              $gte: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lte: new Date(searchYear, 11, 31)
            }
          },
          // {$or:[{ homeTeam:searchTeam},{ awayTeam:searchTeam}]},
          { $or: [{ "homeTeam.team_league": league }, { "awayTeam.team_league": league }] },
          { scheduleWeek: searchWeek }
        ],

      }
      // console.log(condition);
    }
    //year and week
    if (searchYear && searchWeek && !league) {
      condition = {
        $and: [
          {
            sheduleDate: {
              $gte: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lte: new Date(searchYear, 11, 31)
            }
          },
          { scheduleWeek: searchWeek }
        ],

      }
    }

    //week and league
    if (searchWeek && league && !searchYear) {
      condition = {
        $and: [
          // {$or:[{ homeTeam:searchTeam},{ awayTeam:searchTeam}]},
          { $or: [{ "homeTeam.team_league": league }, { "awayTeam.team_league": league }] },
          { scheduleWeek: searchWeek }
        ],
      }
    }

    //year and league
    if (searchYear && league && !searchWeek) {
      // console.log("9999999999999999999999999", searchYear, searchTeam, searchWeek);
      condition = {
        $and: [
          {
            sheduleDate: {
              $gte: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lte: new Date(searchYear, 11, 31)
            }
          },
          // {$or:[{ homeTeam:searchTeam},{ awayTeam:searchTeam}]},
          { $or: [{ "homeTeam.team_league": league }, { "awayTeam.team_league": league }] },
          // {scheduleWeek:searchWeek}
        ],

      }
      // console.log(condition);
    }

    //---------------ncaa schedule condition end--------------------

    //---------------ncaa teamwise schedule condition start--------------------
    //year and team
    if (searchYear && searchTeam && !searchWeek) {
      condition = {
        $and: [
          {
            sheduleDate: {
              $gte: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lte: new Date(searchYear, 11, 31)
            }
          },
          { $or: [{ "homeTeam.team_id": searchTeam }, { "awayTeam.team_id": searchTeam }] }
        ],

      }
    }

    //team and week
    if (searchTeam && searchWeek && !searchYear) {
      condition = {
        $and: [
          { $or: [{ "homeTeam.team_id": searchTeam }, { "awayTeam.team_id": searchTeam }] },
          { scheduleWeek: searchWeek }
        ],

      }
    }
    //---------------ncaa teamwise schedule condition end--------------------


    console.log("condition", condition);
    const NcaaScheduleList = await NcaaSchedule.aggregate([
      // {
      //   $project: {
      //     // week:{$dayOfMonth:"$sheduleDate"},
      //     sheduleDate: 1,
      //     status: 1,
      //     sheduleTime: 1,
      //     awayTeam: { $ifNull: ["$awayTeam", "$awayTeam"] },
      //     homeTeam: { $ifNull: ["$homeTeam", "$homeTeam"] },
      //     venue: 1,
      //     date: 1,
      //     isDelete: 1,
      //     created_at: 1,
      //     scheduleWeek: 1,
      //     awayTeamScore: 1,
      //     homeTeamScore: 1,
      //     hipassing: 1,
      //     hirushing: 1,
      //     hireceiving: 1,

      //   }
      // },
      { $sort: { sheduleDate: -1 } },
      { $match: { status: true, isDelete: false } },

      //home team
      {
        $lookup: {
          from: "ncaa_teams",
          localField: "homeTeam",
          foreignField: "team_id",
          as: "homeTeam"
        }
      },
      { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: true } },

      // //awayTeam
      {
        $lookup: {
          from: "ncaa_teams",
          localField: "awayTeam",
          foreignField: "team_id",
          as: "awayTeam"
        }
      },
      { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: true } },
      { $match: condition },
      // { $sort: { sheduleDate: 1 } },

      {
        $project: {
          // week:{$dayOfMonth:"$sheduleDate"},
          sheduleDate: 1,
          status: 1,
          sheduleTime: 1,
          awayTeam: { $ifNull: ["$awayTeam", "awayTeam"] },
          homeTeam: { $ifNull: ["$homeTeam", "homeTeam"] },
          venue: 1,
          date: 1,
          isDelete: 1,
          created_at: 1,
          scheduleWeek: 1,
          awayTeamScore: 1,
          homeTeamScore: 1,
          hipassing: 1,
          hirushing: 1,
          hireceiving: 1,

        }
      },
      {
        $group: {
          _id: "$sheduleDate",
          "doc": { "$addToSet": "$$ROOT" }
        },
      },
      { $sort: { "_id": 1 } },

    ])

    console.log(NcaaScheduleList.length);
    if (NcaaScheduleList.length == 0) {
      sendResponseData(res, 200, true, "No data found", []);
    }
    else {
      NcaaScheduleList.forEach((item) => {
        item.doc.forEach(each => {
          // if(each.awayTeam || each.homeTeam){

          //   each.awayTeam.logo_standard = getFilePath(each.awayTeam.logo_standard);
          //   each.homeTeam.logo_standard = getFilePath(each.homeTeam.logo_standard);
          // }


        })
      })
      sendResponseData(res, 200, true, "NCAA Schedule list", NcaaScheduleList);

    }

  }
  catch (error) {
    console.log(error);
    sendResponseData(res, 200, false, "Error", error);

  }

}

const ncaaDivisionList = async (req, res) => {
  // const ncaaDivisonList = await NcaaTeam.find({ status: true, isDelete: false }).select({ team_league: 1 });
  try {
    const ncaaDivisonList = await NcaaTeam.aggregate([
      { $match: { status: true, isDelete: false } },
      { $project: { team_league: 1 } },
      { $group: { _id: "$team_league" } }, 
      { $sort: { _id: 1 } },
    ])

    sendResponseData(res, 200, true, "NCAA team list", ncaaDivisonList);

  }
  catch (err) {
    console.log(err);

  }

}

const getNCaaRosterByTeamId = async (req, res) => {
  var teamId = req.query.teamId;

  const NcaaRosterList = await NcaaRosters.aggregate([
    { $match: { teamId: Number(teamId) } },
    {
      $lookup:
      {
        from: 'ncaa_players',
        localField: 'player_id',
        foreignField: 'player_id',
        as: 'playerDetails'

      }
    },
    { $unwind: { path: '$playerDetails', preserveNullAndEmptyArrays: false } },
    {
      $group:
      {
        _id: { "team_position": "$team_position" },
        "team_position": { $first: "$team_position" },
        "doc": { "$addToSet": "$$ROOT" }
      }
    },
  ])
  const NcaaRosterListSort = [];

  if (NcaaRosterList.length > 0) {
    NcaaRosterList.forEach((element) => {
      element.doc.forEach((each) => {
        each.playerDetails.profile_img = getFilePath(each.playerDetails.profile_img, 'ncaaf_players', 'player');
      })
      if (element.team_position == 'Offense') {
        NcaaRosterListSort[0] = element;
      } else if (element.team_position == 'Defense') {
        NcaaRosterListSort[1] = element;
      } else {
        NcaaRosterListSort[2] = element;
      }
    })
  }



  sendResponseData(res, 200, true, "Ncaa Rosters data teamwise", NcaaRosterListSort);

}

const getNcaaScore = async (req, res) => {
  try {

    let condition = {};

    const searchYear = req.body.year;
    const searchWeek = req.body.week;


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

    if (searchYear && searchWeek) {
      let d1;
      let d2;
      let getDates = weekListDate.getWeekDates(searchYear, searchWeek);
      console.log(getDates);

      d1 = getDates[0];
      d2 = getDates[1];

      let startDate = searchYear + '-' + d1;
      let endDate = searchYear + '-' + d2;

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

    const getNcaaScoreList = await NcaaScore.aggregate([
      { $sort: { matchDate: 1 } },
      { $match: { status: true, isDelete: false } },
      { $match: condition },

      // home team
      {
        $lookup: {
          from: "ncaa_teams",
          localField: "homeTeam",
          foreignField: "team_id",
          as: "homeTeam"
        }
      },
      { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
      //awayTeam
      {
        $lookup: {
          from: "ncaa_teams",
          localField: "awayTeam",
          foreignField: "team_id",
          as: "awayTeam"
        }
      },
      { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
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

    console.log(getNcaaScoreList.length);


    if (getNcaaScoreList.length == 0) {
      sendResponseData(res, 200, true, "No data found", []);
    } else {
      getNcaaScoreList.forEach((each, index) => {
        if (each.doc.length > 0) {
          each.doc.map((scorItem, index) => {
            if(scorItem.passing){

              const passing_awayteam_players = scorItem.passing.awayteam.player;
              const passing_hometeam_players = scorItem.passing.hometeam.player;
              scorItem.maxPassing = {
                "awayteam": (passing_awayteam_players.length >= 2) ? getMaxAvgPlayer(passing_awayteam_players) : passing_awayteam_players,
                "hometeam": (passing_hometeam_players.length >= 2) ? getMaxAvgPlayer(passing_hometeam_players) : passing_hometeam_players,
              };
            }
            if(scorItem.rushing){

              const rushing_awayteam_players = scorItem.rushing.awayteam.player;
              const rushing_hometeam_players = scorItem.rushing.hometeam.player;
              scorItem.maxRushing = {
                "awayteam": (rushing_awayteam_players.length >= 2) ? getMaxAvgPlayer(rushing_awayteam_players) : rushing_awayteam_players,
                "hometeam": (rushing_hometeam_players.length >= 2) ? getMaxAvgPlayer(rushing_hometeam_players) : rushing_hometeam_players,
              };
            }
            if (scorItem.receiving) {

              const receiving_awayteam_players = scorItem.receiving.awayteam.player;
              const receiving_hometeam_players = scorItem.receiving.hometeam.player;
              scorItem.maxReceiving = {
                "awayteam": (receiving_awayteam_players.length >= 2) ? getMaxAvgPlayer(receiving_awayteam_players) : receiving_awayteam_players,
                "hometeam": (receiving_hometeam_players.length >= 2) ? getMaxAvgPlayer(receiving_hometeam_players) : receiving_hometeam_players,
              };
            }



            scorItem.awayTeam.logo_standard = getFilePath(scorItem.awayTeam.logo_standard);
            scorItem.homeTeam.logo_standard = getFilePath(scorItem.homeTeam.logo_standard);


          })
        }
        // console.log('passing_awayteam_players.length', each);


      })

      sendResponseData(res, 200, true, "Ncaa Score list", getNcaaScoreList);

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

const getNcaaPlayerDetails = async (req, res) => {
  try {

    const playerId = req.params.playerId;
    const ncaaPlayerData = await NcaaPlayers.findOne({ player_id: playerId })
    ncaaPlayerData.profile_img = getFilePath(ncaaPlayerData.profile_img, 'ncaaf_players', 'player');
    sendResponseData(res, 200, true, "NCAA player data", ncaaPlayerData);


  }
  catch (error) {
    console.log(error);
    sendResponseData(res, 200, false, "some error", {});
  }

}

const getNcaaPlayerGameLog = async (req, res) => {
  try {
    let playerId = req.query.playerId;
    let searchYear = req.query.year;

    console.log(playerId);
    let playerGameLog = await NcaaScore.aggregate([
      {
        $lookup: {
          from: 'ncaa_teams',
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
          from: 'ncaa_teams',
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

    console.log("playerGameLog", playerGameLog);


    if (playerGameLog.length == 0) {
      sendResponseData(res, 200, true, "No data found", []);
    }
    else {
      playerGameLog.forEach((item) => {
        item.awayTeamDetails.logo_standard = getFilePath(item.awayTeamDetails.logo_standard);
        item.homeTeamDetails.logo_standard = getFilePath(item.homeTeamDetails.logo_standard);

      })

      sendResponseData(res, 200, true, "players game log", playerGameLog);
    }

  }
  catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}


const getNcaaTeamRanking = async (req, res) => {
  try {
    var currentYear = new Date().getFullYear();  // returns the current year
    let teamRankingList = await NcaaTeamRanking.aggregate([
      {
        $lookup: {
          from: 'ncaa_teams',
          localField: 'team_id',
          foreignField: 'team_id',
          as: 'teamDetails'
        }
      },
      {
        $unwind: { path: '$teamDetails', preserveNullAndEmptyArrays: false }
      },
      { $match: {session : currentYear} },
      { $sort: { team_points: -1 } },
    ]);

    if (teamRankingList.length == 0) {
      sendResponseData(res, 200, true, "No data found", []);
    } else {
      var teamRankingListAP = [];
      var teamRankingListCoaches = [];
      
      teamRankingList.forEach((item) => {
        item.teamDetails.logo_standard = getFilePath(item.teamDetails.logo_standard);
        if (item.rank_type == 'AP') {
          teamRankingListAP.push(item);
        } else {
          teamRankingListCoaches.push(item);
        }
      })
      
      sendResponseData(res, 200, true, "Ncaa Team Ranking List", {AP : teamRankingListAP, Coaches : teamRankingListCoaches});
    }
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}


module.exports = {
  getNcaaTeamList,
  getNcaaTeamList_leagueGr,
  getNcaaTeamList_divisionGr,
  getNcaaTeamDetails,
  getNcaaTeamLeaderByTeamId,
  getNcaaPlayerStatByTeamId,

  NcaaScheduleList,
  ncaaDivisionList,
  getNCaaRosterByTeamId,
  getNcaaScore,
  getNcaaPlayerDetails,
  getNcaaPlayerGameLog,
  getNcaaTeamRanking,
}