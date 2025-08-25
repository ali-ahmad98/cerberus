const nfl_team = require("../../models/thirdPartySchema/nfl_team.model");
const nfl_player = require("../../models/thirdPartySchema/nfl_player.model");

const nfl_schedule = require("../../models/thirdPartySchema/nfl_schedule.model");
const { sendResponseData } = require("../../util/Utility");
const mongoose = require("mongoose");
const NflPlayers = require("../../models/thirdPartySchema/nfl_player.model");

const nflTeamList = async (req, res) => {
  try {
    // console.log("Starting nflTeamList");
    const nflTeamList = await nfl_team
      .find({ status: true, isDelete: false })
      .sort({ team_name: 1 });
    // console.log("Response nflTeamList = ", nflTeamList);
    sendResponseData(res, 200, true, "NFL Team list", nflTeamList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const getNflFantasyPlayerPosition = async (req, res) => {
  try {
    // const nflPlayerPositionList = await  NflPlayers.find({  status: true }).sort({ position: 1 });
    const nflPlayerPositionList = await NflPlayers.aggregate([
      { $match: { status: true } },
      { $group: { _id: "$position" } },
    ]);

    sendResponseData(res, 200, true, "NFL Player Position list", nflPlayerPositionList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const nflTeamListDropdown = async (req, res) => {
  try {
    const nflTeamList = await nfl_team.aggregate([
      {
        $group: {
          _id: {
            team_leag: "$team_leag",
            team_division: "$team_division",
          },
          division: {
            $addToSet: "$$ROOT",
          },
        },
      },
      {
        $group: {
          _id: {
            team_leag: "$_id.team_leag",
          },
          division: {
            $addToSet: {
              division_name: "$_id.team_division",
              teams: "$division",
            },
          },
        },
      },
      { $sort: { team_leag: 1 } },
    ]);

    sendResponseData(res, 200, true, "NFL Team list dropdown", nflTeamList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const nflTeamListDivisionGroup = async (req, res) => {
  try {
    const nflTeamList = await nfl_team
      .find({ status: true, isDelete: false })
      .sort({ team_name: 1 });

    var nflTeamDivisionGr = {
      AFC: {
        East: [],
        North: [],
        South: [],
        West: [],
      },
      NFC: {
        East: [],
        North: [],
        South: [],
        West: [],
      },
    };

    nflTeamList.forEach((row, i) => {
      var team_division = row.team_division;
      nflTeamDivisionGr[row.team_leag][team_division].push(row);
    });

    sendResponseData(res, 200, true, "NFL Team list", nflTeamDivisionGr);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const nflTeamDetailsByTeamId = async (req, res) => {
  const teamId = req.params.teamId;
  try {
    const nflTeamData = await nfl_team.findOne({ team_id: teamId });

    sendResponseData(res, 200, true, "NFL Team details", nflTeamData);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const nflScheduleList = async (req, res) => {
  try {
    // const nflScheduleList = await nfl_schedule.find({ status: true, isDelete: false }).sort({ sheduleDate: 1 }).populate('homeTeam').populate('awayTeam');
    let condition = {};

    const searchYear = req.body.year;
    const searchTeam = Number(req.body.team);
    const searchWeek = req.body.week;
    if (searchYear) {
      condition = {
        $and: [
          {
            sheduleDate: {
              $gt: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lt: new Date(searchYear, 11, 31),
            },
          },
        ],
      };
    }
    if (searchTeam) {
      condition = {
        $or: [{ homeTeam: searchTeam }, { awayTeam: searchTeam }],
      };
    }
    if (searchWeek) {
      condition = {
        scheduleWeek: searchWeek,
      };
    }
    //year and team and week
    if (searchYear && searchTeam && searchWeek) {
      console.log("9999999999999999999999999", searchYear, searchTeam, searchWeek);
      condition = {
        $and: [
          {
            sheduleDate: {
              $gt: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lt: new Date(searchYear, 11, 31),
            },
          },
          { $or: [{ homeTeam: searchTeam }, { awayTeam: searchTeam }] },
          { scheduleWeek: searchWeek },
        ],
      };
      // console.log(condition);
    }
    //year and team
    if (searchYear && searchTeam && !searchWeek) {
      condition = {
        $and: [
          {
            sheduleDate: {
              $gt: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lt: new Date(searchYear, 11, 31),
            },
          },
          { $or: [{ homeTeam: searchTeam }, { awayTeam: searchTeam }] },
        ],
      };
    }
    //year and week
    if (searchYear && searchWeek && !searchTeam) {
      condition = {
        $and: [
          {
            sheduleDate: {
              $gt: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lt: new Date(searchYear, 11, 31),
            },
          },
          { scheduleWeek: searchWeek },
        ],
      };
    }
    //team and week
    if (searchTeam && searchWeek && !searchYear) {
      condition = {
        $and: [
          { $or: [{ homeTeam: searchTeam }, { awayTeam: searchTeam }] },
          { scheduleWeek: searchWeek },
        ],
      };
    }

    const nflScheduleList = await nfl_schedule.aggregate([
      // {$group:{_id:{sheduleDate:"$date"}}},

      {
        $project: {
          // week:{$dayOfMonth:"$sheduleDate"},
          sheduleDate: 1,
          status: 1,
          sheduleTime: 1,
          awayTeam: 1,
          homeTeam: 1,
          venue: 1,
          date: 1,
          isDelete: 1,
          created_at: 1,
          scheduleWeek: 1,
        },
      },
      { $sort: { sheduleDate: -1 } },
      { $match: { status: true, isDelete: false } },
      { $match: condition },

      //home team
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
      {
        $group: {
          _id: "$sheduleDate",
          doc: { $addToSet: "$$ROOT" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    console.log(nflScheduleList.length);
    if (nflScheduleList.length == 0) {
      sendResponseData(res, 200, true, "No data found", []);
    } else {
      sendResponseData(res, 200, true, "NFL Schedule list", nflScheduleList);
    }
  } catch (error) {
    console.log(error);
    sendResponseData(res, 200, false, "Error", error);
  }
};

const nflScheduleListByTeamId = async (req, res) => {
  try {
    let condition = {};

    const searchYear = req.body.year;
    const searchTeam = req.body.team;
    const searchWeek = req.body.week;
    if (searchYear) {
      condition = {
        $and: [
          {
            sheduleDate: {
              $gt: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lt: new Date(searchYear, 11, 31),
            },
          },
        ],
      };
    }
    if (searchTeam) {
      condition = {
        homeTeam: searchTeam,
        //  awayTeam:searchTeam
      };
    }
    if (searchWeek) {
      condition = {
        scheduleWeek: searchWeek,
      };
    }
    //year and team and week
    if (searchYear && searchTeam && searchWeek) {
      console.log("9999999999999999999999999", searchYear, searchTeam, searchWeek);
      condition = {
        $and: [
          {
            sheduleDate: {
              $gt: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lt: new Date(searchYear, 11, 31),
            },
          },
          { homeTeam: searchTeam },
          { awayTeam: searchTeam },
          { scheduleWeek: searchWeek },
        ],
      };
      // console.log(condition);
    }
    //year and team
    if (searchYear && searchTeam && !searchWeek) {
      condition = {
        $and: [
          {
            sheduleDate: {
              $gt: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lt: new Date(searchYear, 11, 31),
            },
          },
          { homeTeam: searchTeam },
          { awayTeam: searchTeam },
        ],
      };
    }
    //year and week
    if (searchYear && searchWeek && !searchTeam) {
      condition = {
        $and: [
          {
            sheduleDate: {
              $gt: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lt: new Date(searchYear, 11, 31),
            },
          },
          { scheduleWeek: searchWeek },
        ],
      };
    }
    //team and week
    if (searchTeam && searchWeek && !searchYear) {
      condition = {
        $and: [{ homeTeam: searchTeam }, { awayTeam: searchTeam }, { scheduleWeek: searchWeek }],
      };
    }

    const nflScheduleList = await nfl_schedule.aggregate([
      // {$group:{_id:{sheduleDate:"$date"}}},

      {
        $project: {
          // week:{$dayOfMonth:"$sheduleDate"},
          sheduleDate: 1,
          status: 1,
          sheduleTime: 1,
          awayTeam: 1,
          homeTeam: 1,
          venue: 1,
          date: 1,
          isDelete: 1,
          created_at: 1,
          scheduleWeek: 1,
        },
      },
      // {$group:{_id:"$date",sheduleDate:{$first:"$sheduleDate"}}},

      { $match: { status: true, isDelete: false } },
      { $sort: { sheduleDate: 1 } },
      { $match: condition },

      //home team
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

    // const nflScheduleList = await nfl_schedule.aggregate([
    //   { $match:{status: true, isDelete: false}},
    //   { $group:{
    //     _id:"$date" ,
    //   //  sheduleDate:{$first:"$sheduleDate"},
    //   //   date:{$first:"$date"},
    //   //   awayTeam:{$first:"$awayTeam"},
    //   //   homeTeam:{$first:"$homeTeam"},
    //   //   sheduleTime:{$first:"$sheduleTime"},
    //   //   venue:{$first:"$venue"},

    //   }},

    // ])

    console.log(nflScheduleList.length);
    if (nflScheduleList.length == 0) {
      sendResponseData(res, 200, true, "No data found", []);
    } else {
      sendResponseData(res, 200, true, "NFL Schedule list", nflScheduleList);
    }
  } catch (error) {
    console.log(error);
    sendResponseData(res, 200, false, "Error", error);
  }
};

const nflScheduleList_back = async (req, res) => {
  try {
    const nflScheduleList = await nfl_schedule
      .find({ status: true, isDelete: false })
      .sort({ sheduleDate: 1 })
      .populate("homeTeam")
      .populate("awayTeam");
    console.log(nflScheduleList.length);
    if (nflScheduleList.length == 0) {
      sendResponseData(res, 200, true, "No data found", []);
    } else {
      sendResponseData(res, 200, true, "NFL Schedule list", nflScheduleList);
    }
  } catch (error) {
    console.log(error);
    sendResponseData(res, 200, false, "Error", error);
  }
};

const nflScheduleList_team_year = async (req, res) => {
  try {
    // const nflScheduleList = await nfl_schedule.find({ status: true, isDelete: false }).sort({ sheduleDate: 1 }).populate('homeTeam').populate('awayTeam');
    let condition = {};

    const searchYear = req.body.year;
    const searchTeam = req.body.team;
    if (searchYear) {
      condition = {
        $and: [
          {
            sheduleDate: {
              $gt: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lt: new Date(searchYear, 11, 31),
            },
          },
        ],
      };
    }
    if (searchTeam) {
      condition = {
        $or: [
          { homeTeam: mongoose.Types.ObjectId(searchTeam) },
          { awayTeam: mongoose.Types.ObjectId(searchTeam) },
        ],
      };
    }

    if (searchYear && searchTeam) {
      condition = {
        $and: [
          {
            sheduleDate: {
              $gt: new Date(searchYear, 0, 1), //new Date('year','month','date') jan=0, dec=11
              $lt: new Date(searchYear, 11, 31),
            },
          },
          {
            $or: [
              { homeTeam: mongoose.Types.ObjectId(searchTeam) },
              { awayTeam: mongoose.Types.ObjectId(searchTeam) },
            ],
          },
        ],
      };
    }

    // const nflScheduleList = await nfl_schedule.aggregate([
    //   {$match:{ status: true, isDelete: false}},
    //   {$sort:{sheduleDate: 1}},
    //   {$match:condition},

    //   //home team
    //   { $lookup:{
    //     from:"nfl_teams",
    //     localField:"homeTeam",
    //     foreignField:"_id",
    //     as:"homeTeam"
    //   }},
    //   {$unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false }},
    //   // //awayTeam
    //   { $lookup:{
    //     from:"nfl_teams",
    //     localField:"awayTeam",
    //     foreignField:"_id",
    //     as:"awayTeam"
    //   }},
    //   {$unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false }},
    //   // {$match:condition}

    // ])

    const nflScheduleList = await nfl_schedule.aggregate([
      { $match: { status: true, isDelete: false } },
      { $sort: { sheduleDate: 1 } },
      { $match: condition },

      //home team
      {
        $lookup: {
          from: "nfl_teams",
          localField: "homeTeam",
          foreignField: "_id",
          as: "homeTeam",
        },
      },
      { $unwind: { path: "$homeTeam", preserveNullAndEmptyArrays: false } },
      // //awayTeam
      {
        $lookup: {
          from: "nfl_teams",
          localField: "awayTeam",
          foreignField: "_id",
          as: "awayTeam",
        },
      },
      { $unwind: { path: "$awayTeam", preserveNullAndEmptyArrays: false } },
    ]);
    console.log(nflScheduleList.length);
    if (nflScheduleList.length == 0) {
      sendResponseData(res, 200, true, "No data found", []);
    } else {
      sendResponseData(res, 200, true, "NFL Schedule list", nflScheduleList);
    }
  } catch (error) {
    // console.log(condition);

    console.log(error);
    sendResponseData(res, 200, false, "Error", error);
  }
};

module.exports = {
  nflTeamList,
  getNflFantasyPlayerPosition,
  nflTeamListDropdown,
  nflTeamListDivisionGroup,
  nflTeamDetailsByTeamId,
  nflScheduleList,
  nflScheduleListByTeamId,
};
