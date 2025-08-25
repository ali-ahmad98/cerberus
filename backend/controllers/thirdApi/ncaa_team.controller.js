
const axios = require('axios');
const { sendResponseData, decode_base64_img, fileUpload, getFilePath } = require("../../util/Utility");
const config = require("../../config/config");
const NcaaTeam = require('../../models/thirdPartySchema/ncaa_team.model');
const NcaaPlayers = require('../../models/thirdPartySchema/ncaa_player.model');
const NcaaPlayerStats = require('../../models/thirdPartySchema/ncaa_player_stat.model');
const NcaaRosters = require('../../models/thirdPartySchema/ncaa_roster.model');
const NcaaScore = require('../../models/thirdPartySchema/ncaa_score.model');
const NCAA_game_played = require('../../models/thirdPartySchema/ncaa_game_played.model');
const NcaaTeamRanking = require('../../models/thirdPartySchema/ncaa_team_ranking.model');
const ncaaFantasyScore = require("../../models/thirdPartySchema/ncaa_fantasy_score.model")


const ncaaTeamSave = async (req, res) => {
    const teamListApiData = await axios.get("http://www.goalserve.com/getfeed/" + config.goalServerApikey + "/football/fbs-standings?json=1")
    var teamListData = teamListApiData.data.standings;
    var leagueData = teamListData.category.league;
    var totalAddEdit = {
        add: 0,
        edit: 0
    };
    leagueData.forEach(async (leagueRow) => {
        var leagueId = leagueRow.id;
        var leagueName = leagueRow.name;
        var divisionData = leagueRow.division;

        var divisionDataListArr = [];
        if (Array.isArray(divisionData)) {            //checking match is object or array
            divisionDataListArr = divisionData;
        } else {
            divisionDataListArr.push(divisionData);
        }
        divisionDataListArr.forEach(async (divisionRow) => {
            var divisionName = divisionRow.name;
            var teamList = divisionRow.team;

            teamList.forEach(async (eachTeam) => {
                const saveTeamData = {
                    team_id: eachTeam.id,
                    team_name: eachTeam.name,
                    team_league: leagueName,
                    team_division: divisionName,
                    team_position: eachTeam.position
                }
                // console.log('saveTeamData', saveTeamData);
                NcaaTeam.findOne({ team_id: eachTeam.id }, async function (err, existTeamData) {
                    if (err) {
                        console.log(err)
                    } else {
                        // console.log('teamArr', existTeamData);
                        if (existTeamData == null) {
                            NcaaTeam.create(saveTeamData);
                            totalAddEdit.add++;
                        } else {
                            totalAddEdit.edit++;
                            var re = await NcaaTeam.updateOne({ team_id: eachTeam.id }, saveTeamData);
                        }
                    }
                });
            })
        });

    });

    sendResponseData(res, 200, true, "NCAA team updated from third party api", totalAddEdit);

}

const ncaaPlayerStatSave = async (req, res) => {
    const ncaaTeamList = await NcaaTeam.find({});
    // const ncaaPlayerList = await NcaaPlayers.find({});
    // const ncaaPlayerListIdArr = {};
    // ncaaPlayerList.forEach(async (eachPlayer) => {
    //     ncaaPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
    // })

    ncaaTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;

        ncaaPlayerStatSaveByTeamIdFn(teamId);
    });

   // sendResponseData(res, 200, true, "NCAA players state from third party api", {});
}

const ncaaPlayerStatSaveByTeamId = async (req, res) => {
    const teamId = req.query.teamId;
    console.log('teamId', teamId);

    // const ncaaPlayerList = await NcaaPlayers.find({ team_id: teamId });
    // const ncaaPlayerListIdArr = {};
    // ncaaPlayerList.forEach(async (eachPlayer) => {
    //     ncaaPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
    // })


    ncaaPlayerStatSaveByTeamIdFn(teamId);
    sendResponseData(res, 200, true, "Update player state for team " + teamId, {});
}

