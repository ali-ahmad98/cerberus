import NflFrontFantasyTableItem from "./NflFrontFantasyTableItem";

const FantasyStatsTable = ({ allNflList }) => {
  return (
    <>
      <div className="container py-5 z-1 position-relative fantasy-stats mb-5">
        <div className="d-flex">
          {allNflList && allNflList.response_data?.NFL.length != 0 && (
            <NflFrontFantasyTableItem allNflList={allNflList} />
          )}
        </div>
      </div>
      <div className="vh-25 d-none d-lg-block"></div>
    </>
  );
};

export default FantasyStatsTable;
