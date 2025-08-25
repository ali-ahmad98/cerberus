import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import ScroreBoard from "../homepage/ScroreBoard";
import NflHero from "../common/NflHero";
import {
  nflTeamDetailsByTeamIdApi,
  nflTeamListDropdownApi,
} from "../../service/thirdPartyDataService";
import NflTeamDetailPlayerStatsTable from "../nflTeamDetailStats.jsx/NflTeamDetailPlayerStatsTable";
import NflTeamDetailTeamStatsTable from "../nflTeamDetailStats.jsx/NflTeamDetailTeamStatsTable";
import { getNflTeamListDropdown, getNflTeamPosition, getFirstNflTeamId } from "./Helper";
import GlobalConfig from "../../GlobalConfig";
import NflFollowBtn from "./NflFollowBtn";

const NflTeamDetailStats = () => {
  const [isPlayerActive, setPlayerActive] = useState(0);

  const [nflTeamList, set_nflTeamList] = useState({});
  const [nflTeamDetails, set_nflTeamDetails] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [teamId, set_teamId] = useState(queryParams.get("team"));
  const [yearNo, set_yearNo] = useState(queryParams.get("year") ?? 2023);

  useEffect(() => {
    getNflTeamList();
  }, []);

  async function getNflTeamList() {
    const result = await nflTeamListDropdownApi();
    set_nflTeamList(result.data.response_data);
  }

  useEffect(() => {
    const currentTeam = queryParams.get("team");
    set_teamId(currentTeam);

    if (queryParams.size === 0 && nflTeamList && nflTeamList.length > 0) {
      set_teamId(getFirstNflTeamId(nflTeamList));
    }
  }, [location.search, nflTeamList]);

  useEffect(() => {
    if (teamId) getNflTeamDetails(teamId);
  }, [teamId]);

  async function getNflTeamDetails(teamId) {
    const result = await nflTeamDetailsByTeamIdApi(teamId);
    set_nflTeamDetails(result.data.response_data);
  }

  const currentYear = new Date().getFullYear();
  const yearDropdown = [];
  for (let i = currentYear; i > currentYear - 2; i--) {
    yearDropdown.push(
      <option value={i} key={`year${i}`}>
        {i}
      </option>
    );
  }

  const onChageDropdown = () => {
    const team = document.getElementById("teamDropdown").value;
    const year = document.getElementById("yearDropdown").value;
    navigate(`/nfl/team-details/stats?team=${team}&year=${year}`);
    set_teamId(team);
    set_yearNo(year);
  };

  return (
    <>
      <Helmet>
        <title>
          Stats | {nflTeamDetails ? nflTeamDetails.team_name + " | " : ""} {GlobalConfig.SITE_NAME}
        </title>
        <meta
          name="description"
          content={`Stats | ${nflTeamDetails ? nflTeamDetails.team_name + " | " : ""} ${
            GlobalConfig.SITE_NAME
          }`}
        />
        <meta
          name="keywords"
          content={`Stats | ${nflTeamDetails ? nflTeamDetails.team_name + " | " : ""} ${
            GlobalConfig.SITE_NAME
          }`}
        />
      </Helmet>

      <div className="scoreboard-page-bg d-flex flex-column">
        <ScroreBoard page="NFL" />
        <div className="pt-5 custom-mb-minus">
          <NflHero
            value="Stats"
            logo={nflTeamDetails.logo_standard}
            team={nflTeamDetails.team_name}
          />
        </div>
      </div>

      <div className="container team-stats-bills mt-lg-5">
        <div className="row flex-column flex-lg-row align-items-center justify-content-between">
          <div className="order-1 col-12 text-end mb-3">
            <div className="d-flex align-items-center justify-content-md-end pt-2 ms-2 ms-md-0">
              <h2 className="font-20 white mb-0">
                <span className="ms-lg-4 ps-2">{getNflTeamPosition(nflTeamDetails)}</span>
              </h2>
              <NflFollowBtn teamId={teamId} />
            </div>
          </div>

          <div className="order-2 order-lg-1 col d-flex align-items-center">
            <button
              className={`${
                isPlayerActive === 0 ? "active-nav-btn-blue-stats" : "text-black bg_white"
              } nav_tabs_stats_btn ms-1`}
              onClick={() => setPlayerActive(0)}
            >
              <span>PLAYER</span>
            </button>
            <button
              className={`${
                isPlayerActive === 1 ? "active-nav-btn-blue-stats" : "text-black bg_white"
              } nav_tabs_stats_btn`}
              onClick={() => setPlayerActive(1)}
            >
              <span>TEAM</span>
            </button>
          </div>

          <div className="order-1 order-lg-2 col-12 col-lg-5 d-flex justify-content-lg-end align-items-center mt-3 mt-sm-4 mt-lg-0 mb-3 mb-sm-2">
            <select
              className="form-select form-select-sm ms-lg-3 ps-sm-4 py-sm-4 py-3 font-16 sellect"
              onChange={onChageDropdown}
              id="teamDropdown"
              value={teamId}
            >
              {getNflTeamListDropdown(nflTeamList)}
            </select>
            <select
              className="form-select form-select-sm ms-2 ms-sm-3 ps-sm-4 py-sm-4 py-3 font-16 sellect"
              onChange={onChageDropdown}
              id="yearDropdown"
              value={yearNo}
            >
              {yearDropdown}
            </select>
          </div>
        </div>
      </div>

      <div className="container nfl-team-stats mb-5 pb-5">
        <div className="row">
          <div className="col-12">
            {isPlayerActive === 0 ? (
              <NflTeamDetailPlayerStatsTable teamId={teamId} yearNo={yearNo} />
            ) : (
              <NflTeamDetailTeamStatsTable
                teamId={teamId}
                yearNo={yearNo}
                nflTeamDetails={nflTeamDetails}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NflTeamDetailStats;