async function ncaaPlayerStatSaveByTeamIdFn(teamId) {
    try{

        const teamPlayerStatData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_player_stats?json=1');
    
        var teamPlayerStatistic = teamPlayerStatData.data.statistic;
        var season = teamPlayerStatistic.season;
        // var season = Number(teamPlayerStatistic.season)+1;

        var statCategoryList = teamPlayerStatistic.category;
        // console.log(statCategoryList);
        await NcaaPlayerStats.deleteMany({ season: season, team_id: teamId });
    
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
                    player_id: eachPlayerStat.id,
                    player_name: eachPlayerStat.name,
                    season:season,
                    stat_category: catName
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
                    playerStatArr.yards = eachPlayerStat.yards ? await checkOneDigit(eachPlayerStat.yards) : eachPlayerStat.yards;
                    playerStatArr.yards_per_game = eachPlayerStat.yards_per_game;
                    playerStatArr.yards_per_pass_avg = eachPlayerStat.yards_per_pass_avg;
    
                    // saveArrForStat.push(playerStatArr);
                    await NcaaPlayerStats.create(playerStatArr);
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
                    playerStatArr.yards = eachPlayerStat.yards ? await checkOneDigit(eachPlayerStat.yards) : eachPlayerStat.yards;
                    playerStatArr.yards_per_game = eachPlayerStat.yards_per_game;
                    playerStatArr.yards_per_rush_avg = eachPlayerStat.yards_per_rush_avg;
    
                    await NcaaPlayerStats.create(playerStatArr);
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
                    playerStatArr.receiving_yards = eachPlayerStat.receiving_yards ? await checkOneDigit(eachPlayerStat.receiving_yards) : eachPlayerStat.receiving_yards;
                    playerStatArr.receptions = eachPlayerStat.receptions;
                    playerStatArr.yards_after_catch = eachPlayerStat.yards_after_catch;
                    playerStatArr.yards_per_game = eachPlayerStat.yards_per_game;
                    playerStatArr.yards_per_reception_avg = eachPlayerStat.yards_per_reception_avg;
    
                    await NcaaPlayerStats.create(playerStatArr);
                    // totalAddEdit.add++;
                }
    
                // console.log(playerStatArr);
            })
            await NcaaTeam.updateOne({ team_id: teamId }, { updated_at: Date.now() });
            return true;
    
        });
    }
    catch(err){
        console.log(err);
    }
}

async function checkOneDigit(string){
    // checking for given string having one digit or not
        console.log("ascii-----------",string.length);
      if(string.length === 1){
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

const ncaaRosterUpadteSave = async (req, res) => {
    const ncaaTeamList = await NcaaTeam.find({});

    // const ncaaPlayerList = await NcaaPlayers.find({});
    // const ncaaPlayerListIdArr = {};
    // ncaaPlayerList.forEach(async (eachPlayer) => {
    //     ncaaPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
    // })


    ncaaTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;
        ncaaRosterSave(teamId);
    });

    sendResponseData(res, 200, true, "NCAA rosters from third party api", {});
}

const ncaaRosterUpdateSaveByTeamId = async (req, res) => {

    const teamId = req.query.teamId;

    // const ncaaPlayerList = await NcaaPlayers.find({});
    // const ncaaPlayerListIdArr = {};
    // ncaaPlayerList.forEach(async (eachPlayer) => {
    //     ncaaPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
    // })

    ncaaRosterSave(teamId);

    sendResponseData(res, 200, true, "NCAA rosters from third party api", {});


}

async function ncaaRosterSave(teamId) {
    const rosterData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_rosters?json=1');


    let allData = rosterData.data;

    let reportData = allData.team.position;

    // console.log(reportData);
    await NcaaRosters.deleteMany({ teamId: teamId });

    reportData.forEach((eachPosition) => {
        var team_position = eachPosition.name;

        eachPosition.player.forEach(async (each) => {
            var injuryData = {
                teamId: teamId,
                player_name: each.name || '',
                player_id: each.id || '',
                team_position: team_position || '',
                player_position: each.position || '',
                player_age: each.age || '',
                player_height: each.height || '',
                player_weight: each.weight || '',
                player_exp: each.experience_years || '',
                player_college: each.college || '',

            }

            // console.log(injuryData.report_date);
            await NcaaRosters.create(injuryData);

        })
    })


}

