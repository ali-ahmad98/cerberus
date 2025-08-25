import { Link } from "react-router-dom";

const StatsTablePassing = ({ nflPassingStatList }) => {
  return (
    <>
      {nflPassingStatList && nflPassingStatList.length > 0 && (
        <div className="w-100">
          <div className="border-top-bottom-grey border-top-0 d-flex justify-content-between pt-5 pb-4">
            <h3 className="font-28 fw-semibold px-4">Passing</h3>
          </div>

          <div className="table-responsive stats-details-table">
            <table className="table table-striped mb-0">
              <thead>
                <tr>
                  <th className="font-16 fw-semibold px-4 py-3 border-0" scope="col" colSpan="3">
                    <span>NAME</span>
                  </th>

                  <th
                    className="font-16 fw-semibold px-4 py-3 border-0 text-center"
                    scope="col"
                    colSpan="3"
                  >
                    <span>CMP</span>
                  </th>
                  <th
                    className="font-16 fw-semibold px-4 py-3 border-0 text-center"
                    scope="col"
                    colSpan="3"
                  >
                    <span>ATT</span>
                  </th>
                  <th
                    className="font-16 fw-semibold px-4 py-3 border-0 text-center"
                    scope="col"
                    colSpan="3"
                  >
                    <span>CMP%</span>
                  </th>
                  <th
                    className="font-16 fw-semibold px-4 py-3 border-0 text-center"
                    scope="col"
                    colSpan="3"
                  >
                    <span className="text-nowrap">YDS</span>
                  </th>
                  <th
                    className="font-16 fw-semibold px-4 py-3 border-0 text-center"
                    scope="col"
                    colSpan="3"
                  >
                    <span>AVG</span>
                  </th>
                  <th
                    className="font-16 fw-semibold px-4 py-3 border-0 text-center"
                    scope="col"
                    colSpan="3"
                  >
                    <span>YDS/G</span>
                  </th>
                  <th
                    className="font-16 fw-semibold px-4 py-3 border-0 text-center"
                    scope="col"
                    colSpan="3"
                  >
                    <span>LNG</span>
                  </th>
                  <th
                    className="font-16 fw-semibold px-4 py-3 border-0 text-center"
                    scope="col"
                    colSpan="3"
                  >
                    <span>TD</span>
                  </th>
                  <th
                    className="font-16 fw-semibold px-4 py-3 border-0 text-center"
                    scope="col"
                    colSpan="3"
                  >
                    <span>INT</span>
                  </th>
                  <th
                    className="font-16 fw-semibold px-4 py-3 border-0 text-center"
                    scope="col"
                    colSpan="3"
                  >
                    <span>SACK</span>
                  </th>
                  <th
                    className="font-16 fw-semibold px-4 py-3 border-0 text-center"
                    scope="col"
                    colSpan="3"
                  >
                    <span>SYL</span>
                  </th>
                  <th
                    className="font-16 fw-semibold px-4 py-3 border-0 text-center"
                    scope="col"
                    colSpan="3"
                  >
                    <span>RTG</span>
                  </th>
                </tr>
              </thead>

              <tbody className="border-0">
                {nflPassingStatList.map((obj, index) => (
                  <tr className="gamelog-tr" key={`passing${index}`}>
                    <td className="font-18 fw-medium blue text-start px-4 py-2" colSpan="3">
                      <Link to={`/nfl/player-profile/${obj.playerDetails.player_id}`}>
                        {obj.playerDetails.name ? obj.playerDetails.name : obj.playerDetails}
                      </Link>
                    </td>

                    <td className="font-16 fw-light color-grey text-center px-4 py-2" colSpan="3">
                      {obj.completions}
                    </td>
                    <td
                      className="font-16 fw-light color-grey px-4 py-2 text-center text-nowrap"
                      colSpan="3"
                    >
                      {obj.passing_attempts}
                    </td>
                    <td
                      className="font-16 fw-light color-grey px-4 py-2 text-center text-nowrap"
                      colSpan="3"
                    >
                      {obj.completion_pct}
                    </td>
                    <td
                      className="font-16 fw-light color-grey ps-4 pe-5 py-2 text-end text-nowrap yds_col"
                      colSpan="3"
                    >
                      {obj.yards}
                    </td>
                    <td
                      className="font-16 fw-light color-grey px-4 py-2 text-center text-nowrap"
                      colSpan="3"
                    >
                      {obj.yards_per_pass_avg}
                    </td>
                    <td
                      className="font-16 fw-light color-grey px-4 py-2 text-center text-nowrap"
                      colSpan="3"
                    >
                      {obj.yards_per_game}
                    </td>
                    <td
                      className="font-16 fw-light color-grey px-4 py-2 text-center text-nowrap"
                      colSpan="3"
                    >
                      {obj.longest_pass}
                    </td>
                    <td
                      className="font-16 fw-light color-grey px-4 py-2 text-center text-nowrap"
                      colSpan="3"
                    >
                      {obj.passing_touchdowns}
                    </td>
                    <td
                      className="font-16 fw-light color-grey px-4 py-2 text-center text-nowrap"
                      colSpan="3"
                    >
                      {obj.interceptions}
                    </td>
                    <td
                      className="font-16 fw-light color-grey px-4 py-2 text-center text-nowrap"
                      colSpan="3"
                    >
                      {obj.sacks}
                    </td>
                    <td
                      className="font-16 fw-light color-grey px-4 py-2 text-center text-nowrap"
                      colSpan="3"
                    >
                      {obj.sacked_yards_lost}
                    </td>
                    <td
                      className="font-16 fw-light color-grey px-4 py-2 text-center text-nowrap"
                      colSpan="3"
                    >
                      {obj.quaterback_rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default StatsTablePassing;
