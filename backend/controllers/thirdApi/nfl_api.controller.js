
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
const nflFantasyScore = require('../../models/thirdPartySchema/nfl_fantasy_score.model');



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

const nflPlayerSave = async (req, res) => {
    const nflTeamList = await nfl_team.find({});
    nflTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;
        nflPlayerDataSave(teamId);
    });
    sendResponseData(res, 200, true, "NFL players updated from third party api", {});


}

async function nflPlayerDataSave(teamId) {
    const playerData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_rosters?json=1');
    // const nflPlayerData = await axios.get('https://api.fantasynerds.com/v1/nfl/players?apikey=' + config.fantasyNerdsApikey);
    let allData = playerData.data;

    let reportData = allData.team.position;

    var totalAddEdit = {
        add: 0,
        edit: 0
    };
    await NflPlayers.updateMany({ team_id: teamId },{$set:{status:false}});
    reportData.forEach(async (each) => {
        // console.log("each", each);
        each.player.forEach((eachPlayer) => {
            const playerArr = {
                player_id: eachPlayer.id,
                name: eachPlayer.name,
                profile_img: eachPlayer.id + ".jpg",
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
                number: eachPlayer.number,
                age: eachPlayer.age
            }
            NflPlayers.create(playerArr);

        })
    });


}


const nflPlayerStatSave = async (req, res) => {
    const nflTeamList = await nfl_team.find({});
    // nflTeamList.forEach((eachTeam)=>{

    // })
    // const nflPlayerList = await NflPlayers.find({});

    // const nflPlayerListIdArr = [];
    // nflPlayerList.forEach(async (eachPlayer) => {
    //     nflPlayerListIdArr.push({team_id:eachPlayer.team_id,player_id:eachPlayer.player_id,player_name:eachPlayer.name});
    //     // nflPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
    // })

    nflTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;
        nflPlayerStatSaveByTeamIdFn(teamId);
    });


    sendResponseData(res, 200, true, "NFL players state from third party api", {});
}


const nflPlayerStatSaveByTeamId = async (req, res) => {
    const teamId = req.query.teamId;

    const nflPlayerList = await NflPlayers.find({ team_id: teamId });
    // const nflPlayerListIdArr = {};
    // nflPlayerList.forEach(async (eachPlayer) => {
    //     nflPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
    // })

    nflPlayerStatSaveByTeamIdFn(teamId);
    sendResponseData(res, 200, true, "Update player state for team " + teamId, {});
}

async function nflPlayerStatSaveByTeamIdFn(teamId) {
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
        // let playerData ;


        playerListArr.forEach(async (eachPlayerStat) => {
            // playerData = nflPlayerListIdArr.find(player => player.team_id === teamId && player.player_name === eachPlayerStat.name);

            // console.log("playerData",playerData);

            var playerStatArr = {
                stat_id: eachPlayerStat.id,
                team_id: teamId,
                player_id: eachPlayerStat.id,
                player_name: eachPlayerStat.name,
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
                // playerStatArr.yards = eachPlayerStat.yards;
                playerStatArr.yards = eachPlayerStat.yards ? await checkOneDigit(eachPlayerStat.yards) : eachPlayerStat.yards;
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
                // playerStatArr.yards = eachPlayerStat.yards;
                playerStatArr.yards = eachPlayerStat.yards ? await checkOneDigit(eachPlayerStat.yards) : eachPlayerStat.yards;
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
                // playerStatArr.receiving_yards = eachPlayerStat.receiving_yards;
                playerStatArr.receiving_yards = eachPlayerStat.receiving_yards ? await checkOneDigit(eachPlayerStat.receiving_yards) : eachPlayerStat.receiving_yards;
                playerStatArr.receptions = eachPlayerStat.receptions;
                playerStatArr.yards_after_catch = eachPlayerStat.yards_after_catch;
                playerStatArr.yards_per_game = eachPlayerStat.yards_per_game;
                playerStatArr.yards_per_reception_avg = eachPlayerStat.yards_per_reception_avg;

                await NflPlayerStats.create(playerStatArr);
                // totalAddEdit.add++;
            } else if (catName === 'Defense') {

                playerStatArr.assisted_tackles = eachPlayerStat.assisted_tackles;
                playerStatArr.blocked_kicks = eachPlayerStat.blocked_kicks;
                playerStatArr.forced_fumbles = eachPlayerStat.forced_fumbles;
                playerStatArr.fumbles_recovered = eachPlayerStat.fumbles_recovered;
                playerStatArr.fumbles_returned_for_touchdowns = eachPlayerStat.fumbles_returned_for_touchdowns;
                playerStatArr.intercepted_returned_yards = eachPlayerStat.intercepted_returned_yards;
                playerStatArr.interceptions = eachPlayerStat.interceptions;
                playerStatArr.interceptions_returned_for_touchdowns = eachPlayerStat.interceptions_returned_for_touchdowns;
                playerStatArr.longest_interception_return = eachPlayerStat.longest_interception_return;
                // playerStatArr.longest_interception_return = eachPlayerStat.longest_interception_return ? await checkOneDigit(eachPlayerStat.longest_interception_return) : eachPlayerStat.longest_interception_return;
                playerStatArr.name = eachPlayerStat.name;
                playerStatArr.passes_defended = eachPlayerStat.passes_defended;
                playerStatArr.rank = eachPlayerStat.rank;
                playerStatArr.sacks = eachPlayerStat.sacks;
                playerStatArr.tackles_for_loss = eachPlayerStat.tackles_for_loss;
                playerStatArr.total_tackles = eachPlayerStat.total_tackles;
                playerStatArr.unassisted_tackles = eachPlayerStat.unassisted_tackles;
                playerStatArr.yards_lost_on_sack = eachPlayerStat.yards_lost_on_sack;



                await NflPlayerStats.create(playerStatArr);
                // totalAddEdit.add++;
            } else if (catName === 'Scoring') {

                playerStatArr.extra_points = eachPlayerStat.extra_points;
                playerStatArr.field_goals = eachPlayerStat.field_goals;
                playerStatArr.name = eachPlayerStat.name;
                playerStatArr.rank = eachPlayerStat.rank;
                playerStatArr.receiving_touchdowns = eachPlayerStat.receiving_touchdowns;
                playerStatArr.return_touchdowns = eachPlayerStat.return_touchdowns;
                playerStatArr.rushing_touchdowns = eachPlayerStat.rushing_touchdowns;
                playerStatArr.total_points = eachPlayerStat.total_points;
                playerStatArr.total_points_per_game = eachPlayerStat.total_points_per_game;
                // playerStatArr.receiving_yards = eachPlayerStat.receiving_yards ? await checkOneDigit(eachPlayerStat.receiving_yards) : eachPlayerStat.receiving_yards;
                playerStatArr.total_touchdowns = eachPlayerStat.total_touchdowns;
                playerStatArr.two_point_conversions = eachPlayerStat.two_point_conversions;


                await NflPlayerStats.create(playerStatArr);
                // totalAddEdit.add++;
            }


        })

        await nfl_team.updateOne({ team_id: teamId }, { updated_at: Date.now() });
        return true;
    });
}

