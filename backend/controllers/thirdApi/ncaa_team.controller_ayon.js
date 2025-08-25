
const axios = require('axios');
const { sendResponseData,decode_base64_img,fileUpload, getFilePath } = require("../../util/Utility");
const config = require("../../config/config");
const NcaaTeam = require('../../models/thirdPartySchema/ncaa_team.model');
const NcaaPlayers = require('../../models/thirdPartySchema/ncaa_player.model');
const NcaaPlayerStats = require('../../models/thirdPartySchema/ncaa_player_stat.model');
const NcaaRosters = require('../../models/thirdPartySchema/ncaa_roster.model');
const NcaaScore = require('../../models/thirdPartySchema/ncaa_score.model');
const NCAA_game_played = require('../../models/thirdPartySchema/ncaa_game_played.model');



const ncaaTeamSave = async (req, res) => {
    const teamListApiData = await axios.get("http://www.goalserve.com/getfeed/" + config.goalServerApikey + "/football/fbs-standings?json=1")
    var teamListData = teamListApiData.data.standings;
    var leagueData = teamListData.category.league;
    var totalAddEdit = {
        add: 0,
        edit: 0
    };
    // console.log('leagueData', leagueData);
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
    const ncaaPlayerList = await NcaaPlayers.find({});
    const ncaaPlayerListIdArr = [];
    ncaaPlayerList.forEach(async (eachPlayer) => {
        ncaaPlayerListIdArr[eachPlayer.team_id][eachPlayer.name] = eachPlayer.player_id;
    })

    ncaaTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;

        ncaaPlayerStatSaveByTeamIdFn(teamId,ncaaPlayerListIdArr);
    });

    sendResponseData(res, 200, true, "NCAA players state from third party api", {});
}


const ncaaPlayerStatSaveByTeamId = async (req, res) => {
    const teamId = req.query.teamId;
    console.log('teamId', teamId);
    ncaaPlayerStatSaveByTeamIdFn(teamId);
    sendResponseData(res, 200, true, "Update player state for team " + teamId, {});
}

async function ncaaPlayerStatSaveByTeamIdFn(teamId,ncaaPlayerListIdArr) {
    const teamPlayerStatData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_player_stats?json=1');

    var teamPlayerStatistic = teamPlayerStatData.data.statistic;
    var season = teamPlayerStatistic.season;
    var statCategoryList = teamPlayerStatistic.category;

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
                player_id: ncaaPlayerListIdArr[teamId][eachPlayerStat.name],
                player_name: eachPlayerStat.name,
                season: season,
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
                playerStatArr.yards = eachPlayerStat.yards;
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
                playerStatArr.yards = eachPlayerStat.yards;
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
                playerStatArr.receiving_yards = eachPlayerStat.receiving_yards;
                playerStatArr.receptions = eachPlayerStat.receptions;
                playerStatArr.yards_after_catch = eachPlayerStat.yards_after_catch;
                playerStatArr.yards_per_game = eachPlayerStat.yards_per_game;
                playerStatArr.yards_per_reception_avg = eachPlayerStat.yards_per_reception_avg;

                await NcaaPlayerStats.create(playerStatArr);
                // totalAddEdit.add++;
            }

        })
        // console.log(catName, playerStatArr);
        await NcaaTeam.updateOne({ team_id: teamId }, { updated_at: Date.now() });
        return true;

    });
}

const ncaaRosterUpadteSave = async(req,res)=>{
    const ncaaTeamList = await NcaaTeam.find({});

    //const playerArr = await NcaaPlayers.find()
    const ncaaPlayerList = await NcaaPlayers.find({});
    const ncaaPlayerListIdArr = [];
    ncaaPlayerList.forEach(async (eachPlayer) => {
        ncaaPlayerListIdArr[eachPlayer.name] = eachPlayer.player_id;
    })
    

    ncaaTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;
        ncaaRosterSave(teamId,ncaaPlayerListIdArr);
    });

    sendResponseData(res, 200, true, "NCAA rosters from third party api", {});

}
const ncaaRosterUpdateSaveByTeamId = async (req,res)=>{

    const teamId = req.query.teamId;

    ncaaRosterSave(teamId);

    sendResponseData(res, 200, true, "NCAA rosters from third party api", {});


}

async function ncaaRosterSave(teamId,ncaaPlayerListIdArr) {
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
                player_id:ncaaPlayerListIdArr[each.name],
                team_position: team_position|| '',
                player_position: each.position|| '',
                player_age: each.age|| '',
                player_height: each.height|| '',
                player_weight: each.weight|| '',
                player_exp: each.experience_years|| '',
                player_college: each.college|| '',

            }

            // console.log(injuryData.report_date);
            await NcaaRosters.create(injuryData);

        })
    })


} 

