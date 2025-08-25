import NcaafFrontFantasyTableItem from "../../components/fantacyFootballStats/NcaafFrontFantasyTableItem";
import { fantasyFootballTableListMain } from "./Helper";

const NcaafFrontFantasyStatsTable = () => {
  return (
    <>
      <div className="container py-5 z-1 position-relative fantasy-stats mb-sm-5">
        <div className="d-flex justify-content-center justify-content-sm-start mb-negative-50 mb-xs-0 py-5 py-sm-0 position-relative">
          <button className="fantasy-btn"> COLLEGE</button>
          <button className="fantasy-btn ms-3"> NFL</button>
        </div>
        <div className="d-flex">
          {fantasyFootballTableListMain.map((item, index) => (
            <NcaafFrontFantasyTableItem key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="vh-50 d-none d-lg-block"></div>
    </>
  );
};

export default NcaafFrontFantasyStatsTable;
