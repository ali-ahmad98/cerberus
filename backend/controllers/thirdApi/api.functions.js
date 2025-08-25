const News = require("../../models/thirdPartySchema/news.model");
const nfl_teams = require("../../models/thirdPartySchema/nfl_team.model");
const ncaa_teams = require("../../models/thirdPartySchema/ncaa_team.model");              
const config = require("../../config/config")
const axios = require('axios');
const nfl_Schedule = require("../../models/thirdPartySchema/nfl_schedule.model");
const ncaa_Schedule = require("../../models/thirdPartySchema/ncaa_schedule.model");

async function newsSave() {
  const news = await axios.get('https://api.fantasynerds.com/v1/nfl/news?apikey=' + config.fantasyNerdsApikey);

  const dataExist = await News.find({});
  // console.log(dataExist);   
  if (dataExist.length == 0) {
    const newsEntry = News.insertMany(news.data);
    return newsEntry;
  }
  else {
    const update = await News.updateMany({}, { isDelete: false });
    const newsEntry = News.insertMany(news.data);
    return newsEntry;
  }

}


async function nflScheduleSave_back() {
  const schedule = await axios.get(`http://www.goalserve.com/getfeed/` + config.goalServerApikey + `/football/nfl-shedule?json=1`);
  let tournament = schedule.data.shedules.tournament;
  let matchArr = [];
  let matchObj = {};
  let tempArr = [];
  let tempArr1 = [];

  let nflTeam = await nfl_teams.find({ status: true, isDelete: false });


  tournament.forEach((weekItems) => {
    weekItems.week.forEach((items) => {
      //---------------new week add-----------------
      // console.log("weekItems matches",items);
      let weekName;
      if (weekItems.name == "Pre Season") {
        // console.log("11111111111");
        weekName = `PreSeason ${items.name}`;
        // console.log("1weekName",weekName);

        matchObj.scheduleWeek = items.name ? weekName : '';
      }
      if (weekItems.name == "Regular Season") {
        // console.log("222222");

        matchObj.scheduleWeek = items.name ? items.name : '';
      }
      if (weekItems.name == "Post Season") {
        // console.log("333");

        matchObj.scheduleWeek = items.name ? items.name : '';

      }
      // matchObj.scheduleWeek = items.name?items.name:'';
      //---------------new week end-----------------

      if (Array.isArray(items.matches)) {
        tempArr = items.matches;
      } else {
        tempArr.push(items.matches);
      }
      // console.log("tempArr",tempArr);
      tempArr.forEach((eachMatch) => {
        //   console.log("weekItems",eachMatch);
        if (!eachMatch) {
          return;
        }
        //  matchObj.sheduleDate = eachMatch.formatted_date;  //collect schedule date
        //matchObj.sheduleDate = eachMatch.date ? new Date(eachMatch.date) : '';  //collect schedule date
        // matchObj.date = eachMatch.formatted_date ? eachMatch.formatted_date : '';
        if (Array.isArray(eachMatch.match)) {            //checking match is object or array
          tempArr1 = eachMatch.match;
        } else {
          tempArr1.push(eachMatch.match);
        }
        tempArr1.forEach((each, index) => {

          if (each.hometeam) {
            homeTeamData = nflTeam.find(team => team.team_name === each.hometeam.name)
            // console.log("homeTeamData",homeTeamData);
            homeTeamId = homeTeamData ? homeTeamData._id : '';
          }

          if (each.awayteam) {
            awayTeamData = nflTeam.find(team => team.team_name === each.awayteam.name)
            // console.log("awayTeamData",awayTeamData);
            awayTeamId = awayTeamData ? awayTeamData._id : '';

          }
          // console.log("matchObj before",matchObj);

          matchObj = {
            ...matchObj,
            sheduleDate: each.formatted_date ? new Date(each.formatted_date.split(".").reverse().join("-")) : '',
            date: each.formatted_date ? each.formatted_date : '',
            awayTeam: awayTeamId || undefined,
            homeTeam: homeTeamId || undefined,
            sheduleTime: each.time ? each.time : '',
            venue: each.venue ? each.venue : '',
            index: index
          }
          matchArr.push(matchObj);

        })
        // console.log("matchObj",matchObj);
        // matchArr.push({...matchObj});
      })
      // matchArr.push({...matchObj});
    })
  })
  //console.log("matchArr",matchArr);

  const dataExist = await nfl_Schedule.find({});
  if (dataExist.length == 0) {
    const save = nfl_Schedule.insertMany(matchArr);

  }
  else {
    const update = await nfl_Schedule.updateMany({}, { isDelete: true });
    const teamsEntry = nfl_Schedule.insertMany(matchArr);
    return teamsEntry;

  }

  // return tempArr; 


}

