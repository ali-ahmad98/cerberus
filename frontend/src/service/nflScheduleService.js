import webApi from "../WebApi/WebApi";

import userimg from "../../Assets/769978_man_512x512.png";
import playerimg from "../../Assets/draft-table-img-1.png";
import playerimg2 from "../../Assets/draft-table-img-2.png";
import playerimg3 from "../../Assets/draft-table-img-3.png";
import playerimg4 from "../../Assets/draft-table-img-4.png";
import playerimg5 from "../../Assets/draft-table-img-5.png";
import playerimg6 from "../../Assets/draft-table-img-6.png";
import playerimg7 from "../../Assets/draft-table-img-7.png";
import playerimg8 from "../../Assets/draft-table-img-8.png";
import Arizona from "../../Assets/headerIcon/Arizona.png";
import Baltimore from "../../Assets/headerIcon/baltimore.png";
import Buffalo from "../../Assets/headerIcon/buffalo.png";
import Cincennati from "../../Assets/headerIcon/cincennati.png";
import Cleveland from "../../Assets/headerIcon/Cleveland.png";
import England from "../../Assets/headerIcon/England.png";
import Francisco from "../../Assets/headerIcon/Francisco.png";
import Indianapolis from "../../Assets/headerIcon/Indianapolis.png";
import Miami from "../../Assets/headerIcon/Miami.png";
import NewYork from "../../Assets/headerIcon/NewYork.png";
import Pittsburgh from "../../Assets/headerIcon/Pittsburgh.png";
import Rams from "../../Assets/headerIcon/Rams.png";
import Seattle from "../../Assets/headerIcon/Seattle.png";
import leaderImage from "../../Assets/img/player-image-2.png";
import leaderImage2 from "../../Assets/leader-img-3.png";
import leaderImage3 from "../../Assets/leader-img-4.png";
import leaderImage4 from "../../Assets/leader-img-5.png";
import leaderImage5 from "../../Assets/leader-img-6.png";
import leaderImage6 from "../../Assets/leader-img-7.png";
import leaderImage7 from "../../Assets/leader-img-8.png";
import leaderImage8 from "../../Assets/leader-img-9.png";
import leaderImage9 from "../../Assets/leader-img-10.png";
import leaderImage10 from "../../Assets/leader-img-11.png";
import leaderImage11 from "../../Assets/leader-img-12.png";
import leaderImage12 from "../../Assets/leader-img-13.png";
import leaderImage13 from "../../Assets/leader-img-14.png";
import leaderImage14 from "../../Assets/leader-img-15.png";
import leaderImage15 from "../../Assets/leader-img-16.png";
import leaderImage16 from "../../Assets/leader-img-17.png";
import leaderImage17 from "../../Assets/leader-img-18.png";
import leaderImage18 from "../../Assets/leader-img-19.png";
import leaderImage19 from "../../Assets/leader-img-20.png";
import leaderImage20 from "../../Assets/leader-img-21.png";
import leaderImage21 from "../../Assets/leader-img-22.png";
import leaderImage22 from "../../Assets/leader-img-23.png";
import playerTeamIcon from "../../Assets/player-team-icon.png";

export const scheduleHeadingList = [
  {
    heading: "MATCHUP",
  },
  {
    heading: "",
  },
  {
    heading: "",
  },
  {
    heading: "TIME",
  },
  {
    heading: "NAT TV",
  },
  {
    heading: "TICKETS",
  },
  {
    heading: " LOCATION",
  },
];