//============================================score==================
const ncaaScoreUpdateSave = async (req,res) =>{
    try{

        let ncaaTeam = await NcaaTeam.find({ status: true, isDelete: false });
   
   
           let year = req.query.date;
   
           let result ;
           if(year){
               result = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/fbs-scores?json=1&date='+year);
           }
           else{
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
           
           scoreDataArr.forEach(async(eachMatch) =>{
               // console.log("scoreData",scoreDataArr.length);
   
               if (eachMatch.hometeam) {
                   homeTeamData =  ncaaTeam.find(team => team.team_name === eachMatch.hometeam.name);
                   // console.log("homeTeamData",homeTeamData);
                   homeTeamId = homeTeamData ? homeTeamData.team_id : '';
               }
   
               if (eachMatch.awayteam) {
                   awayTeamData =  ncaaTeam.find(team => team.team_name === eachMatch.awayteam.name);
                   // console.log("awayTeamData",awayTeamData);
                   awayTeamId = awayTeamData ? awayTeamData.team_id : '';
               }
   
               // if(eachMatch.date){
               //     week = await weekCreate(eachMatch.date.slice(0,5));
               // }

               let awayTeamScore = {
                    q1:eachMatch.awayteam.q1,
                    q2:eachMatch.awayteam.q2,
                    q3:eachMatch.awayteam.q3,
                    q4:eachMatch.awayteam.q4,
                    totalscore:eachMatch.awayteam.totalscore
               }

               let homeTeamScore ={
                    q1:eachMatch.hometeam.q1,
                    q2:eachMatch.hometeam.q2,
                    q3:eachMatch.hometeam.q3,
                    q4:eachMatch.hometeam.q4,
                    totalscore:eachMatch.hometeam.totalscore
               }
   
               let dataToSave = {
                   matchDate:eachMatch.formatted_date ? new Date(eachMatch.formatted_date.split(".").reverse().join("-")) : '',
                   matchTime:eachMatch.time ?eachMatch.time :'',
                   awayTeam:awayTeamId || undefined,
                   homeTeam:homeTeamId || undefined,
                   awayTeamScore:awayTeamScore,
                   homeTeamScore:homeTeamScore,
                   passing:eachMatch.passing,
                   rushing:eachMatch.rushing,
                   receiving:eachMatch.receiving,
                   matchVenue:eachMatch.venue_name?eachMatch.venue_name:'',
                   date:eachMatch.date,
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
   
               let existData = await NcaaScore.findOne({matchDate:dataToSave.matchDate});
               // console.log("existData",existData.length);
               if(existData){
                   let updatedata ={
                       matchTime:eachMatch.time ?eachMatch.time :'',
                       awayTeam:awayTeamId || undefined,
                       homeTeam:homeTeamId || undefined,
                       awayTeamScore:awayTeamScore,
                       homeTeamScore:homeTeamScore,
                       passing:eachMatch.passing,
                       rushing:eachMatch.rushing,
                       receiving:eachMatch.receiving,
                       matchVenue:eachMatch.venue_name?eachMatch.venue_name:'',
                       date:eachMatch.date,
   
                   }
                   let update = await NcaaScore.updateOne({matchDate:dataToSave.matchDate},{...updatedata});
            //    console.log(update);
   
               }
               else{
                   await NcaaScore.create(dataToSave);
   
               }
   
   
           });
   
       sendResponseData(res, 200, true, "NFL score from third party api", {});
   
   
       }
       catch(error){
           console.log(error);
       sendResponseData(res, 200, false, "something wrong", {});
   
       }
}

const ncaaPlayerSave = async(req,res) =>{
    const ncaaTeamList = await NcaaTeam.find({});
    

    ncaaTeamList.forEach(async (eachTeam) => {
        var teamId = eachTeam.team_id;
        ncaaPlayerDataSave(teamId);
    });

    sendResponseData(res, 200, true, "NCAA rosters from third party api", {});

}

async function ncaaPlayerDataSave(teamId){
    const playerData = await axios.get('http://www.goalserve.com/getfeed/' + config.goalServerApikey + '/football/' + teamId + '_rosters?json=1');
    

    let allData = playerData.data;

    let reportData = allData.team.position;
    reportData.forEach(async (each) => {
        // console.log("each",each);
        each.player.forEach(async(eachPlayer)=>{

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

          const existData = await  NcaaPlayers.findOne({player_id:eachPlayer.id});
          if(existData){
            console.log("--------------------",existData);

            const updateData = await NcaaPlayers.updateOne({player_id:eachPlayer.id},playerArr)
          }
          else{
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
        
        var toUpdate={
            profile_img: playerId + '.jpg',
        }

        let update = await NcaaPlayers.updateOne({ player_id: Number(playerId) }, toUpdate);
        
        sendResponseData(res, 200, true, "Player image uploaded", getFilePath('ncaaf_players/'+playerId + '.jpg'));
    } catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
};


const ncaaplayerImageSaveAll = async (req, res) => {
    // const playerId = req.query.playerId;
    try {
        const ncaaPlayerList = await NcaaPlayers.find({});
        // console.log('ncaaPlayerList', ncaaPlayerList);
        if(ncaaPlayerList && ncaaPlayerList.length > 0){
            ncaaPlayerList.forEach(async (element) => {
                // console.log('element', element);
                var playerId = element.player_id;
                const playerImgApi = await axios.get(`http://www.goalserve.com/getfeed/` + config.goalServerApikey + `/football/usa?playerimage=` + playerId + `&json=1`);
                const playerImgBase64 = playerImgApi.data.image.value;
                // console.log('playerImgBase64', playerImgBase64);

                var imgSave = decode_base64_img(playerImgBase64, 'ncaaf_players', playerId + '.jpg');
                // console.log('playerImgBase64', playerImgBase64);
                
                var toUpdate={
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
async function gamePLayedSave(data,date){
    // console.log("---------------date",data);
    if(data.awayteam){
        let tempArr= [];
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
           
            let exist = await NCAA_game_played.findOne({$and:[dataSave]});
            // console.log("exist ----- away",exist);
            if(exist == null){
                // let deleteData = await NFL_game_played.deleteOne(dataSave);
                await NCAA_game_played.create(dataSave);
            }            
            // await NFL_game_played.create(dataSave);
        })

    }
    if(data.hometeam){
        let tempArr= [];
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
            let exist = await NCAA_game_played.findOne({$and:[dataSave]});
            // console.log("exist--------home",exist);
            if( exist == null){
                // let deleteData = await NFL_game_played.deleteOne(dataSave);
                await NCAA_game_played.create(dataSave);
            }         

        })
    }

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
    ncaaplayerImageSaveAll
}