async function nflScheduleSave() {
  const schedule = await axios.get(`http://www.goalserve.com/getfeed/` + config.goalServerApikey + `/football/nfl-shedule?json=1`);
  let tournament = schedule.data.shedules.tournament;
  let matchArr = [];
  let matchObj = {};
  let tempArr = [];
  let tempArr1 = [];
  let currentYear = new Date().getFullYear();

  let nflTeam = await nfl_teams.find({ status: true, isDelete: false });


  tournament.forEach((weekItems) => {
    weekItems.week.forEach((items) => {
      //---------------new week add-----------------
      //console.log("weekItems matches", weekItems.name);
      let weekName;
      if (weekItems.name == "Pre Season") {
      //  console.log("11111111111");
        weekName = `PreSeason ${items.name}`;
       // console.log("1weekName", weekName);

        matchObj.scheduleWeek = items.name ? weekName : '';
      }
      if (weekItems.name == "Regular Season") {
      //  console.log("222222");

        matchObj.scheduleWeek = items.name ? items.name : '';
      }

      if (weekItems.name == "Post Season") {
       // console.log("333");

        matchObj.scheduleWeek = items.name ? items.name : '';

      }
      // matchObj.scheduleWeek = items.name?items.name:'';
      //---------------new week end-----------------

      if (Array.isArray(items.matches)) {
        tempArr = items.matches;
      } else {
        tempArr.push(items.matches);
      }
      tempArr.forEach((eachMatch) => {
        // if (!eachMatch) {    //// updated
        //   return;
        // }

        //  matchObj.sheduleDate = eachMatch.formatted_date;  //collect schedule date
        // matchObj.sheduleDate = eachMatch.date ? new Date(eachMatch.date) : '';  //collect schedule date
        // matchObj.date = eachMatch.formatted_date ? eachMatch.formatted_date : '';
        if (Array.isArray(eachMatch.match)) {            //checking match is object or array
          tempArr1 = eachMatch.match;
        } 
        // else {
          
        //   tempArr1.push(eachMatch.match);
        //   console.log("tempArr----- off for hall of weekend-------------------------",tempArr1);
        //   return tempArr1;

        // }
        tempArr1.forEach((each, index) => {

          if (!each) { return; }
          // if (!each) { return; }

          if (each.hometeam) {
            homeTeamData = nflTeam.find(team => team.team_name === each.hometeam.name)
            // console.log("homeTeamData",homeTeamData);
            homeTeamId = homeTeamData ? homeTeamData.team_id : '';
          }

          if (each.awayteam) {
            awayTeamData = nflTeam.find(team => team.team_name === each.awayteam.name)
            // console.log("awayTeamData",awayTeamData);
            awayTeamId = awayTeamData ? awayTeamData.team_id : '';

          }


          //   console.log("each",each);
          matchObj = {
            ...matchObj,
            awayTeam: awayTeamId || undefined,
            homeTeam: homeTeamId || undefined,
            sheduleTime: each.time ? each.time : '',
            venue: each.venue ? each.venue : '',
          }

          // if (each.awayteam) {
          //   awayTeamData = nflTeam.find(team => team.team_name === each.awayteam.name)
          //   // console.log("awayTeamData",awayTeamData);
          //   awayTeamId = awayTeamData ? awayTeamData.team_id : '';

          // }


          //   console.log("each",each);
          matchObj = {
            ...matchObj,
            sheduleDate: each.formatted_date ? new Date(each.formatted_date.split(".").reverse().join("-")) : '',
            date: each.formatted_date ? each.formatted_date : '',
            awayTeam: awayTeamId || undefined,
            homeTeam: homeTeamId || undefined,
            sheduleTime: each.time ? each.time : '',
            venue: each.venue ? each.venue : '',
            index: index,
            year: each.formatted_date ? new Date(each.formatted_date.split(".").reverse().join("-")).getFullYear() : ''
          }

          // const previousDelete = await nfl_Schedule.deleteMany({})

          matchArr.push({ ...matchObj });

        })
        return matchArr;
        // console.log("matchObj",matchObj);
        // matchArr.push({...matchObj});

        //   const save =  new nfl_Schedule(matchObj).save();


      })
    })
  })

  // console.log("matchArr",matchArr);

  const dataExist = await nfl_Schedule.find({});
  if (dataExist.length == 0) {
    const save = nfl_Schedule.create(matchArr);

  }
  else {
    const update = await nfl_Schedule.deleteMany({ year: {$gte:currentYear} });
    const teamsEntry = nfl_Schedule.insertMany(matchArr);
    return teamsEntry;

  }

  // return matchArr; 


}

