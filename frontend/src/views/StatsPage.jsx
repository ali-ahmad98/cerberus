import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import ScroreBoard from "../components/homepage/ScroreBoard";
import ScoreBoardHero from "../components/nfl-scoreboard/ScoreBoardHero";
import PlayerStatistics from "../components/stats/PlayerStatistics";
import TeamStatistics from "../components/stats/TeamStatistics";
import OffensiveLeaders from "../components/stats/OffensiveLeaders";
import OffensiveTeams from "../components/stats/OffensiveTeams";
import DefensiveLeaders from "../components/stats/DefensiveLeaders";
import DefensiveTeams from "../components/stats/DefensiveTeams";
import { getNflPlayerStatLeaderListApi, nflTeamListApi } from "../service/thirdPartyDataService";
import GlobalConfig from "../GlobalConfig";

const StatsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentYear = new Date().getFullYear();

  const [isPlayerActive, setPlayerActive] = useState(0);
  const [teamId, set_teamId] = useState(queryParams.get("team"));
  const [yearNo, set_yearNo] = useState(currentYear);

  const [nflTeamList, set_nflTeamList] = useState({});
  const [offensiveLeaders, set_offensiveLeaders] = useState({});

  useEffect(() => {
    async function getNflPlayerStatLeaderList() {
      getNflPlayerStatLeaderListApi(teamId, yearNo).then(function (result) {
        const response_data = result.data.response_data;
        set_offensiveLeaders(response_data);
      });
    }

    getNflPlayerStatLeaderList();
  }, [teamId, yearNo]);

  useEffect(() => {
    async function getNflTeamList() {
      nflTeamListApi().then(function (result) {
        const response = result.data;
        set_nflTeamList(response.response_data);
      });
    }
    getNflTeamList();
  }, []);

  useEffect(() => {
    if (queryParams.size == 0) {
      set_yearNo(currentYear);
    } else {
      set_yearNo(queryParams.get("year"));
    }
    if (queryParams.size == 0 && nflTeamList && nflTeamList.length > 0) {
      set_teamId(nflTeamList[0].team_id);
    }
  }, []);

  let yearDropdown = [];
  for (let i = currentYear; i > currentYear - 5; i--) {
    yearDropdown.push(
      <option value={i} key={`StatsPage${i}`}>
        {i}
      </option>
    );
  }

  const onChageDropdown = () => {
    var team = document.getElementById("teamDropdown").value;
    var year = document.getElementById("yearDropdown").value;
    navigate(`/nfl/stats?team=${team}&year=${year}`);
    set_teamId(team);
    set_yearNo(year);
  };

  return (
    <>
      <Helmet>
        <title> Stat Leader | NFL | {GlobalConfig.SITE_NAME} </title>
        <meta name="description" content={`Stat Leader | NFL | ${GlobalConfig.SITE_NAME} `} />
        <meta name="keywords" content="" />
      </Helmet>

      <div className="bg-black pb-5">
        <div className="scoreboard-page-bg d-flex flex-column">
          <ScroreBoard />
          <div className="py-5">
            <ScoreBoardHero value={`STAT LEADERS ${yearNo}`} />
          </div>
        </div>

        <>
          <div className="container pt-5 mt-5">
            <div className="row  flex-column flex-lg-row justify-content-between">
              <div className="col">
                <button
                  className={`${
                    isPlayerActive === 0 ? "active-nav-btn-blue-scale " : "text-black bg_white"
                  }  nav_tabs_btn ms-sm-3 ms-2`}
                  onClick={() => setPlayerActive(0)}
                >
                  <span>PLAYER</span>
                </button>
                <button
                  className={`${
                    isPlayerActive === 1 ? "active-nav-btn-blue-scale" : " text-black bg_white"
                  }  nav_tabs_btn`}
                  onClick={() => {
                    setPlayerActive(1);
                  }}
                >
                  <span>TEAM</span>
                </button>
              </div>

              <div className="col-12 col-lg-5 d-sm-flex justify-content-center align-items-center mt-4 mt-lg-0">
                <select
                  className="form-select form-select-sm ms-lg-3 ps-sm-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-3"
                  aria-label=".form-select-sm example"
                  onChange={onChageDropdown}
                  id="teamDropdown"
                  value={teamId}
                >
                  {nflTeamList &&
                    nflTeamList.length > 0 &&
                    nflTeamList.map((item) => (
                      <option value={item.team_id} key={`teamDrop${item.team_id}`}>
                        {item.team_name}
                      </option>
                    ))}
                </select>
                <select
                  className="form-select form-select-sm ms-sm-3 ps-sm-4 py-sm-4 py-3 font-16 sellect mb-sm-5"
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

          <div className="container pt-5">
            <div className="row">
              <div className="col-12 col-lg-6">
                {isPlayerActive === 0 ? (
                  <OffensiveLeaders dataList={offensiveLeaders} />
                ) : (
                  <OffensiveTeams />
                )}
              </div>
              <div className="col-12 col-lg-6 mt-5 mt-lg-0">
                {isPlayerActive === 0 ? <DefensiveLeaders /> : <DefensiveTeams />}
              </div>
            </div>
          </div>
        </>

        <PlayerStatistics />
        <TeamStatistics />
      </div>
    </>
  );
};

export default StatsPage;
