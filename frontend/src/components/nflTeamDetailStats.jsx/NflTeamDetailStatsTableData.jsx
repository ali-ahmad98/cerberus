import { useEffect, useState } from "react";
import { getNflPlayerStatByTeamIdApi } from "../../service/thirdPartyDataService";
import StatsTablePassing from "./StatsTablePassing";
import StatsTableRushing from "./StatsTableRushing";
import StatsTableReceiving from "./StatsTableReceiving";

const NflTeamDetailStatsTableData = ({ teamId, yearNo }) => {
  const [nflPassingStatList, set_nflPassingStatList] = useState({});
  const [nflRushingStatList, set_nflRushingStatList] = useState({});
  const [nflReceivingStatList, set_nflReceivingStatList] = useState({});

  useEffect(() => {
    async function getNflPlayerStatByTeamId() {
      getNflPlayerStatByTeamIdApi(teamId, yearNo).then(function (result) {
        const response_data = result.data.response_data;
        set_nflPassingStatList(response_data.passing_data_list);
        set_nflRushingStatList(response_data.rushing_data_list);
        set_nflReceivingStatList(response_data.receiving_data_list);
      });
    }
    getNflPlayerStatByTeamId();
  }, [teamId, yearNo]);

  return (
    <>
      <StatsTablePassing nflPassingStatList={nflPassingStatList} />
      <StatsTableRushing nflRushingStatList={nflRushingStatList} />
      <StatsTableReceiving nflReceivingStatList={nflReceivingStatList} />
    </>
  );
};

export default NflTeamDetailStatsTableData;