//============================================score==================
const ncaaScoreUpdateSave = async (req, res) => {
    try {

        let ncaaTeam = await NcaaTeam.find({ status: true, isDelete: false });


        let year = req.query.date;

        let result;
        if (year) {
            result = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/fbs-scores?json=1&date=' + year);
        }
        else {
            // console.log("111111111");
            result = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/fbs-scores?json=1');
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
                homeTeamData = ncaaTeam.find(team => team.team_name === eachMatch.hometeam.name);
                // console.log("homeTeamData",homeTeamData);
                homeTeamId = homeTeamData ? homeTeamData.team_id : '';
            }

            if (eachMatch.awayteam) {
                awayTeamData = ncaaTeam.find(team => team.team_name === eachMatch.awayteam.name);
                // console.log("awayTeamData",awayTeamData);
                awayTeamId = awayTeamData ? awayTeamData.team_id : '';
            }

            // if(eachMatch.date){
            //     week = await weekCreate(eachMatch.date.slice(0,5));
            // }

            let awayTeamScore = {
                q1: eachMatch.awayteam.q1 ? eachMatch.awayteam.q1 : 0,
                q2: eachMatch.awayteam.q2 ? eachMatch.awayteam.q2 : 0,
                q3: eachMatch.awayteam.q3 ? eachMatch.awayteam.q3 : 0,
                q4: eachMatch.awayteam.q4 ? eachMatch.awayteam.q4 : 0,
                totalscore: eachMatch.awayteam.totalscore ? eachMatch.awayteam.totalscore : 0
            }

            let homeTeamScore = {
                q1: eachMatch.hometeam.q1 ? eachMatch.hometeam.q1 : 0,
                q2: eachMatch.hometeam.q2 ? eachMatch.hometeam.q2 : 0,
                q3: eachMatch.hometeam.q3 ? eachMatch.hometeam.q3 : 0,
                q4: eachMatch.hometeam.q4 ? eachMatch.hometeam.q4 : 0,
                totalscore: eachMatch.hometeam.totalscore ? eachMatch.hometeam.totalscore : 0
            }

            let dataToSave = {
                matchDate: eachMatch.formatted_date ? new Date(eachMatch.formatted_date.split(".").reverse().join("-")) : '',
                matchTime: eachMatch.time ? eachMatch.time : '',
                awayTeam: awayTeamId || undefined,
                homeTeam: homeTeamId || undefined,
                awayTeamScore: awayTeamScore,
                homeTeamScore: homeTeamScore,
                passing: eachMatch.passing ? eachMatch.passing : 0,
                rushing: eachMatch.rushing ? eachMatch.rushing : 0,
                receiving: eachMatch.receiving ? eachMatch.receiving : 0,
                matchVenue: eachMatch.venue_name ? eachMatch.venue_name : '',
                date: eachMatch.date,
            }

            if (eachMatch.passing) {
                setTimeout(async () => {
                    await gamePLayedSave(eachMatch.passing, eachMatch.formatted_date)
                }, 1500);
            }
            if (eachMatch.rushing) {
                setTimeout(async () => {
                    await gamePLayedSave(eachMatch.rushing, eachMatch.formatted_date)
                }, 3000);
            }
            if (eachMatch.receiving) {
                setTimeout(async () => {
                    await gamePLayedSave(eachMatch.receiving, eachMatch.formatted_date)
                }, 6000);
            }

            let existData = await NcaaScore.find({ matchDate: dataToSave.matchDate });
            if (existData.length >0) {
                // console.log("existData",existData);
                existData.forEach(async (each)=>{
                    // let updatedata = {
                    //     matchTime: eachMatch.time ? eachMatch.time : '',
                    //     awayTeam: awayTeamId || undefined,
                    //     homeTeam: homeTeamId || undefined,
                    //     awayTeamScore: awayTeamScore,
                    //     homeTeamScore: homeTeamScore,
                    //     passing: eachMatch.passing ? eachMatch.passing : 0,
                    //     rushing: eachMatch.rushing ? eachMatch.rushing : 0,
                    //     receiving: eachMatch.receiving ? eachMatch.receiving : 0,
                    //     matchVenue: eachMatch.venue_name ? eachMatch.venue_name : '',
                    //     date: eachMatch.date,
    
                    // }
                    let update = await NcaaScore.deleteOne({ _id: each._id }, { isDelete:true });
                })
                //    console.log(update);
                await NcaaScore.create(dataToSave);


            }
            else {
                await NcaaScore.create(dataToSave);

            }


        });

        sendResponseData(res, 200, true, "NFL score from third party api", {});


    }
    catch (error) {
        console.log(error);
        // sendResponseData(res, 200, false, "something wrong", {});

    }
}

