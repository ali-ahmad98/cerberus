import { playerstatistics } from "../nfl-schedule/Helper";
import PlayerStatisticsListItem from "./PlayerStatisticsListItem";

const PlayerStatistics = () => {
  return (
    <>
      <div className="container pt-5">
        <div className="row">
          <div className="col-12">
            <button className="nav_tabs_btn  text-white btn">
              <span> PLAYER STATISTICS </span>
            </button>

            <table className="table bg-white">
              <thead className="border-0 px-4">
                <tr>
                  <th className="ps-5 py-4 border-0 font-16 text-black fw-medium text-start ">
                    OFFENSE
                  </th>
                  <th className="py-4 border-0 font-16 text-black fw-medium text-center">
                    <p className="max-w-140 text-start mx-auto"> DEFENSE</p>
                  </th>
                  <th className="pe-5 py-4 border-0 font-16 text-black fw-medium text-end">
                    <p className="max-w-140 text-start ms-auto">SPECIAL TEAMS</p>
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
    </>
  );
};

export default PlayerStatistics;
