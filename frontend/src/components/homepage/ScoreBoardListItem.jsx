import { ScoreBoardIcon, ScoreBoarRotatedIcon } from "../icons/Icons";
import { format } from "date-fns";

const ScoreBoardListItem = ({ scoreRow }) => {
  const addOneDayToDate = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };

  return (
    <>
      <div className="h-100 pb-3 d-flex flex-column  point-box" style={{ marginLeft: "0px" }}>
        <div className="text-center timingResult  d-flex py-2">
          <span className="d--inline-block ml-5">
            {format(addOneDayToDate(scoreRow.matchDate), "MM-dd-yyyy")}
          </span>
        </div>
        <div className="box d-flex customFlex">
          <div className="d-flex align-items-center ">
            <div className="flag-box ml-4 p-3">
              <img
                src={scoreRow?.awayTeam?.logo_standard}
                style={{ maxWidth: "30px", height: "30px", objectFit: "contain" }}
              />
            </div>
            <h4 className="team-title mb-0 ml-3">{scoreRow?.awayTeam?.team_code}</h4>
          </div>

          <div className="d-flex ml-5 align-items-center">
            <div className="team-score">{scoreRow.awayTeamScore}</div>
            <span>
              <ScoreBoarRotatedIcon />
            </span>
          </div>
        </div>
        <div className="box mt-3 d-flex customFlex">
          <div className="d-flex align-items-center ">
            <div className="flag-box ml-4 p-3">
              <img
                src={scoreRow?.homeTeam?.logo_standard}
                style={{ maxWidth: "30px", height: "30px", objectFit: "contain" }}
              />

              <ScoreBoardIcon />
            </div>
            <h4 className="team-title mb-0 ml-3">{scoreRow?.homeTeam?.team_code}</h4>
          </div>

          <div className="d-flex ml-5 align-items-center">
            <div className="team-score">{scoreRow?.homeTeamScore}</div>
            <span>
              <ScoreBoarRotatedIcon />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreBoardListItem;
