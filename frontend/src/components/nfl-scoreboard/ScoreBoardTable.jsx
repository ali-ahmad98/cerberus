const ScoreBoardTable = ({ obj, index }) => {
  return (
    <>
      <table className="table text-nowrap w-100  " key={index}>
        <thead>
          <tr>
            <th
              className="font-18 fw-light ps-5 mb-0 border-right border-bottom min-width-300"
              scope="col"
            >
              {obj.matchTime}
            </th>
            <th className="font-18 fw-light ps-5 mb-0 border-right border-bottom min-width-100">
              T
            </th>

            <th
              className="font-18 fw-light ps-5 border-right border-left border-bottom min-width-250"
              scope="col"
            >
              TOP PERFORMERS
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row " className="border-right">
              <div className="d-flex ms-negative-23 pt-4">
                <div className="teamsImgs">
                  <span className="d-inline-block">
                    <img
                      className="table-img table-imgb"
                      src={obj?.awayTeam?.logo_standard}
                      alt="tableImg1"
                      style={{ width: "76px" }}
                    />
                  </span>
                </div>
                <div>
                  <p className="font-24 fw-normal mb-0" style={{ marginTop: "10px" }}>
                    {obj?.awayTeam?.team_name}
                  </p>
                  <p className="font-18 fw-light mb-0"></p>
                </div>
              </div>
              <div className="d-flex ms-negative-23 py-4 ">
                <div className="teamsImgs">
                  <span className="d-inline-block">
                    <img
                      className="table-img table-imgb"
                      src={obj?.homeTeam?.logo_standard}
                      alt="tableImg1"
                      style={{ width: "76px" }}
                    />
                  </span>
                </div>
                <div>
                  <p className="font-24 fw-normal mb-0" style={{ marginTop: "10px" }}>
                    {obj?.homeTeam?.team_name}
                  </p>
                  <p className="font-18 fw-light mb-0"></p>
                </div>
              </div>
            </th>
            <td className="font-18 fw-light text-start  px-0 d-flex flex-column ">
              <div className="totalScore">
                <p className="border-0 mx-2 font-28 fw-semibold" style={{ marginTop: "35px" }}>
                  {obj.awayTeamScore}
                </p>
                <p className="border-0 mx-2 font-28 fw-semibold">{obj.homeTeamScore}</p>
              </div>
            </td>
            <td className="font-14 fw-light text-start ps-5 border-left border-right">
              <div className="d-flex align-items-center py-1">
                <p className="mb-0 pe-3 min-width-55">PASS</p>
                <div className="border-left-custom ps-4">
                  <p className="mb-0 ">
                    <span className="fw-bold">
                      {Number(obj?.maxPassing?.awayteam?.player?.yards) >
                      Number(obj?.maxPassing?.hometeam?.player?.yards)
                        ? obj?.maxPassing?.awayteam?.player?.name
                        : obj?.maxPassing?.hometeam?.player?.name}
                    </span>
                    {obj.passNormalText}
                  </p>
                  <p className="mb-0 ">
                    {Number(obj?.maxPassing?.awayteam?.player?.yards) >
                    Number(obj?.maxPassing?.hometeam?.player?.yards)
                      ? obj?.maxPassing?.awayteam?.player?.yards
                      : obj?.maxPassing?.hometeam?.player?.yards}
                    &nbsp;YDS, &nbsp;
                    {Number(obj?.maxPassing?.awayteam?.player?.yards) >
                    Number(obj?.maxPassing?.hometeam?.player?.yards)
                      ? obj?.maxPassing?.awayteam?.player?.passing_touch_downs
                      : obj?.maxPassing?.hometeam?.player?.passing_touch_downs}
                    &nbsp;TD, &nbsp;
                    {Number(obj?.maxPassing?.awayteam?.player?.yards) >
                    Number(obj?.maxPassing?.hometeam?.player?.yards)
                      ? obj?.maxPassing?.awayteam?.player?.interceptions
                      : obj?.maxPassing?.hometeam?.player?.interceptions}
                    &nbsp;INT
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center py-3">
                <p className="mb-0 pe-3 min-width-55">RUSH</p>
                <div className="border-left-custom ps-4">
                  <p className="mb-0 ">
                    <span className="fw-bold">
                      {Number(obj?.maxRushing?.awayteam?.player?.yards) >
                      obj?.maxRushing?.hometeam?.player?.yards
                        ? obj?.maxRushing?.awayteam?.player?.name
                        : obj?.maxRushing?.hometeam?.player?.name}
                    </span>
                    {obj.rushNormalText}
                  </p>
                  <p className="mb-0 ">
                    {Number(obj?.maxRushing?.awayteam?.player?.yards) >
                    Number(obj?.maxRushing?.hometeam?.player?.yards)
                      ? obj?.maxRushing?.awayteam?.player?.total_rushes
                      : obj?.maxRushing?.hometeam?.player?.total_rushes}
                    &nbsp;CAR,&nbsp;
                    {Number(obj?.maxRushing?.awayteam?.player?.yards) >
                    Number(obj?.maxRushing?.hometeam?.player?.yards)
                      ? obj?.maxRushing?.awayteam?.player?.yards
                      : obj?.maxRushing?.hometeam?.player?.yards}
                    &nbsp;YDS, &nbsp;
                    {Number(obj?.maxRushing?.awayteam?.player?.yards) >
                    Number(obj?.maxRushing?.hometeam?.player?.yards)
                      ? obj?.maxRushing?.awayteam?.player?.rushing_touch_downs
                      : obj?.maxRushing?.hometeam?.player?.rushing_touch_downs}
                    &nbsp;TD, &nbsp;
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center py-1">
                <p className="mb-0 pe-3 min-width-55">REC</p>
                <div className="border-left-custom ps-4">
                  <p className="mb-0 ">
                    <span className="fw-bold">
                      {Number(obj?.maxReceiving?.awayteam?.player?.yards) >
                      Number(obj?.maxReceiving?.hometeam?.player?.yards)
                        ? obj?.maxReceiving?.awayteam?.player?.name
                        : obj?.maxReceiving?.hometeam?.player?.name}
                    </span>
                    {obj.recNormalText}
                  </p>
                  <p className="mb-0 ">
                    {Number(obj?.maxReceiving?.awayteam?.player?.yards) >
                    Number(obj?.maxReceiving?.hometeam?.player?.yards)
                      ? obj?.maxReceiving?.awayteam?.player?.total_receptions
                      : obj?.maxReceiving?.hometeam?.player?.total_receptions}
                    &nbsp;REC, &nbsp;
                    {Number(obj?.maxReceiving?.awayteam?.player?.yards) >
                    Number(obj?.maxReceiving?.hometeam?.player?.yards)
                      ? obj?.maxReceiving?.awayteam?.player?.yards
                      : obj?.maxReceiving?.hometeam?.player?.yards}
                    &nbsp;YDS, &nbsp;
                    {Number(obj?.maxReceiving?.awayteam?.player?.yards) >
                    Number(obj?.maxReceiving?.hometeam?.player?.yards)
                      ? obj?.maxReceiving?.awayteam?.player?.receiving_touch_downs
                      : obj?.maxReceiving?.hometeam?.player?.receiving_touch_downs}
                    &nbsp;TD, &nbsp;
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ScoreBoardTable;
