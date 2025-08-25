
const fs = require('fs');
var buffer = require('buffer');
var path = require('path');

const axios = require('axios');
const { sendResponseData, fileUpload, getFilePath, decode_base64_img } = require("../../util/Utility");
const config = require("../../config/config");
const NflPlayers = require("../../models/thirdPartySchema/nfl_player.model");
const nfl_team = require('../../models/thirdPartySchema/nfl_team.model');
const NflPlayerStats = require('../../models/thirdPartySchema/nfl_player_stat.model');
const NflInjury = require('../../models/thirdPartySchema/nfl_injuriy');
const NflRoster = require('../../models/thirdPartySchema/nfl_roster.model');
const NflTeamStat = require('../../models/thirdPartySchema/nfl_team_stat.model');
const NflScore = require('../../models/thirdPartySchema/nfl_score.model');
const NflStandings = require('../../models/thirdPartySchema/nfl_standings.model');
const nflDepthChart = require('../../models/thirdPartySchema/nfl_depth_chart.model');
const NFL_game_played = require('../../models/thirdPartySchema/nfl_game_played.model');



const nflPlayerSave_fantasyNerds = async (req, res) => {
    const nflPlayerData = await axios.get('https://api.fantasynerds.com/v1/nfl/players?apikey=' + config.fantasyNerdsApikey);

    var totalAddEdit = {
        add: 0,
        edit: 0
    };
    nflPlayerData.data.forEach(async (eachPlayer) => {
        var playerId = eachPlayer.playerId;

        NflPlayers.findOne({ player_id: playerId }, async function (err, existPlayerData) {
            if (err) {
                console.log(err)
            } else {
                const playerArr = {
                    player_id: playerId,
                    name: eachPlayer.name,
                    active: eachPlayer.active,
                    star: eachPlayer.star,
                    position: eachPlayer.position,
                    team_code: eachPlayer.team_code,
                    team_id: eachPlayer.team_id,
                    height: eachPlayer.height,
                    weight: eachPlayer.weight,
                    dob: eachPlayer.dob,
                    college: eachPlayer.college,
                    drafted: eachPlayer.drafted,
                }

                // console.log('teamArr', existTeamData);
                if (existPlayerData == null) {
                    NflPlayers.create(playerArr);
                    totalAddEdit.add++;
                } else {
                    totalAddEdit.edit++;
                    var re = await NflPlayers.updateOne({ _id: existPlayerData._id }, playerArr);
                }
            }
        });
    });

    sendResponseData(res, 200, true, "NFL players updated from third party api", totalAddEdit);

}

const nflPlayerSave = async(req,res)=>{
    const nflTeamList = await nfl_team.find({});
    nflTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;
        nflPlayerDataSave(teamId);
    });
    sendResponseData(res, 200, true, "NFL players updated from third party api", {});


}

async function nflPlayerDataSave (teamId){
    const playerData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_rosters?json=1');
    // const nflPlayerData = await axios.get('https://api.fantasynerds.com/v1/nfl/players?apikey=' + config.fantasyNerdsApikey);
    let allData = playerData.data;

    let reportData = allData.team.position;

    var totalAddEdit = {
        add: 0,
        edit: 0
    };
    reportData.forEach(async (each) => {
       console.log("each",each);
       each.player.forEach((eachPlayer)=>{
        const playerArr = {
            player_id: eachPlayer.id,
            name: eachPlayer.name,
           // active: eachPlayer.active,
            //star: eachPlayer.star,
            position: eachPlayer.position,
            team_code: eachPlayer.team_code,
            team_id: teamId,
            height: eachPlayer.height,
            weight: eachPlayer.weight,
            dob: eachPlayer.dob,
            college: eachPlayer.college,
            drafted: eachPlayer.drafted,
            number:eachPlayer.number,
            age:eachPlayer.age
        }
        NflPlayers.create(playerArr);

       })
    });


}


