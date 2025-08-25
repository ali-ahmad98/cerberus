import { useState, useEffect } from "react";
import { gameLogDataFirst, gameLogDataSecond } from "./Helper";
import { getNflPlayerGameLogApi } from "../../service/thirdPartyDataService";
import { showDate } from "../../service/GeneralFn";
import { useLocation, useNavigate } from "react-router-dom";
import ColorRingCustomLoader from "../common/ColorRingCustomLoader";

const GameLogTable = ({ playerId, playerDetails }) => {
  const location = useLocation();

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [gameLogData, set_gameLogData] = useState({});
  const [isLoader, set_isLoader] = useState(true);
  const [yearNo, set_yearNo] = useState(
    queryParams.get("year") == null ? 2023 : queryParams.get("year")
  );

  useEffect(() => {
    async function getNflPlayerGameLog() {
      getNflPlayerGameLogApi(playerId, yearNo).then(function (result) {
        const response_data = result.data.response_data;
        set_gameLogData(response_data);
        set_isLoader(false);
      });
    }
    getNflPlayerGameLog();
  }, [playerId, yearNo]);

  const currentYear = new Date().getFullYear();
  let yearDropdown = [];
  for (let i = currentYear; i > currentYear - 2; i--) {
    yearDropdown.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  const onChageDropdown = () => {
    var yearSelect = document.getElementById("yearDropdown").value;
    navigate(`/nfl/player-profile/${playerId}?year=${yearSelect}`);
    set_yearNo(yearSelect);
  };

  const cmpPercentage = (fractionString) => {
    if (fractionString && fractionString != "") {
      const [numerator, denominator] = fractionString.split("/");
      const fraction = parseFloat(numerator) / parseFloat(denominator);
      const percentage = fraction * 100;
      return `${percentage.toFixed(2)}`;
    } else {
      return `--`;
    }
  };

  return (
    <>
      <section className="py-5">
        <div className="container my-5 py-5 gamelog-table">
          <div className="row align-items-lg-end">
            <div className="col-lg-4">
              <div className="gameblog-headings">
                <h5 className="font-22 white p-3 ms-4 ps-4 mb-0 text-uppercase fw-semibold">
                  Game Log
                </h5>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="d-flex justify-content-end mt-2 mt-lg-0 mb-2">
                <select
                  className="form-select form-select-sm ms-3 ps-4 py-4 font-16 gamelog-select"
                  aria-label=".form-select-sm example"
                  onChange={onChageDropdown}
                  id="yearDropdown"
                  value={yearNo}
                >
                  {yearDropdown}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      {gameLogDataFirst.map((val, index) => {
                        return (
                          <th
                            className={`${
                              index === 0
                                ? "font-16 fw-semibold text-nowrap"
                                : index === 1
                                ? "font-16 fw-semibold text-nowrap"
                                : "font-16 fw-semibold border-1-black text-center  text-nowrap"
                            }`}
                            scope="col"
                            colSpan={
                              index === 0 ? "7" : index === 1 ? "6" : index === 2 ? "5" : null
                            }
                            key={index}
                          >
                            {index === 0 && yearNo}
                            {val.name}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <thead>
                    <tr className="tablehead-tr">
                      {gameLogDataSecond.map((val, index) => {
                        return (
                          <th
                            className={`${
                              index === 0
                                ? "font-16 fw-semibold ps-4"
                                : index === 1
                                ? "font-16 fw-semibold px-3"
                                : index === 12
                                ? "font-16 fw-semibold px-4 tr-border-left"
                                : ""
                            } font-16 fw-semibold px-3`}
                            scope="col"
                            colSpan={
                              index === 0 ? "1" : index === 1 ? "1" : index === 2 ? "2" : null
                            }
                            key={index}
                          >
                            {val.name}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {isLoader ? (
                      <tr>
                        <td colSpan={20}>
                          <ColorRingCustomLoader isLoader={isLoader} />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {gameLogData &&
                          gameLogData.length > 0 &&
                          gameLogData.map((val, index) => {
                            return (
                              <tr key={index} className="gamelog-tr">
                                <td className="font-16 fw-light color-grey">
                                  {showDate(val.matchDate, "MM-dd")}
                                </td>
                                <td className="font-18 fw-light color-grey">
                                  vs
                                  {playerDetails.team_id == val.awayTeamDetails.team_id ? (
                                    <>
                                      <span className="mx-3">
                                        <img
                                          src={val.homeTeamDetails.logo_standard}
                                          alt={val.homeTeamDetails.team_code}
                                          width={"30px"}
                                        />
                                        <span className="blue">
                                          {val.homeTeamDetails.team_code}{" "}
                                        </span>
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="mx-3">
                                        <img
                                          src={val.awayTeamDetails.logo_standard}
                                          alt={val.awayTeamDetails.team_code}
                                          width={"30px"}
                                        />
                                        <span className="blue">
                                          {" "}
                                          {val.awayTeamDetails.team_code}{" "}
                                        </span>
                                      </span>
                                    </>
                                  )}
                                </td>
                                <td className="font-16 fw-light blue" colSpan="2">
                                  {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                  {playerDetails.team_id == val.awayTeamDetails.team_id ? (
                                    <>
                                      <span
                                        className={`color-red pe-2 ${
                                          val.awayTeamScore > val.homeTeamScore ? "color-green" : ""
                                        }`}
                                      >
                                        {val.awayTeamScore > val.homeTeamScore ? "W" : "L"}
                                      </span>
                                      {val.awayTeamScore}-{val.homeTeamScore}
                                    </>
                                  ) : (
                                    <>
                                      <span
                                        className={`color-red pe-2 ${
                                          val.awayTeamScore < val.homeTeamScore ? "color-green" : ""
                                        }`}
                                      >
                                        {val.awayTeamScore < val.homeTeamScore ? "W" : "L"}
                                      </span>
                                      {val.homeTeamScore}-{val.awayTeamScore}
                                    </>
                                  )}
                                </td>

                                {playerDetails.team_id == val.awayTeamDetails.team_id ? (
                                  <>
                                    <td className="font-16 fw-light color-grey">
                                      {val.passing.awayteam.player.length > 1
                                        ? val.passing.awayteam.player[0].comp_att
                                        : val.passing.awayteam.player.comp_att}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.awayteam.player.length > 1
                                        ? val.passing.awayteam.player[0].yards
                                        : val.passing.awayteam.player.yards}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.awayteam.player.length > 1
                                        ? cmpPercentage(val.passing.awayteam.player[0].comp_att)
                                        : cmpPercentage(val.passing.awayteam.player.comp_att)}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.awayteam.player.length > 1
                                        ? val.passing.awayteam.player[0].average
                                        : val.passing.awayteam.player.average}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.awayteam.player.length > 1
                                        ? val.passing.awayteam.player[0].passing_touch_downs
                                        : val.passing.awayteam.player.passing_touch_downs}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.awayteam.player.length > 1
                                        ? val.passing.awayteam.player[0].interceptions
                                        : val.passing.awayteam.player.interceptions}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.awayteam.player.length > 1
                                        ? val.passing.awayteam.player[0].sacks
                                        : val.passing.awayteam.player.sacks}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.awayteam.player.length > 1
                                        ? val.passing.awayteam.player[0].rating
                                        : val.passing.awayteam.player.rating}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.awayteam.player.length > 1
                                        ? val.passing.awayteam.player[0].rating
                                        : val.passing.awayteam.player.rating}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="font-16 fw-light color-grey">
                                      {val.passing.hometeam.player.length > 1
                                        ? val.passing.hometeam.player[0].comp_att
                                        : val.passing.hometeam.player.comp_att}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.hometeam.player.length > 1
                                        ? val.passing.hometeam.player[0].yards
                                        : val.passing.hometeam.player.yards}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.hometeam.player.length > 1
                                        ? cmpPercentage(val.passing.hometeam.player[0].comp_att)
                                        : cmpPercentage(val.passing.hometeam.player.comp_att)}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.hometeam.player.length > 1
                                        ? val.passing.hometeam.player[0].average
                                        : val.passing.hometeam.player.average}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.hometeam.player.length > 1
                                        ? val.passing.hometeam.player[0].passing_touch_downs
                                        : val.passing.hometeam.player.passing_touch_downs}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.hometeam.player.length > 1
                                        ? val.passing.hometeam.player[0].interceptions
                                        : val.passing.hometeam.player.interceptions}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.hometeam.player.length > 1
                                        ? val.passing.hometeam.player[0].sacks
                                        : val.passing.hometeam.player.sacks}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.hometeam.player.length > 1
                                        ? val.passing.hometeam.player[0].rating
                                        : val.passing.hometeam.player.rating}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.passing.hometeam.player.length > 1
                                        ? val.passing.hometeam.player[0].rating
                                        : val.passing.hometeam.player.rating}
                                    </td>
                                  </>
                                )}

                                {val.rushing1 ? (
                                  <>
                                    <td className="font-16 fw-light p-0 color-grey tr-border-left">
                                      {val.rushing1.total_rushes}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.rushing1.yards}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.rushing1.average}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.rushing1.rushing_touch_downs}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey ps-4 pe-5">
                                      {val.rushing1.longest_rush}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="font-16 fw-light p-0 color-grey tr-border-left">
                                      {val.rushing2.total_rushes}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.rushing2.yards}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.rushing2.average}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey">
                                      {val.rushing2.rushing_touch_downs}
                                    </td>
                                    <td className="font-16 fw-light p-0 color-grey ps-4 pe-5">
                                      {val.rushing2.longest_rush}
                                    </td>
                                  </>
                                )}
                              </tr>
                            );
                          })}

                        {gameLogData && gameLogData.length == 0 && (
                          <tr>
                            <td colSpan={20}>
                              <div className="noData">
                                <p>No Data Found!</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GameLogTable;
