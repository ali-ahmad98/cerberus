import React, { useEffect, useState } from "react";
import NflHero from "../common/NflHero";
import ScroreBoard from "../homepage/ScroreBoard";
import { useLocation, useNavigate } from "react-router-dom";
import {
  nflTeamDetailsByTeamIdApi,
  nflTeamListDropdownApi,
} from "../../service/thirdPartyDataService";
import { getAllNflSchedulelist } from "../nfl-schedule/Helper";
import { format } from "date-fns";
import { getNflTeamListDropdown, getNflTeamPosition } from "./Helper";
import NflFollowBtn from "./NflFollowBtn";
import ColorRingCustomLoader from "../common/ColorRingCustomLoader";

const NflTeamSchedule = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [nflTeamDetails, set_nflTeamDetails] = useState({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [teamId, set_teamId] = useState(queryParams.get("team"));
  const [allNflList, setAllNflList] = useState([]);
  const [nflTeamList, set_nflTeamList] = useState({});
  const [loader, setAllLoader] = useState(false);

  useEffect(() => set_teamId(queryParams.get("team")), []);

  useEffect(() => {
    async function getNflTeamDetails() {
      nflTeamDetailsByTeamIdApi(teamId).then(function (result) {
        const response = result.data;
        set_nflTeamDetails(response.response_data);
      });
    }
    getNflTeamDetails();
  }, [teamId]);

  useEffect(() => {
    async function getNflTeamList() {
      nflTeamListDropdownApi().then(function (result) {
        const response = result.data;
        set_nflTeamList(response.response_data);
      });
    }
    getNflTeamList();
  }, []);

  useEffect(() => {
    const asyncFunc = async () => {
      setAllLoader(true);
      getAllNflSchedulelist(currentYear, "", teamId, (r) => {
        if (r) {
          setAllLoader(false);

          setAllNflList(r);
        }
      });
    };
    asyncFunc();
  }, []);

  let yearDropdown = [];
  for (let i = currentYear + 1; i >= currentYear; i--) {
    yearDropdown.push(
      <option value={i} key={i} selected>
        {i}
      </option>
    );
  }

  const onChageDropdown = () => {
    var team = document.getElementById("teamDropdown").value;
    var year = document.getElementById("yearDropdown").value;
    navigate(`/nfl/team-details/schedule?team=${team}&year=${year}`);
    set_teamId(team);
    setAllLoader(true);

    getAllNflSchedulelist(year, "", team, (r) => {
      setAllLoader(false);
      setAllNflList(r);
    });
  };

  return (
    <>
      <div className="bg-black pb-5 mb-sm-5">
        <div className="scoreboard-page-bg d-flex flex-column ">
          <ScroreBoard page="NFL" />
          <div className="pt-5 custom-mb-minus">
            <NflHero
              value="Schedule"
              logo={nflTeamDetails.logo_standard}
              team={nflTeamDetails.team_name}
            />
          </div>
        </div>
        <div className="container mb-5 schedule-table">
          <div className="row justify-content-end mb-sm-3 pb-xxl-2">
            <div className="col-12 text-end mb-3">
              <div className="d-flex align-items-center justify-content-md-end pt-2 ms-2 ms-md-0">
                <h2 className="font-20 white mb-0">
                  <span className="ms-lg-4 ps-2">{getNflTeamPosition(nflTeamDetails)}</span>
                </h2>
                <NflFollowBtn teamId={teamId} />
              </div>
            </div>
            <div className="col-12 col-lg-5 d-flex justify-content-lg-end align-items-center mt-3 mt-sm-4 mt-lg-0 mb-3 mb-sm-2">
              <select
                className="form-select form-select-sm ms-lg-3 ps-sm-4 py-sm-4 py-3 font-16 sellect"
                aria-label=".form-select-sm example"
                onChange={onChageDropdown}
                id="teamDropdown"
              >
                <option selected>Team Statistics</option>
                {getNflTeamListDropdown(nflTeamList)}
              </select>
              <select
                className="form-select form-select-sm ms-2 ms-sm-3 ps-sm-4 py-sm-4 py-3 font-16 sellect"
                aria-label=".form-select-sm example"
                onChange={onChageDropdown}
                id="yearDropdown"
              >
                {yearDropdown}
              </select>
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
                ) : allNflList && allNflList.message === "NFL Schedule list" ? (
                  allNflList?.response_data.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.doc.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            className={` ${index % 2 == 0 ? "bg-whites" : "bg-very-light-grey"}`}
                          >
                            <td className="text-start text-nowrap font-16 fw-light text-very-light-gray ps-4 lh-49 py-4 sr-no-td">
                              {item.scheduleWeek}
                            </td>
                            <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5 date-table-td">
                              {format(new Date(item.sheduleDate), "MM-dd-yyyy")}
                            </td>
                            <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5 opponent-td">
                              <span> </span>
                              vs
                              {item?.awayTeam?.team_id == teamId ? (
                                <>
                                  <img
                                    className="ms-3 me-4 opponentgrey"
                                    src={item?.homeTeam?.logo_small}
                                    alt="table-img"
                                  />
                                  {item?.homeTeam?.team_name}
                                </>
                              ) : (
                                <>
                                  <img
                                    className="ms-3 me-4 opponentgrey"
                                    src={item?.awayTeam?.logo_small}
                                    alt="table-img"
                                  />
                                  {item?.awayTeam?.team_name}
                                </>
                              )}
                              <span className="text-blue"></span>
                            </td>
                            <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5">
                              <span className={`fw-semobold pe-3 text-green`}>
                                {item.sheduleTime}
                              </span>
                            </td>
                            <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5 min-w-101">
                              {item.venue}
                            </td>
                            <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5">
                              <div className="min-w-56">
                                <span className="text-blue me-2"></span>
                                <span></span>
                              </div>
                            </td>
                            <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5">
                              <span className="text-blue me-1"></span>
                              <span></span>
                            </td>
                            <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5">
                              <div className="min-w-56">
                                <span className="text-blue me-1"></span>
                                <span> </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
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
    </>
  );
};

export default NflTeamSchedule;