const recentScoreOfNcaa= async() =>{
    // try {

    //     let ncaaTeam = await NcaaTeam.find({ status: true, isDelete: false });

    //     let result = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/fbs-scores?json=1');


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
    //             homeTeamData = ncaaTeam.find(team => team.team_name === eachMatch.hometeam.name);
    //             // console.log("homeTeamData",homeTeamData);
    //             homeTeamId = homeTeamData ? homeTeamData.team_id : '';
    //         }

    //         if (eachMatch.awayteam) {
    //             awayTeamData = ncaaTeam.find(team => team.team_name === eachMatch.awayteam.name);
    //             // console.log("awayTeamData",awayTeamData);
    //             awayTeamId = awayTeamData ? awayTeamData.team_id : '';
    //         }

    //         // if(eachMatch.date){
    //         //     week = await weekCreate(eachMatch.date.slice(0,5));
    //         // }

    //         let awayTeamScore = {
    //             q1: eachMatch.awayteam.q1,
    //             q2: eachMatch.awayteam.q2,
    //             q3: eachMatch.awayteam.q3,
    //             q4: eachMatch.awayteam.q4,
    //             totalscore: eachMatch.awayteam.totalscore
    //         }

    //         let homeTeamScore = {
    //             q1: eachMatch.hometeam.q1,
    //             q2: eachMatch.hometeam.q2,
    //             q3: eachMatch.hometeam.q3,
    //             q4: eachMatch.hometeam.q4,
    //             totalscore: eachMatch.hometeam.totalscore
    //         }

    //         let dataToSave = {
    //             matchDate: eachMatch.formatted_date ? new Date(eachMatch.formatted_date.split(".").reverse().join("-")) : '',
    //             matchTime: eachMatch.time ? eachMatch.time : '',
    //             awayTeam: awayTeamId || undefined,
    //             homeTeam: homeTeamId || undefined,
    //             awayTeamScore: awayTeamScore,
    //             homeTeamScore: homeTeamScore,
    //             passing: eachMatch.passing,
    //             rushing: eachMatch.rushing,
    //             receiving: eachMatch.receiving,
    //             matchVenue: eachMatch.venue_name ? eachMatch.venue_name : '',
    //             date: eachMatch.date,
    //         }

    //         if (eachMatch.passing) {
    //             setTimeout(async () => {
    //                 await gamePLayedSave(eachMatch.passing, eachMatch.formatted_date)
    //             }, 1500);
    //         }
    //         if (eachMatch.rushing) {
    //             setTimeout(async () => {
    //                 await gamePLayedSave(eachMatch.rushing, eachMatch.formatted_date)
    //             }, 3000);
    //         }
    //         if (eachMatch.receiving) {
    //             setTimeout(async () => {
    //                 await gamePLayedSave(eachMatch.receiving, eachMatch.formatted_date)
    //             }, 6000);
    //         }

    //         let existData = await NcaaScore.findOne({ matchDate: dataToSave.matchDate });
    //         // console.log("existData",existData.length);
    //         if (existData) {
    //             let updatedata = {
    //                 matchTime: eachMatch.time ? eachMatch.time : '',
    //                 awayTeam: awayTeamId || undefined,
    //                 homeTeam: homeTeamId || undefined,
    //                 awayTeamScore: awayTeamScore,
    //                 homeTeamScore: homeTeamScore,
    //                 passing: eachMatch.passing,
    //                 rushing: eachMatch.rushing,
    //                 receiving: eachMatch.receiving,
    //                 matchVenue: eachMatch.venue_name ? eachMatch.venue_name : '',
    //                 date: eachMatch.date,

    //             }
    //             let update = await NcaaScore.updateOne({ matchDate: dataToSave.matchDate }, { ...updatedata });
    //             //    console.log(update);

    //         }
    //         else {
    //             await NcaaScore.create(dataToSave);

    //         }
    //     });

    // }
    try {

        let ncaaTeam = await NcaaTeam.find({ status: true, isDelete: false });


        // let year = req.query.date;

        let result;
        // if (year) {
        //     result = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/fbs-scores?json=1&date=' + year);
        // }
        // else {
            // console.log("111111111");
            result = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/fbs-scores?json=1');
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
            // console.log("scoreData",scoreDataArr.length);

            if (eachMatch.hometeam) {
                homeTeamData = ncaaTeam.find(team => team.team_id == eachMatch.hometeam.id);
                // console.log("homeTeamData",homeTeamData);
                homeTeamId = homeTeamData ? homeTeamData.team_id : '';
            }

            if (eachMatch.awayteam) {
                awayTeamData = ncaaTeam.find(team => team.team_id == eachMatch.awayteam.id);
                // console.log("awayTeamData",awayTeamData);
                awayTeamId = awayTeamData ? awayTeamData.team_id : '';
            }

            let awayTeamScore = {
                q1: eachMatch.awayteam.q1 ? eachMatch.awayteam.q1 : 0,
                q2: eachMatch.awayteam.q2 ? eachMatch.awayteam.q2 : 0,
                q3: eachMatch.awayteam.q3 ? eachMatch.awayteam.q3 : 0,
                q4: eachMatch.awayteam.q4 ? eachMatch.awayteam.q4 : 0,
                totalscore: eachMatch.awayteam.totalscore ? eachMatch.awayteam.totalscore : 0
            }

            let homeTeamScore = {
                q1: eachMatch.hometeam.q1 ? eachMatch.hometeam.q1 : 0,
                q2: eachMatch.hometeam.q2 ? eachMatch.hometeam.q2 : 0,
                q3: eachMatch.hometeam.q3 ? eachMatch.hometeam.q3 : 0,
                q4: eachMatch.hometeam.q4 ? eachMatch.hometeam.q4 : 0,
                totalscore: eachMatch.hometeam.totalscore ? eachMatch.hometeam.totalscore : 0
            }

            let dataToSave = {
                matchDate: eachMatch.formatted_date ? new Date(eachMatch.formatted_date.split(".").reverse().join("-")) : '',
                matchTime: eachMatch.time ? eachMatch.time : '',
                awayTeam: awayTeamId || undefined,
                homeTeam: homeTeamId || undefined,
                awayTeamScore: awayTeamScore,
                homeTeamScore: homeTeamScore,
                passing: eachMatch.passing ? eachMatch.passing : 0,
                rushing: eachMatch.rushing ? eachMatch.rushing : 0,
                receiving: eachMatch.receiving ? eachMatch.receiving : 0,
                matchVenue: eachMatch.venue_name ? eachMatch.venue_name : '',
                date: eachMatch.date,
            }

            if (eachMatch.passing) {
                setTimeout(async () => {
                    await gamePLayedSave(eachMatch.passing, eachMatch.formatted_date)
                }, 1500);
            }
            if (eachMatch.rushing) {
                setTimeout(async () => {
                    await gamePLayedSave(eachMatch.rushing, eachMatch.formatted_date)
                }, 3000);
            }
            if (eachMatch.receiving) {
                setTimeout(async () => {
                    await gamePLayedSave(eachMatch.receiving, eachMatch.formatted_date)
                }, 6000);
            }

            let existData = await NcaaScore.find({ date: eachMatch.date });
            if (existData.length >0) {
                // console.log("existData",existData);
                existData.forEach(async (each)=>{
                    // let updatedata = {
                    //     matchTime: eachMatch.time ? eachMatch.time : '',
                    //     awayTeam: awayTeamId || undefined,
                    //     homeTeam: homeTeamId || undefined,
                    //     awayTeamScore: awayTeamScore,
                    //     homeTeamScore: homeTeamScore,
                    //     passing: eachMatch.passing ? eachMatch.passing : 0,
                    //     rushing: eachMatch.rushing ? eachMatch.rushing : 0,
                    //     receiving: eachMatch.receiving ? eachMatch.receiving : 0,
                    //     matchVenue: eachMatch.venue_name ? eachMatch.venue_name : '',
                    //     date: eachMatch.date,
    
                    // }
                    let update = await NcaaScore.deleteOne({ _id: each._id }, { isDelete:true });
                })
                //    console.log(update);
                await NcaaScore.create(dataToSave);

            }
            else {
                await NcaaScore.create(dataToSave);

            }

        });

    }
    catch (error) {
        console.log(error);

    }
}

