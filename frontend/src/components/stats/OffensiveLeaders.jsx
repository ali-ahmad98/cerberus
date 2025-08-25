import OffensiveLeaderTableListItem from "./OffensiveLeaderTableListItem";

const OffensiveLeaders = ({ dataList }) => {
  return (
    <>
      <div className="me-lg-3">
        <button className="nav_tabs_btn  text-white btn">
          <span> OFFENSIVE LEADERS </span>
        </button>

        {dataList &&
          dataList.length > 0 &&
          dataList.map((item, index) => (
            <div className="bg-white w-100" key={index}>
              <div className="border-top-bottom-grey px-5 d-flex justify-content-between py-3">
                <span className="font-16 text-black fw-medium ms-5">{item.stat_category}</span>
                <span className="font-16 text-black fw-medium me-5">YDS</span>
              </div>
              {item.doc.map((player, index) => (
                <OffensiveLeaderTableListItem
                  key={index}
                  player={player.playerDetails}
                  id={index}
                  yards={player.yards ? player.yards : player.receiving_yards}
                />
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default OffensiveLeaders;
