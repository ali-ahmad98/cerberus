const FollowTeams = require("../../models/thirdPartySchema/follow_teams");
const NflScore = require("../../models/thirdPartySchema/nfl_score.model");
const NflPlayerStats = require("../../models/thirdPartySchema/nfl_player_stat.model");

const NcaaScore = require("../../models/thirdPartySchema/ncaa_score.model");
const weekListDate = require("../../config/helper/week_helper");

const { sendResponseData, getFilePath } = require("../../util/Utility");
const config = require("../../config/config");
const nfl_Schedule = require("../../models/thirdPartySchema/nfl_schedule.model");
const ncaa_Schedule = require("../../models/thirdPartySchema/ncaa_schedule.model");
const nflFantasyScore = require("../../models/thirdPartySchema/nfl_fantasy_score.model");
// const ncaaFantasyScore = require("../../models/thirdPartySchema/ncaa_fantasy_score.model");
// const ncaa_fantasy_score = require("../../models/thirdPartySchema/ncaa_fantasy_score.model");
const ncaaFantasyScore = require("../../models/thirdPartySchema/ncaa_fantasy_score.model");

const checkFollowTeam = async (req, res) => {
  try {
    let userId = req.query.userId;
    let teamId = req.query.teamId;
    let teamType = req.query.teamType;
    const checkData = await FollowTeams.findOne({
      team_id: Number(teamId),
      user_id: userId,
      team_type: teamType,
      is_follow: true,
    });
    if (checkData) {
      sendResponseData(res, 200, true, "Followed", "follow");
    } else {
      sendResponseData(res, 200, true, "Unfollow", "unfollow");
    }
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const followTeam = async (req, res) => {
  try {
    let userId = req.query.userId;
    let teamId = req.query.teamId;
    let teamType = req.query.teamType;
    const checkData = await FollowTeams.findOne({
      team_id: Number(teamId),
      user_id: userId,
      team_type: teamType,
    });
    // console.log('checkData', checkData);
    if (checkData) {
      const updateData = {
        is_follow: !checkData.is_follow,
      };
      const update = await FollowTeams.updateOne(
        { team_id: teamId, user_id: userId, team_type: teamType },
        updateData
      );
      if (updateData.is_follow) {
        sendResponseData(res, 200, true, "Follow successfully", "follow");
      } else {
        sendResponseData(res, 200, true, "Unfollow successfully", "unfollow");
      }
    } else {
      const newData = new FollowTeams({
        team_id: teamId,
        user_id: userId,
        is_follow: true,
        team_type: teamType,
      });

      var followData = await newData.save();
      sendResponseData(res, 200, true, "Follow successfully", "follow");
    }
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const bothLiveScore_back = async (req, res) => {
  try {
    let page = req.query.page;
    let response = "";
    let nflScore;
    let ncaaScore;
    let currentDate = new Date().getFullYear();
    let beforeDate = new Date(new Date().setDate(new Date().getDate() - 3));
    let condition = {};
    let sortQuery = {};
    let d = new Date();
    let a = d.toLocaleString("default", { month: "2-digit" });
    let c = d.toLocaleString("default", { day: "2-digit" });
    let date = currentDate + "-" + a + "-" + c;
    // let nflScore = await NflScore.find(condition).limit(5).select('awayTeam homeTeam awayTeamScore homeTeamScore').populate('homeTeam','awayTeam');
    // let ncaaScore = await NcaaScore.find(condition).limit(5).select('awayTeam homeTeam awayTeamScore homeTeamScore').populate('homeTeam','awayTeam');

    let select = {
      awayTeam: 1,
      homeTeam: 1,
      awayTeamScore: 1,
      homeTeamScore: 1,
      matchDate: 1,
      matchTime: 1,
    };
    if (page == "NFL") {
      let d = new Date();
      console.log(d);
      let a = d.toLocaleString("default", { month: "2-digit" });
      let c = d.toLocaleString("default", { day: "2-digit" });
      let date = a + "-" + c;
      // console.log(date);

      let getdates = weekListDate.getWeek(currentDate, date);
      let d1 = getdates[0];
      let d2 = getdates[1];
      let startDate = currentDate + "-" + d1;
      let endDate = currentDate + "-" + d2;
      console.log(startDate, endDate);
      if (d1 != undefined && d2 != undefined) {
        condition = {
          $and: [
            { matchDate: { $gte: new Date(`${startDate}T00:00:00.000Z`) } },
            { matchDate: { $lte: new Date(`${endDate}T23:59:59.999Z`) } },
          ],
        };
        sortQuery = { matchDate: 1 };
      } else {
        condition = {
          $and: [
            { matchDate: { $gt: new Date(currentDate, 0, 2) } },
            { matchDate: { $lt: new Date(currentDate, 11, 31) } },
          ],
        };
        sortQuery = { matchDate: -1 };
      }

      nflScore = await NflScore.aggregate([
        {
          $match: { $or: [condition] },
        },
        // {
        //     $limit:5
        // },
        {
          $lookup: {
            from: "nfl_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        //awayTeam
        {
          $lookup: {
            from: "nfl_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
        { $sort: sortQuery },
      ]);
    } else if (page == "NCAAF") {
      let d = new Date();
      console.log(d);
      let a = d.toLocaleString("default", { month: "2-digit" });
      let c = d.toLocaleString("default", { day: "2-digit" });
      let date = a + "-" + c;
      let getdates = weekListDate.getNcaaWeek(currentDate, date);
      let d1 = getdates[0];
      let d2 = getdates[1];
      let startDate = currentDate + "-" + d1;
      let endDate = currentDate + "-" + d2;
      console.log(startDate, endDate);
      if (d1 != undefined && d2 != undefined) {
        console.log("00000000000000");
        condition = {
          $and: [
            { matchDate: { $gte: new Date(`${startDate}T00:00:00.000Z`) } },
            { matchDate: { $lte: new Date(`${endDate}T23:59:59.999Z`) } },
          ],
        };
        sortQuery = { matchDate: 1 };
      } else {
        console.log("fdsvfgdg");

        condition = {
          $and: [
            { matchDate: { $gt: new Date(currentDate, 0, 2) } },
            { matchDate: { $lt: new Date(currentDate, 11, 31) } },
          ],
        };
        sortQuery = { matchDate: 1 };
      }

      ncaaScore = await NcaaScore.aggregate([
        {
          $match: condition,
        },
        // {
        //     $limit:5
        // },
        {
          $project: select,
        },
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        //awayTeam
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
        { $sort: sortQuery },
      ]);
    } else {
      condition = {
        $and: [
          { matchDate: { $gt: new Date(currentDate, 0, 2) } },
          { matchDate: { $lt: new Date(currentDate, 11, 31) } },
        ],
      };
      nflScore = await NflScore.aggregate([
        {
          $match: condition,
        },
        // {
        //     $limit:5
        // },
        {
          $project: select,
        },
        {
          $lookup: {
            from: "nfl_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        //awayTeam
        {
          $lookup: {
            from: "nfl_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
        { $sort: { matchDate: -1 } },
      ]);
      ncaaScore = await NcaaScore.aggregate([
        {
          $match: condition,
        },
        // {
        //     $limit:5
        // },
        {
          $project: select,
        },
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        //awayTeam
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
        { $sort: { matchDate: -1 } },
      ]);
    }

    response = {
      NFL: nflScore ? nflScore : "",
      NCAA: ncaaScore ? ncaaScore : "",
      condition: condition,
    };
    // console.log("currentDate",condition);
    sendResponseData(res, 200, true, "live score data", response);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const bothLiveScore = async (req, res) => {
  try {
    let page = req.query.page;
    let searchWeek = req.query.week;
    // let week_nfl = req.query.week_nfl;
    let week_ncaaf = req.query.week_ncaaf;

    let response = "";
    let nflScore;
    let ncaaScore;
    let currentDate = new Date().getFullYear();
    let beforeDate = new Date(new Date().setDate(new Date().getDate() - 3));
    let condition = {};
    let sortQuery = {};
    let d = new Date(new Date().setDate(new Date().getDate() - 1));
    let a = d.toLocaleString("default", { month: "2-digit" });
    let c = d.toLocaleString("default", { day: "2-digit" });
    let dateFrom = currentDate + "-" + a + "-" + c;
    let dd = new Date(new Date().getFullYear(), 11, 31); //last date of year
    let a1 = dd.toLocaleString("default", { month: "2-digit" });
    let c1 = dd.toLocaleString("default", { day: "2-digit" });
    let dateTo = currentDate + "-" + a1 + "-" + c1;
    // console.log(d);
    console.log("dateFrom", dateFrom);
    // let nflScore = await NflScore.find(condition).limit(5).select('awayTeam homeTeam awayTeamScore homeTeamScore').populate('homeTeam','awayTeam');
    // let ncaaScore = await NcaaScore.find(condition).limit(5).select('awayTeam homeTeam awayTeamScore homeTeamScore').populate('homeTeam','awayTeam');

    let select = {
      awayTeam: 1,
      homeTeam: 1,
      awayTeamScore: 1,
      homeTeamScore: 1,
      matchDate: 1,
      matchTime: 1,
    };
    if (page == "NFL") {
      // if (searchYear && searchWeek ) {
      let d1;
      let d2;
      let getDates = weekListDate.getDates(currentDate, searchWeek);
      console.log(getDates);

      d1 = getDates[0];
      d2 = getDates[1];

      let startDate = currentDate + "-" + d1;
      let endDate = currentDate + "-" + d2;

      console.log(startDate, endDate);

      condition = {
        $and: [
          {
            matchDate: {
              // $gte: new Date(`${dateFrom}T00:00:00.000Z`),
              $gte: new Date(`${startDate}T00:00:00.000Z`),
              $lte: new Date(`${endDate}T23:59:59.999Z`),
            },
          },
        ],
      };
      sortQuery = { matchDate: 1 };
      // }

      nflScore = await NflScore.aggregate([
        {
          $match: { $or: [condition] },
        },
        // {
        //     $limit:5
        // },
        {
          $lookup: {
            from: "nfl_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        //awayTeam
        {
          $lookup: {
            from: "nfl_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
        { $sort: sortQuery },
      ]);
    } else if (page == "NCAAF") {
      // if (searchYear && searchWeek) {
      let d1;
      let d2;
      let getDates = weekListDate.getWeekDates(currentDate, searchWeek);
      console.log(getDates);

      d1 = getDates[0];
      d2 = getDates[1];

      let startDate = currentDate + "-" + d1;
      let endDate = currentDate + "-" + d2;

      console.log(startDate, endDate);

      condition = {
        $and: [
          {
            matchDate: {
              //   $gte: new Date(`${dateFrom}T00:00:00.000Z`),
              $gte: new Date(`${startDate}T00:00:00.000Z`),
              $lte: new Date(`${endDate}T23:59:59.999Z`),
            },
          },
        ],
      };
      sortQuery = { matchDate: 1 };

      //   }

      ncaaScore = await NcaaScore.aggregate([
        {
          $match: condition,
        },
        // {
        //     $limit:5
        // },
        {
          $project: select,
        },
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        //awayTeam
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
        { $sort: sortQuery },
      ]);
    } else {
      let nfl_d1;
      let nfl_d2;
      let nfl_getDates = weekListDate.getDates(currentDate, searchWeek);
      console.log(nfl_getDates);

      nfl_d1 = nfl_getDates[0];
      nfl_d2 = nfl_getDates[1];

      let nfl_startDate = currentDate + "-" + nfl_d1;
      let nfl_endDate = currentDate + "-" + nfl_d2;

      console.log(nfl_startDate, nfl_endDate);

      let ncaaf_d1;
      let ncaaf_d2;
      console.log("currentDate = ", currentDate);
      let ncaaf_getDates = weekListDate.getWeekDates(currentDate, week_ncaaf);
      console.log(ncaaf_getDates);

      ncaaf_d1 = ncaaf_getDates[0];
      ncaaf_d2 = ncaaf_getDates[1];

      let ncaaf_startDate = currentDate + "-" + ncaaf_d1;
      let ncaaf_endDate = currentDate + "-" + ncaaf_d2;

      console.log(ncaaf_startDate, ncaaf_endDate);

      let nfl_condition = {
        $and: [
          {
            matchDate: {
              $gte: new Date(`${nfl_startDate}T00:00:00.000Z`),
              $lte: new Date(`${nfl_endDate}T23:59:59.999Z`),
            },
          },
        ],
      };
      let ncaaf_condition = {
        $and: [
          {
            matchDate: {
              $gte: new Date(`${ncaaf_startDate}T00:00:00.000Z`),
              $lte: new Date(`${ncaaf_endDate}T23:59:59.999Z`),
            },
          },
        ],
      };
      nflScore = await NflScore.aggregate([
        {
          $match: nfl_condition,
        },
        // {
        //     $limit:5
        // },
        {
          $project: select,
        },
        {
          $lookup: {
            from: "nfl_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        //awayTeam
        {
          $lookup: {
            from: "nfl_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
        { $sort: { matchDate: 1 } },
      ]);
      ncaaScore = await NcaaScore.aggregate([
        {
          $match: ncaaf_condition,
        },
        // {
        //     $limit:5
        // },
        {
          $project: select,
        },
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        //awayTeam
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
        { $sort: { matchDate: 1 } },
      ]);
    }

    response = {
      NFL: nflScore ? nflScore : "",
      NCAA: ncaaScore ? ncaaScore : "",
      // condition:condition
    };
    // console.log("currentDate",condition);
    sendResponseData(res, 200, true, "live score data", response);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const scoreBoard = async (req, res) => {
  try {
    let page = req.query.page;
    let response = "";

    let currentDate = new Date();
    let beforeDate = new Date(new Date().setDate(new Date().getDate() + 3));
    let condition = {
      $or: [{ matchDate: { $gt: currentDate } }, { matchDate: { $lt: currentDate } }],
    };
    // let nflScore = await NflScore.find(condition).limit(5).select('awayTeam homeTeam awayTeamScore homeTeamScore').populate('homeTeam','awayTeam');
    // let ncaaScore = await NcaaScore.find(condition).limit(5).select('awayTeam homeTeam awayTeamScore homeTeamScore').populate('homeTeam','awayTeam');

    let select = {
      awayTeam: 1,
      homeTeam: 1,
      awayTeamScore: 1,
      homeTeamScore: 1,
      matchDate: 1,
      matchTime: 1,
    };

    if (page == "NFL") {
      response = await NflScore.aggregate([
        {
          $match: condition,
        },
        {
          $limit: 8,
        },
        {
          $project: select,
        },
        {
          $lookup: {
            from: "nfl_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        //awayTeam
        {
          $lookup: {
            from: "nfl_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
      ]);
    } else if (page == "NCAA") {
      response = await NcaaScore.aggregate([
        {
          $match: condition,
        },
        {
          $limit: 8,
        },
        {
          $project: select,
        },
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        //awayTeam
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
      ]);
    }

    console.log("currentDate", currentDate, "beforeDate", beforeDate);
    sendResponseData(res, 200, true, "live score data", response);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const getFantasyScore = async (req, res) => {
  try {
    console.log("----------------------------------------", req.body);
    let nflScore;
    let NflPlayerStatsList;
    let nflOpponentList;
    let nflData;
    let ncaaScore;
    let response = "";
    let page = req.body.page;
    let condition = {};
    let condition_opp = {};
    let sortQuery = {};
    let currentDate = new Date().getFullYear();
    let searchYear = req.body.year;
    let filePath = config.file_path_start;

    if (page == "NFL") {
      let weekFrom = req.body.weekFrom;
      let weekTo = req.body.weekTo;

      let team_id = req.body.team_id;
      let season = req.body.season;
      let week = req.body.week;

      condition = { season: season, team_id: team_id };
      condition_opp = {
        $and: [
          {
            sheduleDate: {
              $gt: new Date(season, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lt: new Date(season, 11, 31),
            },
          },
          { $or: [{ homeTeam: Number(team_id) }, { awayTeam: Number(team_id) }] },
          { scheduleWeek: week },
          { status: true },
          { isDelete: false },
        ],
      };
      NflPlayerStatsList = await NflPlayerStats.aggregate([
        {
          $match: { $and: [condition] },
        },

        {
          $lookup: {
            from: "nfl_teams",
            localField: "team_id",
            foreignField: "team_id",
            as: "team_details",
          },
        },
        { $unwind: { path: "$team_details", preserveNullAndEmptyArrays: false } },
        //   //awayTeam
        {
          $lookup: {
            from: "nfl_players",
            localField: "player_id",
            foreignField: "player_id",
            as: "player_details",
          },
        },
        { $unwind: { path: "$player_details", preserveNullAndEmptyArrays: true } },

        {
          $group: {
            _id: "$player_name",
            // minRank: { $min: "$rank" },
            player_details: { $first: "$player_details" },
            team_details: { $first: "$team_details" },
            doc: { $addToSet: "$$ROOT" },
          },
        },

        //   {$sort:sortQueryplayer_details
      ]);

      // NflPlayerStatsList.forEach((each)=>{
      //     if(each.player_details){
      //         each.player_details.profile_img = getFilePath(each.player_details.profile_img, 'nfl_players', 'player');
      //     }
      // })

      nflOpponentList = await nfl_Schedule.aggregate([
        { $match: condition_opp },
        {
          $lookup: {
            from: "nfl_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        // //awayTeam
        {
          $lookup: {
            from: "nfl_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
      ]);

      NflPlayerStatsList.forEach((each) => {
        if (each.player_details) {
          each.player_details.profile_img = getFilePath(
            each.player_details.profile_img,
            "nfl_players",
            "player"
          );
        }
      });
      NflPlayerStatsList = NflPlayerStatsList.map((each) => {
        each = { ...each, opponent: nflOpponentList[0] };
        return each;
      });

      // NflPlayerStatsList.push(
      //     {opponent:nflOpponentList[0]}
      //     )
      // nflData = {
      //     nflOpponentList,
      //     NflPlayerStatsList
      // }
    }
    // if(page == 'NCAAF'){

    // }
    response = {
      NFL: NflPlayerStatsList ? NflPlayerStatsList : "",
      // NFL:nflData
      // NCAA:ncaaScore?ncaaScore:'',
      // condition:condition
    };
    sendResponseData(res, 200, true, "live score data", response);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const getFantasyScore_recent_nfl = async (req, res) => {
  try {
    // console.log("----------------------------------------",req.body);
    let nflScore;
    let NflPlayerStatsList;
    let nflOpponentList;
    let NcaaPlayerStatsList;
    let ncaaOpponentList;
    let nflData;
    let ncaaScore;
    let response = "";
    let page = req.body.page;
    let condition = {};
    let condition_opp = {};
    let sortQuery = {};
    let filePath = config.file_path_start;

    if (page == "NFL") {
      let weekFrom = req.body.weekFrom;
      let weekTo = req.body.weekTo;

      let team_id = req.body.team_id;
      let season = req.body.season;
      let week = req.body.week;
      let limit = req.body.limit;
      let player_position = req.body.player_position;
      let score_type = req.body.score_type;

      // condition={season:season,team_id:team_id}
      condition = { season: season };
      if (team_id) {
        condition = { ...condition, team_id: team_id };
      }
      if (player_position) {
        condition = { ...condition, "player_details.position": player_position };
      }

      condition_opp = {
        $and: [
          //   {
          //   sheduleDate:{
          //     $gt:new Date(season,0,1), //new Date('year','month','date') jan=0, dec=11
          //     $lt: new Date(season,11,31)
          //   }
          // },
          // {$or:[{ homeTeam:Number(team_id)},{ awayTeam:Number(team_id)}]},
          { scheduleWeek: week },
          { status: true },
          { isDelete: false },
        ],
      };

      NflPlayerStatsList = await nflFantasyScore.aggregate([
        {
          $lookup: {
            from: "nfl_teams",
            localField: "team_id",
            foreignField: "team_id",
            as: "team_details",
          },
        },
        { $unwind: { path: "$team_details", preserveNullAndEmptyArrays: false } },
        {
          $lookup: {
            from: "nfl_players",
            localField: "player_id",
            foreignField: "player_id",
            as: "player_details",
          },
        },
        { $unwind: { path: "$player_details", preserveNullAndEmptyArrays: true } },
        {
          $match: { $and: [condition] },
        },
      ]);

      //----------------comment
      // NflPlayerStatsList = await NflPlayerStats.aggregate([

      //     {
      //         $match:{$and:[condition]}
      //     },
      // {
      //     $lookup: {
      //       from: "nfl_teams",
      //       localField: "team_id",
      //       foreignField: "team_id",
      //       as: "team_details"
      //     }
      //   },
      //   { $unwind: { path: "$team_details", preserveNullAndEmptyArrays: false } },
      //     //   //awayTeam
      //   {
      //     $lookup: {
      //       from: "nfl_players",
      //       localField: "player_id",
      //       foreignField: "player_id",
      //       as: "player_details"
      //     }
      //   },
      //   { $unwind: { path: "$player_details", preserveNullAndEmptyArrays: true } },
      //   {
      //     $group:
      //     {
      //         _id: "$player_name",
      //         // minRank: { $min: "$rank" },
      //         player_details :{$first:"$player_details"},
      //         team_details:{$first:"$team_details"},
      //         "doc": { "$addToSet": "$$ROOT" }
      //     },
      //    },

      //     //   {$sort:sortQueryplayer_details
      // ])

      // NflPlayerStatsList.forEach((each)=>{
      //     if(each.player_details){
      //         each.player_details.profile_img = getFilePath(each.player_details.profile_img, 'nfl_players', 'player');
      //     }
      // })

      //----------------comment

      nflOpponentList = await nfl_Schedule.aggregate([
        { $match: condition_opp },
        {
          $lookup: {
            from: "nfl_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        // //awayTeam
        {
          $lookup: {
            from: "nfl_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
      ]);

      //----------------comment

      // NflPlayerStatsList.forEach((each)=>{
      // if(each.player_details){
      //     each.player_details.profile_img = getFilePath(each.player_details.profile_img, 'nfl_players', 'player');
      // }
      // })
      //----------------comment
      NflPlayerStatsList = NflPlayerStatsList.map((each) => {
        if (score_type === "STD") {
          //================For STD===============================

          // if(each.Passing){
          //     each.toatalPasing = each.Passing[0] ? ((Number(each.Passing[0]?.yards.replace(',', ''))/25)+(Number(each.Passing[0]?.passing_touchdowns)*4)+(Number(each.Passing[0]?.interceptions)*(-2))):0;
          //     // return toatalPasing;
          // }
          // if(each.Rushing){
          //     each.toatalRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.yards.replace(',', ''))/10)+(Number(each.Rushing[0]?.rushing_touchdowns)*6)):0;
          //     each.fumbleLostRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.fumbles_lost)*(-2))):0;
          // }
          // if(each.Receiving){
          //     each.toatalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))/10)+(Number(each.Receiving[0]?.receiving_touchdowns)*6)):0;
          //     each.fumbleLostReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.fumbles_lost)*(-2))):0;

          // }
          // if(each.Defense){
          //     each.toatalDefense = each.Defense[0] ? ((Number(each.Defense[0]?.interceptions_returned_for_touchdowns.replace(',', '')))):0;
          // }
          // if(each.Scoring){
          //     each.toatalScoring = each.Scoring[0] ? ((Number(each.Scoring[0]?.two_point_conversions.replace(',', ''))*2)):0;
          // }

          each.ftp = each.std_ftp;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "HALF_PPR") {
          //================For half PPR===============================

          // if(each.Passing){
          //     each.toatalPasing = each.Passing[0] ? ((Number(each.Passing[0]?.yards.replace(',', ''))/25)+(Number(each.Passing[0]?.passing_touchdowns)*4)+(Number(each.Passing[0]?.interceptions)*(-2))):0;
          //     // return toatalPasing;
          // }
          // if(each.Rushing){
          //     each.toatalRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.yards.replace(',', ''))/0.1)+(Number(each.Rushing[0]?.rushing_touchdowns)*6)):0;
          //     each.fumbleLostRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.fumbles_lost)*(-2))):0;
          // }
          // if(each.Receiving){
          //     // each.Receptions = each.Receiving[0]? ((Number(each.Receiving[0]?.receptions)*(0.5))):0
          //     each.toatalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))/0.1)+(Number(each.Receiving[0]?.receiving_touchdowns)*6))+((Number(each.Receiving[0]?.receptions)*(0.5))):0;
          //     each.fumbleLostReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.fumbles_lost)*6)):0;

          // }
          // if(each.Defense){
          //     each.toatalDefense = each.Defense[0] ? ((Number(each.Defense[0]?.fumbles_recovered))*6):0;
          // }
          // if(each.Scoring){
          //     each.toatalScoring = each.Scoring[0] ? ((Number(each.Scoring[0]?.two_point_conversions.replace(',', ''))*2)):0;
          // }

          each.ftp = each.half_ppr_ftp;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "HALF_PPR_TEP") {
          each.ftp = each.half_ppr_tep_ftp;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "PPR") {
          each.ftp = each.ppr;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "PPR_TEP") {
          each.ftp = each.ppr_tep;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        // each = {...each,ftp:toatalPasing}
        // each = {...each,opponent:nflOpponentList[0]}
        each.opponent = nflOpponentList.filter((opponent) => {
          return (
            opponent.homeTeam.team_id == each.team_id || opponent.awayTeam.team_id == each.team_id
          );
        });

        if (each.player_details) {
          each.player_details.profile_img = getFilePath(
            each.player_details.profile_img,
            "nfl_players",
            "player"
          );
        }

        console.log("nflOpponentList", nflOpponentList);

        return each;
      })
        .sort((a, b) => {
          return b.ftp - a.ftp;
        })
        .slice(0, limit);
      //----------------comment
      // let opponent = nflOpponentList.filter((opponent)=>{return opponent.homeTeam.team_id == each.team_id || opponent.awayTeam.team_id == each.team_id})

      // NflPlayerStatsList.push(
      //     {opponent:nflOpponentList[0]}
      //     )
      // nflData = {
      //     nflOpponentList,
      //     NflPlayerStatsList
      // }
    }
    if (page == "NCAAF") {
      console.log("----------------------------------------", req.body);

      let weekFrom = req.body.weekFrom;
      let weekTo = req.body.weekTo;

      let team_id = req.body.team_id;
      let season = req.body.season;
      let week = req.body.week;
      let limit = req.body.limit;
      let player_position = req.body.player_position;
      let score_type = req.body.score_type;

      // condition={season:season,team_id:team_id}
      condition = { season: season };
      console.log("-----------------------------condition-----------", condition);

      if (team_id) {
        condition = { ...condition, team_id: team_id };
      }
      if (player_position) {
        condition = { ...condition, "player_details.position": player_position };
      }

      condition_opp = {
        $and: [
          //   {
          //   sheduleDate:{
          //     $gt:new Date(season,0,1), //new Date('year','month','date') jan=0, dec=11
          //     $lt: new Date(season,11,31)
          //   }
          // },
          // {$or:[{ homeTeam:Number(team_id)},{ awayTeam:Number(team_id)}]},
          { scheduleWeek: week },
          { status: true },
          { isDelete: false },
        ],
      };

      NcaaPlayerStatsList = await ncaaFantasyScore.aggregate([
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "team_id",
            foreignField: "team_id",
            as: "team_details",
          },
        },
        { $unwind: { path: "$team_details", preserveNullAndEmptyArrays: false } },
        {
          $lookup: {
            from: "ncaa_players",
            localField: "player_id",
            foreignField: "player_id",
            as: "player_details",
          },
        },
        { $unwind: { path: "$player_details", preserveNullAndEmptyArrays: true } },
        {
          $match: { $and: [condition] },
        },
      ]);

      // let list = await ncaaFantasyScore.find(condition)

      ncaaOpponentList = await ncaa_Schedule.aggregate([
        { $match: condition_opp },
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        // //awayTeam
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
      ]);

      NcaaPlayerStatsList = NcaaPlayerStatsList.map((each) => {
        if (score_type === "STD") {
          each.ftp = each.std_ftp;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "HALF_PPR") {
          each.ftp = each.half_ppr_ftp;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "HALF_PPR_TEP") {
          each.ftp = each.half_ppr_tep_ftp;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "PPR") {
          each.ftp = each.ppr;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "PPR_TEP") {
          each.ftp = each.ppr_tep;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        //     // each = {...each,ftp:toatalPasing}
        //     // // each = {...each,opponent:nflOpponentList[0]}
        each.opponent = ncaaOpponentList.filter((opponent) => {
          return (
            opponent.homeTeam.team_id == each.team_id || opponent.awayTeam.team_id == each.team_id
          );
        });

        if (each.player_details) {
          each.player_details.profile_img = getFilePath(
            each.player_details.profile_img,
            "ncaaf_players",
            "player"
          );
        }

        return each;
      })
        .sort((a, b) => {
          return b.ftp - a.ftp;
        })
        .slice(0, limit);
      //----------------comment
      // let opponent = nflOpponentList.filter((opponent)=>{return opponent.homeTeam.team_id == each.team_id || opponent.awayTeam.team_id == each.team_id})

      // NflPlayerStatsList.push(
      //     {opponent:nflOpponentList[0]}
      //     )
      // nflData = {
      //     nflOpponentList,
      //     NflPlayerStatsList
      // }
      console.log("NcaaPlayerStatsList", ncaaOpponentList);
    }
    response = {
      NFL: NflPlayerStatsList ? NflPlayerStatsList : "",
      // NFL:nflData
      NCAA: NcaaPlayerStatsList ? NcaaPlayerStatsList : "",
      // condition:condition
    };
    sendResponseData(res, 200, true, "live score data", response);
  } catch (error) {
    console.log("err", error);
    sendResponseData(res, 200, false, "Error", error);
  }
};

const getFantasyScore_recent_back = async (req, res) => {
  try {
    // console.log("----------------------------------------",req.body);
    let nflScore;
    let NflPlayerStatsList;
    let nflOpponentList;
    let NcaaPlayerStatsList;
    let ncaaOpponentList;
    let nflData;
    let ncaaScore;
    let response = "";
    let page = req.body.page;
    let condition = {};
    let condition_opp = {};
    let sortQuery = {};
    let filePath = config.file_path_start;
    let opp;
    // if(page == 'NFL'){
    //     let weekFrom = req.body.weekFrom;
    //     let weekTo = req.body.weekTo;

    //     let team_id = req.body.team_id;
    //     let season = req.body.season;
    //     let week = req.body.week;
    //     let limit = req.body.limit;
    //     let player_position = req.body.player_position;
    //     let score_type = req.body.score_type;

    //     // condition={season:season,team_id:team_id}
    //     condition={season:season}
    //     if(team_id){
    //         condition = {...condition,team_id:team_id}
    //     }
    //     if(player_position){
    //         condition = {...condition,"player_details.position":player_position}
    //     }

    //     condition_opp = {
    //         $and: [
    //         //   {
    //         //   sheduleDate:{
    //         //     $gt:new Date(season,0,1), //new Date('year','month','date') jan=0, dec=11
    //         //     $lt: new Date(season,11,31)
    //         //   }
    //         // },
    //         // {$or:[{ homeTeam:Number(team_id)},{ awayTeam:Number(team_id)}]},
    //         {scheduleWeek:week},
    //         {status: true}, {isDelete: false}
    //       ],
    //     }

    //     NflPlayerStatsList = await nflFantasyScore.aggregate([

    //         {
    //             $lookup: {
    //               from: "nfl_teams",
    //               localField: "team_id",
    //               foreignField: "team_id",
    //               as: "team_details"
    //             }
    //           },
    //           { $unwind: { path: "$team_details", preserveNullAndEmptyArrays: false } },
    //           {
    //             $lookup: {
    //               from: "nfl_players",
    //               localField: "player_id",
    //               foreignField: "player_id",
    //               as: "player_details"
    //             }
    //           },
    //           { $unwind: { path: "$player_details", preserveNullAndEmptyArrays: true } },
    //           {
    //             $match:{ $and : [condition]}
    //         },
    //     ])

    //     //----------------comment
    //     // NflPlayerStatsList = await NflPlayerStats.aggregate([

    //     //     {
    //     //         $match:{$and:[condition]}
    //     //     },
    //         // {
    //         //     $lookup: {
    //         //       from: "nfl_teams",
    //         //       localField: "team_id",
    //         //       foreignField: "team_id",
    //         //       as: "team_details"
    //         //     }
    //         //   },
    //         //   { $unwind: { path: "$team_details", preserveNullAndEmptyArrays: false } },
    //     //     //   //awayTeam
    //         //   {
    //         //     $lookup: {
    //         //       from: "nfl_players",
    //         //       localField: "player_id",
    //         //       foreignField: "player_id",
    //         //       as: "player_details"
    //         //     }
    //         //   },
    //         //   { $unwind: { path: "$player_details", preserveNullAndEmptyArrays: true } },
    //         //   {
    //         //     $group:
    //         //     {
    //         //         _id: "$player_name",
    //         //         // minRank: { $min: "$rank" },
    //         //         player_details :{$first:"$player_details"},
    //         //         team_details:{$first:"$team_details"},
    //         //         "doc": { "$addToSet": "$$ROOT" }
    //         //     },
    //         //    },

    //     //     //   {$sort:sortQueryplayer_details
    //     // ])

    //     // NflPlayerStatsList.forEach((each)=>{
    //     //     if(each.player_details){
    //     //         each.player_details.profile_img = getFilePath(each.player_details.profile_img, 'nfl_players', 'player');
    //     //     }
    //     // })

    //     //----------------comment

    //     nflOpponentList = await nfl_Schedule.aggregate([
    //         {$match:condition_opp},
    //         {
    //             $lookup: {
    //               from: "nfl_teams",
    //               localField: "homeTeam",
    //               foreignField: "team_id",
    //               as: "homeTeam"
    //             }
    //           },
    //           { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
    //           // //awayTeam
    //           {
    //             $lookup: {
    //               from: "nfl_teams",
    //               localField: "awayTeam",
    //               foreignField: "team_id",
    //               as: "awayTeam"
    //             }
    //           },
    //           { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
    //     ])

    //     //----------------comment

    //     // NflPlayerStatsList.forEach((each)=>{
    //         // if(each.player_details){
    //         //     each.player_details.profile_img = getFilePath(each.player_details.profile_img, 'nfl_players', 'player');
    //         // }
    //     // })
    //     //----------------comment
    //     NflPlayerStatsList = NflPlayerStatsList.map(each=>{

    //         if(score_type === 'STD'){

    //         //================For STD===============================

    //         // if(each.Passing){
    //         //     each.toatalPasing = each.Passing[0] ? ((Number(each.Passing[0]?.yards.replace(',', ''))/25)+(Number(each.Passing[0]?.passing_touchdowns)*4)+(Number(each.Passing[0]?.interceptions)*(-2))):0;
    //         //     // return toatalPasing;
    //         // }
    //         // if(each.Rushing){
    //         //     each.toatalRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.yards.replace(',', ''))/10)+(Number(each.Rushing[0]?.rushing_touchdowns)*6)):0;
    //         //     each.fumbleLostRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.fumbles_lost)*(-2))):0;
    //         // }
    //         // if(each.Receiving){
    //         //     each.toatalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))/10)+(Number(each.Receiving[0]?.receiving_touchdowns)*6)):0;
    //         //     each.fumbleLostReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.fumbles_lost)*(-2))):0;

    //         // }
    //         // if(each.Defense){
    //         //     each.toatalDefense = each.Defense[0] ? ((Number(each.Defense[0]?.interceptions_returned_for_touchdowns.replace(',', '')))):0;
    //         // }
    //         // if(each.Scoring){
    //         //     each.toatalScoring = each.Scoring[0] ? ((Number(each.Scoring[0]?.two_point_conversions.replace(',', ''))*2)):0;
    //         // }

    //         each.ftp = each.std_ftp;

    //         each.ftp_per_game = each.ftp/Number(week.slice(5));

    //     }

    //     if(score_type === 'HALF_PPR'){
    //         //================For half PPR===============================

    //         // if(each.Passing){
    //         //     each.toatalPasing = each.Passing[0] ? ((Number(each.Passing[0]?.yards.replace(',', ''))/25)+(Number(each.Passing[0]?.passing_touchdowns)*4)+(Number(each.Passing[0]?.interceptions)*(-2))):0;
    //         //     // return toatalPasing;
    //         // }
    //         // if(each.Rushing){
    //         //     each.toatalRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.yards.replace(',', ''))/0.1)+(Number(each.Rushing[0]?.rushing_touchdowns)*6)):0;
    //         //     each.fumbleLostRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.fumbles_lost)*(-2))):0;
    //         // }
    //         // if(each.Receiving){
    //         //     // each.Receptions = each.Receiving[0]? ((Number(each.Receiving[0]?.receptions)*(0.5))):0
    //         //     each.toatalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))/0.1)+(Number(each.Receiving[0]?.receiving_touchdowns)*6))+((Number(each.Receiving[0]?.receptions)*(0.5))):0;
    //         //     each.fumbleLostReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.fumbles_lost)*6)):0;

    //         // }
    //         // if(each.Defense){
    //         //     each.toatalDefense = each.Defense[0] ? ((Number(each.Defense[0]?.fumbles_recovered))*6):0;
    //         // }
    //         // if(each.Scoring){
    //         //     each.toatalScoring = each.Scoring[0] ? ((Number(each.Scoring[0]?.two_point_conversions.replace(',', ''))*2)):0;
    //         // }

    //         each.ftp = each.half_ppr_ftp;

    //         each.ftp_per_game = each.ftp/Number(week.slice(5));
    //     }

    //     if(score_type === 'HALF_PPR_TEP'){

    //       each.ftp = each.half_ppr_tep_ftp;

    //       each.ftp_per_game = each.ftp/Number(week.slice(5));
    //     }

    //     if(score_type === 'PPR'){

    //       each.ftp = each.ppr;

    //       each.ftp_per_game = each.ftp/Number(week.slice(5));
    //     }

    //     if(score_type === 'PPR_TEP'){

    //       each.ftp = each.ppr_tep;

    //       each.ftp_per_game = each.ftp/Number(week.slice(5));
    //     }

    //         // each = {...each,ftp:toatalPasing}
    //         // each = {...each,opponent:nflOpponentList[0]}
    //         each.opponent = nflOpponentList.filter((opponent)=>{return opponent.homeTeam.team_id == each.team_id || opponent.awayTeam.team_id == each.team_id});

    //         if(each.player_details){
    //             each.player_details.profile_img = getFilePath(each.player_details.profile_img, 'nfl_players', 'player');
    //         }

    //     console.log("nflOpponentList",nflOpponentList);

    //         return each;

    //     }).sort((a,b)=> {return b.ftp- a.ftp}).slice(0,limit);
    //     //----------------comment
    //     // let opponent = nflOpponentList.filter((opponent)=>{return opponent.homeTeam.team_id == each.team_id || opponent.awayTeam.team_id == each.team_id})

    //     // NflPlayerStatsList.push(
    //     //     {opponent:nflOpponentList[0]}
    //     //     )
    //     // nflData = {
    //     //     nflOpponentList,
    //     //     NflPlayerStatsList
    //     // }
    // }
    if (page == "NCAAF") {
      console.log("----------------------------------------", req.body);

      let weekFrom = req.body.weekFrom;
      let weekTo = req.body.weekTo;

      let team_id = req.body.team_id;
      let season = req.body.season;
      let week = req.body.week;
      let limit = req.body.limit;
      let player_position = req.body.player_position;
      let score_type = req.body.score_type;
      let sortQuery;

      // condition={season:season,team_id:team_id}
      condition = {
        season: season,
        //   "Passing": { $ne: [] } , "Rushing": { $ne: [] } ,
        //  "Receiving": { $ne: [] }, "Defense": { $ne: [] } , "Scoring": { $ne: [] } ,
        half_ppr_ftp: { $not: { $eq: "0" } },
        std_ftp: { $not: { $eq: "0" } },
        half_ppr_tep_ftp: { $not: { $eq: "0" } },
        ppr: { $not: { $eq: "0" } },
        ppr_tep: { $not: { $eq: "0" } },
      };
      // console.log("-----------------------------condition-----------",condition);

      if (score_type === "HALF_PPR") {
        sortQuery = [
          {
            $addFields: {
              halt_ppr_score: { $toInt: "$half_ppr_ftp" },
            },
          },
          {
            $sort: { halt_ppr_score: 1 },
          },
        ];
      } else if (score_type === "HALF_PPR_TEP") {
        sortQuery = { half_ppr_tep_ftp: -1 };
      } else if (score_type === "PPR") {
        sortQuery = { ppr: -1 };
      } else if (score_type === "PPR_TEP") {
        sortQuery = { ppr_tep: -1 };
      } else {
        sortQuery = { std_ftp: -1 };
        // sortQuery = [
        //   {
        //     "$addFields":
        //     {
        //       // std_ftp_score: { "$toDouble": "$std_ftp" }
        //       std_ftp_score: { "$convert": { input: "$std_ftp", to: "double", onError: 0 } }
        //     }
        //   },
        //   {
        //     "$sort":{ std_ftp_score: 1 }
        //   }

        // ]
      }

      if (team_id) {
        condition = { ...condition, team_id: team_id };
      }
      if (player_position) {
        condition = { ...condition, "player_details.position": player_position };
      }

      condition_opp = {
        $and: [
          // {scheduleWeek:week},
          { status: true },
          { isDelete: false },
        ],
      };

      NcaaPlayerStatsList = await ncaaFantasyScore.aggregate([
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "team_id",
            foreignField: "team_id",
            as: "team_details",
          },
        },
        { $unwind: { path: "$team_details", preserveNullAndEmptyArrays: false } },
        {
          $lookup: {
            from: "ncaa_players",
            localField: "player_id",
            foreignField: "player_id",
            as: "player_details",
          },
        },
        { $unwind: { path: "$player_details", preserveNullAndEmptyArrays: true } },
        {
          $match: { $and: [condition] },
        },
        // sortQuery[0]
        // {
        //   $addFields:
        //   {
        //     scoreNumber: { $toInt: "$score" }
        //   }
        // },
        {
          $sort: sortQuery,
        },
        { $limit: limit },
      ]);

      ncaaOpponentList = await ncaa_Schedule.aggregate([
        { $match: condition_opp },
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        // //awayTeam
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
        { $sort: { _id: -1 } },
      ]);

      NcaaPlayerStatsList = NcaaPlayerStatsList.map((each) => {
        if (score_type === "STD") {
          each.ftp = each.std_ftp.toString();

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "HALF_PPR") {
          each.ftp = each.half_ppr_ftp;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "HALF_PPR_TEP") {
          each.ftp = each.half_ppr_tep_ftp;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "PPR") {
          each.ftp = each.ppr;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "PPR_TEP") {
          each.ftp = each.ppr_tep;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }
        each.opponent = ncaaOpponentList.filter((opponent) => {
          return (
            opponent.homeTeam.team_id == each.team_id || opponent.awayTeam.team_id == each.team_id
          );
        });

        if (each.player_details) {
          each.player_details.profile_img = getFilePath(
            each.player_details.profile_img,
            "ncaaf_players",
            "player"
          );
        }

        opp = ncaaOpponentList.filter((opponent) => {
          return (
            opponent.homeTeam.team_id == each.team_id || opponent.awayTeam.team_id == each.team_id
          );
        });
        return each;
      });

      //  console.log("NcaaPlayerStatsList",ncaaOpponentList);.sort((a,b)=> {return b.ftp- a.ftp}).
    }
    response = {
      //NFL :NflPlayerStatsList?NflPlayerStatsList:'',
      // NFL:nflData
      NCAA: NcaaPlayerStatsList ? NcaaPlayerStatsList : "",
      // opp:opp
    };
    sendResponseData(res, 200, true, "live score data", response);
  } catch (error) {
    console.log("err", error);
    sendResponseData(res, 200, false, "Error", error);
  }
};

const getFantasyScore_recent = async (req, res) => {
  try {
    // console.log("----------------------------------------",req.body);
    let nflScore;
    let NflPlayerStatsList;
    let nflOpponentList;
    let NcaaPlayerStatsList;
    let ncaaOpponentList;
    let nflData;
    let ncaaScore;
    let response = "";
    let page = req.body.page;
    let condition = {};
    let condition_opp = {};
    let sortQuery = {};
    let filePath = config.file_path_start;

    if (page == "NFL") {
      let weekFrom = req.body.weekFrom;
      let weekTo = req.body.weekTo;

      let team_id = req.body.team_id;
      let season = req.body.season;
      let week = req.body.week;
      let limit = req.body.limit;
      let player_position = req.body.player_position;
      let score_type = req.body.score_type;

      // condition={season:season,team_id:team_id}
      condition = { season: season, "player_details.status": true };
      if (team_id) {
        condition = { ...condition, team_id: team_id };
      }
      if (player_position) {
        condition = {
          ...condition,
          "player_details.position": player_position,
          "player_details.status": true,
        };
      }

      condition_opp = {
        $and: [
          //   {
          //   sheduleDate:{
          //     $gt:new Date(season,0,1), //new Date('year','month','date') jan=0, dec=11
          //     $lt: new Date(season,11,31)
          //   }
          // },
          // {$or:[{ homeTeam:Number(team_id)},{ awayTeam:Number(team_id)}]},
          { scheduleWeek: week },
          { status: true },
          { isDelete: false },
        ],
      };

      console.log("Start");
      NflPlayerStatsList = await nflFantasyScore.aggregate([
        {
          $lookup: {
            from: "nfl_teams",
            localField: "team_id",
            foreignField: "team_id",
            as: "team_details",
          },
        },
        { $unwind: { path: "$team_details", preserveNullAndEmptyArrays: false } },
        {
          $lookup: {
            from: "nfl_players",
            localField: "player_id",
            foreignField: "player_id",
            as: "player_details",
          },
        },
        { $unwind: { path: "$player_details", preserveNullAndEmptyArrays: true } },
        //{$match:{"player_details.status":true}},
        {
          $match: { $and: [condition] },
        },
      ]);
      console.log("End = ");

      //----------------comment
      // NflPlayerStatsList = await NflPlayerStats.aggregate([

      //     {
      //         $match:{$and:[condition]}
      //     },
      // {
      //     $lookup: {
      //       from: "nfl_teams",
      //       localField: "team_id",
      //       foreignField: "team_id",
      //       as: "team_details"
      //     }
      //   },
      //   { $unwind: { path: "$team_details", preserveNullAndEmptyArrays: false } },
      //     //   //awayTeam
      //   {
      //     $lookup: {
      //       from: "nfl_players",
      //       localField: "player_id",
      //       foreignField: "player_id",
      //       as: "player_details"
      //     }
      //   },
      //   { $unwind: { path: "$player_details", preserveNullAndEmptyArrays: true } },
      //   {
      //     $group:
      //     {
      //         _id: "$player_name",
      //         // minRank: { $min: "$rank" },
      //         player_details :{$first:"$player_details"},
      //         team_details:{$first:"$team_details"},
      //         "doc": { "$addToSet": "$$ROOT" }
      //     },
      //    },

      //     //   {$sort:sortQueryplayer_details
      // ])

      // NflPlayerStatsList.forEach((each)=>{
      //     if(each.player_details){
      //         each.player_details.profile_img = getFilePath(each.player_details.profile_img, 'nfl_players', 'player');
      //     }
      // })

      //----------------comment

      console.log("Start2");
      nflOpponentList = await nfl_Schedule.aggregate([
        { $match: condition_opp },
        {
          $lookup: {
            from: "nfl_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        // //awayTeam
        {
          $lookup: {
            from: "nfl_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
      ]);
      console.log("End2 = ");

      //----------------comment

      // NflPlayerStatsList.forEach((each)=>{
      // if(each.player_details){
      //     each.player_details.profile_img = getFilePath(each.player_details.profile_img, 'nfl_players', 'player');
      // }
      // })
      //----------------comment
      NflPlayerStatsList = NflPlayerStatsList.map((each) => {
        if (score_type === "STD") {
          //================For STD===============================

          // if(each.Passing){
          //     each.toatalPasing = each.Passing[0] ? ((Number(each.Passing[0]?.yards.replace(',', ''))/25)+(Number(each.Passing[0]?.passing_touchdowns)*4)+(Number(each.Passing[0]?.interceptions)*(-2))):0;
          //     // return toatalPasing;
          // }
          // if(each.Rushing){
          //     each.toatalRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.yards.replace(',', ''))/10)+(Number(each.Rushing[0]?.rushing_touchdowns)*6)):0;
          //     each.fumbleLostRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.fumbles_lost)*(-2))):0;
          // }
          // if(each.Receiving){
          //     each.toatalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))/10)+(Number(each.Receiving[0]?.receiving_touchdowns)*6)):0;
          //     each.fumbleLostReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.fumbles_lost)*(-2))):0;

          // }
          // if(each.Defense){
          //     each.toatalDefense = each.Defense[0] ? ((Number(each.Defense[0]?.interceptions_returned_for_touchdowns.replace(',', '')))):0;
          // }
          // if(each.Scoring){
          //     each.toatalScoring = each.Scoring[0] ? ((Number(each.Scoring[0]?.two_point_conversions.replace(',', ''))*2)):0;
          // }

          each.ftp = each.std_ftp;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "HALF_PPR") {
          //================For half PPR===============================

          // if(each.Passing){
          //     each.toatalPasing = each.Passing[0] ? ((Number(each.Passing[0]?.yards.replace(',', ''))/25)+(Number(each.Passing[0]?.passing_touchdowns)*4)+(Number(each.Passing[0]?.interceptions)*(-2))):0;
          //     // return toatalPasing;
          // }
          // if(each.Rushing){
          //     each.toatalRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.yards.replace(',', ''))/0.1)+(Number(each.Rushing[0]?.rushing_touchdowns)*6)):0;
          //     each.fumbleLostRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.fumbles_lost)*(-2))):0;
          // }
          // if(each.Receiving){
          //     // each.Receptions = each.Receiving[0]? ((Number(each.Receiving[0]?.receptions)*(0.5))):0
          //     each.toatalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))/0.1)+(Number(each.Receiving[0]?.receiving_touchdowns)*6))+((Number(each.Receiving[0]?.receptions)*(0.5))):0;
          //     each.fumbleLostReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.fumbles_lost)*6)):0;

          // }
          // if(each.Defense){
          //     each.toatalDefense = each.Defense[0] ? ((Number(each.Defense[0]?.fumbles_recovered))*6):0;
          // }
          // if(each.Scoring){
          //     each.toatalScoring = each.Scoring[0] ? ((Number(each.Scoring[0]?.two_point_conversions.replace(',', ''))*2)):0;
          // }

          each.ftp = each.half_ppr_ftp;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "HALF_PPR_TEP") {
          each.ftp = each.half_ppr_tep_ftp;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "PPR") {
          each.ftp = each.ppr;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        if (score_type === "PPR_TEP") {
          each.ftp = each.ppr_tep;

          each.ftp_per_game = each.ftp / Number(week.slice(5));
        }

        // each = {...each,ftp:toatalPasing}
        // each = {...each,opponent:nflOpponentList[0]}
        each.opponent = nflOpponentList.filter((opponent) => {
          return (
            opponent.homeTeam.team_id == each.team_id || opponent.awayTeam.team_id == each.team_id
          );
        });

        if (each.player_details) {
          each.player_details.profile_img = getFilePath(
            each.player_details.profile_img,
            "nfl_players",
            "player"
          );
        }

        //  console.log("nflOpponentList",nflOpponentList);

        return each;
      })
        .sort((a, b) => {
          return b.ftp - a.ftp;
        })
        .slice(0, limit);
      //----------------comment
      // let opponent = nflOpponentList.filter((opponent)=>{return opponent.homeTeam.team_id == each.team_id || opponent.awayTeam.team_id == each.team_id})

      // NflPlayerStatsList.push(
      //     {opponent:nflOpponentList[0]}
      //     )
      // nflData = {
      //     nflOpponentList,
      //     NflPlayerStatsList
      // }
    }
    if (page == "NCAAF") {
      console.log("----------------------------------------", req.body);

      let weekFrom = req.body.weekFrom;
      let weekTo = req.body.weekTo;

      let team_id = req.body.team_id;
      let season = req.body.season;
      let week = req.body.week;
      let limit = req.body.limit;
      let player_position = req.body.player_position;
      let score_type = req.body.score_type;
      let weekCal = week == "Week Bowls" ? "Week 15" : week;
      // condition={season:season,team_id:team_id}
      condition = {
        season: season,
        half_ppr_ftp: { $not: { $eq: "0" } },
        std_ftp: { $not: { $eq: "0" } },
        half_ppr_tep_ftp: { $not: { $eq: "0" } },
        ppr: { $not: { $eq: "0" } },
        ppr_tep: { $not: { $eq: "0" } },
        "player_details.status": true,
      };
      console.log("-----------------------------condition-----------", condition);

      if (team_id) {
        condition = { ...condition, team_id: team_id };
      }
      if (player_position) {
        condition = {
          ...condition,
          "player_details.position": player_position,
          "player_details.status": true,
        };
      }

      condition_opp = {
        $and: [
          //   {
          //   sheduleDate:{
          //     $gt:new Date(season,0,1), //new Date('year','month','date') jan=0, dec=11
          //     $lt: new Date(season,11,31)
          //   }
          // },
          // {$or:[{ homeTeam:Number(team_id)},{ awayTeam:Number(team_id)}]},
          //{scheduleWeek:week},
          { status: true },
          { isDelete: false },
        ],
      };

      console.log("Start3");
      NcaaPlayerStatsList = await ncaaFantasyScore.aggregate([
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "team_id",
            foreignField: "team_id",
            as: "team_details",
          },
        },
        { $unwind: { path: "$team_details", preserveNullAndEmptyArrays: false } },
        {
          $lookup: {
            from: "ncaa_players",
            localField: "player_id",
            foreignField: "player_id",
            as: "player_details",
          },
        },
        { $unwind: { path: "$player_details", preserveNullAndEmptyArrays: true } },
        // {$match:{"player_details.status":true}},
        {
          $match: { $and: [condition] },
        },
      ]);
      console.log("End3");

      // let list = await ncaaFantasyScore.find(condition)

      console.log("Start4", condition_opp);
      ncaaOpponentList = await ncaa_Schedule.aggregate([
        { $match: condition_opp },
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        // //awayTeam
        {
          $lookup: {
            from: "ncaa_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
        { $sort: { _id: -1 } },
      ]);
      console.log("End4");

      NcaaPlayerStatsList = NcaaPlayerStatsList.map((each) => {
        if (score_type === "STD") {
          each.ftp = each.std_ftp;

          each.ftp_per_game = each.ftp / Number(weekCal.slice(5));
        }

        if (score_type === "HALF_PPR") {
          each.ftp = each.half_ppr_ftp;

          each.ftp_per_game = each.ftp / Number(weekCal.slice(5));
        }

        if (score_type === "HALF_PPR_TEP") {
          each.ftp = each.half_ppr_tep_ftp;

          each.ftp_per_game = each.ftp / Number(weekCal.slice(5));
        }

        if (score_type === "PPR") {
          each.ftp = each.ppr;

          each.ftp_per_game = each.ftp / Number(weekCal.slice(5));
        }

        if (score_type === "PPR_TEP") {
          each.ftp = each.ppr_tep;

          each.ftp_per_game = each.ftp / Number(weekCal.slice(5));
        }

        //     // each = {...each,ftp:toatalPasing}
        //     // // each = {...each,opponent:nflOpponentList[0]}
        each.opponent = ncaaOpponentList.filter((opponent) => {
          return (
            opponent.homeTeam.team_id == each.team_id || opponent.awayTeam.team_id == each.team_id
          );
        });

        if (each.player_details) {
          each.player_details.profile_img = getFilePath(
            each.player_details.profile_img,
            "ncaaf_players",
            "player"
          );
        }

        return each;
      })
        .sort((a, b) => {
          return b.ftp - a.ftp;
        })
        .slice(0, limit);
      //----------------comment
      // let opponent = nflOpponentList.filter((opponent)=>{return opponent.homeTeam.team_id == each.team_id || opponent.awayTeam.team_id == each.team_id})

      // NflPlayerStatsList.push(
      //     {opponent:nflOpponentList[0]}
      //     )
      // nflData = {
      //     nflOpponentList,
      //     NflPlayerStatsList
      // }
      console.log("NcaaPlayerStatsList", ncaaOpponentList);
    }
    response = {
      NFL: NflPlayerStatsList ? NflPlayerStatsList : "",
      // NFL:nflData
      NCAA: NcaaPlayerStatsList ? NcaaPlayerStatsList : "",
      // condition:condition
    };
    sendResponseData(res, 200, true, "live score data", response);
  } catch (error) {
    console.log("err", error);
    sendResponseData(res, 200, false, "Error", error);
  }
};

const getFantasyScore_wit_team = async (req, res) => {
  try {
    console.log("----------------------------------------", req.body);
    let nflScore;
    let NflPlayerStatsList;
    let nflOpponentList;
    let nflData;
    let ncaaScore;
    let response = "";
    let page = req.body.page;
    let condition = {};
    let condition_opp = {};
    let sortQuery = {};
    let currentDate = new Date().getFullYear();
    let searchYear = req.body.year;
    let filePath = config.file_path_start;

    if (page == "NFL") {
      let weekFrom = req.body.weekFrom;
      let weekTo = req.body.weekTo;

      let team_id = req.body.team_id;
      let season = req.body.season;
      let week = req.body.week;

      condition = { season: season, team_id: team_id };
      condition_opp = {
        $and: [
          {
            sheduleDate: {
              $gt: new Date(season, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lt: new Date(season, 11, 31),
            },
          },
          { $or: [{ homeTeam: Number(team_id) }, { awayTeam: Number(team_id) }] },
          { scheduleWeek: week },
          { status: true },
          { isDelete: false },
        ],
      };
      NflPlayerStatsList = await NflPlayerStats.aggregate([
        {
          $match: { $and: [condition] },
        },
        {
          $lookup: {
            from: "nfl_teams",
            localField: "team_id",
            foreignField: "team_id",
            as: "team_details",
          },
        },
        { $unwind: { path: "$team_details", preserveNullAndEmptyArrays: false } },
        //   //awayTeam
        {
          $lookup: {
            from: "nfl_players",
            localField: "player_id",
            foreignField: "player_id",
            as: "player_details",
          },
        },
        { $unwind: { path: "$player_details", preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: "$player_name",
            // minRank: { $min: "$rank" },
            player_details: { $first: "$player_details" },
            team_details: { $first: "$team_details" },
            doc: { $addToSet: "$$ROOT" },
          },
        },

        //   {$sort:sortQueryplayer_details
      ]);

      // NflPlayerStatsList.forEach((each)=>{
      //     if(each.player_details){
      //         each.player_details.profile_img = getFilePath(each.player_details.profile_img, 'nfl_players', 'player');
      //     }
      // })

      nflOpponentList = await nfl_Schedule.aggregate([
        { $match: condition_opp },
        {
          $lookup: {
            from: "nfl_teams",
            localField: "homeTeam",
            foreignField: "team_id",
            as: "homeTeam",
          },
        },
        { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
        // //awayTeam
        {
          $lookup: {
            from: "nfl_teams",
            localField: "awayTeam",
            foreignField: "team_id",
            as: "awayTeam",
          },
        },
        { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
      ]);

      NflPlayerStatsList.forEach((each) => {
        if (each.player_details) {
          each.player_details.profile_img = getFilePath(
            each.player_details.profile_img,
            "nfl_players",
            "player"
          );
        }
      });
      NflPlayerStatsList = NflPlayerStatsList.map((each) => {
        each = { ...each, opponent: nflOpponentList[0] };
        return each;
      });

      // NflPlayerStatsList.push(
      //     {opponent:nflOpponentList[0]}
      //     )
      // nflData = {
      //     nflOpponentList,
      //     NflPlayerStatsList
      // }
    }
    // if(page == 'NCAAF'){

    // }
    response = {
      NFL: NflPlayerStatsList ? NflPlayerStatsList : "",
      // NFL:nflData
      // NCAA:ncaaScore?ncaaScore:'',
      // condition:condition
    };
    sendResponseData(res, 200, true, "live score data", response);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const getFantasyScore_back = async (req, res) => {
  try {
    console.log("----------------------------------------", req.body);
    let nflScore;
    let NflPlayerStatsList;
    let nflOpponentList;
    let ncaaScore;
    let response = "";
    let page = req.body.page;
    let condition = {};
    let sortQuery = {};
    let currentDate = new Date().getFullYear();
    let searchYear = req.body.year;
    let filePath = config.file_path_start;

    if (page == "NFL") {
      let weekFrom = req.body.weekFrom;
      let weekTo = req.body.weekTo;

      let team_id = req.body.team_id;
      let season = req.body.season;
      let week = req.body.week;

      condition = { season: season, team_id: team_id };

      // if(weekFrom && weekTo && searchYear){
      //     let d1;
      //     let d2;
      //     let getFromDates = weekListDate.getDates(searchYear, weekFrom);
      //     let getToDates = weekListDate.getDates(searchYear, weekTo);

      //     // console.log("getFromDates",getFromDates);
      //     // console.log("getToDates",getToDates);

      //         d1 =  getFromDates[0];
      //         d2 =  getToDates[1];

      //     let startDate = searchYear + '-'+ d1;
      //     let endDate = searchYear + '-'+ d2;

      //     console.log("----->",startDate, endDate);

      //     condition = {
      //         $and: [{
      //             matchDate: {
      //                 $gte: new Date(`${startDate}T00:00:00.000Z`),
      //                 $lte: new Date(`${endDate}T23:59:59.999Z`)
      //             }
      //         }]
      //     }

      // }
      // let d = new Date();
      // // console.log(d);
      // let a = d.toLocaleString("default", { month: "2-digit" });;
      // let c = d.toLocaleString("default", { day: "2-digit" });
      // let date = a + "-" + c;
      // let getdates = await weekListDate.getWeek(currentDate,date);
      // let d1 = getdates[0];
      //  let d2 = getdates[1];
      //  let startDate= currentDate + '-'+d1;
      //  let endDate=currentDate + '-'+d2;
      // //  console.log(startDate,
      // //     endDate);
      //     if(d1 != undefined && d2 != undefined){
      //         condition = {
      //            $and: [
      //                { matchDate: { $gt: new Date(`${startDate}T00:00:00.000Z`) } },
      //                { matchDate: { $lt: new Date(`${endDate}T23:59:59.999Z`) } }
      //            ]
      //         }
      //         sortQuery = {matchDate:1}
      //     }
      //     else{

      //         condition = {
      //                 $and: [
      //                     { matchDate: { $gt: new Date(currentDate, 0, 2) } },
      //                     { matchDate: { $lt: new Date(currentDate, 11, 31) } }
      //                 ]

      //         }
      //         sortQuery = {matchDate:-1}

      //     }

      NflPlayerStatsList = await NflPlayerStats.aggregate([
        {
          $match: { $and: [condition] },
        },
        {
          $lookup: {
            from: "nfl_teams",
            localField: "team_id",
            foreignField: "team_id",
            as: "team_details",
          },
        },
        { $unwind: { path: "$team_details", preserveNullAndEmptyArrays: false } },
        //   //awayTeam
        {
          $lookup: {
            from: "nfl_players",
            localField: "player_id",
            foreignField: "player_id",
            as: "player_details",
          },
        },
        { $unwind: { path: "$player_details", preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: "$player_name",
            // minRank: { $min: "$rank" },
            player_details: { $first: "$player_details" },
            team_details: { $first: "$team_details" },
            doc: { $addToSet: "$$ROOT" },
          },
        },

        //   {$sort:sortQueryplayer_details
      ]);

      nflOpponentList = NflPlayerStatsList.forEach((each) => {
        // console.log("----------each-------------",each);
        if (each.player_details) {
          each.player_details.profile_img = getFilePath(
            each.player_details.profile_img,
            "nfl_players",
            "player"
          );
        }
      });
    }
    // if(page == 'NCAAF'){

    // }
    response = {
      NFL: NflPlayerStatsList ? NflPlayerStatsList : "",
      // NCAA:ncaaScore?ncaaScore:'',
      // condition:condition
    };
    sendResponseData(res, 200, true, "live score data", response);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

function scoreType(data, scoreType) {
  console.log("data", data);
  let passingData;
  if (scoreType == "STD") {
    passingData =
      Number(data.yards.replace(",", "")) / 25 +
      Number(data.passing_touchdowns) * 4 +
      Number(data.interceptions) * -2;

    // let rushingData = ((Number(data.yards.replace(',', ''))/10)+(Number(data.rushing_touchdowns)*6));
  }
  return passingData;
}

const isCurrentDateInRange = async (req, res) => {
  try {
    let weekList = weekListDate.weekListDate;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentDay = String(currentDate.getDate()).padStart(2, "0");
    const formattedCurrentDate1 = `${currentMonth}-${currentDay}`;
    //console.log("=======",currentDate);
    const formattedCurrentDate = currentDate.toISOString().slice(5, 10);
    //console.log("=======",formattedCurrentDate);
    /*
    // Function to convert "MM-DD" to a Date object
    const getDateFromMMDD = (year, mmdd) => {
        const [month, day] = mmdd.split('-').map(Number);
        return new Date(year, month - 1, day);
    };    
    if (weekList[currentYear]) {
      console.log("=======",weekList[currentYear]);
      for (const week of weekList[currentYear]) {
          for (const weekName in week) {
              const [startDate, endDate] = week[weekName];
              const start = getDateFromMMDD(currentYear, startDate);
              const end = getDateFromMMDD(currentYear, endDate);
              console.log("start",start);
              console.log("end",end);

              if (currentDate >= start && currentDate <= end) {
                 message = true
                 return res.json({ isInRange: true });
              }
          }
      }
    }
    */

    for (const week of weekList[currentYear]) {
      for (const [weekName, [startDate, endDate]] of Object.entries(week)) {
        if (formattedCurrentDate >= startDate && formattedCurrentDate <= endDate) {
          return res.json({ isInRange: true });
        }
      }
    }
    return res.json({ isInRange: false });
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};
const ncaafCurrentRange = async (req, res) => {
  try {
    let weekList = weekListDate.ncaaWeekDate;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentDay = String(currentDate.getDate()).padStart(2, "0");
    const formattedCurrentDate1 = `${currentMonth}-${currentDay}`;
    //console.log("=======",currentDate);
    const formattedCurrentDate = currentDate.toISOString().slice(5, 10);
    console.log("=======", formattedCurrentDate);
    /*
    // Function to convert "MM-DD" to a Date object
    const getDateFromMMDD = (year, mmdd) => {
        const [month, day] = mmdd.split('-').map(Number);
        return new Date(year, month - 1, day);
    };    
    if (weekList[currentYear]) {
      console.log("=======",weekList[currentYear]);
      for (const week of weekList[currentYear]) {
          for (const weekName in week) {
              const [startDate, endDate] = week[weekName];
              const start = getDateFromMMDD(currentYear, startDate);
              const end = getDateFromMMDD(currentYear, endDate);
              console.log("start",start);
              console.log("end",end);

              if (currentDate >= start && currentDate <= end) {
                 message = true
                 return res.json({ isInRange: true });
              }
          }
      }
    }
    */

    for (const week of weekList[currentYear]) {
      for (const [weekName, [startDate, endDate]] of Object.entries(week)) {
        if (formattedCurrentDate >= startDate && formattedCurrentDate <= endDate) {
          return res.json({ isInRange: true });
        }
      }
    }
    return res.json({ isInRange: false });
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

module.exports = {
  checkFollowTeam,
  followTeam,
  bothLiveScore,
  scoreBoard,
  getFantasyScore_recent,
  getFantasyScore,
  isCurrentDateInRange,
  ncaafCurrentRange,
};
