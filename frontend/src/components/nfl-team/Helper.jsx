import { ordinal_suffix_of } from "../../service/GeneralFn";

export const teamLeftBorderColor = ["red", "blue", "green", "orange"];

export const getNflTeamListDropdown = (nflTeamList) => {
  var list1 = [];
  var list2 = [];
  var list3 = [];
  var list4 = [];
  var list5 = [];
  var list6 = [];
  var list7 = [];
  var list8 = [];
  var teamListArr = [];
  var optionList = "";

  nflTeamList &&
    nflTeamList.length > 0 &&
    nflTeamList.map((leagueItem) => {
      leagueItem.division &&
        leagueItem.division.length > 0 &&
        leagueItem.division.map((divisionItem) => {
          if (leagueItem._id.team_leag == "AFC") {
            if (divisionItem.division_name == "North") {
              list1 = divisionItem;
            } else if (divisionItem.division_name == "East") {
              list3 = divisionItem;
            } else if (divisionItem.division_name == "South") {
              list5 = divisionItem;
            } else {
              list7 = divisionItem;
            }
          } else {
            if (divisionItem.division_name == "North") {
              list2 = divisionItem;
            } else if (divisionItem.division_name == "East") {
              list4 = divisionItem;
            } else if (divisionItem.division_name == "South") {
              list6 = divisionItem;
            } else {
              list8 = divisionItem;
            }
          }

          teamListArr = [list1, list2, list3, list4, list5, list6, list7, list8];
        });
    });

  if (teamListArr.length > 0) {
    optionList = teamListArr.map((divisionItem, index) => (
      <React.Fragment key={`nflOptionGroup${index}`}>
        <option value="0" disabled>
          {`${divisionItem.teams[0].team_leag} - ${divisionItem.division_name}`}
        </option>
        {divisionItem.teams &&
          divisionItem.teams.length > 0 &&
          divisionItem.teams.map((teamItem, i) => (
            <option value={teamItem.team_id} key={`nflOption${i}`}>
              {teamItem.team_name}
            </option>
          ))}
      </React.Fragment>
    ));
    return optionList;
  }
};

export const getFirstNflTeamId = (nflTeamList) => {
  var list1 = [];
  var list2 = [];
  var list3 = [];
  var list4 = [];
  var list5 = [];
  var list6 = [];
  var list7 = [];
  var list8 = [];
  var teamListArr = [];

  nflTeamList &&
    nflTeamList.length > 0 &&
    nflTeamList.map((leagueItem) => {
      leagueItem.division &&
        leagueItem.division.length > 0 &&
        leagueItem.division.map((divisionItem) => {
          if (leagueItem._id.team_leag == "AFC") {
            if (divisionItem.division_name == "North") {
              list1 = divisionItem;
            } else if (divisionItem.division_name == "East") {
              list3 = divisionItem;
            } else if (divisionItem.division_name == "South") {
              list5 = divisionItem;
            } else {
              list7 = divisionItem;
            }
          } else {
            if (divisionItem.division_name == "North") {
              list2 = divisionItem;
            } else if (divisionItem.division_name == "East") {
              list4 = divisionItem;
            } else if (divisionItem.division_name == "South") {
              list6 = divisionItem;
            } else {
              list8 = divisionItem;
            }
          }

          teamListArr = [list1, list2, list3, list4, list5, list6, list7, list8];
        });
    });

  return teamListArr &&
    teamListArr.length > 0 &&
    teamListArr[0].teams &&
    teamListArr[0].teams.length > 0
    ? teamListArr[0].teams[0].team_id
    : 1694;
};

export const getNflTeamPosition = (teamDetails) => {
  if (teamDetails && teamDetails.team_position != undefined) {
    return (
      ordinal_suffix_of(teamDetails.team_position) +
      " IN " +
      teamDetails.team_leag +
      " " +
      teamDetails.team_division
    );
  } else {
    return "";
  }
};

export const nflWeekList = [
  { label: "Hall of Fame", value: "PreSeason Hall of Fame Weekend" },
  { label: "PreSeason Week 1", value: "PreSeason Week 1" },
  { label: "PreSeason Week 2", value: "PreSeason Week 2" },
  { label: "PreSeason Week 3", value: "PreSeason Week 3" },
  { label: "Week 1", value: "Week 1" },
  { label: "Week 2", value: "Week 2" },
  { label: "Week 3", value: "Week 3" },
  { label: "Week 4", value: "Week 4" },
  { label: "Week 5", value: "Week 5" },
  { label: "Week 6", value: "Week 6" },
  { label: "Week 7", value: "Week 7" },
  { label: "Week 8", value: "Week 8" },
  { label: "Week 9", value: "Week 9" },
  { label: "Week 10", value: "Week 10" },
  { label: "Week 11", value: "Week 11" },
  { label: "Week 12", value: "Week 12" },
  { label: "Week 13", value: "Week 13" },
  { label: "Week 14", value: "Week 14" },
  { label: "Week 15", value: "Week 15" },
  { label: "Week 16", value: "Week 16" },
  { label: "Week 17", value: "Week 17" },
  { label: "Week 18", value: "Week 18" },
  { label: "Wild Card", value: "Wild Card" },
  { label: "Divisional Round", value: "Divisional Round" },
  { label: "Conference Championships", value: "Conference Championships" },
  { label: "Pro Bowl", value: "Pro Bowl" },
  { label: "Super Bowl", value: "Super Bowl" },
];
