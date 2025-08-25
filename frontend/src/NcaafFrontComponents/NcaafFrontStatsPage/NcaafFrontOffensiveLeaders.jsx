import { ncaafFrontoffensiveLeaderList } from "./Helper";
import NcaafFrontOffensiveLeaderTableListItem from "./NcaafFrontOffensiveLeaderTableListItem";

const NcaafFrontOffensiveLeaders = () => {
  return (
    <>
      <div className="me-lg-3">
        <button className="nav_tabs_btn text-white btn table_heading mb-2">
          <span>OFFENSIVE LEADERS</span>
        </button>

        {ncaafFrontoffensiveLeaderList.map((item, index) => (
          <div className="bg-white w-100" key={index}>
            <div className="border-top-bottom-grey d-flex justify-content-between px-4 px-sm-5 py-3">
              <span className="font-16 text-black fw-semibold ms-sm-5">{item.listype}</span>
              <span className="font-16 text-black fw-semibold me-4">YDS</span>
            </div>
            {item.listplayers.map((player, index) => (
              <NcaafFrontOffensiveLeaderTableListItem key={index} player={player} id={index} />
            ))}
            <h6 className="p-5 blue fw-semibold font-18 mb-0">Complete Leaders</h6>
          </div>
        ))}
      </div>
    </>
  );
};

export default NcaafFrontOffensiveLeaders;
