import { useEffect } from "react";
import ScroreBoard from "../components/homepage/ScroreBoard";
import NcaafTeamScheduleTable from "../components/ncaafTeamDetailSchedule.jsx/NcaafTeamScheduleTable";
import { useLocation } from "react-router-dom";
import { getNcaaTeamDetailsApi } from "../service/NcaaService";

const NcaafTeamDetailSchedule = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get("team");

  useEffect(() => {
    async function getNcaaTeamDetails() {
      getNcaaTeamDetailsApi(teamId).then(function () {});
    }
    getNcaaTeamDetails();
  }, [teamId]);

  return (
    <div className="pb-5 mb-sm-5">
      <div className="ncaaf-scoreboard-page-bg d-flex flex-column ">
        <ScroreBoard />
      </div>
      <NcaafTeamScheduleTable />
    </div>
  );
};

export default NcaafTeamDetailSchedule;
