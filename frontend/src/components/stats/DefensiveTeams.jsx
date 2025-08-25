import { offensiveTeamListData } from "../nfl-schedule/Helper";
import OffensiveTeamListItem from "./OffensiveTeamListItem";

const DefensiveTeams = () => {
  return (
    <>
      <div className="ms-lg-3">
        <button className="nav_tabs_btn  text-white btn">
          <span>DEFENSIVE TEAMS</span>
        </button>

        {offensiveTeamListData.map((item, index) => (
          <div className="bg-white w-100" key={index}>
            <div className="border-top-bottom-grey px-5 d-flex justify-content-between py-3">
              <span className="font-16 text-black fw-medium ms-5">{item.listype}</span>
              <span className="font-16 text-black fw-medium me-5">YDS/G</span>
            </div>
            {item.listplayers.map((player, index) => (
              <OffensiveTeamListItem key={index} player={player} id={index} />
            ))}
            <h6 className="p-5 blue fw-semibold font-18 mb-0">Complete Leaders</h6>
          </div>
        ))}
      </div>
    </>
  );
};

export default DefensiveTeams;
