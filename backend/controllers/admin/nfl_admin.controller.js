const NflPlayers = require("../../models/thirdPartySchema/nfl_player.model");
const nfl_team = require("../../models/thirdPartySchema/nfl_team.model");
const { sendResponseData, getFilePath } = require("../../util/Utility");


const nflTeamList = async (req, res) => {
  const skipNo = req.query.page - 1;
  try {
    // const nflTeamList = await nfl_team.find({}).sort({ team_leag: 1, team_division: 1, team_name: 1 });
    const nflTeamList = await nfl_team.find({}).sort({ team_leag: 1, team_division: 1, team_name: 1 })
      .limit(20).skip(skipNo * 20);
    sendResponseData(res, 200, true, "NFL Team list", nflTeamList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const getNflFantasyPlayerPosition = async (req, res) => {
  const skipNo = req.query.page - 1;
  try {
    // const nflTeamList = await nfl_team.find({}).sort({ team_leag: 1, team_division: 1, team_name: 1 });
    const nflTeamList = await nfl_team.find({}).sort({ team_leag: 1, team_division: 1, team_name: 1 })
      .limit(20).skip(skipNo * 20);
    sendResponseData(res, 200, true, "NFL Player Position list", nflTeamList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const nflTeamListCount = async (req, res) => {
  try {
    const nflTeamListCount = await nfl_team.find({}).count();
    sendResponseData(res, 200, true, "NFL Team list count", nflTeamListCount);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const nflPlayerList = async (req, res) => {
  const skipNo = req.query.page - 1;
  try {
    // const dataList = await NflPlayers.find({}).sort({ player_id: 1 }); 
    const dataList = await NflPlayers.find({status:true}).sort({ player_id: 1 }).limit(20).skip(skipNo * 20);
    if (dataList && dataList.length > 0) {
      dataList.forEach(element => {
        element.profile_img = getFilePath(element.profile_img, 'nfl_players', 'player');
      });
    }
    sendResponseData(res, 200, true, "NFL Player list", dataList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};


const nflPlayerListCount = async (req, res) => {
  try {
    const dataListCount = await NflPlayers.find({status:true}).count();

    sendResponseData(res, 200, true, "NFL Player list count", dataListCount);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};



module.exports = {
  nflTeamList,
  nflTeamListCount,
  getNflFantasyPlayerPosition,
  nflPlayerList,
  nflPlayerListCount,

}