export const drafttablelist = [
  {
    rank: 1,
    playerName: "Trevor Lawrence",
    school: "Clemson",
    pos: "OVR",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg,
  },
  {
    rank: 2,
    playerName: "Penei Sewell",
    school: "Alabama",
    pos: "QB",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg2,
  },
  {
    rank: 3,
    playerName: "Patrick Surtain II",
    school: "Alabama",
    pos: "RB",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg3,
  },
  {
    rank: 4,
    playerName: "Ja'Marr Chase",
    school: "FB",
    pos: "FB",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg4,
  },
  {
    rank: 5,
    playerName: "Trevor Lawrence",
    school: "Clemson",
    pos: "WR",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg5,
  },
  {
    rank: 6,
    playerName: "Micah Parsons",
    school: "Penn State",
    pos: "TE",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg6,
  },
  {
    rank: 7,
    playerName: "Trevor Lawrence",
    school: "Clemson",
    pos: "OT",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg7,
  },
  {
    rank: 8,
    playerName: "Justin Fields",
    school: "Clemson",
    pos: "OG",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg8,
  },
  {
    rank: 9,
    playerName: "Ohio State",
    school: "Clemson",
    pos: "C",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg,
  },
  {
    rank: 10,
    playerName: "Rashod Bateman",
    school: "Minnesota",
    pos: "DE",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg2,
  },
  {
    rank: 11,
    playerName: "Rashod Bateman",
    school: "Minnesota",
    pos: "DT",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg3,
  },
  {
    rank: 12,
    playerName: "Rashod Bateman",
    school: "Minnesota",
    pos: "ILB",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg4,
  },
  {
    rank: 13,
    playerName: "Rashod Bateman",
    school: "Minnesota",
    pos: "OLB",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg5,
  },
  {
    rank: 14,
    playerName: "Rashod Bateman",
    school: "Minnesota",
    pos: "CB",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg6,
  },
  {
    rank: 15,
    playerName: "Rashod Bateman",
    school: "Minnesota",
    pos: "S",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg7,
  },

  {
    rank: 16,
    playerName: "Rashod Bateman",
    school: "Minnesota",
    pos: "LS",
    height: 1.98,
    weight: 80,
    shirtcolor: "white",
    posRank: 1,
    overRank: 2,
    grade: 93,
    teamImage: playerTeamIcon,
    playerImage: userimg,
    teamImage2: playerimg8,
  },
];