const ncaaPlayerSave = async (req, res) => {
    const ncaaTeamList = await NcaaTeam.find({});


    ncaaTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;
        ncaaPlayerDataSave(teamId);
    });

    sendResponseData(res, 200, true, "NCAA rosters from third party api", {});

}

async function ncaaPlayerDataSave(teamId) {
    const playerData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_rosters?json=1');


    let allData = playerData.data;

    let reportData = allData.team.position;
    reportData.forEach(async (each) => {
        // console.log("each",each);
        each.player.forEach(async (eachPlayer) => {

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

            const existData = await NcaaPlayers.findOne({ player_id: eachPlayer.id });
            if (existData) {
                console.log("--------------------", existData);

                const updateData = await NcaaPlayers.updateOne({ player_id: eachPlayer.id }, playerArr)
            }
            else {
                NcaaPlayers.create(playerArr);
            }
        });
    })

}

//==========================player image=======================
const ncaaplayerImageSave = async (req, res) => {
    const playerId = req.query.playerId;
    try {
        const playerImgApi = await axios.get(`http://www.goalserve.com/getfeed/` + config.goalServerApikey + `/football/usa?playerimage=` + playerId + `&json=1`);
        const playerImgBase64 = playerImgApi.data.image.value;
        var imgSave = decode_base64_img(playerImgBase64, 'ncaaf_players', playerId + '.jpg');
        console.log('imgSave', imgSave);

        var toUpdate = {
            profile_img: playerId + '.jpg',
        }

        let update = await NcaaPlayers.updateOne({ player_id: Number(playerId) }, toUpdate);

        sendResponseData(res, 200, true, "Player image uploaded", getFilePath('ncaaf_players/' + playerId + '.jpg'));
    } catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
};

