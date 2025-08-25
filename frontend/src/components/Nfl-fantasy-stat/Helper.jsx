import webApi from "../../WebApi/WebApi";

export const getAllNflFantasylist = async (
  year,
  week,
  team,
  pos,
  score_type,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post(`/getFantasyScoreRecent`, {
      season: year ? Number(year) : "",
      week: week ? week : "",
      team_id: Number(team) ? Number(team) : "",
      player_position: pos ? pos : "",
      score_type: score_type,
      page: "NFL",
      limit: 50,
    });
    if (res.status === 200) {
      const r = res.data;
      return onSuccess(r);
    } else {
      onFailure?.("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure?.("Something Wrong! Please Try again later" + error);
  }
};

export const getAllNcaafFantasylist = async (
  year,
  week,
  team,
  pos,
  score_type,
  onSuccess,
  onFailure
) => {
  try {
    const res = await webApi.post(`/getFantasyScoreRecent`, {
      season: year ? Number(year) : "",
      week: week ? week : "",
      team_id: Number(team) ? Number(team) : "",
      player_position: pos ? pos : "",
      score_type: score_type,
      page: "NCAAF",
      limit: 50,
    });
    if (res.status === 200) {
      const r = res.data;
      return onSuccess(r);
    } else {
      onFailure?.("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure?.("Something Wrong! Please Try again later" + error);
  }
};