export const offensiveLeaderList = [
  {
    listype: "PASSING",
    listplayers: [
      {
        playerImage: leaderImage,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage2,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage3,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage4,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage5,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
    ],
  },
  {
    listype: "RUSING",
    listplayers: [
      {
        playerImage: leaderImage6,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage7,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage8,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage9,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage10,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 5000,
      },
    ],
  },
  {
    listype: "RECEIVING",
    listplayers: [
      {
        playerImage: leaderImage11,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 400,
      },
      {
        playerImage: leaderImage12,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage13,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 653,
      },
      {
        playerImage: leaderImage14,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 234,
      },
      {
        playerImage: leaderImage15,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 992,
      },
    ],
  },
];

export const defensiveLeaderList = [
  {
    listype: "TACKLES",
    listplayers: [
      {
        playerImage: leaderImage16,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage17,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage18,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage19,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage20,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
    ],
  },
  {
    listype: "SACKS",
    listplayers: [
      {
        playerImage: leaderImage21,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage22,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage5,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage2,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage7,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 5000,
      },
    ],
  },
  {
    listype: "INTERCEPTIONS",
    listplayers: [
      {
        playerImage: leaderImage17,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 400,
      },
      {
        playerImage: leaderImage18,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 2462,
      },
      {
        playerImage: leaderImage19,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 653,
      },
      {
        playerImage: leaderImage20,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 234,
      },
      {
        playerImage: leaderImage21,
        playerName: "Matt Ryan",
        team: "ATL",
        yds: 992,
      },
    ],
  },
];

export const offensiveTeamListData = [
  {
    listype: "TOTAL YARDS",
    listplayers: [
      {
        playerImage: Arizona,
        playerName: "Arizona Cardinals",
        yds: 246.2,
      },
      {
        playerImage: Seattle,
        playerName: "Los Angeles Chargers",
        yds: 246.2,
      },
      {
        playerImage: Buffalo,
        playerName: "Seattle Seahawks",
        yds: 288.2,
      },
      {
        playerImage: Arizona,
        playerName: "Kansas City Chiefs",
        team: "ATL",
        yds: 246.2,
      },
      {
        playerImage: Arizona,
        playerName: "Tennessee Titans",
        yds: 241.2,
      },
    ],
  },
  {
    listype: "PASSING",
    listplayers: [
      {
        playerImage: Pittsburgh,
        playerName: "Dallas Cowboys",
        yds: 11.1,
      },
      {
        playerImage: Francisco,
        playerName: "Atlanta Falcons",
        yds: 24.62,
      },
      {
        playerImage: Indianapolis,
        playerName: "Seattle Seahawks",
        yds: 246.2,
      },
      {
        playerImage: Cleveland,
        playerName: "Kansas City Chiefs",
        team: "ATL",
        yds: 246.2,
      },
      {
        playerImage: Cincennati,
        playerName: "Houston Texans",
        yds: 5000,
      },
    ],
  },
  {
    listype: "RECEIVING",
    listplayers: [
      {
        playerImage: Baltimore,
        playerName: "Baltimore Ravens",
        yds: 400.11,
      },
      {
        playerImage: Rams,
        playerName: "Arizona Cardinals",
        yds: 246.2,
      },
      {
        playerImage: Miami,
        playerName: "New England Patriots",
        yds: 65.3,
      },
      {
        playerImage: NewYork,
        playerName: "Tennessee Titans",
        yds: 2341.11,
      },
      {
        playerImage: England,
        playerName: "Cleveland Browns",
        yds: 992.11,
      },
    ],
  },
];

export const playerstatistics = [
  {
    offense: "Passing",
    defense: "Tackles",
    specialteam: "Returning",
  },
  {
    offense: "Rushing",
    defense: "Sacks",
    specialteam: "Kicking",
  },
  {
    offense: "Receiving",
    defense: "Interceptions",
    specialteam: "Punting",
  },
  {
    offense: "Touchdowns",
    defense: "",
    specialteam: "",
  },
];

export const teamstatisticsTableData = [
  {
    offense: "Total Yards",
    defense: "Yards Allowed",
    specialteam: "Returning",
  },
  {
    offense: "Passing",
    defense: "Turnovers",
    specialteam: "Kicking",
  },
  {
    offense: "Rushing",
    defense: "Passing",
    specialteam: "Punting",
  },
  {
    offense: "Receiving",
    defense: "Receiving",
    specialteam: "",
  },
  {
    offense: "Downs",
    defense: "Downs",
    specialteam: "",
  },
];

//Schedule api integration
export const getAllNflSchedulelist = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.post(`/nflScheduleList`, {
      year: 2022,
      team: "64536bd6cae13654ed571361",
    });
    if (res.status === 200) {
      const r = res.data;
      let nfl_list = [];

      r.response_data.map((r, i) => {
        nfl_list.push({
          id: i + 1,
          sheduleDate: r?.sheduleDate,
          date: r?.date,
          //for away team
          away_team_code: r?.awayTeam?.team_code,
          away_team_name: r?.awayTeam?.team_name,
          away_logo_small: r?.awayTeam?.logo_small,
          away_logo_medium: r?.awayTeam?.logo_medium,
          away_logo_standard: r?.awayTeam?.logo_standard,
          away_logo_helmet: r?.awayTeam?.logo_helmet,

          //for home team
          home_team_code: r?.homeTeam?.team_code,
          home_team_name: r?.homeTeam?.team_name,
          home_logo_small: r?.homeTeam?.logo_small,
          home_logo_medium: r?.homeTeam?.logo_medium,
          home_logo_standard: r?.homeTeam?.logo_standard,
          away_home_logo_helmet: r?.homeTeam?.logo_helmet,

          sheduleTime: r?.sheduleTime,
          venue: r?.venue,

          lightText: "AT",
        });
      });

      if (nfl_list.length != 0) {
        return onSuccess(nfl_list);
      } else {
        return onFailure?.("No Data Found");
      }
    } else {
      onFailure?.("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure?.("Something Wrong! Please Try again later" + error);
  }
};