const nflPlayerStatSave = async (req, res) => {
    const nflTeamList = await nfl_team.find({});
    const nflPlayerList = await NflPlayers.find({});

    const nflPlayerListIdArr = [];
    nflPlayerList.forEach(async (eachPlayer) => {
        nflPlayerListIdArr[eachPlayer.name] = eachPlayer.player_id;
    })

    nflTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;
        nflPlayerStatSaveByTeamIdFn(teamId, nflPlayerListIdArr);
    });


    sendResponseData(res, 200, true, "NFL players state from third party api", {});
}


const nflPlayerStatSaveByTeamId = async (req, res) => {
    const teamId = req.query.teamId;

    const nflPlayerList = await NflPlayers.find({});
    const nflPlayerListIdArr = [];
    nflPlayerList.forEach(async (eachPlayer) => {
        nflPlayerListIdArr[eachPlayer.name] = eachPlayer.player_id;
    })

    nflPlayerStatSaveByTeamIdFn(teamId, nflPlayerListIdArr);
    sendResponseData(res, 200, true, "Update player state for team " + teamId, {});
}

async function nflPlayerStatSaveByTeamIdFn(teamId, nflPlayerListIdArr) {
    const teamPlayerStatData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_player_stats?json=1');

    var teamPlayerStatistic = teamPlayerStatData.data.statistic;
    var season = teamPlayerStatistic.season;
    var statCategoryList = teamPlayerStatistic.category;

    await NflPlayerStats.deleteMany({ season: season, team_id: teamId });

    statCategoryList.forEach(async (eachCat) => {
        var catName = eachCat.name;
        var playerList = eachCat.player;

        var playerListArr = [];
        if (Array.isArray(playerList)) {            //checking match is object or array
            playerListArr = playerList;
        } else {
            playerListArr.push(playerList);
        }

        playerListArr.forEach(async (eachPlayerStat) => {

            var playerStatArr = {
                stat_id: eachPlayerStat.id,
                team_id: teamId,
                player_id: nflPlayerListIdArr[eachPlayerStat.name],
                season: season,
                stat_category: catName,
            };

            if (catName === 'Passing') {
                playerStatArr.completion_pct = eachPlayerStat.completion_pct;
                playerStatArr.completions = eachPlayerStat.completions;
                playerStatArr.interceptions = eachPlayerStat.interceptions;
                playerStatArr.interceptions_pct = eachPlayerStat.interceptions_pct;
                playerStatArr.longest_pass = eachPlayerStat.longest_pass;
                playerStatArr.passing_attempts = eachPlayerStat.passing_attempts;
                playerStatArr.passing_touchdowns = eachPlayerStat.passing_touchdowns;
                playerStatArr.quaterback_rating = eachPlayerStat.quaterback_rating;
                playerStatArr.passing_touchdowns_pct = eachPlayerStat.passing_touchdowns_pct;
                playerStatArr.sacked_yards_lost = eachPlayerStat.sacked_yards_lost;
                playerStatArr.sacks = eachPlayerStat.sacks;
                playerStatArr.rank = eachPlayerStat.rank;
                playerStatArr.yards = eachPlayerStat.yards;
                playerStatArr.yards_per_game = eachPlayerStat.yards_per_game;
                playerStatArr.yards_per_pass_avg = eachPlayerStat.yards_per_pass_avg;

                // saveArrForStat.push(playerStatArr);
                await NflPlayerStats.create(playerStatArr);
                // totalAddEdit.add++;
            } else if (catName === 'Rushing') {

                playerStatArr.fumbles = eachPlayerStat.fumbles;
                playerStatArr.fumbles_lost = eachPlayerStat.fumbles_lost;
                playerStatArr.longest_rush = eachPlayerStat.longest_rush;
                playerStatArr.over_20_yards = eachPlayerStat.over_20_yards;
                playerStatArr.rank = eachPlayerStat.rank;
                playerStatArr.rushing_attempts = eachPlayerStat.rushing_attempts;
                playerStatArr.rushing_first_downs = eachPlayerStat.rushing_first_downs;
                playerStatArr.rushing_touchdowns = eachPlayerStat.rushing_touchdowns;
                playerStatArr.yards = eachPlayerStat.yards;
                playerStatArr.yards_per_game = eachPlayerStat.yards_per_game;
                playerStatArr.yards_per_rush_avg = eachPlayerStat.yards_per_rush_avg;

                await NflPlayerStats.create(playerStatArr);
                // totalAddEdit.add++;
            } else if (catName === 'Receiving') {

                playerStatArr.fumbles = eachPlayerStat.fumbles;
                playerStatArr.fumbles_lost = eachPlayerStat.fumbles_lost;
                playerStatArr.longest_reception = eachPlayerStat.longest_reception;
                playerStatArr.over_20_yards = eachPlayerStat.over_20_yards;
                playerStatArr.rank = eachPlayerStat.rank;
                playerStatArr.receiving_first_downs = eachPlayerStat.receiving_first_downs;
                playerStatArr.receiving_targets = eachPlayerStat.receiving_targets;
                playerStatArr.receiving_touchdowns = eachPlayerStat.receiving_touchdowns;
                playerStatArr.receiving_yards = eachPlayerStat.receiving_yards;
                playerStatArr.receptions = eachPlayerStat.receptions;
                playerStatArr.yards_after_catch = eachPlayerStat.yards_after_catch;
                playerStatArr.yards_per_game = eachPlayerStat.yards_per_game;
                playerStatArr.yards_per_reception_avg = eachPlayerStat.yards_per_reception_avg;

                await NflPlayerStats.create(playerStatArr);
                // totalAddEdit.add++;
            }

        })

        await nfl_team.updateOne({ team_id: teamId }, { updated_at: Date.now() });
        return true;
    });
}

