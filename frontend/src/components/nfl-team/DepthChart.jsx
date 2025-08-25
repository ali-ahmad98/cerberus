import React, { useEffect, useState } from "react";
import NflHero from "../common/NflHero";
import DepthChartTable from "../depthChart/DepthChartTable";
import ScroreBoard from "../homepage/ScroreBoard";
import {
  nflTeamDetailsByTeamIdApi,
  nflTeamListDropdownApi,
} from "../../service/thirdPartyDataService";
import { useLocation, useNavigate } from "react-router-dom";
import { getNflTeamListDropdown, getNflTeamPosition } from "./Helper";
import NflFollowBtn from "./NflFollowBtn";

const DepthChart = () => {
  const [nflTeamDetails, set_nflTeamDetails] = useState({});
  const [nflTeamList, set_nflTeamList] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [teamId, set_teamId] = useState(queryParams.get("team"));

  useEffect(() => {
    async function getNflTeamDetails() {
      if (!teamId) return;
      const result = await nflTeamDetailsByTeamIdApi(teamId);
      set_nflTeamDetails(result.data.response_data);
    }
    getNflTeamDetails();
  }, [teamId]);

  useEffect(() => {
    const currentTeam = queryParams.get("team");
    set_teamId(currentTeam);

    if (queryParams.size === 0 && nflTeamList && nflTeamList.length > 0) {
      set_teamId(nflTeamList[0].division[0].teams[0].team_id);
    }
  }, [location.search, nflTeamList]);

  useEffect(() => {
    getNflTeamList();
  }, []);

  async function getNflTeamList() {
    const result = await nflTeamListDropdownApi();
    set_nflTeamList(result.data.response_data);
  }

  const onChageDropdown = (e) => {
    const team = e.target.value;
    navigate(`/nfl/team-details/depth-chart?team=${team}`);
    set_teamId(team);
  };

  return (
    <>
      <div className="bg-black pb-5 mb-sm-5">
        <div className="scoreboard-page-bg d-flex flex-column ">
          <ScroreBoard page="NFL" />
          <div className="py-5">
            <NflHero
              value="Depth Chart"
              logo={nflTeamDetails.logo_standard}
              team={nflTeamDetails.team_name}
            />
          </div>
        </div>

        <div className="container pb-5 mb-5 margin-top-negative position-relative z-1 depth-chart-table">
          <div className="row justify-content-end  mb-sm-5 mb-2">
            <div className=" col-12 text-end mb-sm-4 mb-2 mt-4 mt-sm-0">
              <div className="d-flex align-items-center justify-content-end">
                <h2 className="font-20 white mb-0">
                  <span className="ms-lg-4 ps-2">{getNflTeamPosition(nflTeamDetails)}</span>
                </h2>
                <NflFollowBtn teamId={teamId} />
              </div>
            </div>
            <div className="col-6 col-sm-5 col-md-4 col-lg-12">
              <div className="d-flex justify-content-end mt-2 mt-lg-0 mb-2">
                <select
                  className="form-select form-select-sm ps-4 mx-2 py-lg-4 py-3 font-16 gamelog-select"
                  aria-label="form-select-sm example"
                  onChange={onChageDropdown}
                  id="teamDropdown"
                  value={teamId}
                >
                  {getNflTeamListDropdown(nflTeamList)}
                </select>
              </div>
            </div>
          </div>
          <DepthChartTable teamId={teamId} nflTeamDetails={nflTeamDetails} />
        </div>
      </div>
    </>
  );
};

export default DepthChart;
