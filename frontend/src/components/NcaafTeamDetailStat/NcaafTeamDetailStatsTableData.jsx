import { useEffect, useState } from "react";
import StatsTablePassing from "./StatsTablePassing";
import { getNcaaPlayerStatByTeamIdApi } from "../../service/NcaaService";
import StatsTableRushing from "./StatsTableRushing";
import StatsTableReceiving from "./StatsTableReceiving";
const NcaafTeamDetailStatsTableData = ({ teamId, yearNo }) => {
  const [ncaaStatListPassing, set_ncaaStatListPassing] = useState({});
  const [ncaaStatListRushing, set_ncaaStatListRushing] = useState({});
  const [ncaaStatListReceiving, set_ncaaStatListReceiving] = useState({});

  useEffect(() => {
    async function getNcaaPlayerStatByTeamId() {
      getNcaaPlayerStatByTeamIdApi(teamId || "1145", yearNo).then(function (result) {
        const response = result.data;
        set_ncaaStatListPassing(response.response_data.passing_data_list);
        set_ncaaStatListRushing(response.response_data.rushing_data_list);
        set_ncaaStatListReceiving(response.response_data.receiving_data_list);
      });
    }
    getNcaaPlayerStatByTeamId();
  }, [teamId, yearNo]);

  return (
    <>
      {ncaaStatListPassing && ncaaStatListPassing.length > 0 && (
        <StatsTablePassing ncaaStatListPassing={ncaaStatListPassing} />
      )}
      {ncaaStatListRushing && ncaaStatListRushing.length > 0 && (
        <StatsTableRushing ncaaStatListRushing={ncaaStatListRushing} />
      )}
      {ncaaStatListReceiving && ncaaStatListReceiving.length > 0 && (
        <StatsTableReceiving ncaaStatListReceiving={ncaaStatListReceiving} />
      )}
    </>
  );
};
export default NcaafTeamDetailStatsTableData;
