import { useEffect, useState } from "react";
import ScroreBoard from "../homepage/ScroreBoard";
import NcaafTeamDetailStatsTable from "./NcaafTeamDetailStatsTable";
import NcaafHero from "../common/NcaafHero";
import { getNcaaTeamDetailsApi, getNcaaTeamListApi } from "../../service/NcaaService";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import GlobalConfig from "../../GlobalConfig";
import { ordinal_suffix_of } from "../../service/GeneralFn";
import NcaaFollowBtn from "../NCAA/NcaaFollowBtn";

const NcaafTeamDetailStat = () => {
  const currentYear = new Date().getFullYear();

  const [isPlayerActiveNcaaf, setPlayerActiveNcaaf] = useState(0);

  const [ncaaTeamList, set_ncaaTeamList] = useState({});
  const [teamDetails, set_teamDetails] = useState({});
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [teamId, set_teamId] = useState(queryParams.get("team"));
  const [yearNo, set_yearNo] = useState(
    queryParams.get("year") ? queryParams.get("year") : currentYear
  );

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
      getNcaaTeamDetailsApi(teamId || "1145").then(function (result) {
        const response = result.data;
        set_teamDetails(response.response_data);
      });
    }
    getNcaaTeamDetails();
  }, [teamId]);

  useEffect(() => {
    set_teamId(queryParams.get("team"));
    if (queryParams.size == 0 && ncaaTeamList && ncaaTeamList.length > 0) {
      set_teamId(ncaaTeamList[0].team_id);
    }
  }, []);

  let yearDropdown = [];
  for (let i = currentYear; i > currentYear - 2; i--) {
    yearDropdown.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  const onChageDropdown = () => {
    var team = document.getElementById("teamDropdown").value;
    var year = document.getElementById("yearDropdown").value;
    navigate(`/ncaaf/team-details/stats?team=${team}&year=${year}`);
    set_teamId(team);
    set_yearNo(year);
  };

  return (
    <>
      <Helmet>
        <title> Stats | NCAAF | {GlobalConfig.SITE_NAME} </title>
        <meta name="description" content={`Stats | NCAAF | ${GlobalConfig.SITE_NAME}`} />
        <meta name="keywords" content={`Stats | NCAAF | ${GlobalConfig.SITE_NAME}`} />
      </Helmet>
      <div className="ncaaf-scoreboard-page-bg d-flex flex-column">
        <ScroreBoard page="NCAAF" />
        <div className="pt-5 custom-mb-minus">
          <NcaafHero
            logo={teamDetails && teamDetails.logo_standard}
            value={teamDetails && teamDetails.team_name}
            team={teamDetails && teamDetails.team_name}
          />
        </div>
      </div>

      <div className="container">
        <div className="row flex-column flex-lg-row align-items-center justify-content-between mt_minus">
          <div className="order-1 col-12 text-end mb-3">
            <div className="d-flex align-items-center justify-content-md-end pt-2">
              <h2 className="font-16 white mb-0 fw-light opacity_07">
                <span className="ms-3 ms-lg-4 fw-light opacity_07">
                  {teamDetails &&
                    teamDetails.team_position != undefined &&
                    `${ordinal_suffix_of(teamDetails.team_position)} IN ${teamDetails.team_league}`}
                </span>
              </h2>
              <NcaaFollowBtn teamId={teamId} />
            </div>
          </div>
          <div className="order-2 order-lg-1 col d-flex align-items-center mt-sm-2 mt-lg-0">
            <button
              className={`${
                isPlayerActiveNcaaf === 0
                  ? "team_players_btn_custom_padding table_details_stats_heading"
                  : "text-black bg_white"
              }  nav_tabs_stats_btn team_players_btn_custom_padding table_details_stats_heading me-1`}
              onClick={() => setPlayerActiveNcaaf(0)}
            >
              <span>PLAYERS</span>
            </button>
          </div>
          <div className="order-1 order-lg-2 col-12 col-lg-5 d-sm-flex justify-content-lg-end align-items-center mt-3 mt-sm-4 mt-lg-0 mb-3 mb-sm-2">
            <select
              className="form-select form-select-sm ms-lg-3 ps-sm-4 py-sm-4 py-3 font-16  custom_height_60 team_select_custom_min_width"
              aria-label=".form-select-sm example"
              onChange={onChageDropdown}
              id="teamDropdown"
              value={teamId}
            >
              {ncaaTeamList &&
                ncaaTeamList.length > 0 &&
                ncaaTeamList.map((item) => (
                  <option value={item.team_id} key={item.team_id}>
                    {item.team_name}
                  </option>
                ))}
            </select>
            <select
              className="form-select form-select-sm ms-sm-3 ps-sm-4 py-sm-4 py-3 font-16  custom_height_60 team_select_custom_min_width mt-3 mt-sm-0 "
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

      <div className="container nfl-team-stats mb-sm-5 pb-sm-5">
        <div className="row">
          <div className="col-12">
            {isPlayerActiveNcaaf === 0 ? (
              <NcaafTeamDetailStatsTable teamId={teamId} yearNo={yearNo} />
            ) : (
              <NcaafTeamDetailStatsTable teamId={teamId} yearNo={yearNo} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NcaafTeamDetailStat;
