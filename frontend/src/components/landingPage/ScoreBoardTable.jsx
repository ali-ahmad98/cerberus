import ScoreTableListItem from "./ScoreTableListItem";
import { getNflScoreList } from "./Helper";
import { useEffect, useState } from "react";

const ScoreBoardTable = () => {
  const [allNflScoreList, setAllNflScoreList] = useState([]);

  useEffect(() => {
    getNflScoreList((r) => {
      setAllNflScoreList(r);
    });
  }, []);

  return (
    <div className="row text-white ps-3 pe-xxl-0">
      {allNflScoreList.length != 0 &&
        allNflScoreList?.response_data.map((team, index) => (
          <ScoreTableListItem key={index} team={team} />
        ))}
    </div>
  );
};

export default ScoreBoardTable;
