import ScroreBoard from "../components/homepage/ScroreBoard";
import NcaafHero from "../components/common/NcaafHero";
import NcaafDepthChartTable from "../NcaafFrontComponents/NcaafDepthChart/NcaafDepthChartTable";
import { useLocation } from "react-router-dom";

const NcaafDepthChart = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const teamId = queryParams.get("team");

  return (
    <div className="bg-black pb-5 mb-sm-5">
      <div className="ncaaf-scoreboard-page-bg d-flex flex-column ">
        <ScroreBoard />
        <div className="pt-5">
          <NcaafHero value="DEPTH CHART" />
        </div>
      </div>
      <NcaafDepthChartTable teamId={teamId} />
    </div>
  );
};

export default NcaafDepthChart;
