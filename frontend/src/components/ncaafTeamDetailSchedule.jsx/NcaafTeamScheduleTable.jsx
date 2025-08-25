import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllNcaafSchedulelistById } from "../../NcaafFrontComponents/NcaafFrontSchedule/Helper";
import { format } from "date-fns";
import { getNcaaTeamDetailsApi, getNcaaTeamListApi } from "../../service/NcaaService";
import { ordinal_suffix_of } from "../../service/GeneralFn";
import noTeamImg from "../../Assets/images/noImg.jpg";
import NcaaFollowBtn from "../NCAA/NcaaFollowBtn";
import ColorRingCustomLoader from "../common/ColorRingCustomLoader";

const NcaafTeamScheduleTable = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [teamId, set_teamId] = useState(queryParams.get("team"));
  const [allNflList, setAllNflList] = useState([]);
  const [teamDetails, set_teamDetails] = useState({});
  const [ncaaTeamList, set_ncaaTeamList] = useState({});
  const [loader, setAllLoader] = useState(false);

  let yearDropdown = [];
  for (let i = currentYear + 1; i >= currentYear; i--) {
    yearDropdown.push(
      <option selected value={i} key={i}>
        {i}
      </option>
    );
  }

  useEffect(() => set_teamId(queryParams.get("team")), []);

  useEffect(() => {
    async function getNcaaTeamList() {
      getNcaaTeamListApi().then(function (result) {
        const response = result.data;
        set_ncaaTeamList(response.response_data);
      });
    }
    getNcaaTeamList();
  }, []);

  useEffect(() => {
    async function getNcaaTeamDetails() {
      getNcaaTeamDetailsApi(teamId).then(function (result) {
        const response = result.data;
        set_teamDetails(response.response_data);
      });
    }
    getNcaaTeamDetails();
  }, [teamId]);

  useEffect(() => {
    const asyncFunc = async () => {
      setAllLoader(true);
      getAllNcaafSchedulelistById(currentYear, teamId, (r) => {
        if (r) {
          setAllLoader(false);
          setAllNflList(r);
        }
      });
    };
    asyncFunc();
  }, []);

  const onChageDropdown = () => {
    var team = document.getElementById("teamDropdown").value;
    var year = document.getElementById("yearDropdown").value;
    navigate(`/ncaaf/team-details/schedule?team=${team}&year=${year}`);
    set_teamId(team);
    setAllLoader(true);

    getAllNcaafSchedulelistById(year, team, (r) => {
      setAllLoader(false);
      setAllNflList(r);
    });
  };

  return (
    <div className="container mb-5 mt_minus pb-sm-5">
      <div className="mb-xl-5 pb-xl-5">
        <div className="row justify-content-end pb-xxl-3 mb-4">
          <div className="col-12 text-end mb-3">
            <div className="d-flex flex-column align-items-center justify-content-center pb-4 pb-sm-0">
              <div className="pt-5 custom-mb-minus">
                <span>
                  <img
                    className="nflLogoImg"
                    style={{ width: "120px" }}
                    src={teamDetails.logo_standard}
                    alt="ncaafLogoImg"
                  />
                </span>
              </div>
              <h1 className="font-42 white fw-bold text-uppercase mt-2">
                {teamDetails.team_name != "" ? teamDetails.team_name : "Loading..."}
              </h1>
            </div>
            <h3 className="font-20 white me-3 pe-xl-2 text-start text-md-end mb-0 ">
              <span className="fw-bold">{teamDetails && teamDetails.team_name}</span>
            </h3>
            <div className="d-flex align-items-center justify-content-md-end pt-2 ms-md-2">
              <h2 className="font-16 white mb-0 fw-light opacity_07">
                {/* 5-2 */}
                <span className="ms-lg-4 ps-2 fw-light opacity_07">
                  {teamDetails &&
                    `${ordinal_suffix_of(teamDetails.team_position)} IN ${teamDetails.team_league}`}
                </span>
              </h2>
              <NcaaFollowBtn teamId={teamId} />
            </div>
          </div>
          <div className="col-12 col-lg-5 d-md-flex justify-content-lg-end align-items-center mt-3 mt-sm-4 mt-lg-2 mb-3 mb-sm-2">
            <select
              className="form-select form-select-sm ms-lg-3 ps-sm-4 py-sm-4 py-3 font-16  custom_height_60 team_select_custom_min_width"
              aria-label=".form-select-sm example"
              onChange={onChageDropdown}
              id="teamDropdown"
            >
              {ncaaTeamList &&
                ncaaTeamList.length > 0 &&
                ncaaTeamList.map((item) => (
                  <option
                    value={item.team_id}
                    selected={teamId == item.team_id ? true : false}
                    key={item.team_id}
                  >
                    {item.team_name}
                  </option>
                ))}
            </select>
            <select
              className="form-select form-select-sm ms-sm-3 ps-sm-4 py-sm-4 py-3 font-16  custom_height_60 team_select_custom_min_width mt-3 mt-sm-0 "
              aria-label=".form-select-sm example"
              onChange={onChageDropdown}
              id="yearDropdown"
            >
              {yearDropdown}
            </select>
            <div className="ms-md-3 mt-3 mt-md-0 text-center text-md-start">
              <button className="font-16 fw-light white team_schedule_calendar_btn custom_height_60 w-100">
                Add to calendar
              </button>
            </div>
          </div>
        </div>

        <div className="table-responsive mb-0 bg-white">
          <div className="font-28 fw-semibold ps-4 my-1 border-bottom">Regular Season</div>

          <table className="table mb-0">
            <thead>
              <tr className="border-top-0">
                <th className="font-16 fw-semibold text-nowrap" scope="col">
                  WK
                </th>
                <th className="font-16 fw-semibold text-nowrap ps-4 py-2" scope="col">
                  DATE
                </th>
                <th className="font-16 fw-semibold text-nowrap" scope="col">
                  OPPONENT
                </th>
                <th className="font-16 fw-semibold text-nowrap " scope="col">
                  RESULT
                </th>
                <th className="font-16 fw-semibold text-nowrap " scope="col">
                  W-L
                </th>
                <th className="font-16 fw-semibold text-nowrap " scope="col">
                  HI PASS
                </th>
                <th className="font-16 fw-semibold text-nowrap " scope="col">
                  HI RUSH
                </th>
                <th className="font-16 fw-semibold text-nowrap" scope="col">
                  HI REC
                </th>
              </tr>
            </thead>
            <tbody>
              <td className="text-start text-nowrap font-16 fw-light text-very-light-gray ps-4 lh-49 py-4 sr-no-td">
                NO DATA FOUND
              </td>
            </tbody>
            <thead>
              <tr className="border-top-0">
                <th className="font-16 fw-semibold text-nowrap" scope="col">
                  WK
                </th>
                <th className="font-16 fw-semibold text-nowrap ps-4 py-2" scope="col">
                  DATE
                </th>
                <th className="font-16 fw-semibold text-nowrap" scope="col">
                  OPPONENT
                </th>
                <th className="font-16 fw-semibold text-nowrap " scope="col">
                  TIME
                </th>
                <th className="font-16 fw-semibold text-nowrap " scope="col">
                  VENUE
                </th>
                <th className="font-16 fw-semibold text-nowrap " scope="col"></th>
                <th className="font-16 fw-semibold text-nowrap " scope="col"></th>
                <th className="font-16 fw-semibold text-nowrap " scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {loader ? (
                <ColorRingCustomLoader isLoader={loader} />
              ) : allNflList && allNflList.message === "NCAA Schedule list" ? (
                allNflList?.response_data.map((item, index) => (
                  <>
                    {item.doc.map((item) => {
                      return (
                        <tr
                          key={index}
                          className={` ${index % 2 == 0 ? "bg-whites" : "bg-very-light-grey"}`}
                        >
                          <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5 date-table-td">
                            {item.scheduleWeek}
                          </td>

                          <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5 date-table-td">
                            {format(new Date(item.sheduleDate), "MM-dd-yyyy")}
                          </td>
                          <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5 opponent-td">
                            <span>{item.opponentGrey} </span>
                            vs
                            {item?.awayTeam?.team_id == teamId ? (
                              <>
                                <img
                                  className="ms-3 me-4 opponentgrey"
                                  src={
                                    item?.homeTeam?.logo_standard
                                      ? item?.homeTeam?.logo_standard
                                      : noTeamImg
                                  }
                                  style={{ width: "50px" }}
                                />
                                {item?.homeTeam?.team_name}
                              </>
                            ) : (
                              <>
                                <img
                                  className="ms-3 me-4 opponentgrey"
                                  src={
                                    item?.awayTeam?.logo_standard
                                      ? item?.awayTeam?.logo_standard
                                      : noTeamImg
                                  }
                                  style={{ width: "50px" }}
                                />
                                {item?.awayTeam?.team_name}
                              </>
                            )}
                            <span className="text-blue">{item.opponentBlue}</span>
                          </td>
                          <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5">
                            <span
                              className={` fw-semobold pe-3 ${
                                item.greenRedText === "W" ? "text-green" : "text-danger"
                              }`}
                            >
                              {item.sheduleTime}
                            </span>
                          </td>
                          <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5 min-w-101">
                            -
                          </td>
                          <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5">
                            <div className="min-w-56">
                              <span className="text-blue me-2">{item.hiPassBlue}</span>
                              <span>{item.hiPassGrey}</span>
                            </div>
                          </td>
                          <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5">
                            <span className="text-blue me-1">{item.hiRushBlue}</span>
                            <span>{item.hiRushGrey}</span>
                          </td>
                          <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5">
                            <div className="min-w-56">
                              <span className="text-blue me-1">{item.hiRecBlue}</span>
                              <span> {item.hiRecGrey} </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ))
              ) : (
                <div className="container noData">
                  <p style={{ color: "white", textAlign: "center" }}>Data not Found</p>
                </div>
              )}
            </tbody>

            <div className="font-28 fw-semibold ps-4 my-1 border-bottom">Preseason</div>
            <thead>
              <tr className="border-top-0">
                <th className="font-16 fw-semibold text-nowrap" scope="col">
                  WK
                </th>
                <th className="font-16 fw-semibold text-nowrap ps-4 py-2" scope="col">
                  DATE
                </th>
                <th className="font-16 fw-semibold text-nowrap" scope="col">
                  OPPONENT
                </th>
                <th className="font-16 fw-semibold text-nowrap " scope="col">
                  RESULT
                </th>
                <th className="font-16 fw-semibold text-nowrap " scope="col">
                  W-L
                </th>
                <th className="font-16 fw-semibold text-nowrap " scope="col">
                  HI PASS
                </th>
                <th className="font-16 fw-semibold text-nowrap " scope="col">
                  HI RUSH
                </th>
                <th className="font-16 fw-semibold text-nowrap" scope="col">
                  HI REC
                </th>
              </tr>
            </thead>
            <tbody>
              <td className="text-start text-nowrap font-16 fw-light text-very-light-gray ps-4 lh-49 py-4 sr-no-td">
                NO DATA FOUND
              </td>
            </tbody>
          </table>
        </div>

        <p className="font-18 fw-light text-very-light-gray ps-4 lh-49 py-4 mb-0 bg-white">
          * Game played at neutral location
        </p>
      </div>
    </div>
  );
};

export default NcaafTeamScheduleTable;
