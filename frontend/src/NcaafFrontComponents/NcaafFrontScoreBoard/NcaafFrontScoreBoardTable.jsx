import { scoreBoardTableList } from "./Helper";
import PLayersToWatch from "./PLayersToWatch";

const NcaafFrontScoreBoardTable = () => {
  return (
    <>
      {scoreBoardTableList.map((item, index) => (
        <div className={`${index !== 0 ? "mt-4 pt-2" : ""}`} key={index}>
          {item.matchDate ? (
            <div className="ncaaf_schdule_table frontscore-minus-mb">
              <div className="container">
                <div className="table_heading d-flex flex-column justify-content-center">
                  <h2 className="text-center mw_400 white font-22 fw-semibold">{item.matchDate}</h2>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <div className="container">
            {item.PLayersWatch.map((item, index) => (
              <PLayersToWatch key={index} item={item} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NcaafFrontScoreBoardTable;
