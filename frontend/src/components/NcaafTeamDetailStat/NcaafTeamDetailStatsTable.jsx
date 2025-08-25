import NcaafStatsPlayers from "./NcaafStatsPlayers";
import NcaafTeamDetailStatsTableData from "./NcaafTeamDetailStatsTableData";

const NcaafTeamDetailStatsTable = ({ teamId, yearNo }) => {
  return (
    <>
      <div className="pb-5 mb-sm-5">
        <NcaafStatsPlayers teamId={teamId} yearNo={yearNo} />
        <div className="bg-white mt-4 mb-md-5">
          <NcaafTeamDetailStatsTableData teamId={teamId} yearNo={yearNo} />
        </div>
      </div>
    </>
  );
};

export default NcaafTeamDetailStatsTable;