async function nflTeamSave() {
  const team = await axios.get('https://api.fantasynerds.com/v1/nfl/teams?apikey=' + config.fantasyNerdsApikey);
  // console.log(team.data);
  const dataExist = await nfl_teams.find({});
  // console.log(dataExist);   
  if (dataExist.length == 0) {
    const teamsEntry = nfl_teams.insertMany(team.data);
    return teamsEntry;
  }
  else {
    const update = await nfl_teams.updateMany({}, { isDelete: true });
    const teamsEntry = nfl_teams.insertMany(team.data);
    return teamsEntry;
  }
}

async function teamSaveUpdateData() {
  var totalAddEdit = {
    add: 0,
    edit: 0
  };
  const fantasyTeam = await axios.get('https://api.fantasynerds.com/v1/nfl/teams?apikey=' + config.fantasyNerdsApikey);
  // console.log("teams", fantasyTeam.data);
  // return fantasyTeam;
  const fantasyNerdsTeam = fantasyTeam.data;
  fantasyNerdsTeam.forEach(async (eachTeam) => {
    var teamName = eachTeam.team_name;

    nfl_teams.findOne({ team_name: teamName }, async function (err, existTeamData) {
      if (err) {
        console.log(err)
      } else {
        const teamArr = {
          team_name: eachTeam.team_name,
          team_code: eachTeam.team_code,
          logo_small: eachTeam.logo_small,
          logo_medium: eachTeam.logo_medium,
          logo_standard: eachTeam.logo_standard,
          logo_helmet: eachTeam.logo_helmet,
        }


        // console.log('teamArr', existTeamData);
        if (existTeamData == null) {
          nfl_teams.create(teamArr);
          totalAddEdit.add++;
        } else {
          totalAddEdit.edit++;
          // console.log('teamArr updateOne', existTeamData._id);
          var re = await nfl_teams.updateOne({ _id: existTeamData._id }, teamArr);
        }
      }
    });

  })



  const goalserverTeam = await axios.get(`http://www.goalserve.com/getfeed/` + config.goalServerApikey + `/football/nfl-standings?json=1`);
  const leagueData = goalserverTeam.data.standings.category.league;

  var goalserverTeamArr = [];
  leagueData.forEach((eachLeague, index) => {
    var leagName = (eachLeague.name == "American Football Conference") ? "AFC" : "NFC"; //AFC/NFC

    eachLeague.division.forEach((eachDivision) => {
      var divisionName = eachDivision.name; //east/west/north/south

      eachDivision.team.forEach(async (eachTeam) => {
        var teamName = eachTeam.name;
        // console.log("eachTeam", eachTeam.id, eachTeam.name);
        nfl_teams.countDocuments({ team_name: teamName }, function (err, count) {
          if (err) {
            console.log(err)
          } else {
            // console.log("nfl_teams Count :", count)
            if (count == 0) {
              var teamArr = [];
              // teamArr = eachTeam;
              teamArr['team_id'] = eachTeam.id;
              teamArr['team_name'] = teamName;
              teamArr['team_leag'] = leagName;
              teamArr['team_division'] = divisionName;
              teamArr['team_position'] = eachTeam.position;

              nfl_teams.create(teamArr);
              totalAddEdit.add++;
            } else {
              nfl_teams.findOne({ team_name: teamName }, async function (err, existRes) {
                if (err) {
                  console.log(err)
                }
                else {
                  let teamArr = {
                    team_id: eachTeam.id,
                    team_leag: leagName,
                    team_division: divisionName,
                    team_position: eachTeam.position,
                  }
                  // console.log('teamArr updateTwo', existRes._id);
                  var re = await nfl_teams.updateOne({ _id: existRes._id }, teamArr);
                }
              });


            }
          }
        });

      })
    })
  })


  return totalAddEdit



}

