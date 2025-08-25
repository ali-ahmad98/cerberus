const NcaaTeam = require("../../models/thirdPartySchema/ncaa_team.model");
const ncaaStanding = require("../../models/thirdPartySchema/ncaa_standings.model");
const NcaaPlayers = require("../../models/thirdPartySchema/ncaa_player.model")
const { sendResponseData, fileUpload, getFilePath } = require("../../util/Utility");
const axios = require('axios');
const config = require("../../config/config");



const ncaafTeamList = async (req, res) => {
  const skipNo = req.query.page - 1;
  try {
    // const ncaafTeamList = await NcaaTeam.find({}).sort({ team_league: 1, team_division: 1, team_name: 1 });
    const ncaafTeamList = await NcaaTeam.find({}).sort({ team_league: 1, team_division: 1, team_name: 1 })
      .limit(20).skip(skipNo * 20);
    ncaafTeamList.forEach(element => {
      element.logo_standard = getFilePath(element.logo_standard);
    });

    sendResponseData(res, 200, true, "NCAAF Team list", ncaafTeamList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};


const ncaafTeamListCount = async (req, res) => {
  try {
    const ncaafTeamList = await NcaaTeam.find({}).count();

    sendResponseData(res, 200, true, "NCAAF Team list count", ncaafTeamList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const ncaafTeamLogoUpload = async (req, res) => {
  const team_id = req.body.team_id;
  try {
    if (req.files) {
      if (req.files.logo_standard) {
        var imgFile = req.files.logo_standard[0];
        imgFileName = await fileUpload(imgFile, 'ncaaf', 'logo');
      }
    }


    const updateData = {
      logo_standard: imgFileName,
    }
    const update = await NcaaTeam.updateOne({ team_id: team_id }, updateData);

    sendResponseData(res, 200, true, "Logo uploaded successfully.", update);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
};

const ncaaPlayerList = async (req, res) => {
  const skipNo = req.query.page - 1;
  // console.log('page', page)
  try {
    // const dataList = await NcaaPlayers.find({}).sort({ player_id: 1 });
    const dataList = await NcaaPlayers.find({}).sort({ player_id: 1 }).limit(20).skip(skipNo * 20);
    if (dataList && dataList.length > 0) {
      dataList.forEach(element => {
        element.profile_img = getFilePath(element.profile_img, 'ncaaf_players', 'player');
      });
    }
    sendResponseData(res, 200, true, "NCAA Player list", dataList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}

const ncaaPlayerListCount = async (req, res) => {
  try {
    const dataList = await NcaaPlayers.find({}).count();

    sendResponseData(res, 200, true, "NCAA Player count", dataList);
  } catch (error) {
    sendResponseData(res, 200, false, "Error", error);
  }
}

//-------------------------------------nfl standing-------------------------------------
const ncaaStandingsUpdateSave = async (req, res) => {

  try {
      let teamNcaa = await NcaaTeam.find({ status: true, isDelete: false });

      var totalAddEdit = {
          add: 0,
          edit: 0
      };


      const goalserverTeam = await axios.get(`http://www.goalserve.com/getfeed/` + config.goalServerApikey + `/football/fbs-standings?json=1`);
      const leagueData = goalserverTeam.data.standings.category.league;
      const season = goalserverTeam.data.standings.category.season;

      var goalserverTeamArr = [];
      leagueData.forEach((eachLeague, index) => {
          var leagName = eachLeague.name;

          let divisionData = eachLeague.division;

          var divisionDataArr = [];
          if (Array.isArray(divisionData)) {            //checking match is object or array
              divisionDataArr = divisionData;
          } else {
              divisionDataArr.push(divisionData);
          }

          divisionDataArr.forEach((eachDivision) => {
              var divisionName = eachDivision.name; //east/west/north/south

              eachDivision.team.forEach(async (eachTeam) => {

                // console.log("eachTeam",eachTeam);
                  // var teamName = eachTeam.name;
                  // console.log("eachTeam", eachTeam.id, eachTeam.name);
                  // nfl_teams.countDocuments({ team_name: teamName }, function (err, count) {
                  //     if (err) {
                  //         console.log(err)
                  //     } else {
                  //         // console.log("nfl_teams Count :", count)
                  //         if (count == 0) {
                  //             var teamArr = [];
                  //             // teamArr = eachTeam;
                  //             teamArr['team_id'] = eachTeam.id;
                  //             teamArr['team_name'] = teamName;
                  //             teamArr['team_leag'] = leagName;
                  //             teamArr['team_division'] = divisionName;
                  //             teamArr['team_position'] = eachTeam.position;

                  //             nfl_teams.create(teamArr);
                  //             totalAddEdit.add++;
                  //         } else {
                  //             nfl_teams.findOne({ team_name: teamName }, async function (err, existRes) {
                  //                 if (err) {
                  //                     console.log(err)
                  //                 }
                  //                 else {
                  //                     let teamArr = {
                  //                         team_id: eachTeam.id,
                  //                         team_leag: leagName,
                  //                         team_division: divisionName,
                  //                         team_position: eachTeam.position,
                  //                     }
                  //                     // console.log('teamArr updateTwo', existRes._id);
                  //                     var re = await nfl_teams.updateOne({ _id: existRes._id }, teamArr);
                  //                 }
                  //             });


                  //         }
                  //     }
                  // });

                  if (eachTeam.name) {
                      TeamData = teamNcaa.find(team => team.team_name == eachTeam.name)
                      TeamId = TeamData ? TeamData.team_id : '';
                  }
                  // console.log("homeTeamData",TeamId);

                  let dataToSave = {
                    team_id: TeamId || undefined,
                    leag_name: leagName,
                    team_division: divisionName,
                    conference_lost: eachTeam.conference_lost,
                    conference_points_against: eachTeam.conference_points_against,
                    conference_points_for: eachTeam.conference_points_for,
                    conference_won: eachTeam.conference_won,
                    overall_lost: eachTeam.overall_lost,
                    overall_points_against: eachTeam.overall_points_against,
                    overall_points_for: eachTeam.overall_points_for,
                    position: eachTeam.position,
                    overall_won: eachTeam.overall_won,
                    streak: eachTeam.streak,
                    season: season,
                  }

                  let checkExist = await ncaaStanding.findOne({ team_id: TeamId,season:season });
                  if (checkExist) {
                      // console.log("1111111111");
                      let toUpdate = {
                          //   team_id:TeamId || undefined,
                        leag_name: leagName,
                        team_division: divisionName,
                        conference_lost: eachTeam.conference_lost,
                        conference_points_against: eachTeam.conference_points_against,
                        conference_points_for: eachTeam.conference_points_for,
                        conference_won: eachTeam.conference_won,
                        overall_lost: eachTeam.overall_lost,
                        overall_points_against: eachTeam.overall_points_against,
                        overall_points_for: eachTeam.overall_points_for,
                        position: eachTeam.position,
                        overall_won: eachTeam.overall_won,
                        streak: eachTeam.streak,
                        season: season,

                      }

                      let update = await ncaaStanding.findOneAndUpdate({ _id: checkExist._id }, toUpdate);

                      totalAddEdit.edit++;

                  }
                  else {
                      // console.log("222222222222");

                      await ncaaStanding.create(dataToSave);
                      totalAddEdit.add++;

                  }



              })

              return totalAddEdit;
          })
      })

      sendResponseData(res, 200, true, "NFL standing data save from third party api", {});

  }
  catch (error) {
      console.log(error);
      sendResponseData(res, 200, false, "something wrong", {});
  }




}


module.exports = {
  ncaafTeamList,
  ncaafTeamListCount,
  ncaafTeamLogoUpload,
  ncaaPlayerList,
  ncaaPlayerListCount,
  ncaaStandingsUpdateSave

}