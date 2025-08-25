import cody from "../../Assets/cody.png";
import { ordinal_suffix_of } from "../../service/GeneralFn";

export const ncaafInjuriesTable = [
  {
    billsTable: [
      {
        description: "",
        codeImg: cody,
        title: " Cody Ford",
        subtitle: "Out",
        semititle: "OT",
      },
      {
        description: "",
        codeImg: cody,
        title: " Micah Hyde ",
        subtitle: "Out",
        semititle: "S",
      },
      {
        description: "",
        codeImg: cody,
        title: " Vernon Butler ",
        subtitle: "Out",
        semititle: "DT",
      },
    ],
  },
  {
    billsTable: [
      {
        description: "",
        codeImg: cody,
        title: " Josh Norman ",
        subtitle: "Out",
        semititle: "CB",
      },
      {
        description:
          "Jones (hamstring) is out for the remainder of Sunday's matchup against the Patriots.",
        codeImg: cody,
        title: " Taiwan Jones ",
        subtitle: "Questionable",
        semititle: "RB",
      },
      {
        description:
          "Morse won't return to Sunday's game against the Patriots due to  a concussion.",
        codeImg: cody,
        title: " Mitch Morse",
        subtitle: "Questionable",
        semititle: "C",
      },
    ],
  },
];

export const getNcaafTeamPosition = (teamDetails) => {
  if (teamDetails && teamDetails.team_position != undefined) {
    return ordinal_suffix_of(teamDetails.team_position) + " IN " + teamDetails.team_league;
  } else {
    return "";
  }
};

export const getNcaafTeamListDropdown = (ncaafTeamList) => {
  var optionList = "";
  if (ncaafTeamList && ncaafTeamList.length > 0) {
    optionList = ncaafTeamList.map(
      (leagueItem) =>
        leagueItem.division &&
        leagueItem.division.length > 0 &&
        leagueItem.division.map((divisionItem, index) => (
          <>
            <option value={0} key={`disabledOption${index}`} disabled>
              {" "}
              {leagueItem._id.team_leag} - {divisionItem.division_name}
            </option>
            {divisionItem.teams &&
              divisionItem.teams.length > 0 &&
              divisionItem.teams.map((teamItem, i) => (
                <option value={teamItem.team_id} key={`nflOption${i}`}>
                  {teamItem.team_name}
                </option>
              ))}
          </>
        ))
    );
    return optionList;
  }
};