//-------------------injury save----------------------
const nflInjuryUpdateSave = async (req, res) => {
    const nflTeamList = await nfl_team.find({});

    const nflPlayerList = await NflPlayers.find({});
    const nflPlayerListIdArr = [];
    nflPlayerList.forEach(async (eachPlayer) => {
        nflPlayerListIdArr[eachPlayer.name] = eachPlayer.player_id;
    })

    nflTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;
        nflInjurySave(teamId, nflPlayerListIdArr);
    });

    sendResponseData(res, 200, true, "NFL injuries from third party api", {});

}

const nflInjuryUpdateSaveByTeamId = async (req, res) => {
    const teamId = req.query.teamId;

    const nflPlayerList = await NflPlayers.find({});
    const nflPlayerListIdArr = [];
    nflPlayerList.forEach(async (eachPlayer) => {
        nflPlayerListIdArr[eachPlayer.name] = eachPlayer.player_id;
    })

    nflInjurySave(teamId, nflPlayerListIdArr);
    sendResponseData(res, 200, true, "NFL injuries update from third party api" + teamId, {});

}

async function nflInjurySave(teamId, nflPlayerListIdArr) {
    const injuryData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_injuries?json=1');

    let allData = injuryData.data;

    let reportData = allData.team.report;

    await NflInjury.deleteMany({ teamId: teamId });


    // console.log("injuryData",reportData);
    if (!reportData) {
        return;
    }
    reportData.forEach(async (each) => {
        var injuryData = {
            teamId: teamId,
            // player_name:each.player_name,
            report_status: each.status,
            report_description: each.description,
            report_date: each.date ? new Date(each.date.split(".").reverse().join("-")) : '',
            player_id: nflPlayerListIdArr[each.player_name]

        }

        // console.log(injuryData.report_date);
        await NflInjury.create(injuryData);
    })
    return true;
}

//--------------------roster save----------------
const nflRosterUpadteSave = async (req, res) => {
    const nflTeamList = await nfl_team.find({});

    const nflPlayerList = await NflPlayers.find({});
    const nflPlayerListIdArr = [];
    nflPlayerList.forEach(async (eachPlayer) => {
        nflPlayerListIdArr[eachPlayer.name] = eachPlayer.player_id;
    })

    nflTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;
        nflRosterSave(teamId, nflPlayerListIdArr);
    });

    sendResponseData(res, 200, true, "NFL rosters from third party api", {});

}