async function checkOneDigit(string) {
    // checking for given string having one digit or not
    console.log("ascii-----------", string.length);
    if (string.length === 1) {
        for (let i = 0; i < string.length; i++) {
            var ascii = string.charCodeAt(0);
            if (ascii < 48 || ascii > 57) {
                return false;
            }
        }
        return `0${string}`;
    }
    return string;

}

//-------------------injury save----------------------
const nflInjuryUpdateSave = async (req, res) => {
    const nflTeamList = await nfl_team.find({});

    // const nflPlayerList = await NflPlayers.find({});
    // const nflPlayerListIdArr = {};
    // nflPlayerList.forEach(async (eachPlayer) => {
    //     nflPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
    // })

    nflTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;
        nflInjurySave(teamId);
        // nflInjurySave(teamId, nflPlayerListIdArr);
    });

    sendResponseData(res, 200, true, "NFL injuries from third party api", {});

}

const nflInjuryUpdateSaveByTeamId = async (req, res) => {
    const teamId = req.query.teamId;

    // const nflPlayerList = await NflPlayers.find({team_id: teamId});
    // const nflPlayerListIdArr = {};
    // nflPlayerList.forEach(async (eachPlayer) => {
    //     nflPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
    // })

    nflInjurySave(teamId);
    sendResponseData(res, 200, true, "NFL injuries update from third party api" + teamId, {});

}

async function nflInjurySave(teamId) {
    const injuryData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_injuries?json=1');

    let allData = injuryData.data;

    let reportData = allData.team.report;

    await NflInjury.deleteMany({ teamId: teamId });
    // const nflPlayerList = await NflPlayers.find({team_id: teamId,});
    // const nflPlayerListIdArr = {};
    // nflPlayerList.forEach(async (eachPlayer) => {
    //     console.log("injuryData",eachPlayer);
    //     nflPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
    // })


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
            // player_id: nflPlayerListIdArr[each.player_name]
            player_id: each.player_id

        }

        // console.log(injuryData.report_date);
        await NflInjury.create(injuryData);
    })
    return true;
}

//--------------------roster save----------------
const nflRosterUpadteSave = async (req, res) => {
    const nflTeamList = await nfl_team.find({});

    // const nflPlayerList = await NflPlayers.find({});
    // const nflPlayerListIdArr = {};
    // nflPlayerList.forEach(async (eachPlayer) => {
    //     nflPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
    // })

    nflTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;
        nflRosterSave(teamId);
    });

    sendResponseData(res, 200, true, "NFL rosters from third party api", {});

}

