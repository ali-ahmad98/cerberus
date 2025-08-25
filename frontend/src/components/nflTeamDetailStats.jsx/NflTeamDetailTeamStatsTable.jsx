import { useEffect, useState } from "react";
import { getNflTeamStatByTeamIdApi } from "../../service/thirdPartyDataService";
import ColorRingCustomLoader from "../common/ColorRingCustomLoader";

const NflTeamDetailTeamStatsTable = ({ teamId, yearNo, nflTeamDetails }) => {
  const [nflTeamStat, set_nflTeamStat] = useState({});
  const [isLoding, set_isLoding] = useState(true);

  useEffect(() => {
    set_isLoding(true);
    getNflTeamStatByTeamId();
  }, [teamId, yearNo]);

  async function getNflTeamStatByTeamId() {
    getNflTeamStatByTeamIdApi(teamId, yearNo).then(function (result) {
      const response_data = result.data.response_data;
      set_nflTeamStat(response_data);
      set_isLoding(false);
    });
  }

  return (
    <>
      <div className="pb-5 mb-5">
        <div className="bg-white px-4 py-4">
          <h3 className="font-28 fw-semibold mt-sm-4">Team Statistics</h3>

          <div className="detlTeamTable">
            {isLoding ? (
              <div>
                <ColorRingCustomLoader />
              </div>
            ) : (
              <>
                {nflTeamStat && nflTeamStat.length > 0 ? (
                  nflTeamStat.map((statItem, index) => (
                    <table key={index}>
                      <tr>
                        <th>SCORING</th>
                        <th>
                          {nflTeamDetails && (
                            <>
                              <img
                                className="nf"
                                src={nflTeamDetails.logo_standard}
                                alt="nf"
                                style={{ width: "40px" }}
                              />
                              &nbsp; {nflTeamDetails.team_name}
                            </>
                          )}
                        </th>
                        <th>OPPONENTS</th>
                      </tr>

                      <tbody>
                        <>
                          <>
                            <tr>
                              <td>
                                <strong>{statItem.stat_category}</strong>
                              </td>
                              <td colSpan={2}></td>
                            </tr>

                            {statItem.team.completion_pct && statItem.opponents.completion_pct && (
                              <tr>
                                <td>Completion pct</td>
                                <td>{statItem.team.completion_pct}</td>
                                <td>{statItem.opponents.completion_pct}</td>
                              </tr>
                            )}

                            {statItem.team.completions && statItem.opponents.completions && (
                              <tr>
                                <td>Completions</td>
                                <td>{statItem.team.completions}</td>
                                <td>{statItem.opponents.completions}</td>
                              </tr>
                            )}

                            {statItem.team.interceptions && statItem.opponents.interceptions && (
                              <tr>
                                <td>Interceptions</td>
                                <td>{statItem.team.interceptions}</td>
                                <td>{statItem.opponents.interceptions}</td>
                              </tr>
                            )}

                            {statItem.team.interceptions_pct &&
                              statItem.opponents.interceptions_pct && (
                                <tr>
                                  <td>Interceptions pct</td>
                                  <td>{statItem.team.interceptions_pct}</td>
                                  <td>{statItem.opponents.interceptions_pct}</td>
                                </tr>
                              )}

                            {statItem.team.longest_pass && statItem.opponents.longest_pass && (
                              <tr>
                                <td>Longest pass</td>
                                <td>{statItem.team.longest_pass}</td>
                                <td>{statItem.opponents.longest_pass}</td>
                              </tr>
                            )}

                            {statItem.team.passing_attempts &&
                              statItem.opponents.passing_attempts && (
                                <tr>
                                  <td>Passing attempts</td>
                                  <td>{statItem.team.passing_attempts}</td>
                                  <td>{statItem.opponents.passing_attempts}</td>
                                </tr>
                              )}

                            {statItem.team.passing_touchdowns &&
                              statItem.opponents.passing_touchdowns && (
                                <tr>
                                  <td>Passing touchdowns</td>
                                  <td>{statItem.team.passing_touchdowns}</td>
                                  <td>{statItem.opponents.passing_touchdowns}</td>
                                </tr>
                              )}

                            {statItem.team.passing_touchdowns_pct &&
                              statItem.opponents.passing_touchdowns_pct && (
                                <tr>
                                  <td>Passing touchdowns pct</td>
                                  <td>{statItem.team.passing_touchdowns_pct}</td>
                                  <td>{statItem.opponents.passing_touchdowns_pct}</td>
                                </tr>
                              )}

                            {statItem.team.quaterback_rating &&
                              statItem.opponents.quaterback_rating && (
                                <tr>
                                  <td>Quaterback rating</td>
                                  <td>{statItem.team.quaterback_rating}</td>
                                  <td>{statItem.opponents.quaterback_rating}</td>
                                </tr>
                              )}

                            {statItem.team.sacked_yards_lost &&
                              statItem.opponents.sacked_yards_lost && (
                                <tr>
                                  <td>Sacked yards lost</td>
                                  <td>{statItem.team.sacked_yards_lost}</td>
                                  <td>{statItem.opponents.sacked_yards_lost}</td>
                                </tr>
                              )}

                            {statItem.team.sacks && statItem.opponents.sacks && (
                              <tr>
                                <td>Sacks</td>
                                <td>{statItem.team.sacks}</td>
                                <td>{statItem.opponents.sacks}</td>
                              </tr>
                            )}

                            {statItem.team.yards && statItem.opponents.yards && (
                              <tr>
                                <td>Yards</td>
                                <td>{statItem.team.yards}</td>
                                <td>{statItem.opponents.yards}</td>
                              </tr>
                            )}

                            {statItem.team.yards_per_game && statItem.opponents.yards_per_game && (
                              <tr>
                                <td>Yards per game</td>
                                <td>{statItem.team.yards_per_game}</td>
                                <td>{statItem.opponents.yards_per_game}</td>
                              </tr>
                            )}

                            {statItem.team.yards_per_pass_avg &&
                              statItem.opponents.yards_per_pass_avg && (
                                <tr>
                                  <td>Yards per pass avg</td>
                                  <td>{statItem.team.yards_per_pass_avg}</td>
                                  <td>{statItem.opponents.yards_per_pass_avg}</td>
                                </tr>
                              )}

                            {/* // Rushing Data  */}

                            {statItem.team.fumbles && statItem.opponents.fumbles && (
                              <tr>
                                <td>Fumbles</td>
                                <td>{statItem.team.fumbles}</td>
                                <td>{statItem.opponents.fumbles}</td>
                              </tr>
                            )}

                            {statItem.team.fumbles_lost && statItem.opponents.fumbles_lost && (
                              <tr>
                                <td>Fumbles lost</td>
                                <td>{statItem.team.fumbles_lost}</td>
                                <td>{statItem.opponents.fumbles_lost}</td>
                              </tr>
                            )}

                            {statItem.team.longest_rush && statItem.opponents.longest_rush && (
                              <tr>
                                <td>Longest rush</td>
                                <td>{statItem.team.longest_rush}</td>
                                <td>{statItem.opponents.longest_rush}</td>
                              </tr>
                            )}

                            {statItem.team.over_20_yards && statItem.opponents.over_20_yards && (
                              <tr>
                                <td>Over 20 yards</td>
                                <td>{statItem.team.over_20_yards}</td>
                                <td>{statItem.opponents.over_20_yards}</td>
                              </tr>
                            )}

                            {statItem.team.rushing_attempts &&
                              statItem.opponents.rushing_attempts && (
                                <tr>
                                  <td>Rushing attempts</td>
                                  <td>{statItem.team.rushing_attempts}</td>
                                  <td>{statItem.opponents.rushing_attempts}</td>
                                </tr>
                              )}

                            {statItem.team.rushing_first_downs &&
                              statItem.opponents.rushing_first_downs && (
                                <tr>
                                  <td>Rushing first downs</td>
                                  <td>{statItem.team.rushing_first_downs}</td>
                                  <td>{statItem.opponents.rushing_first_downs}</td>
                                </tr>
                              )}

                            {statItem.team.rushing_touchdowns &&
                              statItem.opponents.rushing_touchdowns && (
                                <tr>
                                  <td>Rushing touchdowns</td>
                                  <td>{statItem.team.rushing_touchdowns}</td>
                                  <td>{statItem.opponents.rushing_touchdowns}</td>
                                </tr>
                              )}

                            {statItem.team.yards_per_rush_avg &&
                              statItem.opponents.yards_per_rush_avg && (
                                <tr>
                                  <td>Yards per rush avg</td>
                                  <td>{statItem.team.yards_per_rush_avg}</td>
                                  <td>{statItem.opponents.yards_per_rush_avg}</td>
                                </tr>
                              )}

                            {/* //================= Downs Data  =================*/}
                            {statItem.team.passing_first_downs &&
                              statItem.opponents.passing_first_downs && (
                                <tr>
                                  <td>Passing first downs</td>
                                  <td>{statItem.team.passing_first_downs}</td>
                                  <td>{statItem.opponents.passing_first_downs}</td>
                                </tr>
                              )}
                            {statItem.team.penalty_first_downs &&
                              statItem.opponents.penalty_first_downs && (
                                <tr>
                                  <td>Penalty first downs</td>
                                  <td>{statItem.team.penalty_first_downs}</td>
                                  <td>{statItem.opponents.penalty_first_downs}</td>
                                </tr>
                              )}
                            {statItem.team.total_first_downs &&
                              statItem.opponents.total_first_downs && (
                                <tr>
                                  <td>Total first downs</td>
                                  <td>{statItem.team.total_first_downs}</td>
                                  <td>{statItem.opponents.total_first_downs}</td>
                                </tr>
                              )}
                            {statItem.team.third_downs_attempts &&
                              statItem.opponents.third_downs_attempts && (
                                <tr>
                                  <td>Third downs attempts</td>
                                  <td>{statItem.team.third_downs_attempts}</td>
                                  <td>{statItem.opponents.third_downs_attempts}</td>
                                </tr>
                              )}
                            {statItem.team.third_downs_conversions &&
                              statItem.opponents.third_downs_conversions && (
                                <tr>
                                  <td>Third downs conversions</td>
                                  <td>{statItem.team.third_downs_conversions}</td>
                                  <td>{statItem.opponents.third_downs_conversions}</td>
                                </tr>
                              )}
                            {statItem.team.third_downs_pct &&
                              statItem.opponents.third_downs_pct && (
                                <tr>
                                  <td>Third downs pct</td>
                                  <td>{statItem.team.third_downs_pct}</td>
                                  <td>{statItem.opponents.third_downs_pct}</td>
                                </tr>
                              )}
                            {statItem.team.fourth_downs_attempts &&
                              statItem.opponents.fourth_downs_attempts && (
                                <tr>
                                  <td>Fourth downs attempts</td>
                                  <td>{statItem.team.fourth_downs_attempts}</td>
                                  <td>{statItem.opponents.fourth_downs_attempts}</td>
                                </tr>
                              )}
                            {statItem.team.fourth_downs_conversions &&
                              statItem.opponents.fourth_downs_conversions && (
                                <tr>
                                  <td>Fourth downs conversions</td>
                                  <td>{statItem.team.fourth_downs_conversions}</td>
                                  <td>{statItem.opponents.fourth_downs_conversions}</td>
                                </tr>
                              )}
                            {statItem.team.fourth_downs_pct &&
                              statItem.opponents.fourth_downs_pct && (
                                <tr>
                                  <td>Fourth downs pct</td>
                                  <td>{statItem.team.fourth_downs_pct}</td>
                                  <td>{statItem.opponents.fourth_downs_pct}</td>
                                </tr>
                              )}

                            {statItem.team.penalties && statItem.opponents.penalties && (
                              <tr>
                                <td>Penalties</td>
                                <td>{statItem.team.penalties}</td>
                                <td>{statItem.opponents.penalties}</td>
                              </tr>
                            )}
                            {statItem.team.penalties_yards &&
                              statItem.opponents.penalties_yards && (
                                <tr>
                                  <td>Penalties yards</td>
                                  <td>{statItem.team.penalties_yards}</td>
                                  <td>{statItem.opponents.penalties_yards}</td>
                                </tr>
                              )}

                            {/* //================= Returning Data  =================*/}

                            {statItem.team.fair_catches && statItem.opponents.fair_catches && (
                              <tr>
                                <td>Fair catches</td>
                                <td>{statItem.team.fair_catches}</td>
                                <td>{statItem.opponents.fair_catches}</td>
                              </tr>
                            )}

                            {statItem.team.kickoff_return_touchdows &&
                              statItem.opponents.kickoff_return_touchdows && (
                                <tr>
                                  <td>Kickoff return touchdows</td>
                                  <td>{statItem.team.kickoff_return_touchdows}</td>
                                  <td>{statItem.opponents.kickoff_return_touchdows}</td>
                                </tr>
                              )}

                            {statItem.team.kickoff_return_yards &&
                              statItem.opponents.kickoff_return_yards && (
                                <tr>
                                  <td>Kickoff return yards</td>
                                  <td>{statItem.team.kickoff_return_yards}</td>
                                  <td>{statItem.opponents.kickoff_return_yards}</td>
                                </tr>
                              )}

                            {statItem.team.kickoff_returned_attempts &&
                              statItem.opponents.kickoff_returned_attempts && (
                                <tr>
                                  <td>Kickoff returned attempts</td>
                                  <td>{statItem.team.kickoff_returned_attempts}</td>
                                  <td>{statItem.opponents.kickoff_returned_attempts}</td>
                                </tr>
                              )}

                            {statItem.team.longes_kickoff_return &&
                              statItem.opponents.longes_kickoff_return && (
                                <tr>
                                  <td>Longes kickoff return</td>
                                  <td>{statItem.team.longes_kickoff_return}</td>
                                  <td>{statItem.opponents.longes_kickoff_return}</td>
                                </tr>
                              )}

                            {statItem.team.longest_punt_return &&
                              statItem.opponents.longest_punt_return && (
                                <tr>
                                  <td>Longest punt return</td>
                                  <td>{statItem.team.longest_punt_return}</td>
                                  <td>{statItem.opponents.longest_punt_return}</td>
                                </tr>
                              )}
                            {statItem.team.punt_return_touchdowns &&
                              statItem.opponents.punt_return_touchdowns && (
                                <tr>
                                  <td>Punt return touchdowns</td>
                                  <td>{statItem.team.punt_return_touchdowns}</td>
                                  <td>{statItem.opponents.punt_return_touchdowns}</td>
                                </tr>
                              )}

                            {statItem.team.punts_returned && statItem.opponents.punts_returned && (
                              <tr>
                                <td>Punts returned</td>
                                <td>{statItem.team.punts_returned}</td>
                                <td>{statItem.opponents.punts_returned}</td>
                              </tr>
                            )}

                            {statItem.team.yards_per_kickoff_avg &&
                              statItem.opponents.yards_per_kickoff_avg && (
                                <tr>
                                  <td>Yards per kickoff avg</td>
                                  <td>{statItem.team.yards_per_kickoff_avg}</td>
                                  <td>{statItem.opponents.yards_per_kickoff_avg}</td>
                                </tr>
                              )}

                            {statItem.team.yards_per_punt_avg &&
                              statItem.opponents.yards_per_punt_avg && (
                                <tr>
                                  <td>Yards per punt avg</td>
                                  <td>{statItem.team.yards_per_punt_avg}</td>
                                  <td>{statItem.opponents.yards_per_punt_avg}</td>
                                </tr>
                              )}

                            {statItem.team.yards_returned_on_punts &&
                              statItem.opponents.yards_returned_on_punts && (
                                <tr>
                                  <td>Yards returned on punts</td>
                                  <td>{statItem.team.yards_returned_on_punts}</td>
                                  <td>{statItem.opponents.yards_returned_on_punts}</td>
                                </tr>
                              )}

                            {/* //================= Kicking Data  =================*/}
                            {statItem.team.field_goals_attempts &&
                              statItem.opponents.field_goals_attempts && (
                                <tr>
                                  <td>Field goals attempts</td>
                                  <td>{statItem.team.field_goals_attempts}</td>
                                  <td>{statItem.opponents.field_goals_attempts}</td>
                                </tr>
                              )}
                            {statItem.team.field_goals_made &&
                              statItem.opponents.field_goals_made && (
                                <tr>
                                  <td>Field goals made</td>
                                  <td>{statItem.team.field_goals_made}</td>
                                  <td>{statItem.opponents.field_goals_made}</td>
                                </tr>
                              )}
                          </>
                        </>
                      </tbody>
                    </table>
                  ))
                ) : (
                  <div className="noData">
                    <p>No Data Found!</p>
                  </div>
                )}
              </>
            )}
          </div>

          <p className="nflasttxt">Statistics are updated nightly</p>
        </div>
      </div>
    </>
  );
};

export default NflTeamDetailTeamStatsTable;