const nflRosterUpdateSaveByTeamId = async (req, res) => {
    var teamId = req.query.teamId;
    const nflPlayerList = await NflPlayers.find({});
    const nflPlayerListIdArr = [];
    nflPlayerList.forEach(async (eachPlayer) => {
        nflPlayerListIdArr[eachPlayer.name] = eachPlayer.player_id;
    })

    nflRosterSave(teamId, nflPlayerListIdArr);
    sendResponseData(res, 200, true, "NFL rosters update from third party api" + teamId, {});
}

async function nflRosterSave(teamId, nflPlayerListIdArr) {
    const rosterData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_rosters?json=1');

    let allData = rosterData.data;

    let reportData = allData.team.position;

    // console.log(reportData);
    await NflRoster.deleteMany({ teamId: teamId });

    reportData.forEach((eachPosition) => {
        var team_position = eachPosition.name;

        eachPosition.player.forEach(async (each) => {
            var injuryData = {
                teamId: teamId,
                player_id: nflPlayerListIdArr[each.name],
                team_position: team_position,
                player_position: each.position,
                player_age: each.age,
                player_height: each.height,
                player_weight: each.weight,
                player_exp: each.experience_years,
                player_college: each.college,

            }

            // console.log(injuryData.report_date);
            await NflRoster.create(injuryData);

        })
    })


}

//------------------------------Team stat save-----------------

const nflTeamStatSave = async (req, res) => {
    const nflTeamList = await nfl_team.find({});

    nflTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;
        TeamStatSave(teamId);
    });

    sendResponseData(res, 200, true, "NFL team stat from third party api", {});

}
const nflTeamStatSaveByTeamId = async (req, res) => {
    var teamId = req.query.teamId;
    TeamStatSave(teamId);
    sendResponseData(res, 200, true, "NFL team stat update from third party api" + teamId, {});

}

async function TeamStatSave(teamId) {
    const statData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_team_stats?json=1');

    var teamPlayerStatistic = statData.data.statistic;
    var season = teamPlayerStatistic.season;
    var statCategoryList = teamPlayerStatistic.category;

    // console.log();
    statCategoryList.forEach(async (eachCat) => {
        var catName = eachCat.name;
        var opponentList = eachCat.opponents;
        var teamList = eachCat.team;

        var StatArr = {
            // stat_id: eachPlayerStat.id,
            team_id: teamId,
            // player_id: nflPlayerListIdArr[eachPlayerStat.name],
            season: season,
            stat_category: catName,
            team: teamList,
            opponents: opponentList
        };
        let nflTeamStatCheck = await NflTeamStat.find({
            season: season,
            team_id: teamId
        })
        // console.log("StatArr",nflTeamStatCheck);
        if (nflTeamStatCheck.length != 0) {
            let updateTeamStat = await NflTeamStat.updateMany({
                season: season,
                team_id: teamId
            }, { $set: StatArr })
        }
        else {
            await NflTeamStat.create(StatArr);
        }


        return true;
    });



}

