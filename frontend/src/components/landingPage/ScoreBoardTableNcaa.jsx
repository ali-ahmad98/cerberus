import React from "react";
import ScoreTableListItemNcaa from "./ScoreTableListItemNcaa";
import { getNcaaScoreList } from "./Helper";
import { useEffect, useState } from "react";

const ScoreBoardTableNcaa = () => {
  const [allNcaaScoreList, setAllNcaaScoreList] = useState([]);

  useEffect(() => {
    getNcaaScoreList((r) => {
      setAllNcaaScoreList(r);
    });
  }, []);

  return (
    <div className="row text-white ps-3 pe-xxl-0">
      {allNcaaScoreList.length != 0 &&
        allNcaaScoreList?.response_data.map((team, index) => (
          <ScoreTableListItemNcaa key={index} team={team} />
        ))}
    </div>
  );
};

export default ScoreBoardTableNcaa;
