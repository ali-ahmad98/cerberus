// "use strict";

const cron = require("node-cron");
const apiFunctions = require("../thirdApi/api.functions");
const nfl_api_function = require("../thirdApi/nfl_api.controller");
const ncaa_team_controller = require("../thirdApi/ncaa_team.controller");


// //==========for updating news at 9:30 everyday=====================

cron.schedule("30 8 * * *", async () => {
  console.log("cron started for reminder");
  try {
    //nfl_fantasy_score
    const saveNcaaFantasy = await ncaa_team_controller.ncaaPlayerFantasyScore();
    // console.log(newsData);
  } catch (err) {
    console.log(err);
  }
});

cron.schedule("00 9 * * *", async () => {
  console.log("cron started for reminder");
  try {

    const saveNcaaFantasyScore = await ncaa_team_controller.ForSaveNcaaFantastyScore();
    // console.log(newsData);
  } catch (err) {
    console.log(err);
  }
});

cron.schedule("30 9 * * *", async () => {
    console.log("cron started for reminder");
    try {
      const newsData = await apiFunctions.newsSave();

      //nfl_fantasy_score
      const saveNflFanPlayers = await nfl_api_function.nflPlayerFantasyScore();
     // const saveNflFanPlayersScore = await nfl_api_function.ForSaveFantasyScore();
      console.log(newsData);
    } catch (err) {
      console.log(err);
    }
  });

  cron.schedule("50 9 * * *", async () => {
    console.log("cron started for reminder");
    try {
     // const newsData = await apiFunctions.newsSave();

      //nfl_fantasy_score
      //const saveNflFanPlayers = await nfl_api_function.nflPlayerFantasyScore();
      const saveNflFanPlayersScore = await nfl_api_function.ForSaveFantasyScore();

      
      // console.log(newsData);
    } catch (err) {
      console.log(err);
    }
  });


//==========for updating nfl score every 2 min=====================
  cron.schedule("*/2 * * * *", async () => {
    console.log("cron started for nfl");
    try {
      const scoreData = await nfl_api_function.recentScoreOfNfl();
      // console.log(scoreData);
    } catch (err) {
      console.log(err);
    }
  });

// //==========for updating ncaa score every 2 min=====================
cron.schedule("*/2 * * * *", async () => {
  console.log("cron started for ncaa");
  try {
    const scoreData = await ncaa_team_controller.recentScoreOfNcaa();
    // console.log(scoreData);
  } catch (err) {
    console.log(err);
  }
});  
// //============================nfl scheduleat at  9:30 everyday====================
cron.schedule("30 9 * * *", async () => {
  console.log("cron started for nfl schedule");
  try {
    const scheduleData = await apiFunctions.nflScheduleSave();
    // console.log(scheduleData);
  } catch (err) {
    console.log(err);
  }
}); 



// //============================ncaa schedule At at 9:30 everyday ====================
cron.schedule("30 9 * * *", async () => {
  console.log("cron started for ncaa schedule");
  try {
    const scheduleData = await apiFunctions.ncaaDataSave();
    // console.log(scheduleData);
  } catch (err) {
    console.log(err);
  }
}); 

// //====================cron for ncaaf player stat at 9:30 everyday============================
cron.schedule("0 */2 * * *", async () => {
  console.log("cron started for ncaaf player stat");
  try {
    const newsData = await ncaa_team_controller.ncaaPlayerStatSave();
    // console.log(newsData);
  } catch (err) {
    console.log(err);
  }
});



// //====================cron for nfl player stat at 9:30 everyday ============================
cron.schedule("0 */2 * * *", async () => {
  console.log("cron started for nfl player stat");
  try {
    const newsData = await nfl_api_function.nflPlayerStatSave();
    // console.log(newsData);
  } catch (err) {
    console.log(err);
  }
});

//====================cron for nfl team stat at every 2 hrs ============================
cron.schedule("0 */2 * * *", async () => {
  console.log("cron started for nfl team stat");
  try {
    const newsData = await nfl_api_function.nflTeamStatSave();
    // console.log(newsData);
  } catch (err) {
    console.log(err);
  }
});