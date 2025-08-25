import { useState } from "react";
import ScroreBoard from "../../components/homepage/ScroreBoard";
import NcaafFrontStandingsAATable from "../NcaafFrontStandingsFCSAA/NcaafFrontStandingsAATable";
import NcaafFrontStandingsIAHeader from "./NcaafFrontStandingsIAHeader";
import NcaafFrontStandingsIATable from "./NcaafFrontStandingsIATable";

const NcaafFrontStandingsIABody = () => {
  const [isPlayerActive, setPlayerActive] = useState(0);

  return (
    <>
      <section className="ncaaf-front-bg-1a1a1a pb-5">
        <div className="ncaaf-standings-page">
          <ScroreBoard page="NCAAF" />
          {isPlayerActive === 0 ? (
            <NcaafFrontStandingsIAHeader FrontStandingsIAHeading="College Football Standings" />
          ) : (
            <NcaafFrontStandingsIAHeader FrontStandingsIAHeading="College Football FCS (Division I-AA) Standings" />
          )}

          <div className="container container-standings pt-5">
            <button
              className={`${
                isPlayerActive === 0 ? "active-nav-btn-blue-scale " : "text-black bg_white"
              } nav_tabs_btn standingsIAbtn me-2 ms-sm-2 text-uppercase mt-2`}
              onClick={() => setPlayerActive(0)}
            >
              <span>FBS (Division I-A)</span>
            </button>
          </div>
        </div>

        <div className="container container-standings nfl-team-stats pb-5">
          {isPlayerActive % 2 === 0 ? (
            <NcaafFrontStandingsIATable />
          ) : (
            <NcaafFrontStandingsAATable />
          )}
        </div>
      </section>
    </>
  );
};

export default NcaafFrontStandingsIABody;