async function ncaaDataSave() {
  const schedule = await axios.get(`http://www.goalserve.com/getfeed/` + config.goalServerApikey + `/football/fbs-shedule?json=1`);
  let tournament = schedule.data.shedules.tournament;
  let matchArr = [];
  let matchObj = {};
  let tempArr = [];
  let tempArr1 = [];

  // return tournament;

  let ncaaTeam = await ncaa_teams.find({ status: true, isDelete: false });
  let currentYear = new Date().getFullYear();
  console.log("11111111111",currentYear);

  tournament.week.forEach((weekItems) => {
    // console.log("weekItems",weekItems);

    // weekItems.week.forEach((items)=>{
    //---------------new week add-----------------
    // console.log("weekItems matches",weekItems.name);
    let weekName;
    if (weekItems.name) {
      // console.log("11111111111");
      weekName = `Week ${weekItems.name}`;
    //  console.log("1weekName", weekName);

      matchObj.scheduleWeek = weekItems.name ? weekName : '';
    }
    // if(weekItems.name == "Regular Season"){
    //   console.log("222222");

    //  matchObj.scheduleWeek = items.name?items.name:'';
    // }

    // if(weekItems.name == "Post Season"){
    //   console.log("333");

    //  matchObj.scheduleWeek = items.name?items.name:'';

    // }
    // matchObj.scheduleWeek = items.name?items.name:'';
    //---------------new week end-----------------

    if (Array.isArray(weekItems.matches)) {
      tempArr = weekItems.matches;
    } else {
      tempArr.push(weekItems.matches);
    }
    //   console.log("tempArr",tempArr);
    tempArr.forEach((eachMatch) => {
      //   console.log("weekItems",eachMatch);
      if (!eachMatch) {
        return;
      }

      //  matchObj.sheduleDate = eachMatch.formatted_date;  //collect schedule date
      // matchObj.sheduleDate = eachMatch.date ? new Date(eachMatch.date) : '';  //collect schedule date
      // matchObj.date = eachMatch.formatted_date ? eachMatch.formatted_date : '';
      if (Array.isArray(eachMatch.match)) {            //checking match is object or array
        tempArr1 = eachMatch.match;
      } else {
        tempArr1.push(eachMatch.match);
      }
      tempArr1.forEach((each, index) => {

        if (!each) { return; }
        if (!each) { return; }

        if (each.hometeam) {
          homeTeamData = ncaaTeam.find(team => team.team_name === each.hometeam.name)
          // console.log("homeTeamData",homeTeamData);
          homeTeamId = homeTeamData ? homeTeamData.team_id : '';
        }

        if (each.awayteam) {
          awayTeamData = ncaaTeam.find(team => team.team_name === each.awayteam.name)
          // console.log("awayTeamData",awayTeamData);
          awayTeamId = awayTeamData ? awayTeamData.team_id : '';

        }


        //   console.log("each",each);
        // matchObj = {
        //   ...matchObj,
        //   awayTeam: awayTeamId || undefined,
        //   homeTeam: homeTeamId || undefined,
        //   sheduleTime: each.time ? each.time : '',
        //   venue: each.venue ? each.venue : '',
        // }

        // if(each.awayteam){
        //   awayTeamData = nflTeam.find(team => team.team_name === each.awayteam.name)
        //   // console.log("awayTeamData",awayTeamData);
        //   awayTeamId = awayTeamData?awayTeamData.team_id:'';

        // }         


        //   console.log("each",each);
        matchObj = {
          ...matchObj,
          sheduleDate: eachMatch.formatted_date ? new Date(eachMatch.formatted_date.split(".").reverse().join("-")) : '',
          date: eachMatch.formatted_date ? eachMatch.formatted_date : '',
          awayTeam: each.awayteam.id || undefined,
          homeTeam: each.hometeam.id || undefined,
          sheduleTime: each.time ? each.time : '',
          venue: each.venue ? each.venue : '',
          index: index,
          awayTeamScore: each.awayteam.totalscore ? each.awayteam.totalscore : 0,
          homeTeamScore: each.hometeam.totalscore ? each.hometeam.totalscore : 0,
          hipassing: each.hipassing ? each.hipassing : '',
          hireceiving: each.hireceiving ? each.hireceiving : '',
          hirushing: each.hirushing ? each.hirushing : '',
          year: eachMatch.formatted_date ? new Date(eachMatch.formatted_date.split(".").reverse().join("-")).getFullYear() : '',
        }

        // const previousDelete = await nfl_Schedule.deleteMany({})

        matchArr.push({ ...matchObj });

      })
      return matchArr;
      // console.log("matchObj",matchObj);
      // matchArr.push({...matchObj});

      //   const save =  new nfl_Schedule(matchObj).save();


    })
    // })
  })


  // console.log("matchArr", matchObj);
  

  const dataExist = await ncaa_Schedule.find({});
  if (dataExist.length == 0) {
    const save = ncaa_Schedule.create(matchArr);

  }
  else {
  
    
    const update = await ncaa_Schedule.deleteMany({ year: {$gte:currentYear} });
    console.log("matchArr", update);
    // if(update.n != 0){

      const teamsEntry = ncaa_Schedule.insertMany(matchArr);
      return teamsEntry;
    // }


  }
    

}

module.exports = {
  newsSave,
  nflScheduleSave,
  nflTeamSave,
  teamSaveUpdateData,
  ncaaDataSave
}