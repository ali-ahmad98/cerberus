import NcaafFrontOffensiveLeaders from "./NcaafFrontOffensiveLeaders";
import NcaafFrontDefensiveLeaders from "./NcaafFrontDefensiveLeaders";
import NcaafFrontOffensiveTeams from "./NcaafFrontOffensiveTeams";
import NcaafFrontDefensiveTeams from "./NcaafFrontDefensiveTeams";

const NcaafFrontStatsLeaders = ({ setPlayerActive, isPlayerActive }) => {
  return (
    <>
      <div className="container mt-2 mt-sm-5 pt-lg-5">
        <div className="row flex-column flex-lg-row justify-content-between custom-width-97 mx-auto">
          <div className="col min-height-70">
            <button
              className={`me-2 me-sm-4 ${
                isPlayerActive === 0
                  ? "active-nav-btn-blue-scale active_tab_btn01"
                  : "text-black bg_white tab_btn01"
              }  nav_tabs_btn ms-sm-3 ms-2`}
              onClick={() => setPlayerActive(0)}
            >
              <span>PLAYER</span>
            </button>
            <button
              className={`${
                isPlayerActive === 1
                  ? "active-nav-btn-blue-scale active_tab_btn01"
                  : " text-black bg_white tab_btn01"
              }  nav_tabs_btn`}
              onClick={() => {
                setPlayerActive(1);
              }}
            >
              <span>TEAM</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container pt-4 pt-lg-5">
        <div className="row custom-width-97 mx-auto">
          <div className="col-12 col-lg-6">
            {isPlayerActive === 0 ? <NcaafFrontOffensiveLeaders /> : <NcaafFrontOffensiveTeams />}
          </div>
          <div className="col-12 col-lg-6 pt-4 mt-sm-2 pt-lg-0 mt-lg-0">
            {isPlayerActive === 0 ? <NcaafFrontDefensiveLeaders /> : <NcaafFrontDefensiveTeams />}
          </div>
        </div>
      </div>
    </>
  );
};

export default NcaafFrontStatsLeaders;