const ncaaplayerImageSaveAll = async (req, res) => {
    // const playerId = req.query.playerId;
    try {
        const ncaaPlayerList = await NcaaPlayers.find({});
        // console.log('ncaaPlayerList', ncaaPlayerList);
        if (ncaaPlayerList && ncaaPlayerList.length > 0) {
            ncaaPlayerList.forEach(async (element) => {
                // console.log('element', element);
                var playerId = element.player_id;
                const playerImgApi = await axios.get(`http://www.goalserve.com/getfeed/` + config.goalServerApikey + `/football/usa?playerimage=` + playerId + `&json=1`);
                const playerImgBase64 = playerImgApi.data.image.value;
                // console.log('playerImgBase64', playerImgBase64);

                var imgSave = decode_base64_img(playerImgBase64, 'ncaaf_players', playerId + '.jpg');
                // console.log('playerImgBase64', playerImgBase64);

                var toUpdate = {
                    profile_img: playerId + '.jpg',
                }

                let update = await NcaaPlayers.updateOne({ player_id: Number(playerId) }, toUpdate);
            })
        }

        sendResponseData(res, 200, true, "All Player image uploaded..", '');
    } catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
};

async function gamePLayedSave(data, date) {
    // console.log("---------------date",data);
    if (data.awayteam) {
        let tempArr = [];
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

            let exist = await NCAA_game_played.findOne({ $and: [dataSave] });
            // console.log("exist ----- away",exist);
            if (exist == null) {
                // let deleteData = await NFL_game_played.deleteOne(dataSave);
                await NCAA_game_played.create(dataSave);
            }
            // await NFL_game_played.create(dataSave);
        })

    }
    if (data.hometeam) {
        let tempArr = [];
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
            let exist = await NCAA_game_played.findOne({ $and: [dataSave] });
            // console.log("exist--------home",exist);
            if (exist == null) {
                // let deleteData = await NFL_game_played.deleteOne(dataSave);
                await NCAA_game_played.create(dataSave);
            }

        })
    }

}

