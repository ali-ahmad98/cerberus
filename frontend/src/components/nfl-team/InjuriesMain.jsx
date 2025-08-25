import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  nflTeamDetailsByTeamIdApi,
  nflTeamListDropdownApi,
} from "../../service/thirdPartyDataService";
import NflHero from "../common/NflHero";
import ScroreBoard from "../homepage/ScroreBoard";
import InjuriesTable from "../injuries/InjuriesTable";
import { getNflTeamListDropdown, getNflTeamPosition } from "./Helper";
import GlobalConfig from "../../GlobalConfig";
import NflFollowBtn from "./NflFollowBtn";

const InjuriesMain = () => {
  const [nflTeamList, set_nflTeamList] = useState({});
  const [nflTeamDetails, set_nflTeamDetails] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [teamId, set_teamId] = useState(queryParams.get("team"));

  useEffect(() => {
    async function getNflTeamList() {
      const result = await nflTeamListDropdownApi();
      set_nflTeamList(result.data.response_data);
    }
    getNflTeamList();
  }, []);

  useEffect(() => {
    async function getNflTeamDetails(teamId) {
      if (!teamId) return;
      const result = await nflTeamDetailsByTeamIdApi(teamId);
      set_nflTeamDetails(result.data.response_data);
    }
    getNflTeamDetails(teamId);
  }, [teamId]);

  useEffect(() => {
    const currentTeam = queryParams.get("team");
    set_teamId(currentTeam);

    if (queryParams.size === 0 && nflTeamList && nflTeamList.length > 0) {
      set_teamId(nflTeamList[0].division[0].teams[0].team_id);
    }
  }, [location.search, nflTeamList]);

  const onChageDropdown = (e) => {
    const team = e.target.value;
    navigate(`/nfl/team-details/injuries?team=${team}`);
    set_teamId(team);
  };

  return (
    <>
      <Helmet>
        <title>
          Injuries | {nflTeamDetails ? nflTeamDetails.team_name + " | " : ""}{" "}
          {GlobalConfig.SITE_NAME}
        </title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Helmet>

      <div className="bg-black pb-5 mb-sm-5">
        <div className="scoreboard-page-bg d-flex flex-column">
          <ScroreBoard page="NFL" />
          <div className="py-5">
            <NflHero
              value="Injuries"
              logo={nflTeamDetails.logo_standard}
              team={nflTeamDetails.team_name}
            />
          </div>
        </div>

        <div className="mb-5 pb-5 margin-top-negative position-relative z-1 injuries-table-middle mt-16">
          <div className="container">
            <div className="row justify-content-end mx-0 mb-lg-5 mb-2">
              <div className="col-12 text-end mb-lg-4 mb-2 pe-0">
                <div className="d-flex align-items-center justify-content-end mt-3">
                  <h2 className="font-20 white mb-0">
                    <span className="ms-lg-4 ps-2">{getNflTeamPosition(nflTeamDetails)}</span>
                  </h2>
                  <NflFollowBtn teamId={teamId} />
                </div>
              </div>
              <div className="col-6 col-sm-5 col-md-4 col-lg-12 pe-0">
                <div className="d-flex justify-content-end mt-2 mt-lg-0 mb-2">
                  <select
                    className="form-select form-select-sm ps-4 py-lg-4 py-3 font-16 gamelog-select"
                    aria-label=".form-select-sm example"
                    onChange={onChageDropdown}
                    id="teamDropdown"
                    value={teamId}
                    style={{ marginBottom: "20px" }}
                  >
                    {getNflTeamListDropdown(nflTeamList)}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white">
              <InjuriesTable teamId={teamId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InjuriesMain;
