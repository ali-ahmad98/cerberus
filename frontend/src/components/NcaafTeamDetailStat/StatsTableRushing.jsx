import { NcaafRushingStatTableTh } from "./Helper";
import btnBgImg from "../../Assets/img/gray-strip-btn-bg.png";
import { Link } from "react-router-dom";
import { getNcaaPlayerLink } from "../NCAA/HelperNcaa";

const StatsTableRushing = ({ ncaaStatListRushing }) => {
  return (
    <>
      <div className={`w-100  pt-2`}>
        <div
          className={`border-top-bottom-grey border-top-0 d-flex justify-content-between position-relative pb-2"
              }`}
        >
          <div className={`position-absolute d-none d-xl-block gray_strip_btn_bg_2}`}>
            <img src={btnBgImg} alt="" />
          </div>
          <h3
            className={`font-16 fw-semibold nav_tabs_stats_btn text-uppercase table_btn_custom_padding mb-0 custom_margin_left_minus_2`}
          >
            <span className="table_details_stats_heading">Rushing</span>
          </h3>
        </div>

        <div className="table-responsive stats-details-table team_leaders_overflow">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                {NcaafRushingStatTableTh.map((heading, index) => (
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
              {ncaaStatListRushing &&
                ncaaStatListRushing.length > 0 &&
                ncaaStatListRushing.map((obj, index) => (
                  <tr className="gamelog-tr" key={index}>
                    <td className="font-18 fw-medium blue text-start px-4 py-2" colSpan="3">
                      <Link to={getNcaaPlayerLink(obj)}>{obj.player_name}</Link>
                      <span className="font-14 fw-light color-grey ms-2"> {obj.name2} </span>
                    </td>

                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {obj.rushing_attempts}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2 yds_col" colSpan="3">
                      {obj.yards}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {obj.yards_per_rush_avg}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {obj.longest_rush}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {Number(obj.over_20_yards) ? obj.over_20_yards : 0}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {obj.rushing_touchdowns}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {Number(obj.yards_per_game) ? obj.yards_per_game : 0}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {Number(obj.fumbles) ? obj.fumbles : 0}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {Number(obj.fumbles_lost) ? obj.fumbles_lost : 0}
                    </td>
                    <td className="font-18 fw-medium text-start px-4 py-2" colSpan="3">
                      {Number(obj.rushing_first_downs) ? obj.rushing_first_downs : 0}
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
export default StatsTableRushing;