const nflRosterUpdateSaveByTeamId = async (req, res) => {
    var teamId = req.query.teamId;
    // const nflPlayerList = await NflPlayers.find({team_id:teamId});
    // const nflPlayerListIdArr = {};
    // nflPlayerList.forEach(async (eachPlayer) => {
    //     nflPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
    // })

    nflRosterSave(teamId);
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
                player_id: each.id,
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
    await NflTeamStat.deleteMany({
        season: season,
        team_id: teamId
    })
    statCategoryList.forEach(async (eachCat) => {
        var catName = eachCat.name;
        var opponentList = eachCat.opponents;
        var teamList = eachCat.team;

        var StatArr = {
            // stat_id: eachPlayerStat.id,
            team_id: teamId,
            // player_id: nflPlayerListIdArr[teamId][eachPlayerStat.name],
            season: season,
            stat_category: catName,
            team: teamList,
            opponents: opponentList
        };
        // let nflTeamStatCheck = await NflTeamStat.find({
        //     season: season,
        //     team_id: teamId
        // })
        // console.log("StatArr",nflTeamStatCheck);
        // if (nflTeamStatCheck.length != 0) {
        //     let updateTeamStat = await NflTeamStat.updateMany({
        //         season: season,
        //         team_id: teamId
        //     }, { $set: StatArr })
        // }
        // else {
        await NflTeamStat.create(StatArr);
        // }


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
            // console.log("scoreData",scoreDataArr);
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
                awayTeamScore: eachMatch.awayteam.totalscore ? eachMatch.awayteam.totalscore : 0,
                homeTeamScore: eachMatch.hometeam.totalscore ? eachMatch.hometeam.totalscore : 0,
                passing: eachMatch.passing ? eachMatch.passing : '',
                rushing: eachMatch.rushing ? eachMatch.rushing : '',
                receiving: eachMatch.receiving ? eachMatch.receiving : '',
                matchVenue: eachMatch.venue_name ? eachMatch.venue_name : '',
                date: eachMatch.date,

            }

            if (eachMatch.passing) {
                setTimeout(async () => {
                    await gamePLayedSave(eachMatch.passing, eachMatch.formatted_date)
                }, 1500);
                // await gamePLayedSave(eachMatch.passing,eachMatch.formatted_date);

            }
            if (eachMatch.rushing) {
                setTimeout(async () => {
                    await gamePLayedSave(eachMatch.rushing, eachMatch.formatted_date)
                }, 3000);

                //    await gamePLayedSave(eachMatch.rushing,eachMatch.formatted_date);

            }
            if (eachMatch.receiving) {
                setTimeout(async () => {
                    await gamePLayedSave(eachMatch.receiving, eachMatch.formatted_date)
                }, 6000);

                //    await gamePLayedSave(eachMatch.receiving,eachMatch.formatted_date);

            }
            let existData = await NflScore.find({ matchDate: dataToSave.matchDate });
            if (existData.length > 0) {
                existData.forEach(async (each) => {
                    console.log("existData", each);

                    // let updatedata = {
                    //     matchTime: eachMatch.time ? eachMatch.time : '',
                    //     awayTeam: awayTeamId || undefined,
                    //     homeTeam: homeTeamId || undefined,
                    //     awayTeamScore: eachMatch.awayteam.totalscore ? eachMatch.awayteam.totalscore : 0,
                    //     homeTeamScore: eachMatch.hometeam.totalscore ? eachMatch.hometeam.totalscore : 0,
                    //     passing: eachMatch.passing ? eachMatch.passing : '',
                    //     rushing: eachMatch.rushing ? eachMatch.rushing : '',
                    //     receiving: eachMatch.receiving ? eachMatch.receiving : '',
                    //     awayTeamScore: eachMatch.awayteam.totalscore,
                    //     homeTeamScore: eachMatch.hometeam.totalscore,
                    //     passing: eachMatch.passing,
                    //     rushing: eachMatch.rushing,
                    //     receiving: eachMatch.receiving,
                    //     matchVenue: eachMatch.venue_name ? eachMatch.venue_name : '',
                    //     date: eachMatch.date,
                    // }
                    // console.log("updatedata========================>", updatedata);
                    // console.log("each", each);
                    // let update = await NflScore.findOneAndUpdate({ _id: each._id }, {...updatedata})

                    let update = await NflScore.deleteOne({ _id: each._id }, { isDelete: true })
                })

                let s = await NflScore.create(dataToSave);

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

const recentScoreOfNfl = async () => {
    // try {
    //     let nflTeam = await nfl_team.find({ status: true, isDelete: false });

    //         // console.log("111111111");
    //        let result = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/nfl-scores?json=1');

    //     const scoreData = result.data.scores.category.match;
    //     // console.log("222222222222222222",scoreData);

    //     var scoreDataArr = [];
    //     if (Array.isArray(scoreData)) {            //checking match is object or array
    //         scoreDataArr = scoreData;
    //     } else {
    //         scoreDataArr.push(scoreData);
    //     }

    //     scoreDataArr.forEach(async (eachMatch) => {
    //         // console.log("scoreData",scoreDataArr.length);

    //         if (eachMatch.hometeam) {
    //             homeTeamData = nflTeam.find(team => team.team_name === eachMatch.hometeam.name);
    //             // console.log("homeTeamData",homeTeamData);
    //             homeTeamId = homeTeamData ? homeTeamData.team_id : '';
    //         }

    //         if (eachMatch.awayteam) {
    //             awayTeamData = nflTeam.find(team => team.team_name === eachMatch.awayteam.name);
    //             // console.log("awayTeamData",awayTeamData);
    //             awayTeamId = awayTeamData ? awayTeamData.team_id : '';
    //         }

    //         let dataToSave = {
    //             matchDate: eachMatch.formatted_date ? new Date(eachMatch.formatted_date.split(".").reverse().join("-")) : '',
    //             matchTime: eachMatch.time ? eachMatch.time : '',
    //             awayTeam: awayTeamId || undefined,
    //             homeTeam: homeTeamId || undefined,
    //             awayTeamScore: eachMatch.awayteam.totalscore ? eachMatch.awayteam.totalscore : 0,
    //             homeTeamScore: eachMatch.hometeam.totalscore ? eachMatch.hometeam.totalscore : 0,
    //             passing: eachMatch.passing?eachMatch.passing:'',
    //             rushing: eachMatch.rushing?eachMatch.rushing:'',
    //             receiving: eachMatch.receiving?eachMatch.receiving:'',
    //             matchVenue: eachMatch.venue_name ? eachMatch.venue_name : '',
    //             date: eachMatch.date,

    //         }

    //         if(eachMatch.passing){
    //             setTimeout(async () =>{
    //                  await gamePLayedSave(eachMatch.passing,eachMatch.formatted_date) },1500);
    //         // await gamePLayedSave(eachMatch.passing,eachMatch.formatted_date);

    //         }
    //          if(eachMatch.rushing){
    //             setTimeout(async () =>{
    //                 await gamePLayedSave(eachMatch.rushing,eachMatch.formatted_date) },3000);

    //     //    await gamePLayedSave(eachMatch.rushing,eachMatch.formatted_date);

    //         }
    //          if(eachMatch.receiving){
    //             setTimeout(async () =>{
    //                 await gamePLayedSave(eachMatch.receiving,eachMatch.formatted_date)}, 6000);

    //     //    await gamePLayedSave(eachMatch.receiving,eachMatch.formatted_date);

    //         }

    //         let existData = await NflScore.find({ matchDate: dataToSave.matchDate });
    //         // console.log("existData", existData.length);
    //         if (existData.length > 0) {
    //             existData.forEach(async (each) => {
    //                 let updatedata = {
    //                     matchTime: eachMatch.time ? eachMatch.time : '',
    //                     awayTeam: awayTeamId || undefined,
    //                     homeTeam: homeTeamId || undefined,
    //                     awayTeamScore: eachMatch.awayteam.totalscore ? eachMatch.awayteam.totalscore : 0,
    //                     homeTeamScore: eachMatch.hometeam.totalscore ? eachMatch.hometeam.totalscore : 0,
    //                     passing: eachMatch.passing ? eachMatch.passing : '',
    //                     rushing: eachMatch.rushing ? eachMatch.rushing : '',
    //                     receiving: eachMatch.receiving ? eachMatch.receiving : '',
    //                     // awayTeamScore: eachMatch.awayteam.totalscore,
    //                     // homeTeamScore: eachMatch.hometeam.totalscore,
    //                     // passing: eachMatch.passing,
    //                     // rushing: eachMatch.rushing,
    //                     // receiving: eachMatch.receiving,
    //                     matchVenue: eachMatch.venue_name ? eachMatch.venue_name : '',
    //                     date: eachMatch.date,
    //                 }

    //                 let update = await NflScore.updateOne({ _id: each._id }, updatedata);
    //             })
    //         }
    //         else {
    //             await NflScore.create(dataToSave);

    //         }
    //     });
    // }
    try {
        let nflTeam = await nfl_team.find({ status: true, isDelete: false });


        // let year = req.query.date; // 12.09.2022

        // let result;
        // if (year) {
        //     result = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/nfl-scores?json=1&date=' + year);
        // }
        // else {
        // console.log("111111111");
        result = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/nfl-scores?json=1');
        // }


        const scoreData = result.data.scores.category.match;
        // console.log("222222222222222222",scoreData);

        var scoreDataArr = [];
        if (Array.isArray(scoreData)) {            //checking match is object or array
            scoreDataArr = scoreData;
        } else {
            scoreDataArr.push(scoreData);
        }

        scoreDataArr.forEach(async (eachMatch) => {
            // console.log("scoreData",scoreDataArr);
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
                awayTeamScore: eachMatch.awayteam.totalscore ? eachMatch.awayteam.totalscore : 0,
                homeTeamScore: eachMatch.hometeam.totalscore ? eachMatch.hometeam.totalscore : 0,
                passing: eachMatch.passing ? eachMatch.passing : '',
                rushing: eachMatch.rushing ? eachMatch.rushing : '',
                receiving: eachMatch.receiving ? eachMatch.receiving : '',
                matchVenue: eachMatch.venue_name ? eachMatch.venue_name : '',
                date: eachMatch.date,

            }

            if (eachMatch.passing) {
                setTimeout(async () => {
                    await gamePLayedSave(eachMatch.passing, eachMatch.formatted_date)
                }, 1500);
                // await gamePLayedSave(eachMatch.passing,eachMatch.formatted_date);

            }
            if (eachMatch.rushing) {
                setTimeout(async () => {
                    await gamePLayedSave(eachMatch.rushing, eachMatch.formatted_date)
                }, 3000);

                //    await gamePLayedSave(eachMatch.rushing,eachMatch.formatted_date);

            }
            if (eachMatch.receiving) {
                setTimeout(async () => {
                    await gamePLayedSave(eachMatch.receiving, eachMatch.formatted_date)
                }, 6000);

                //    await gamePLayedSave(eachMatch.receiving,eachMatch.formatted_date);

            }
            let existData = await NflScore.find({ date: eachMatch.date });
            // console.log("existData", existData.length);
            if (existData.length > 0) {
                existData.forEach(async (each) => {

                    // let updatedata = {
                    //     matchTime: eachMatch.time ? eachMatch.time : '',
                    //     awayTeam: awayTeamId || undefined,
                    //     homeTeam: homeTeamId || undefined,
                    //     awayTeamScore: eachMatch.awayteam.totalscore ? eachMatch.awayteam.totalscore : 0,
                    //     homeTeamScore: eachMatch.hometeam.totalscore ? eachMatch.hometeam.totalscore : 0,
                    //     passing: eachMatch.passing ? eachMatch.passing : '',
                    //     rushing: eachMatch.rushing ? eachMatch.rushing : '',
                    //     receiving: eachMatch.receiving ? eachMatch.receiving : '',
                    //     awayTeamScore: eachMatch.awayteam.totalscore,
                    //     homeTeamScore: eachMatch.hometeam.totalscore,
                    //     passing: eachMatch.passing,
                    //     rushing: eachMatch.rushing,
                    //     receiving: eachMatch.receiving,
                    //     matchVenue: eachMatch.venue_name ? eachMatch.venue_name : '',
                    //     date: eachMatch.date,
                    // }
                    // console.log("updatedata========================>", updatedata);
                    // console.log("each", each);
                    // let update = await NflScore.findOneAndUpdate({ _id: each._id }, {...updatedata})

                    let update = await NflScore.deleteOne({ _id: each._id }, { isDelete: true })
                })

                let s = await NflScore.create(dataToSave);

            }
            else {
                await NflScore.create(dataToSave);
            }

        });

    }
    catch (error) {
        console.log(error);
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
                var divisionName = eachDivision.name.replace(/AFC|NFC/g, ''); //east/west/north/south

                // console.log("eachTeam", divisionName);
                eachDivision.team.forEach(async (eachTeam) => {
                    // var teamName = eachTeam.name;
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
                        team_division: divisionName?eachDivision.name.replace(/AFC|NFC/g, ''):divisionName,
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

                    let checkExist = await NflStandings.findOne({ team_id: TeamId, season:season });
                    if (checkExist) {
                        // console.log("1111111111",checkExist);
                        let toUpdate = {
                            //   team_id:TeamId || undefined,
                            team_leag: leagName,
                            team_division: divisionName?eachDivision.name.replace(/AFC|NFC/g, ''):divisionName,
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

                        
                        let update = await NflStandings.findOneAndUpdate ({ _id: checkExist._id }, {$set:toUpdate});
                        console.log("222222222222",update);

                        totalAddEdit.edit++;

                    }
                    else {
                        console.log("222222222222");

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

        var toUpdate = {
            profile_img: playerId + '.jpg',
        }

        let update = await NflPlayers.updateOne({ player_id: Number(playerId) }, toUpdate);

        sendResponseData(res, 200, true, "Player image uploaded", getFilePath('nfl_players/' + playerId + '.jpg'));
    } catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
};

const playerImageSaveAll = async (req, res) => {
    const playerId = req.query.playerId;
    try {
        const nflPlayerList = await NflPlayers.find({});
        if (nflPlayerList && nflPlayerList.length > 0) {
            nflPlayerList.forEach(async (element) => {
                var playerId = element.player_id;
                const playerImgApi = await axios.get(`http://www.goalserve.com/getfeed/` + config.goalServerApikey + `/football/usa?playerimage=` + playerId + `&json=1`);
                const playerImgBase64 = playerImgApi.data.image.value;
                var imgSave = decode_base64_img(playerImgBase64, 'nfl_players', playerId + '.jpg');
                // console.log('imgSave', imgSave);

                var toUpdate = {
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
const nflDepthChartUpadteSave = async (req, res) => {
    try {
        const nflTeamList = await nfl_team.find({});

        nflTeamList.forEach(async (eachTeam) => {
            var teamId = eachTeam.team_id;
            TeamDepthChartSave(teamId);
        });

        sendResponseData(res, 200, true, "NFL team depth chart from third party api", {});
    }
    catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
}

const nflDepthChartUpdateSaveByTeamId = async (req, res) => {
    try {
        var teamId = req.query.teamId;
        TeamDepthChartSave(teamId);
        sendResponseData(res, 200, true, "NFL team depth chart update from third party api" + teamId, {});

    }
    catch (error) {
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

        eachSection.position.forEach(async (each) => {

            var DepthArr = {
                team_id: teamId,
                section_name: section_name,
                position_name: each.name,
                starter_p_id: each.starter_id ? Number(each.starter_id) : null,
                second_p_id: each.second_id ? Number(each.second_id) : null,
                third_p_id: each.third_id ? Number(each.third_id) : null,
                fourth_p_id: each.fourth_id ? Number(each.fourth_id) : null,
            };
            await nflDepthChart.create(DepthArr);
        })
        // console.log("StatArr",nflTeamStatCheck);

        return true;
    });



}

async function gamePLayedSave(data, date) {
    // console.log("---------------date",data);
    if (data.awayteam) {
        let tempArr = [];
        // let c = 0;
        if (Array.isArray(data.awayteam.player)) {
            tempArr = data.awayteam.player;
        } else {
            tempArr.push(data.awayteam.player);
        }
        tempArr.forEach(async (eachPlayer) => {
            // console.log("-----------away----",eachPlayer);
            let dataSave = {
                player_id: Number(eachPlayer.id),
                match_date: date ? new Date(date.split(".").reverse().join("-")) : ''
            }
            // c++;
            let exist = await NFL_game_played.findOne({ $and: [dataSave] });
            // console.log("exist ----- away",exist);
            if (exist == null) {
                // let deleteData = await NFL_game_played.deleteOne(dataSave);
                await NFL_game_played.create(dataSave);
            }


            // await NFL_game_played.create(dataSave); 

        })
        // console.log("away",c);

    }
    if (data.hometeam) {
        let tempArr = [];
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
            let exist = await NFL_game_played.findOne({ $and: [dataSave] });
            // console.log("exist--------home",exist);
            if (exist == null) {
                // let deleteData = await NFL_game_played.deleteOne(dataSave);
                await NFL_game_played.create(dataSave);
            }



        })
        // console.log("home",c);

    }


}

const nflPlayerFantasyScoreSaveByTeamId = async (req, res) => {
    const teamId = req.query.teamId;

    const nflPlayerList = await NflPlayers.find({ team_id: teamId });
    // const nflPlayerListIdArr = {};
    // nflPlayerList.forEach(async (eachPlayer) => {
    //     nflPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
    // })

    nflPlayerFantasyScoreSaveByTeamIdFn(teamId);
    sendResponseData(res, 200, true, "Update player state for team " + teamId, {});
}

const nflPlayerFantasyScore = async (req, res) => {
    const nflTeamList = await nfl_team.find({});
    nflTeamList.forEach(async (eachTeam) => {

        // const nflPlayerList = await NflPlayers.find({team_id:1692});
        // const nflPlayerList = await NflPlayers.find({ team_id: 1689 });

        const nflPlayerList = await NflPlayers.find({team_id:eachTeam.team_id,status:true});

        nflPlayerList.forEach(async (eachPlayer) => {
            // nflPlayerListIdArr.push({team_id:eachPlayer.team_id,player_id:eachPlayer.player_id,player_name:eachPlayer.name});
            // nflPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
            // console.log("eachPlayer",eachPlayer);
            nflPlayerFantasyScoreSaveByTeamIdFn(eachPlayer.team_id, eachPlayer.player_id.toString());
        })
    })

    sendResponseData(res, 200, true, "NFL players state from third party api", {});
}


async function nflPlayerFantasyScoreSaveByTeamIdFn(teamId, player_id) {
    const response = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_player_stats?json=1');

    const data = response.data.statistic.category;
    var season = response.data.statistic.season;

    // let playerId = player_id;
    await nflFantasyScore.deleteMany({ season: season, team_id: teamId, player_id: player_id });

    // Find the player by name

    const playerId = player_id;

    const playerData = data;
    // const puntingPlayer = typeof data.find(playerData => playerData.name === "Punting")?.player === 'object' ? [data.find(playerData => playerData.name === "Punting")?.player] : data.find(playerData => playerData.name === "Punting")?.player;
    // const PassingPlayer = typeof data.find(playerData => playerData.name === "Passing")?.player === 'object' ? [data.find(playerData => playerData.name === "Passing")?.player] : data.find(playerData => playerData.name === "Passing")?.player;
    // const PassingPlayer = typeof data.find(playerData => playerData.name === "Passing")?.player === 'object' ? data.find(playerData => playerData.name === "Passing")?.player:[data.find(playerData => playerData.name === "Passing")?.player];
    let arr = data.find(playerData => playerData.name === "Passing")?.player;
    // let newArr = [];
    let PassingPlayer = [];
    if(Array.isArray(arr)){
        PassingPlayer = arr
    }
    else{
        PassingPlayer.push(arr)
    }
    // const PassingPlayer = Array.isArray(arr) ? arr : newArr.push(arr);
    // const RushingPlayer = typeof data.find(playerData => playerData.name === "Rushing")?.player === 'object' ? [data.find(playerData => playerData.name === "Rushing")?.player] : data.find(playerData => playerData.name === "Rushing")?.player;
    // console.log("PassingPlayer", arr,"after push",newArr);
    // console.log("PassingPlayer", PassingPlayer);
    // console.log("array or not", Array.isArray(arr));



    if (playerData) {
        const formattedData = {
            player_id: playerId,
            team_id: response.data.statistic.id,
            season: response.data.statistic.season,
            team: response.data.statistic.team,
            Passing: PassingPlayer.filter(player => player.id === playerId),
            //Passing: data.find(playerData => playerData.name === "Passing").player.filter(player => player.id === playerId),
            Rushing: data.find(playerData => playerData.name === "Rushing").player.filter(player => player.id === playerId),
            Receiving: data.find(playerData => playerData.name === "Receiving").player.filter(player => player.id === playerId),
            Defense: data.find(playerData => playerData.name === "Defense").player.filter(player => player.id === playerId),
            Scoring: data.find(playerData => playerData.name === "Scoring").player.filter(player => player.id === playerId),
            // Punting: puntingPlayer.filter(player => player.id === playerId),
            // Rushing: RushingPlayer.filter(player => player.id === playerId),

            // Punting: puntingPlayer.filter(player => player.id === playerId),

        };
        
        let savedData = await nflFantasyScore.create(formattedData);

    } else {
        console.log("Player not found");
    }


    
}

const ForSaveFantasyScore = async (req, res) => {
    // const nflTeamList = await nfl_team.find({});
    // nflTeamList.forEach(async (eachTeam) => {

    //     // const nflPlayerList = await NflPlayers.find({team_id:1692});
    //     // const nflPlayerList = await NflPlayers.find({ team_id: 1689 });

    //     const nflPlayerList = await NflPlayers.find({team_id:eachTeam.team_id});

    //     nflPlayerList.forEach(async (eachPlayer) => {
    //         // nflPlayerListIdArr.push({team_id:eachPlayer.team_id,player_id:eachPlayer.player_id,player_name:eachPlayer.name});
    //         // nflPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
    //         // console.log("eachPlayer",eachPlayer);
    //         nflPlayerFantasyScoreSaveByTeamIdFn(eachPlayer.team_id, eachPlayer.player_id.toString());
    //     })
    // })

    // let list = saveFantasyScore("1692");
    let nflFantasyScoreData;
    // nflFantasyScoreData = await nflFantasyScore.find({}).populate();
    nflFantasyScoreData = await nflFantasyScore.aggregate([
        {
            $lookup: {
              from: "nfl_players",
              localField: "player_id", // Field in table1 to match
              foreignField: "player_id",          // Field in table2 to match
              as: "player"           // Alias for the populated data
            }
          },
          {
            $unwind: {
              path: "$player",
              preserveNullAndEmptyArrays: false // Preserve unmatched documents
            }
          }
    ])
    
    const Data = nflFantasyScoreData.map(async each=>{
        
       
            //================For STD===============================
            
            if(each.Passing){
                // for std
                each.std_totalPasing = each.Passing[0] ? ((Number(each.Passing[0]?.yards.replace(',', ''))/25)+(Number(each.Passing[0]?.passing_touchdowns)*4)+(Number(each.Passing[0]?.interceptions)*(-2))):0;
                
                //for half-ppr
                each.half_ppr_totalPasing = each.Passing[0] ? ((Number(each.Passing[0]?.yards.replace(',', ''))/25)+(Number(each.Passing[0]?.passing_touchdowns)*4)+(Number(each.Passing[0]?.interceptions)*(-2))):0;

                //for half-ppr-tep
                each.half_ppr_tep_totalPasing = each.Passing[0] ? ((Number(each.Passing[0]?.yards.replace(',', ''))/25)+(Number(each.Passing[0]?.passing_touchdowns)*4)+(Number(each.Passing[0]?.interceptions)*(-2))):0;

                //for ppr 
                each.ppr_totalPasing = each.Passing[0] ? ((Number(each.Passing[0]?.yards.replace(',', ''))/25)+(Number(each.Passing[0]?.passing_touchdowns)*4)+(Number(each.Passing[0]?.interceptions)*(-2))):0;


                //for ppr-tep
                each.ppr_tep_totalPasing = each.Passing[0] ? ((Number(each.Passing[0]?.yards.replace(',', ''))/25)+(Number(each.Passing[0]?.passing_touchdowns)*4)+(Number(each.Passing[0]?.interceptions)*(-2))):0;

            }
            if(each.Rushing){
                //for std
                each.std_totalRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.yards.replace(',', ''))/10)+(Number(each.Rushing[0]?.rushing_touchdowns)*6)):0;
                each.std_fumbleLostRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.fumbles_lost)*(-2))):0;

                //for half ppr
                each.half_ppr_totalRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.yards.replace(',', ''))*0.1)+(Number(each.Rushing[0]?.rushing_touchdowns)*6)):0;
                    
                each.half_ppr_fumbleLostRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.fumbles_lost)*(-2))):0;

                //for half-ppr-tep
                each.half_ppr_tep_totalRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.yards.replace(',', ''))*0.1)+(Number(each.Rushing[0]?.rushing_touchdowns)*6)):0;

                each.half_ppr_tep_fumbleLostRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.fumbles_lost)*(-2))):0;

                //for ppr
                each.ppr_totalRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.yards.replace(',', ''))*0.1)+(Number(each.Rushing[0]?.rushing_touchdowns)*6)):0;

                each.ppr_fumbleLostRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.fumbles_lost)*(-2))):0;

                //for ppr_tep
                each.ppr_tep_totalRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.yards.replace(',', ''))*0.1)+(Number(each.Rushing[0]?.rushing_touchdowns)*6)):0;

                each.ppr_tep_fumbleLostRushing = each.Rushing[0] ? ((Number(each.Rushing[0]?.fumbles_lost)*(-2))):0;
            }
            if(each.Receiving){
                //for std
                each.std_totalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))/10)+(Number(each.Receiving[0]?.receiving_touchdowns)*6)):0;
                each.std_fumbleLostReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.fumbles_lost)*(-2))):0;

                //for half ppr
                each.half_ppr_totalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))*0.1)+(Number(each.Receiving[0]?.receiving_touchdowns)*6))+((Number(each.Receiving[0]?.receptions)*(0.5))):0;
                    
                each.half_ppr_fumbleLostReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.fumbles_lost)*6)):0;

                //for half-ppr-tep
                // each.half_ppr_tep_totalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))*0.1)+(Number(each.Receiving[0]?.receiving_touchdowns)*6))+((Number(each.Receiving[0]?.receptions)*1)):0;
                if(each.player.position == 'TE'){
                    each.half_ppr_tep_totalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))*0.1)+(Number(each.Receiving[0]?.receiving_touchdowns)*6))+((Number(each.Receiving[0]?.receptions)*1)):0; 
                }
                else{
                    each.half_ppr_tep_totalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))*0.1)+(Number(each.Receiving[0]?.receiving_touchdowns)*6))+((Number(each.Receiving[0]?.receptions)*0.5)):0;
                }
                

                each.half_ppr_tep_fumbleLostReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.fumbles_lost)*(-2))):0;

                //for ppr
                each.ppr_totalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))*0.1)+(Number(each.Receiving[0]?.receiving_touchdowns)*6))+((Number(each.Receiving[0]?.receptions)*1)):0;
                    
                each.ppr_fumbleLostReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.fumbles_lost)*6)):0;

                //for ppr_tep
                // each.ppr_tep_totalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))*0.1)+(Number(each.Receiving[0]?.receiving_touchdowns)*6))+((Number(each.Receiving[0]?.receptions)*1)):0;
                if(each.player.position == 'TE'){
                    each.ppr_tep_totalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))*0.1)+(Number(each.Receiving[0]?.receiving_touchdowns)*6))+((Number(each.Receiving[0]?.receptions)*1.5)):0;
                }
                else{
                    each.ppr_tep_totalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))*0.1)+(Number(each.Receiving[0]?.receiving_touchdowns)*6))+((Number(each.Receiving[0]?.receptions)*1)):0;
                }
                    
                each.ppr_tep_fumbleLostReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.fumbles_lost)*6)):0;
                    

            }
            if(each.Defense){
                //for std
                each.std_totalDefense = each.Defense[0] ? ((Number(each.Defense[0]?.interceptions_returned_for_touchdowns.replace(',', '')))):0;
                //for half-ppr
                each.half_ppr_totalDefense = each.Defense[0] ? ((Number(each.Defense[0]?.fumbles_recovered))*6):0;

                //for half-ppr-tep
                each.half_ppr_tep_totalDefense = each.Defense[0] ? ((Number(each.Defense[0]?.fumbles_recovered))*6):0;

                //for ppr
                each.ppr_totalDefense = each.Defense[0] ? ((Number(each.Defense[0]?.fumbles_recovered))*6):0;

                //for ppr_tep
                each.ppr_tep_totalDefense = each.Defense[0] ? ((Number(each.Defense[0]?.fumbles_recovered))*6):0;
            }
            if(each.Scoring){
                // for std
                each.std_totalScoring = each.Scoring[0] ? ((Number(each.Scoring[0]?.two_point_conversions.replace(',', ''))*2)):0;

                //for half-ppr
                each.half_ppr_totalScoring = each.Scoring[0] ? ((Number(each.Scoring[0]?.two_point_conversions.replace(',', ''))*2)):0;

                //for half-ppr-tep
                each.half_ppr_tep_totalScoring = each.Scoring[0] ? ((Number(each.Scoring[0]?.two_point_conversions.replace(',', ''))*2)):0;

                //for ppr
                each.ppr_totalScoring = each.Scoring[0] ? ((Number(each.Scoring[0]?.two_point_conversions.replace(',', ''))*2)):0;

                //for ppr_tep
                each.ppr_tep_totalScoring = each.Scoring[0] ? ((Number(each.Scoring[0]?.two_point_conversions.replace(',', ''))*2)):0;
            }
            
            each.std_ftp = (each.std_totalPasing + each.std_totalRushing + each.std_totalReceiving + each.std_totalDefense + each.std_totalScoring + each.std_fumbleLostReceiving + each.std_fumbleLostRushing);

            each.half_ppr_ftp = (each.half_ppr_totalPasing + each.half_ppr_totalRushing + each.half_ppr_totalReceiving + each.half_ppr_totalDefense + each.half_ppr_totalScoring + each.half_ppr_fumbleLostReceiving + each.half_ppr_fumbleLostRushing);


            each.half_ppr_tep_ftp = (each.half_ppr_tep_totalPasing + each.half_ppr_tep_totalRushing + each.half_ppr_tep_totalReceiving + each.half_ppr_tep_totalDefense + each.half_ppr_tep_totalScoring + each.half_ppr_tep_fumbleLostReceiving+ each.half_ppr_tep_fumbleLostRushing);

            each.ppr_ftp = (each.ppr_totalPasing + each.ppr_totalRushing + each.ppr_totalReceiving + each.ppr_totalDefense + each.ppr_totalScoring + each.ppr_fumbleLostReceiving + each.ppr_fumbleLostRushing);

            each.ppr_tep_ftp = (each.ppr_tep_totalPasing + each.ppr_tep_totalRushing + each.ppr_tep_totalReceiving + each.ppr_tep_totalDefense + each.ppr_tep_totalScoring + each.ppr_tep_fumbleLostReceiving + each.ppr_tep_fumbleLostRushing);

        
        // let update = await nflFantasyScore.updateOne({_id:each._id},
        //     {$set:{half_ppr_ftp:each.half_ppr_ftp,
        //         std_ftp:each.std_ftp,
        //         half_ppr_tep_ftp:each.half_ppr_tep_ftp,
        //         ppr:each.ppr_ftp,
        //         ppr_tep:each.ppr_tep_ftp
        //     }});
        console.log("update=======================update",each.half_ppr_tep_ftp);

        
    });

    sendResponseData(res, 200, true, "NFL players state from third party api", Data);
}


