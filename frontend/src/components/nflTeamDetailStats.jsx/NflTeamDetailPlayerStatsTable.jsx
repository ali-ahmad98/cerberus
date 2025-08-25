import NflTeamDetailStatsTableData from "./NflTeamDetailStatsTableData";
import StatsPlayers from "./StatsPlayers";

const NflTeamDetailPlayerStatsTable = ({ teamId, yearNo }) => {
  return (
    <div className="pb-5 mb-5">
      <div className="bg-white">
        <StatsPlayers teamId={teamId} yearNo={yearNo} />
        <NflTeamDetailStatsTableData teamId={teamId} yearNo={yearNo} />
      </div>
    </div>
  );
};

export default NflTeamDetailPlayerStatsTable;
