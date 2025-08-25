import React, { useEffect, useState } from "react";
import NflHero from "../common/NflHero";
import ScroreBoard from "../homepage/ScroreBoard";
import RosterTable from "../roaster/RosterTable";
import { useNavigate, useLocation } from "react-router-dom";
import {
  nflTeamDetailsByTeamIdApi,
  nflTeamListDropdownApi,
} from "../../service/thirdPartyDataService";
import { getNflTeamListDropdown, getNflTeamPosition } from "./Helper";
import { Helmet } from "react-helmet";
import GlobalConfig from "../../GlobalConfig";
import NflFollowBtn from "./NflFollowBtn";

const Roster = () => {
  const [nflTeamDetails, set_nflTeamDetails] = useState({});
  const [nflTeamList, set_nflTeamList] = useState({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [teamId, set_teamId] = useState(queryParams.get("team"));
  const yearNo = queryParams.get("year");

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
    set_teamId(queryParams.get("team"));
    if (queryParams.size == 0 && nflTeamList && nflTeamList.length > 0) {
      set_teamId(nflTeamList[0].division[0].teams[0].team_id);
    }
  }, []);

  const navigate = useNavigate();
  const onChageDropdown = () => {
    var team = document.getElementById("teamDropdown").value;
    // var year = document.getElementById("yearDropdown").value;
    navigate(`/nfl/team-details/roster?team=${team}`);
    set_teamId(team);
    // set_yearNo(year);
  };

  const currentYear = new Date().getFullYear();
  let yearDropdown = [];
  for (let i = currentYear; i > currentYear - 5; i--) {
    yearDropdown.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Roster | {nflTeamDetails ? nflTeamDetails.team_name + " | " : ""} {GlobalConfig.SITE_NAME}
        </title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Helmet>
      <div className="bg-black pb-5 mb-sm-5">
        <div className="scoreboard-page-bg d-flex flex-column ">
          <ScroreBoard page="NFL" />
          <div className="py-5">
            <NflHero
              value="Roster"
              logo={nflTeamDetails.logo_standard}
              team={nflTeamDetails.team_name}
            />
          </div>
        </div>

        <div className="container margin-top-negative position-relative z-1 pt-5 ">
          <div className="row justify-content-end  mb-sm-4 mb-2 pt-sm-5">
            <div className=" col-12 text-end mb-sm-4 mb-2 mt-4 mt-sm-0 pt-md-4">
              <div className="d-flex align-items-center justify-content-end pt-2">
                <h2 className="font-20 white mb-0">
                  <span className="ms-lg-4 ps-2">{getNflTeamPosition(nflTeamDetails)}</span>
                </h2>
                <NflFollowBtn teamId={teamId} />
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-12 pt-4">
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

          <RosterTable teamId={teamId} yearNo={yearNo} />
        </div>
      </div>
    </>
  );
};

export default Roster;
