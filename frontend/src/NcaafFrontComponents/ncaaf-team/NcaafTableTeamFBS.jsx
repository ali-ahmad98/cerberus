import { Link } from "react-router-dom";
import noTeamImg from "../../Assets/images/noImg.jpg";

const NcaafTableTeamFBS = ({ ncaaTeamListData }) => {
  var ncaaTeamListDataSort = Object.entries(ncaaTeamListData).sort();

  var arrLeft = [];
  var arrRight = [];

  ncaaTeamListDataSort.forEach((element) => {
    if (
      element[0] == "American Athletic" ||
      element[0] == "Atlantic Coast" ||
      element[0] == "Big 12" ||
      element[0] == "Big Ten" ||
      element[0] == "Conference USA" ||
      element[0] == "FBS Independents"
    ) {
      arrLeft.push(element);
    } else {
      arrRight.push(element);
    }
  });

  return (
    <div className="container">
      <div className="row flex-lg-row">
        <div className="col-lg-6 pe-lg-4">
          {arrLeft.map((objL, indexL) => (
            <div key={`arrLeft${indexL}`} className="col-lg-12 pe-lg-12">
              <button
                className={`  text-white btn ms-4 mt-5 text-start  py-3 font-22 fw-semibold transform-skew-10 px-5 text-uppercase ${
                  indexL % 2 == 0 ? "bg-light-blue" : "bg-dark-blue"
                }`}
              >
                <span className="transform-skew-10-revrse d-inline-block py-1 px-sm-3">
                  {objL[0]}
                </span>
              </button>
              {Object.entries(objL[1]).map((objD, indexD) => (
                <div
                  key={indexD}
                  className={`table-responsive ps-4 mb-0 ${
                    indexD % 2 == 0 ? "pt-2" : "team-content-custom-mt"
                  }`}
                >
                  <table className="table bg-white mb-0">
                    <thead>
                      <tr>
                        <th
                          colSpan="10"
                          className={`font-16  text-uppercase border-0 px-0 pb-4 ${
                            indexD % 2 == 0 ? "pt-0" : "pt-4"
                          }`}
                        >
                          <div className="border-bottom-1px border-top-custom">
                            <button className=" ncaaf_btn_team ps-5 d-block fw-bold  text-light-black fw-medium">
                              <span className="d-inline-block position-relative z-1">
                                {objD[0]}
                              </span>
                            </button>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-0">
                      {objD[1].map((item, index) => (
                        <tr key={index} className="border-0 ">
                          <td className=" font-16 fw-normal d-flex align-items-center text-start ps-3 py-2 border-0">
                            <div className="teamsImgs">
                              <span className="d-inline-block ms-negative-12 ">
                                <img
                                  className="table-img-team"
                                  src={item.logo_standard ? item.logo_standard : noTeamImg}
                                  alt={item.team_name}
                                />
                              </span>
                            </div>
                            <div className="ps-2">
                              <span className="font-18 fw-light "> {item.team_name} </span>

                              <span className="d-block font-13 fw-normal text-blue pt-1">
                                <Link to={`/ncaaf/team-details/stats?team=${item.team_id}`}>
                                  Stats
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/ncaaf/team-details/schedule?team=${item.team_id}`}>
                                  Schedule
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/ncaaf/team-details/roster?team=${item.team_id}`}>
                                  Roster
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

        <div className="col-lg-6 pe-lg-4">
          {arrRight.map((objL, indexL) => (
            <div key={`arrRight${indexL}`} className="col-lg-12 pe-lg-12">
              <button
                className={`  text-white btn ms-4 mt-5 text-start  py-3 font-22 fw-semibold transform-skew-10 px-5 text-uppercase ${
                  indexL % 2 == 0 ? "bg-light-blue" : "bg-dark-blue"
                }`}
              >
                <span className="transform-skew-10-revrse d-inline-block py-1 px-sm-3">
                  {objL[0]}
                </span>
              </button>
              {Object.entries(objL[1]).map((objD, indexD) => (
                <div
                  key={indexD}
                  className={`table-responsive ps-4 mb-0 ${
                    indexD % 2 == 0 ? "pt-2" : "team-content-custom-mt"
                  }`}
                >
                  <table className="table bg-white mb-0">
                    <thead>
                      <tr>
                        <th
                          colSpan="10"
                          className={`font-16  text-uppercase border-0 px-0 pb-4 ${
                            indexD % 2 == 0 ? "pt-0" : "pt-4"
                          }`}
                        >
                          <div className="border-bottom-1px border-top-custom">
                            <button className=" ncaaf_btn_team ps-5 d-block fw-bold  text-light-black fw-medium">
                              <span className="d-inline-block position-relative z-1">
                                {" "}
                                {objD[0]}{" "}
                              </span>
                            </button>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-0">
                      {objD[1].map((item, index) => (
                        <tr key={index} className="border-0 ">
                          <td className=" font-16 fw-normal d-flex align-items-center text-start ps-3 py-2 border-0">
                            <div className="teamsImgs">
                              <span className="d-inline-block ms-negative-12 ">
                                <img
                                  className="table-img-team"
                                  src={item.logo_standard ? item.logo_standard : noTeamImg}
                                  alt={item.team_name}
                                />
                              </span>
                            </div>
                            <div className="ps-2">
                              <span className="font-18 fw-light "> {item.team_name} </span>

                              <span className="d-block font-13 fw-normal text-blue pt-1">
                                <Link to={`/ncaaf/team-details/stats?team=${item.team_id}`}>
                                  Stats
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/ncaaf/team-details/schedule?team=${item.team_id}`}>
                                  Schedule
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/ncaaf/team-details/roster?team=${item.team_id}`}>
                                  Roster
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
      </div>
      <div className="py-5 my-sm-5 my-4"></div>
    </div>
  );
};

export default NcaafTableTeamFBS;