const ncaaTeamRankingSave = async (req, res) => {


    try {
        var addNo = 0;
        var editNo = 0;
        var currentYear = new Date().getFullYear();  // returns the current year
        const apRankData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/ap-rankings?json=1');
        let apRankDataAll = apRankData?.data?.rankings?.team;

        if (apRankDataAll && apRankDataAll.length > 0) {
            apRankDataAll.forEach(async element => {
                // console.log('AP', editNo);
                const teamArr = {
                    team_id: element.id,
                    team_points: element.points,
                    team_position: element.position,
                    prev_rank: element.prev_rank,
                    record: element.record,
                    rank_type: 'AP',
                    session: currentYear,
                }

                const existData = await NcaaTeamRanking.findOne({ team_id: element.id, rank_type: 'AP', session: currentYear });
                if (existData) {
                    editNo += parseInt(1);
                    const updateData = await NcaaTeamRanking.updateOne({ team_id: element.id, rank_type: 'AP' }, teamArr);
                } else {
                    addNo += parseInt(1);
                    await NcaaTeamRanking.create(teamArr);
                }
            });
        }
        // console.log('apRankDataAll', apRankDataAll)


        const coachesRankData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/coaches-rankings?json=1');
        let coachesRankDataAll = coachesRankData?.data?.rankings?.team;

        if (coachesRankDataAll && coachesRankDataAll.length > 0) {
            coachesRankDataAll.forEach(async element => {
                // console.log('Coaches', editNo);

                const teamArr2 = {
                    team_id: element.id,
                    team_points: element.points,
                    team_position: element.position,
                    prev_rank: element.prev_rank,
                    record: element.record,
                    rank_type: 'Coaches',
                    session: currentYear
                }

                const existData = await NcaaTeamRanking.findOne({ team_id: element.id, rank_type: 'Coaches', session: currentYear });
                if (existData) {
                    editNo += parseInt(1);
                    const updateData = await NcaaTeamRanking.updateOne({ team_id: element.id, rank_type: 'Coaches' }, teamArr2);
                } else {
                    addNo += parseInt(1);
                    await NcaaTeamRanking.create(teamArr2);
                }
            });
        }
        // console.log('apRankDataAll', apRankDataAll)


        sendResponseData(res, 200, true, "Save team rank Add = " + addNo + " & Edit = " + editNo, {});
    } catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
};

const ncaaPlayerFantasyScore = async (req, res) => {
    const ncaaTeamList = await NcaaTeam.find({isDelete:false});
    ncaaTeamList.forEach(async (eachTeam) => {

        // const nflPlayerList = await NflPlayers.find({team_id:1692});
        // const nflPlayerList = await NflPlayers.find({ team_id: 1689 });

        const ncaaPlayerList = await NcaaPlayers.find({team_id:eachTeam.team_id,stats:true});

        ncaaPlayerList.forEach(async (eachPlayer) => {
            // nflPlayerListIdArr.push({team_id:eachPlayer.team_id,player_id:eachPlayer.player_id,player_name:eachPlayer.name});
            // nflPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
            // console.log("eachPlayer",eachPlayer);
            ncaaPlayerFantasyScoreSaveByTeamIdFn(eachPlayer.team_id, eachPlayer.player_id.toString());
        })
    })

    // sendResponseData(res, 200, true, "NFL players state from third party api", {});
}

