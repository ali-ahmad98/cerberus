import { useEffect, useState } from "react";
import ScroreBoard from "../components/homepage/ScroreBoard";
import NcaafRosterTable from "../components/NcaafTeamDetailRoster/NcaafRosterTable";
import GlobalConfig from "../GlobalConfig";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

import { getNcaaTeamDetailsApi, getNcaaTeamListApi } from "../service/NcaaService";

const NcaafTeamDetailRoster = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [teamId, set_teamId] = useState(queryParams.get("team"));
  const [teamDetails, set_teamDetails] = useState({});
  const [ncaaTeamList, set_ncaaTeamList] = useState({});

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
    set_teamId(queryParams.get("team"));

    if (queryParams.size == 0 && ncaaTeamList && ncaaTeamList.length > 0) {
      set_teamId(ncaaTeamList[0].team_id);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Roster | {teamDetails ? teamDetails.team_name + " | " : ""} {GlobalConfig.SITE_NAME}
        </title>
        <meta name="description" content={`Roster | NCAAF | ${GlobalConfig.SITE_NAME}`} />
        <meta name="keywords" content={`Roster | NCAAF | ${GlobalConfig.SITE_NAME}`} />
      </Helmet>
      <div className="bg-black pb-5 mb-sm-5">
        <div className="ncaaf-scoreboard-page-bg d-flex flex-column ">
          <ScroreBoard page="NCAAF" />
        </div>

        <NcaafRosterTable teamNameId={teamId} teamList={ncaaTeamList} />
      </div>
    </>
  );
};

export default NcaafTeamDetailRoster;
