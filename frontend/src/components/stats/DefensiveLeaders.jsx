import { defensiveLeaderList } from "../nfl-schedule/Helper";
import OffensiveLeaderTableListItem from "./OffensiveLeaderTableListItem";

const DefensiveLeaders = () => {
  return (
    <>
      <div className="ms-lg-3">
        <button className="nav_tabs_btn  text-white btn">
          <span>DEFENSIVE LEADERS</span>
        </button>

        {defensiveLeaderList.map((item, index) => (
          <div className="bg-white w-100" key={index}>
            <div className="border-top-bottom-grey px-5 d-flex justify-content-between py-3">
              <span className="font-16 text-black fw-medium ms-5">{item.listype}</span>
              <span className="font-16 text-black fw-medium me-5">YDS</span>
            </div>
            {item.listplayers.map((player, index) => (
              <OffensiveLeaderTableListItem key={index} player={player} id={index} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default DefensiveLeaders;
