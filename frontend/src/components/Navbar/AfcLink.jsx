/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { nflTeamListDivisionGroupApi } from "../../service/thirdPartyDataService";
import noTeamImg from "../../Assets/no_team.png";
import { AnimatePresence, motion } from "framer-motion";
import { checkLoginOrNotRedirectUrl } from "../../service/GeneralFn";

const AfcLink = ({ viewTeam, mouseLeaveHandler }) => {
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = React.useState("");
  const [nflTeamListData, set_nflTeamListData] = useState({});

  useEffect(() => {
    const getNflTeamDataList = async () => {
      nflTeamListDivisionGroupApi().then(function (result) {
        const response = result.data;
        set_nflTeamListData(response.response_data);
      });
    };
    getNflTeamDataList();
  }, []);

  const dropdownOpenHandler = (value) => {
    if (value == activeDropdown) {
      setActiveDropdown("");
      gsap.fromTo(
        ".animated-el",
        {
          y: 0,
          x: 0,
          opacity: 1,
          height: "auto",
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          height: "auto",
        }
      );
    } else {
      setActiveDropdown(value);
      gsap.fromTo(
        ".animated-el",
        {
          opacity: 0,
          y: -20,
          height: 0,
        },
        {
          y: 0,
          x: 0,
          duration: 0.2,
          opacity: 1,
          height: "auto",
        }
      );
    }
  };
  const routeHandler = (item) => {
    if (item.isLink) {
      mouseLeaveHandler();
      navigate(item.url);
    }
  };
  return (
    <AnimatePresence>
      {viewTeam && (
        <motion.div
          initial={{ scale: 0, transformOrigin: "left top", opacity: "0" }}
          animate={{ scale: 1, transformOrigin: "left top", opacity: "1" }}
          exit={{ scale: 0, transformOrigin: "left top", opacity: "0" }}
          className="w-100  bottom-list"
        >
          <div className="row w-100 ">
            <div className="col-md-3 px-5 mb-5">
              {/*============ BOTTOM DROPDOWN ROW ONE LINK MAP ============*/}

              <>
                <li> AFC East </li>
                <div className="d-flex mt-4 flex-column">
                  {nflTeamListData?.AFC?.East?.map((data, index) => {
                    return (
                      <div
                        onClick={() => dropdownOpenHandler(data.team_name)}
                        key={index}
                        className={`dropdown-bottom-link`}
                      >
                        <span className="d-inline-block">
                          <img
                            className="table-img-team"
                            src={data.logo_medium == "" ? noTeamImg : data.logo_standard}
                            alt={data.team_code}
                          />
                        </span>

                        <span className="d-inline-block pl-3">{data.team_name}</span>
                        <div className="d-flex animated-el flex-column">
                          {data.team_name == activeDropdown && (
                            <div
                              key={`nflHeaderL${index}`}
                              onClick={() => routeHandler(data)}
                              className="afc-sub-url"
                            >
                              <span className="d-block font-13 fw-normal text-blue pt-1">
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/stats?team=${data.team_id}`
                                  )}
                                >
                                  Stats
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/schedule?team=${data.team_id}`
                                  )}
                                >
                                  Schedule
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/roster?team=${data.team_id}`
                                  )}
                                >
                                  Roster
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/injuries?team=${data.team_id}`
                                  )}
                                >
                                  Injuries
                                </Link>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            </div>{" "}
            <div className="col-md-3 px-5 mb-5">
              {/*============ BOTTOM DROPDOWN ROW TOW LINK MAP ============*/}

              <>
                <li> AFC North </li>
                <div className="d-flex mt-4 flex-column">
                  {nflTeamListData?.AFC?.North?.map((data, index) => {
                    return (
                      <div
                        onClick={() => dropdownOpenHandler(data.team_name)}
                        key={index}
                        className={`dropdown-bottom-link`}
                      >
                        <span className="d-inline-block">
                          <img
                            className="table-img-team"
                            src={data.logo_small == "" ? noTeamImg : data.logo_standard}
                            alt={data.team_code}
                          />
                        </span>
                        <span className="d-inline-block pl-3">{data.team_name}</span>
                        <div className="d-flex animated-el flex-column">
                          {data.team_name == activeDropdown && (
                            <div
                              key={`nflHeaderL${index}`}
                              onClick={() => routeHandler(data)}
                              className="afc-sub-url"
                            >
                              <span className="d-block font-13 fw-normal text-blue pt-1">
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/stats?team=${data.team_id}`
                                  )}
                                >
                                  Stats
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/schedule?team=${data.team_id}`
                                  )}
                                >
                                  Schedule
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/roster?team=${data.team_id}`
                                  )}
                                >
                                  Roster
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/injuries?team=${data.team_id}`
                                  )}
                                >
                                  Injuries
                                </Link>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            </div>{" "}
            <div className="col-md-3 px-5 mb-5">
              {/*============ BOTTOM DROPDOWN ROW THREE LINK MAP ============*/}
              <>
                <li> AFC South </li>
                <div className="d-flex mt-4 flex-column">
                  {nflTeamListData?.AFC?.South?.map((data, index) => {
                    return (
                      <div
                        onClick={() => dropdownOpenHandler(data.team_name)}
                        key={index}
                        className={`dropdown-bottom-link`}
                      >
                        <span className="d-inline-block">
                          <img
                            className="table-img-team"
                            src={data.logo_small == "" ? noTeamImg : data.logo_standard}
                            alt={data.team_code}
                          />
                        </span>

                        <span className="d-inline-block pl-3">{data.team_name}</span>
                        <div className="d-flex animated-el flex-column">
                          {data.team_name == activeDropdown && (
                            <div
                              key={`nflHeaderL${index}`}
                              onClick={() => routeHandler(data)}
                              className="afc-sub-url"
                            >
                              <span className="d-block font-13 fw-normal text-blue pt-1">
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/stats?team=${data.team_id}`
                                  )}
                                >
                                  Stats
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/schedule?team=${data.team_id}`
                                  )}
                                >
                                  Schedule
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/roster?team=${data.team_id}`
                                  )}
                                >
                                  Roster
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/injuries?team=${data.team_id}`
                                  )}
                                >
                                  Injuries
                                </Link>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            </div>{" "}
            <div className="col-md-3 px-5 mb-5">
              {/*============ BOTTOM DROPDOWN ROW FOUR LINK MAP ============*/}

              <>
                <li> AFC West</li>
                <div className="d-flex mt-4 flex-column">
                  {nflTeamListData?.AFC?.West?.map((data, index) => {
                    return (
                      <div
                        onClick={() => dropdownOpenHandler(data.team_name)}
                        key={index}
                        className={`dropdown-bottom-link`}
                      >
                        <span className="d-inline-block">
                          <img
                            className="table-img-team"
                            src={data.logo_small == "" ? noTeamImg : data.logo_standard}
                            alt={data.team_code}
                          />
                        </span>
                        {/* {item.icon} */}
                        <span className="d-inline-block pl-3">{data.team_name}</span>
                        <div className="d-flex animated-el flex-column">
                          {data.team_name == activeDropdown && (
                            <div
                              key={`nflHeaderL${index}`}
                              onClick={() => routeHandler(data)}
                              className="afc-sub-url"
                            >
                              <span className="d-block font-13 fw-normal text-blue pt-1">
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/stats?team=${data.team_id}`
                                  )}
                                >
                                  Stats
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/schedule?team=${data.team_id}`
                                  )}
                                >
                                  Schedule
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/roster?team=${data.team_id}`
                                  )}
                                >
                                  Roster
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/injuries?team=${data.team_id}`
                                  )}
                                >
                                  Injuries
                                </Link>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            </div>
            {""}
            <div className="col-md-3 px-5 mb-5">
              {/*============ BOTTOM DROPDOWN ROW FOUR LINK MAP ============*/}
              <>
                <li> NFC East</li>
                <div className="d-flex mt-4 flex-column">
                  {nflTeamListData?.NFC?.East?.map((data, index) => {
                    return (
                      <div
                        onClick={() => dropdownOpenHandler(data.team_name)}
                        key={index}
                        className={`dropdown-bottom-link`}
                      >
                        <span className="d-inline-block">
                          <img
                            className="table-img-team"
                            src={data.logo_small == "" ? noTeamImg : data.logo_standard}
                            alt={data.team_code}
                          />
                        </span>

                        <span className="d-inline-block pl-3">{data.team_name}</span>
                        <div className="d-flex animated-el flex-column">
                          {data.team_name == activeDropdown && (
                            <div
                              key={`nflHeaderL${index}`}
                              onClick={() => routeHandler(data)}
                              className="afc-sub-url"
                            >
                              <span className="d-block font-13 fw-normal text-blue pt-1">
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/stats?team=${data.team_id}`
                                  )}
                                >
                                  Stats
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/schedule?team=${data.team_id}`
                                  )}
                                >
                                  Schedule
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/roster?team=${data.team_id}`
                                  )}
                                >
                                  Roster
                                </Link>
                                &nbsp;|{" "}
                                <Link
                                  to={checkLoginOrNotRedirectUrl(
                                    `/nfl/team-details/injuries?team=${data.team_id}`
                                  )}
                                >
                                  Injuries
                                </Link>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            </div>
            {""}
            <div className="col-md-3 px-5 mb-5">
              {/*============ BOTTOM DROPDOWN ROW FOUR LINK MAP ============*/}
              <>
                <li> NFC North</li>
                <div className="d-flex mt-4 flex-column">
                  {nflTeamListData?.NFC?.North?.map((data, index) => {
                    return (
                      <div
                        onClick={() => dropdownOpenHandler(data.team_name)}
                        key={index}
                        className={`dropdown-bottom-link`}
                      >
                        <span className="d-inline-block">
                          <img
                            className="table-img-team"
                            src={data.logo_small == "" ? noTeamImg : data.logo_standard}
                            alt={data.team_code}
                          />
                        </span>
                        <span className="d-inline-block pl-3">{data.team_name}</span>
                        <div className="d-flex animated-el flex-column">
                          {data.team_name == activeDropdown && (
                            <div
                              key={`nflHeaderL${index}`}
                              onClick={() => routeHandler(data)}
                              className="afc-sub-url"
                            >
                              <span className="d-block font-13 fw-normal text-blue pt-1">
                                <Link to={`/nfl/team-details/stats?team=${data.team_id}`}>
                                  Stats
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/nfl/team-details/schedule?team=${data.team_id}`}>
                                  Schedule
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/nfl/team-details/roster?team=${data.team_id}`}>
                                  Roster
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/nfl/team-details/injuries?team=${data.team_id}`}>
                                  Injuries
                                </Link>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            </div>
            {""}
            <div className="col-md-3 px-5 mb-5">
              {/*============ BOTTOM DROPDOWN ROW FOUR LINK MAP ============*/}
              <>
                <li> NFC South</li>
                <div className="d-flex mt-4 flex-column">
                  {nflTeamListData?.NFC?.South?.map((data, index) => {
                    return (
                      <div
                        onClick={() => dropdownOpenHandler(data.team_name)}
                        key={index}
                        className={`dropdown-bottom-link`}
                      >
                        <span className="d-inline-block">
                          <img
                            className="table-img-team"
                            src={data.logo_small == "" ? noTeamImg : data.logo_standard}
                            alt={data.team_code}
                          />
                        </span>

                        <span className="d-inline-block pl-3">{data.team_name}</span>
                        <div className="d-flex animated-el flex-column">
                          {data.team_name == activeDropdown && (
                            <div
                              key={`nflHeaderL${index}`}
                              onClick={() => routeHandler(data)}
                              className="afc-sub-url"
                            >
                              <span className="d-block font-13 fw-normal text-blue pt-1">
                                <Link to={`/nfl/team-details/stats?team=${data.team_id}`}>
                                  Stats
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/nfl/team-details/schedule?team=${data.team_id}`}>
                                  Schedule
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/nfl/team-details/roster?team=${data.team_id}`}>
                                  Roster
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/nfl/team-details/injuries?team=${data.team_id}`}>
                                  Injuries
                                </Link>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            </div>
            {""}
            <div className="col-md-3 px-5 mb-5">
              {/*============ BOTTOM DROPDOWN ROW FOUR LINK MAP ============*/}
              <>
                <li> NFC West</li>
                <div className="d-flex mt-4 flex-column">
                  {nflTeamListData?.NFC?.West?.map((data, index) => {
                    return (
                      <div
                        onClick={() => dropdownOpenHandler(data.team_name)}
                        key={index}
                        className={`dropdown-bottom-link`}
                      >
                        <span className="d-inline-block">
                          <img
                            className="table-img-team"
                            src={data.logo_small == "" ? noTeamImg : data.logo_standard}
                            alt={data.team_code}
                          />
                        </span>
                        <span className="d-inline-block pl-3">{data.team_name}</span>
                        <div className="d-flex animated-el flex-column">
                          {data.team_name == activeDropdown && (
                            <div
                              key={`nflHeaderL${index}`}
                              onClick={() => routeHandler(data)}
                              className="afc-sub-url"
                            >
                              <span className="d-block font-13 fw-normal text-blue pt-1">
                                <Link to={`/nfl/team-details/stats?team=${data.team_id}`}>
                                  Stats
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/nfl/team-details/schedule?team=${data.team_id}`}>
                                  Schedule
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/nfl/team-details/roster?team=${data.team_id}`}>
                                  Roster
                                </Link>
                                &nbsp;|{" "}
                                <Link to={`/nfl/team-details/injuries?team=${data.team_id}`}>
                                  Injuries
                                </Link>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            </div>
            {""}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AfcLink;