//--------------------------------------score data save-----------------------------------
const nflScoreUpdateSave = async (req, res) => {
    try {

        let nflTeam = await nfl_team.find({ status: true, isDelete: false });


        let year = req.query.date; // 12.09.2022

        let result;
        if (year) {
            result = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/nfl-scores?json=1&date=' + year);
        }
        else {
            // console.log("111111111");
            result = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/nfl-scores?json=1');
        }


        const scoreData = result.data.scores.category.match;
        // console.log("222222222222222222",scoreData);

        var scoreDataArr = [];
        if (Array.isArray(scoreData)) {            //checking match is object or array
            scoreDataArr = scoreData;
        } else {
            scoreDataArr.push(scoreData);
        }

        scoreDataArr.forEach(async (eachMatch) => {
            // console.log("scoreData",scoreDataArr.length);

            if (eachMatch.hometeam) {
                homeTeamData = nflTeam.find(team => team.team_name === eachMatch.hometeam.name);
                // console.log("homeTeamData",homeTeamData);
                homeTeamId = homeTeamData ? homeTeamData.team_id : '';
            }

            if (eachMatch.awayteam) {
                awayTeamData = nflTeam.find(team => team.team_name === eachMatch.awayteam.name);
                // console.log("awayTeamData",awayTeamData);
                awayTeamId = awayTeamData ? awayTeamData.team_id : '';
            }

            let dataToSave = {
                matchDate: eachMatch.formatted_date ? new Date(eachMatch.formatted_date.split(".").reverse().join("-")) : '',
                matchTime: eachMatch.time ? eachMatch.time : '',
                awayTeam: awayTeamId || undefined,
                homeTeam: homeTeamId || undefined,
                awayTeamScore: eachMatch.awayteam.totalscore,
                homeTeamScore: eachMatch.hometeam.totalscore,
                passing: eachMatch.passing,
                rushing: eachMatch.rushing,
                receiving: eachMatch.receiving,
                matchVenue: eachMatch.venue_name ? eachMatch.venue_name : '',
                date: eachMatch.date,

            }
            
            if(eachMatch.passing){
                setTimeout(async () =>{
                     await gamePLayedSave(eachMatch.passing,eachMatch.formatted_date) },1500);
            // await gamePLayedSave(eachMatch.passing,eachMatch.formatted_date);

            }
             if(eachMatch.rushing){
                setTimeout(async () =>{
                    await gamePLayedSave(eachMatch.rushing,eachMatch.formatted_date) },3000);

        //    await gamePLayedSave(eachMatch.rushing,eachMatch.formatted_date);

            }
             if(eachMatch.receiving){
                setTimeout(async () =>{
                    await gamePLayedSave(eachMatch.receiving,eachMatch.formatted_date)}, 6000);

        //    await gamePLayedSave(eachMatch.receiving,eachMatch.formatted_date);

            }

            let existData = await NflScore.find({ matchDate: dataToSave.matchDate });
            // console.log("existData", existData.length);
            if (existData.length > 0) {
                existData.forEach(async (each) => {
                    let updatedata = {
                        matchTime: eachMatch.time ? eachMatch.time : '',
                        awayTeam: awayTeamId || undefined,
                        homeTeam: homeTeamId || undefined,
                        awayTeamScore: eachMatch.awayteam.totalscore,
                        homeTeamScore: eachMatch.hometeam.totalscore,
                        passing: eachMatch.passing,
                        rushing: eachMatch.rushing,
                        receiving: eachMatch.receiving,
                        matchVenue: eachMatch.venue_name ? eachMatch.venue_name : '',
                        date: eachMatch.date,
                    }

                    let update = await NflScore.updateOne({ _id: each._id }, updatedata);
                })


            }
            else {
                await NflScore.create(dataToSave);

            }


        });

        sendResponseData(res, 200, true, "NFL score from third party api", {});


    }
    catch (error) {
        console.log(error);
        sendResponseData(res, 200, false, "something wrong", {});

    }

}