//========================================for saving fantasy score from himadri bars help==================
// await nflPlayerFantasyScoreSaveByTeamIdFn()

    // const apiUrl = 'https://www.goalserve.com/getfeed/76a38b9fd3e2437b762608d8c8de2a79/football/1689_player_stats?json=1';

    // axios.get(apiUrl)
    //     .then(async response => {
    //         // Assuming the data structure has a list of players

    //         const data = response.data.statistic.category;
    //         // console.log("========================",players);

    //         // Find the player by name

    //         const playerId = "3918298";

    //         const playerData = data;
    //         const puntingPlayer = typeof data.find(playerData => playerData.name === "Punting")?.player === 'object' ? [data.find(playerData => playerData.name === "Punting")?.player] : data.find(playerData => playerData.name === "Punting")?.player;
    //         const PassingPlayer = typeof data.find(playerData => playerData.name === "Passing")?.player === 'object' ? [data.find(playerData => playerData.name === "Passing")?.player] : data.find(playerData => playerData.name === "Passing")?.player;
    //         const RushingPlayer = typeof data.find(playerData => playerData.name === "Rushing")?.player === 'object' ? [data.find(playerData => playerData.name === "Rushing")?.player] : data.find(playerData => playerData.name === "Rushing")?.player;

    //         if (playerData) {
    //             const formattedData = {
    //                 player_id: playerId,
    //                 team_id: response.data.statistic.id,
    //                 season: response.data.statistic.season,
    //                 team: response.data.statistic.team,
    //                 //Passing: data.find(playerData => playerData.name === "Passing").player.filter(player => player.id === playerId),
    //                 //Rushing: data.find(playerData => playerData.name === "Rushing").player.filter(player => player.id === playerId),
    //                 Punting: puntingPlayer.filter(player => player.id === playerId),
    //                 Passing: PassingPlayer.filter(player => player.id === playerId),
    //                 Rushing: RushingPlayer.filter(player => player.id === playerId),

    //                 // Punting: puntingPlayer.filter(player => player.id === playerId),

    //             };

    //             console.log(formattedData);
    //     await nflFantasyScore.create(formattedData);

    //             sendResponseData(res, 200, true, "NFL players state from third party api", formattedData);

    //         } else {
    //             console.log("Player not found");
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error fetching data:', error.message);
    //     });

    //===========================

    // const Passinglayer = typeof data.find(playerData => playerData.name === "Passing")?.player === 'object' ? [data.find(playerData => playerData.name === "Passing")?.player] : data.find(playerData => playerData.name === "Passing")?.player;
    // // console.log("Passinglayer",Passinglayer.filter(player => player.id == playerId),"-----------",Passinglayer.filter(player => {return (typeof player.id)}));
    // //rushing
    // const RushingPlayer = typeof data.find(playerData => playerData.name === "Rushing")?.player === 'object' ? [data.find(playerData => playerData.name === "Rushing")?.player] : data.find(playerData => playerData.name === "Rushing")?.player;
    // //receiving
    // const ReceivingPlayer = typeof data.find(playerData => playerData.name === "Receiving")?.player === 'object' ? [data.find(playerData => playerData.name === "Receiving")?.player] : data.find(playerData => playerData.name === "Receiving")?.player;
    // //defense
    // const DefensePlayer = typeof data.find(playerData => playerData.name === "Defense")?.player === 'object' ? [data.find(playerData => playerData.name === "Defense")?.player] : data.find(playerData => playerData.name === "Defense")?.player;
    // //scoring
    // const ScoringPlayer = typeof data.find(playerData => playerData.name === "Scoring")?.player === 'object' ? [data.find(playerData => playerData.name === "Scoring")?.player] : data.find(playerData => playerData.name === "Scoring")?.player;
    // // if (playerData) {
    //     //passing
    //     const formattedData = {
    //         player_id: player_id,
    //         team_id: response.data.statistic.id,
    //         season: response.data.statistic.season,
    //         team: response.data.statistic.team,
    //         Passing: Passinglayer.filter(player => player.id == playerId),
    //         Rushing: RushingPlayer.filter(player => player.id == playerId),
    //         Receiving: ReceivingPlayer.filter(player => player.id == playerId),
    //         Scoring: ScoringPlayer.filter(player => player.id == playerId),
    //         Defense: DefensePlayer.filter(player => player.id == playerId)
    //     };

    //     // console.log(formattedData);
    //     await nflFantasyScore.create(formattedData);
    //     return true;
    //     // sendResponseData(res, 200, true, "NFL players state from third party api", formattedData);

    // // } else {
    // //     console.log("Player not found");
    // // }


    //=========================

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
    nflDepthChartUpdateSaveByTeamId,
    recentScoreOfNfl,
    nflPlayerFantasyScore,
    ForSaveFantasyScore

}