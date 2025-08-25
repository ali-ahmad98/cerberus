import { useState } from "react";
import ScroreBoard from "../components/homepage/ScroreBoard";
import Leaders from "../NcaafFrontComponents/NcaafSeasonLeaders/Leaders";
import LeaderTable from "../NcaafFrontComponents/NcaafSeasonLeaders/LeaderTable";
import LeaderWeeklyTable from "../NcaafFrontComponents/NcaafWeeklyLeaders/LeaderWeeklyTable";

const NcaafSeasonLeaders = () => {
  const [isPlayerActive, setPlayerActive] = useState(0);

  return (
    <>
      <section className="ranking_bg ncaaf_leader_table_bg">
        <ScroreBoard />
        {isPlayerActive === 0 ? (
          <Leaders />
        ) : (
          <div className="qbr-weekly-hero-heading">
            <Leaders />
          </div>
        )}

        <div className="container container-standings pt-5 pb-xl-5 mb-2">
          <div className="row">
            <div className="col-12">
              <div className="col ps-md-4 z-5 custom-height-fbs-btns">
                <button
                  className={`${
                    isPlayerActive === 0 ? "active-nav-btn-blue-scale " : "text-black bg_white"
                  } nav_tabs_btn standingsIAbtn me-2 ms-sm-2 text-uppercase mt-2`}
                  onClick={() => setPlayerActive(0)}
                >
                  <span>Season Leaders</span>
                </button>

                <button
                  className={`${
                    isPlayerActive === 1 ? "active-nav-btn-blue-scale" : " text-black bg_white"
                  } nav_tabs_btn standingsIAbtn text-uppercase mt-2 ms-sm-1`}
                  onClick={() => {
                    setPlayerActive(1);
                  }}
                >
                  <span>Weekly Leaders</span>
                </button>

                <button
                  className={`${
                    isPlayerActive === 2 ? "active-nav-btn-blue-scale " : "text-black bg_white"
                  } nav_tabs_btn standingsIAbtn text-uppercase mt-2 mx-sm-2`}
                  onClick={() => setPlayerActive(2)}
                >
                  <span>All-Time Bests</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {isPlayerActive === 0 ? <LeaderTable /> : <LeaderWeeklyTable />}
      </section>
    </>
  );
};

export default NcaafSeasonLeaders;