//-------------------------------------nfl standing-------------------------------------
const nflStandingsUpdateSave = async (req, res) => {

    try {
        let nflTeam = await nfl_team.find({ status: true, isDelete: false });

        var totalAddEdit = {
            add: 0,
            edit: 0
        };


        const goalserverTeam = await axios.get(`http://www.goalserve.com/getfeed/` + config.goalServerApikey + `/football/nfl-standings?json=1`);
        const leagueData = goalserverTeam.data.standings.category.league;
        const season = goalserverTeam.data.standings.category.season;

        var goalserverTeamArr = [];
        leagueData.forEach((eachLeague, index) => {
            var leagName = (eachLeague.name == "American Football Conference") ? "American Football Conference" : "National Football Conference"; //AFC/NFC

            eachLeague.division.forEach((eachDivision) => {
                var divisionName = eachDivision.name; //east/west/north/south

                eachDivision.team.forEach(async (eachTeam) => {
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
                        TeamData = nflTeam.find(team => team.team_name == eachTeam.name)
                        TeamId = TeamData ? TeamData.team_id : '';
                    }
                    // console.log("homeTeamData",TeamId);

                    let dataToSave = {
                        team_id: TeamId || undefined,
                        team_leag: leagName,
                        team_division: divisionName,
                        team_position: eachTeam.position,
                        team_name: eachTeam.name,
                        conference_record: eachTeam.conference_record,
                        difference: eachTeam.difference,
                        division_record: eachTeam.division_record,
                        home_record: eachTeam.home_record,
                        lost: eachTeam.lost,
                        points_against: eachTeam.points_against,
                        points_for: eachTeam.points_for,
                        position: eachTeam.position,
                        road_record: eachTeam.road_record,
                        streak: eachTeam.streak,
                        ties: eachTeam.ties,
                        win_percentage: eachTeam.win_percentage,
                        won: eachTeam.won,
                        season: season
                    }

                    let checkExist = await NflStandings.findOne({ team_id: TeamId });
                    if (checkExist) {
                        // console.log("1111111111");
                        let toUpdate = {
                            //   team_id:TeamId || undefined,
                            team_leag: leagName,
                            team_division: divisionName,
                            team_position: eachTeam.position,
                            conference_record: eachTeam.conference_record,
                            difference: eachTeam.difference,
                            division_record: eachTeam.division_record,
                            home_record: eachTeam.home_record,
                            lost: eachTeam.lost,
                            points_against: eachTeam.points_against,
                            points_for: eachTeam.points_for,
                            position: eachTeam.position,
                            road_record: eachTeam.road_record,
                            streak: eachTeam.streak,
                            ties: eachTeam.ties,
                            win_percentage: eachTeam.win_percentage,
                            won: eachTeam.won,
                            season: season

                        }

                        let update = await NflStandings.updateOne({ team_id: TeamId }, toUpdate);

                        totalAddEdit.edit++;

                    }
                    else {
                        // console.log("222222222222");

                        await NflStandings.create(dataToSave);
                        totalAddEdit.add++;

                    }



                })

                return totalAddEdit;
            })
        })

        sendResponseData(res, 200, true, "NFL standing data save from third party api", totalAddEdit);

    }
    catch (error) {
        console.log(error);
        sendResponseData(res, 200, false, "something wrong", {});
    }




}

const playerImageSave = async (req, res) => {
    const playerId = req.query.playerId;
    try {
        const playerImgApi = await axios.get(`http://www.goalserve.com/getfeed/` + config.goalServerApikey + `/football/usa?playerimage=` + playerId + `&json=1`);
        const playerImgBase64 = playerImgApi.data.image.value;
        var imgSave = decode_base64_img(playerImgBase64, 'nfl_players', playerId + '.jpg');
        console.log('imgSave', imgSave);
        
        var toUpdate={
            profile_img: playerId + '.jpg',
        }

        let update = await NflPlayers.updateOne({ player_id: Number(playerId) }, toUpdate);
        
        sendResponseData(res, 200, true, "Player image uploaded", getFilePath('nfl_players/'+playerId + '.jpg'));
    } catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
};

const playerImageSaveAll = async (req, res) => {
    const playerId = req.query.playerId;
    try {
        const nflPlayerList = await NflPlayers.find({});
        if(nflPlayerList && nflPlayerList.length > 0){
            nflPlayerList.forEach(async (element) => {
                var playerId = element.player_id;
                const playerImgApi = await axios.get(`http://www.goalserve.com/getfeed/` + config.goalServerApikey + `/football/usa?playerimage=` + playerId + `&json=1`);
                const playerImgBase64 = playerImgApi.data.image.value;
                var imgSave = decode_base64_img(playerImgBase64, 'nfl_players', playerId + '.jpg');
                // console.log('imgSave', imgSave);
                
                var toUpdate={
                    profile_img: playerId + '.jpg',
                }
        
                let update = await NflPlayers.updateOne({ player_id: Number(playerId) }, toUpdate);
            })
        }
        
        sendResponseData(res, 200, true, "All Player image uploaded", '');
    } catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
};

//===========================================depth chart=========================
const nflDepthChartUpadteSave = async(req,res)=>{
    try{
        const nflTeamList = await nfl_team.find({});

        nflTeamList.forEach(async (eachTeam) => {
            var teamId = eachTeam.team_id;
            TeamDepthChartSave(teamId);
        });

    sendResponseData(res, 200, true, "NFL team depth chart from third party api", {});
    }
    catch(error){
        sendResponseData(res, 200, false, "Error", error);
    }
}

