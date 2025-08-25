import { useState } from "react";
import ScroreBoard from "../components/homepage/ScroreBoard";
import NcaafFrontPlayerStatistics from "../NcaafFrontComponents/NcaafFrontStatsPage/NcaafFrontPlayerStatistics";
import NcaafFrontSelect from "../NcaafFrontComponents/NcaafFrontStatsPage/NcaafFrontSelect";
import NcaafFrontStatsLeaders from "../NcaafFrontComponents/NcaafFrontStatsPage/NcaafFrontStatsLeaders";
import NcaafFrontTeamStatistics from "../NcaafFrontComponents/NcaafFrontStatsPage/NcaafFrontTeamStatistics";

const NcaafFrontStatsPage = () => {
  const [isPlayerActive, setPlayerActive] = useState(0);

  return (
    <div className="position-relative ncaaf-front-bg-1a1a1a ncaaf-front-football-stats pb-5">
      <div className="ncaaf-standings-page ncaaf-stats-page d-flex flex-column">
        <ScroreBoard />
        <h1 className="font-42 white fw-bold text-center pb-5 py-sm-5 my-5 text-uppercase">
          College Football Stat Leaders 2020
        </h1>
      </div>
      {isPlayerActive && (
        <NcaafFrontSelect
          ncaaffrontSelectheading1="2020"
          ncaaffrontSelectheading2="All Conferences"
          ncaaffrontSelectheading3="Conferences"
        />
      )}
      <NcaafFrontStatsLeaders isPlayerActive={isPlayerActive} setPlayerActive={setPlayerActive} />
      <NcaafFrontPlayerStatistics />
      <NcaafFrontTeamStatistics />
    </div>
  );
};

export default NcaafFrontStatsPage;
