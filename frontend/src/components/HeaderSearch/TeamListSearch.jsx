import { Link } from "react-router-dom";
import GlobalConfig from "../../GlobalConfig";

const TeamListSearch = ({ teamList }) => {
  return (
    <>
      {teamList &&
        teamList.nflTeamList &&
        teamList.ncaaTeamList &&
        parseInt(teamList.nflTeamList.length) + parseInt(teamList.ncaaTeamList.length) > 0 && (
          <div className="tls innerMainbg">
            <div className="container customContainer">
              <div className="row">
                <h3>Team List</h3>

                {teamList.nflTeamList &&
                  teamList.nflTeamList.map((element, index) => (
                    <div className="col-lg-2" key={`nflTeamS${index}`}>
                      <div className="cardInn">
                        <img src={element.logo_standard} alt={element.team_code} />
                        <p className="">{element.team_name}</p>
                        <div>
                          <Link
                            to={`/nfl/team-details/stats?team=${element.team_id}`}
                            target="_blank"
                          >
                            Stats
                          </Link>
                          &nbsp;|{" "}
                          <Link
                            to={`/nfl/team-details/schedule?team=${element.team_id}`}
                            target="_blank"
                          >
                            Schedule
                          </Link>
                          &nbsp;|{" "}
                          <Link
                            to={`/nfl/team-details/roster?team=${element.team_id}`}
                            target="_blank"
                          >
                            Roster
                          </Link>
                          &nbsp;|{" "}
                          <Link
                            to={`/nfl/team-details/depth-chart?team=${element.team_id}`}
                            target="_blank"
                          >
                            Depth Chart
                          </Link>
                          &nbsp;|{" "}
                          <Link
                            to={`/nfl/team-details/injuries?team=${element.team_id}`}
                            target="_blank"
                          >
                            Injuries
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}

                {teamList.ncaaTeamList &&
                  teamList.ncaaTeamList.map((element, index) => (
                    <div className="col-lg-2" key={`ncaaTeamS${index}`}>
                      <div className="cardInn">
                        <img
                          src={GlobalConfig.API_URL + "../../uploads/" + element.logo_standard}
                          alt={element.team_name}
                        />
                        <p className="">{element.team_name}</p>
                        <div>
                          <Link
                            to={`/ncaaf/team-details/stats?team=${element.team_id}`}
                            target="_blank"
                          >
                            Stats
                          </Link>
                          &nbsp;|{" "}
                          <Link
                            to={`/ncaaf/team-details/schedule?team=${element.team_id}`}
                            target="_blank"
                          >
                            Schedule
                          </Link>
                          &nbsp;|{" "}
                          <Link
                            to={`/ncaaf/team-details/roster?team=${element.team_id}`}
                            target="_blank"
                          >
                            Roster
                          </Link>
                          {/* &nbsp;| <Link to={`/ncaaf/team-details/depth-chart?team=${element.team_id}`} target="_blank">Depth Chart</Link> */}
                          {/* &nbsp;| <Link to={`/ncaaf/team-details/injuries?team=${element.team_id}`}>Injuries</Link> */}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default TeamListSearch;
