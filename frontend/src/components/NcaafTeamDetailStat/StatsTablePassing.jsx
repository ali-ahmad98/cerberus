import { NcaafPassingStatTableTh } from "./Helper";
import btnBgImg from "../../Assets/img/gray-strip-btn-bg.png";
import { Link } from "react-router-dom";
import { getNcaaPlayerLink } from "../NCAA/HelperNcaa";

const StatsTablePassing = ({ ncaaStatListPassing }) => {
  return (
    <>
      <div className={`w-100 pt-2`}>
        <div
          className={`border-top-bottom-grey border-top-0 d-flex justify-content-between position-relative pb-2 }`}
        >
          <div className={`position-absolute d-none d-xl-block gray_strip_btn_bg}`}>
            <img src={btnBgImg} alt="" />
          </div>
          <h3
            className={`font-16 fw-semibold nav_tabs_stats_btn text-uppercase table_btn_custom_padding mb-0 custom_margin_left_minus}`}
          >
            <span className="table_details_stats_heading">Passing</span>
          </h3>
        </div>

        <div className="table-responsive stats-details-table team_leaders_overflow">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                {NcaafPassingStatTableTh.map((heading, index) => (
                  <th
                    className={`font-16 fw-semibold px-4 py-3 border-0 ${
                      heading == "NAME" && "team_stat_table_min_width"
                    }`}
                    key={index}
                    scope="col"
                    colSpan="3"
                  >
                    <span className="text-nowrap">
                      {heading}
                      {heading == "YDS" && <span className="ms-3"></span>}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="border-0 table_team_stat_heading">
              {ncaaStatListPassing &&
                ncaaStatListPassing.length > 0 &&
                ncaaStatListPassing.map((obj, index) => (
                  <tr className="gamelog-tr" key={index}>
                    <td className="font-18 fw-medium blue text-start px-4 py-2" colSpan="3">
                      <Link to={getNcaaPlayerLink(obj)}>{obj.player_name}</Link>
                      <span className="font-14 fw-light color-grey ms-2">{obj.name2}</span>
                    </td>

                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {obj.completions}
                    </td>

                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {obj.passing_attempts}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {obj.completion_pct}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2 yds_col" colSpan="3">
                      {obj.yards}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {obj.yards_per_pass_avg}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {Number(obj.yards_per_game) ? obj.yards_per_game : 0}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {obj.longest_pass}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {obj.passing_touchdowns}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {Number(obj.interceptions) ? obj.interceptions : 0}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {obj.sacks}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {obj.sacked_yards_lost}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {obj.quaterback_rating}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default StatsTablePassing;
