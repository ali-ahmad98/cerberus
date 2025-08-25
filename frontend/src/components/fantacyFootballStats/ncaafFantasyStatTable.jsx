import NcaafFrontFantasyTableItem from "./NcaafFrontFantasyTableItem";

const NcaafFantasyStatTable = ({ allNflList }) => {
  return (
    <>
      <div className="container py-5 z-1 position-relative fantasy-stats mb-5">
        <div className="d-flex">
          {allNflList && allNflList.response_data?.NCAA.length != 0 && (
            <NcaafFrontFantasyTableItem allNflList={allNflList} />
          )}
        </div>
      </div>
      <div className="vh-25 d-none d-lg-block"></div>
    </>
  );
};

export default NcaafFantasyStatTable;