const nflDepthChartUpdateSaveByTeamId = async(req,res)=>{
    try{
        var teamId = req.query.teamId;
        TeamDepthChartSave(teamId);
    sendResponseData(res, 200, true, "NFL team depth chart update from third party api" + teamId, {});

    }
    catch(error){
        sendResponseData(res, 200, false, "Error", error);
    }
}

async function TeamDepthChartSave(teamId) {
    const statData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_dchart?json=1');

    var sectionData = statData.data.team.section;

    // console.log(sectionData);
    let nflDepthChartCheck = await nflDepthChart.find({
        team_id: teamId
    })
    if (nflDepthChartCheck.length != 0) {
        let updateTeamStat = await nflDepthChart.deleteMany({
            team_id: teamId
        })
    }
    sectionData.forEach(async (eachSection) => {
        var section_name = eachSection.name;
        
        eachSection.position.forEach(async(each)=>{

            var DepthArr = {
                team_id: teamId,
                section_name: section_name,
                position_name: each.name,
                starter_p_id: each.starter_id ? Number(each.starter_id) : 0,
                second_p_id: each.second_id ? Number(each.second_id) : 0,
                third_p_id: each.third_id ? Number(each.third_id) : 0,
                fourth_p_id: each.fourth_id ? Number(each.fourth_id) : 0,
            };
            await nflDepthChart.create(DepthArr);
        })        
        // console.log("StatArr",nflTeamStatCheck);
        
        return true;
    });



}

async function gamePLayedSave(data,date){
    // console.log("---------------date",data);
    if(data.awayteam){
        let tempArr= [];
        // let c = 0;
        if (Array.isArray(data.awayteam.player)) {
            tempArr = data.awayteam.player;
        } else {
            tempArr.push(data.awayteam.player);
        }
        tempArr.forEach(async (eachPlayer)=>{
            // console.log("-----------away----",eachPlayer);
           let dataSave = {
                player_id:Number(eachPlayer.id),
                match_date:date ? new Date(date.split(".").reverse().join("-")) : ''
            }
            // c++;
            let exist = await NFL_game_played.findOne({$and:[dataSave]});
            // console.log("exist ----- away",exist);
            if(exist == null){
                // let deleteData = await NFL_game_played.deleteOne(dataSave);
                await NFL_game_played.create(dataSave);
            }

            
            // await NFL_game_played.create(dataSave); 

        })
        // console.log("away",c);

    }
    if(data.hometeam){
        let tempArr= [];
        // let c = 0;
        if (Array.isArray(data.hometeam.player)) {
            tempArr = data.hometeam.player;
          } else {
            tempArr.push(data.hometeam.player);
          }
        tempArr.forEach(async (eachPlayer) => {
            // console.log("-----------home----", eachPlayer);
            let dataSave = {
                player_id: Number(eachPlayer.id),
                match_date: date ? new Date(date.split(".").reverse().join("-")) : ''
            }
            // c++;
            let exist = await NFL_game_played.findOne({$and:[dataSave]});
            // console.log("exist--------home",exist);
            if( exist == null){
                // let deleteData = await NFL_game_played.deleteOne(dataSave);
                await NFL_game_played.create(dataSave);
            }

            

        })
        // console.log("home",c);

    }


}

module.exports = {
    nflPlayerSave,
    nflPlayerStatSave,
    nflPlayerStatSaveByTeamId,
    nflInjuryUpdateSave,
    nflInjuryUpdateSaveByTeamId,
    nflRosterUpadteSave,
    nflRosterUpdateSaveByTeamId,
    nflTeamStatSave,
    nflTeamStatSaveByTeamId,
    nflScoreUpdateSave,
    nflStandingsUpdateSave,
    playerImageSave,
    playerImageSaveAll,
    nflDepthChartUpadteSave,
    nflDepthChartUpdateSaveByTeamId


}