async function ncaaPlayerFantasyScoreSaveByTeamIdFn(teamId, player_id) {
    const response = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_player_stats?json=1');

    const data = response.data.statistic.category;
    var season = response.data.statistic.season;

    // let playerId = player_id;
    // await ncaaFantasyScore.deleteMany({ season: season, team_id: teamId, player_id: player_id });

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
            // Scoring: data.find(playerData => playerData.name === "Scoring").player.filter(player => player.id === playerId),
            // Punting: puntingPlayer.filter(player => player.id === playerId),
            // Rushing: RushingPlayer.filter(player => player.id === playerId),

            // Punting: puntingPlayer.filter(player => player.id === playerId),

        };
        
        let savedData = await ncaaFantasyScore.create(formattedData);

    } else {
        console.log("Player not found");
    }


    
}

const ForSaveNcaaFantastyScore = async (req,res)=>{
    // const ForSaveFantasyScore = async (req, res) => {
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
        let ncaafFantasyScoreData;
        // ncaafFantasyScoreData = await nflFantasyScore.find({}).populate();
        ncaafFantasyScoreData = await ncaaFantasyScore.aggregate([
            {
                $lookup: {
                  from: "ncaa_players",
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
        
        const Data = ncaafFantasyScoreData.map(async each=>{
            
           
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
                        
                    each.half_ppr_fumbleLostReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.fumbles_lost)*(-2))):0;
    
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
                        
                    each.ppr_fumbleLostReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.fumbles_lost)*(-2))):0;
    
                    //for ppr_tep
                    // each.ppr_tep_totalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))*0.1)+(Number(each.Receiving[0]?.receiving_touchdowns)*6))+((Number(each.Receiving[0]?.receptions)*1)):0;
                    if(each.player.position == 'TE'){
                        each.ppr_tep_totalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))*0.1)+(Number(each.Receiving[0]?.receiving_touchdowns)*6))+((Number(each.Receiving[0]?.receptions)*1.5)):0;
                    }
                    else{
                        each.ppr_tep_totalReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.receiving_yards.replace(',', ''))*0.1)+(Number(each.Receiving[0]?.receiving_touchdowns)*6))+((Number(each.Receiving[0]?.receptions)*1)):0;
                    }
                        
                    each.ppr_tep_fumbleLostReceiving = each.Receiving[0] ? ((Number(each.Receiving[0]?.fumbles_lost)*(-2))):0;
                        
    
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
    
            
            let update = await ncaaFantasyScore.updateOne({_id:each._id},
                {$set:{half_ppr_ftp:each.half_ppr_ftp,
                    std_ftp:each.std_ftp,
                    half_ppr_tep_ftp:each.half_ppr_tep_ftp,
                    ppr:each.ppr_ftp,
                    ppr_tep:each.ppr_tep_ftp
                }});
            console.log("update=======================update",each.half_ppr_tep_ftp);
    
            
        });
    
   //     sendResponseData(res, 200, true, "NCAAF players state from third party api", Data);
    
}


module.exports = {
    ncaaTeamSave,
    ncaaPlayerSave,
    ncaaPlayerStatSave,
    ncaaPlayerStatSaveByTeamId,
    ncaaRosterUpadteSave,
    ncaaRosterUpdateSaveByTeamId,
    ncaaScoreUpdateSave,
    ncaaplayerImageSave,
    ncaaplayerImageSaveAll,
    recentScoreOfNcaa,
    ncaaPlayerFantasyScore,
    ncaaTeamRankingSave,
    ForSaveNcaaFantastyScore
}