import { NcaafDepthTableList } from "./Helper";
import btnBgImg from "../../Assets/img/gray-strip-btn-bg.png";
import NcaaFollowBtn from "../../components/NCAA/NcaaFollowBtn";

const NcaafDepthChartTable = ({ teamId }) => {
  return (
    <>
      <div className="container pb-5 mb-5 position-relative z-1 depth-chart-table mt_minus ncaaf-depth-chart-table">
        <div className="row justify-content-end pb-sm-2 pb-md-3">
          <div className="col-12 text-end mb-3">
            <h3 className="font-20 white me-3 pe-xl-2 text-start text-md-end mb-0 ">
              7 <span className="fw-bold">CINCINNATI BEARCATS</span>
            </h3>
            <div className="d-flex align-items-center justify-content-md-end pt-2 ms-md-2">
              <h2 className="font-16 white mb-0 fw-light opacity_07">
                <span className="ms-lg-4 ps-2 fw-light opacity_07">1ST IN AMERICAN</span>
              </h2>
              <NcaaFollowBtn teamId={teamId} />
            </div>
          </div>
          <div className="col-12 col-lg-5 d-md-flex justify-content-lg-end align-items-center mt-3 mt-sm-4 mt-lg-2 mb-3 mb-sm-2">
            <select
              className="form-select form-select-sm ms-lg-3 ps-sm-4 py-sm-4 py-3 font-16 sellect custom_height_60 team_select_custom_min_width"
              aria-label=".form-select-sm example"
            >
              <option selected>More American Teams</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <select
              className="form-select form-select-sm ms-md-4 ps-sm-4 py-sm-4 py-3 font-16 sellect  custom_height_60 team_select_custom_min_width mt-3 mt-md-0"
              aria-label=".form-select-sm example"
            >
              <option selected>2020 Regular Season</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <div className="ms-md-4 mt-3 mt-md-0 text-center text-md-start">
              <button className="font-16 fw-light white team_schedule_calendar_btn custom_height_60 w-100">
                Add to calendar
              </button>
            </div>
          </div>
        </div>

        {NcaafDepthTableList.map((obj, index) => (
          <div key={index} className="mb-0 bg-white">
            <div
              className={`border-top-bottom-grey border-top-0 d-flex justify-content-between position-relative ${
                index === 0 ? "py-2" : "pb-3 pt-5"
              }`}
            >
              <div
                className={`position-absolute d-none d-xl-block ${
                  index === 0 ? "roster_gray_strip_btn_bg" : "roster_gray_strip_btn_bg_2"
                }`}
              >
                <img src={btnBgImg} alt="btn-img" />
              </div>
              <h3
                className={`${
                  obj.mainHeading === "Offense"
                    ? "custom_margin_left_minus "
                    : "custom_margin_left_minus_2"
                }${
                  obj.mainHeading === "Special Teams"
                    ? " roster_table_btn_padding"
                    : " roster_table_btn_padding_2"
                } font-16 fw-semibold nav_tabs_stats_btn text-uppercase mb-0 transform_unset`}
              >
                <span className="table_details_stats_heading">{obj.mainHeading}</span>
              </h3>
            </div>
            <div className="table-responsive  mb-0">
              <table class="table bg-white mb-0">
                <thead>
                  <tr className="border-top-custom border-bottom-1px">
                    <th className="font-16 fw-semibold border-left-0" scope="col"></th>
                    <th className="font-16 fw-semibold border-left-0" scope="col">
                      STARTER
                    </th>
                    <th className="font-16 fw-semibold" scope="col">
                      2ND
                    </th>
                    <th className="font-16 fw-semibold" scope="col">
                      3RD
                    </th>
                    <th className="font-16 fw-semibold" scope="col">
                      4TH
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {obj.tableContent.map((item, index) => (
                    <tr
                      key={index}
                      className={` border-0 ${index % 2 == 0 ? "bg-white" : "bg-very-light-grey"}`}
                    >
                      <td className="text-start border-0 py-4 lh-40 font-18 fw-normal text-light-gray ps-4     depth-srno-custom-width">
                        {item.srNo}
                      </td>
                      <td className="text-start border-0 py-4 lh-40 font-16 fw-normal text-light-blue     depth-starter-custom-width">
                        <div className="d-flex align-items-center">
                          <p className="mb-0">{item.starter}</p>
                          {item.index === "starter" ? (
                            <p className="text-danger ps-1 mb-0">{item && item.RedValue}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                      <td className="text-start border-0 py-4 lh-40 font-16 fw-normal text-light-blue     depth-secondd-custom-width">
                        <div className="d-flex align-items-center     position-relative">
                          <p className="font-20 fw-normal text-light-gray ff-segoe-ui mb-0 position-absolute sup-position-text text-uppercase">
                            {item.supSecondd}
                          </p>
                          <p className="mb-0">{item.secondd}</p>
                          {item.index === "secondd" ? (
                            <p className="text-danger ps-1 mb-0">{item && item.RedValue}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                      <td className="text-start border-0 py-4 lh-40 font-16 fw-normal text-light-blue     depth-third-custom-width">
                        <div className="d-flex align-items-center">
                          {item.thirdd}
                          {item.index === "thirdd" ? (
                            <p className="text-danger ps-1 mb-0">{item && item.RedValue}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                      <td className="text-start border-0 py-4 lh-40 font-16 fw-normal text-light-blue     depth-fourth-custom-width">
                        <div className="d-flex align-items-center">
                          {item.fourthh}
                          {item.index === "fourthh" ? (
                            <p className="text-danger ps-1 mb-0">{item && item.RedValue}</p>
                          ) : item.index2 === "fourthh" ? (
                            <p className="text-danger ps-1 mb-0">{item && item.RedValue}</p>
                          ) : item.index3 === "fifthh" ? (
                            <p className="text-danger ps-1 mb-0">{item && item.RedValue2}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NcaafDepthChartTable;
