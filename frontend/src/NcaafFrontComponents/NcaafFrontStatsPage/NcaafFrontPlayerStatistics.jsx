import { playerstatistics } from "../../components/nfl-schedule/Helper";
import PlayerStatisticsListItem from "../../components/stats/PlayerStatisticsListItem";

const NcaafFrontPlayerStatistics = () => {
  return (
    <>
      <div className="container pt-4 mt-sm-2">
        <div className="row">
          <div className="col-12">
            <button className="nav_tabs_btn text-white btn table_heading mb-3">
              <span>PLAYER STATISTICS</span>
            </button>

            <div className="table-responsive position-relative table-bg-line px-4">
              <table className="table bg-white table_bg position-relative z-1 player-statistics-table">
                <thead className="border-0">
                  <tr>
                    <th className="ps-5 py-3 align-middle border-0 font-16 text-black fw-bold text-start">
                      OFFENSE
                    </th>
                    <th className="py-3 align-middle border-0 font-16 text-black fw-bold text-center">
                      <p className="max-w-140 text-start mx-auto mb-0">DEFENSE</p>
                    </th>
                    <th className="pe-5 py-3 align-middle border-0 font-16 text-black fw-bold text-end">
                      <p className="max-w-140 text-start ms-auto mb-0 text-nowrap">SPECIAL TEAMS</p>
                    </th>
                  </tr>
                </thead>

                {playerstatistics.map((player, index) => (
                  <PlayerStatisticsListItem key={index} obj={player} id={index} />
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NcaafFrontPlayerStatistics;
