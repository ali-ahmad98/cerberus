export function getNcaaPlayerLink(playerRow = {}) {
  var returnLink = "#";
  if (playerRow && playerRow.player_id && playerRow.player_id != "") {
    returnLink = `/ncaaf/player-profile/${playerRow.player_id}`;
  }
  return returnLink;
}

export const ncaaWeekDropdownList = [
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
  { label: "Week Bowls", value: "Week Bowls" },
];
