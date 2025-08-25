import { useEffect, useState } from "react";
import { nflTeamListDivisionGroupApi } from "../../service/thirdPartyDataService";
import noTeamImg from "../../Assets/no_team.png";
import { Link } from "react-router-dom";
import ColorRingCustomLoader from "../common/ColorRingCustomLoader";

const NflTeamTable = () => {
  const [nflTeamListData, set_nflTeamListData] = useState({});
  const [isLoader, set_isLoader] = useState(true);

  useEffect(() => {
    async function getNflTeamDataList() {
      nflTeamListDivisionGroupApi().then(function (result) {
        const response = result.data;
        set_nflTeamListData(response.response_data);
        set_isLoader(false);
      });
    }
    getNflTeamDataList();
  }, []);

  return (
    <div className="container">
      {isLoader ? (
        <ColorRingCustomLoader isLoader={isLoader} />
      ) : (
        <div className="row flex-lg-row">
          {Object.entries(nflTeamListData).map((objL, keyL) => (
            <div key={keyL} className="col-lg-6 pe-lg-4">
              <button
                className={`text-white btn ms-4 mt-5 text-start py-3 font-22 fw-semibold transform-skew-10 px-5 text-uppercase ${
                  keyL === 0 ? "bg-light-blue" : "bg-dark-blue"
                }`}
              >
                <span className="transform-skew-10-revrse d-inline-block py-1 px-sm-3">
                  {objL[0] == "AFC"
                    ? "AMERICAN Football Conference"
                    : "National Football Conference"}
                </span>
              </button>
              {Object.entries(objL[1]).map((objD, keyD) => (
                <div key={"parent" + keyD} className="table-responsive ps-4 mb-0">
                  <table className="table bg-white mb-0">
                    <thead>
                      <tr>
                        <th
                          colSpan="10"
                          className={`font-16  text-uppercase border-0 px-0  pb-4 ${
                            keyD === 0 ? "pt-0" : "pt-4"
                          }`}
                        >
                          <span className=" ps-5 d-block border-bottom-1px border-top-custom py-4 text-light-black fw-medium">
                            {objL[0]} {objD[0]}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-0">
                      {objD[1].map((item, index) => (
                        <tr key={"child" + index} className="border-0">
                          <td className=" font-16 fw-normal d-flex align-items-center text-start ps-0 py-1 border-0 pb-5">
                            <div className="teamsImgs">
                              <span className="d-inline-block">
                                <img
                                  className="table-img-team"
                                  src={item.logo_standard == "" ? noTeamImg : item.logo_standard}
                                  alt={item.team_code}
                                />
                              </span>
                            </div>

                            <div className="ps-2">
                              <span className="font-18 fw-light ">{item.team_name} </span>
                              <span className="d-block font-13 fw-normal text-blue pt-1">
                                <Link to={`/nfl/team-details/stats?team=${item.team_id}`}>
                                  Stats
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/nfl/team-details/schedule?team=${item.team_id}`}>
                                  Schedule
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/nfl/team-details/roster?team=${item.team_id}`}>
                                  Roster
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/nfl/team-details/depth-chart?team=${item.team_id}`}>
                                  Depth Chart
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/nfl/team-details/injuries?team=${item.team_id}`}>
                                  Injuries
                                </Link>
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="py-5 my-sm-5 my-4"></div>
    </div>
  );
};

export default NflTeamTable;
