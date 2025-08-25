import { format } from "date-fns";

const ScoreTableListItem = ({ team }) => {
  return (
    <>
      <div className="col-md-6 d-md-flex align-items-center justify-content-center">
        {/* FIRST TEAM  */}
        <div
          className={` py-4 w-100 ncaafResp ${
            team.roww % 2 === 0 ? "bg-light-grey bg-xs-light-black" : "bg-light-black"
          }`}
        >
          <div className="row align-items-center ncaafRespWdth mx-0 my-3 py-1">
            <div className="col-sm-7 col-8 d-flex align-items-center">
              <div className="score-board-table-img me-3 d-inline-block position-relative">
                <img src={team.awayTeam.logo_standard} alt="horseImg" />
              </div>
              <span className="ps-4 font-18 fw-normal">{team.awayTeam.team_name}</span>
            </div>
            <div className="col-sm-3 col-4">
              <p className="mb-0 font-16 fw-normal">
                {team.awayTeamScore}-{team.homeTeamScore}
              </p>
            </div>
            <div className="col-sm-2 col-4">
              <p className="mb-0 font-16 fw-normal">
                {format(new Date(team.matchDate), "MM-dd-yyyy")}
              </p>
            </div>
            <div className="col-12 text-end">
              <p className="mb-0 font-15 fw-normal pe-sm-5 pe-3">{team.matchTime}</p>
            </div>
            <div className="col-sm-7 col-8 d-flex align-items-center">
              <div className="score-board-table-img-2 me-3 d-inline-block position-relative">
                <img src={team.homeTeam.logo_standard} alt="textImg" />
              </div>
              <span className="ps-4 font-18 fw-normal">{team.homeTeam.team_name}</span>
            </div>
            <div className="col-sm-5 col-4">
              <p className="mb-0 font-16 fw-normal">
                {team.homeTeamScore}-{team.awayTeamScore}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreTableListItem;
