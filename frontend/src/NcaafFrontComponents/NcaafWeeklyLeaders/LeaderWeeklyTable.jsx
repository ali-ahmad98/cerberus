import DownArrowIcon from "../../Assets/arrow-down-white.svg";
import { ncaafWeeklyLeaderData } from "./Helper";

const LeaderWeeklyTable = () => {
  return (
    <>
      <section className="pb-326">
        {ncaafWeeklyLeaderData.map((obj, index) => (
          <div key={index}>
            <div className="container container-standings mt-2 mt-md-0">
              <div className="table_heading d-flex flex-column justify-content-center">
                <h2 className="text-center mw_400 white font-22 fw-semibold">{obj.date}</h2>
              </div>
            </div>
            <div className="pt-3 pb-3">
              <div className="container container-standings nfl-team-stats">
                <div className="table-responsive px-xl-4 position-relative   mb-0">
                  <table className="table text-nowrap table-striped position-relative z-1 table_bg   mb-0">
                    <thead>
                      <tr className="py-4">
                        <th
                          className="white border-0 py-4 font-16 fw-medium text-decoration-underline  width-60 text-end"
                          scope="col"
                        >
                          RK
                        </th>
                        <th className="white border-0 py-4   border-right-custom" scope="col">
                          <h2 className="ps-4 font-16 fw-medium">NAME</h2>
                        </th>
                        <th
                          className="white border-0 py-4 text-center font-16 fw-medium text-decoration-underline"
                          scope="col"
                        >
                          WEEK
                        </th>
                        <th
                          className="white border-0 py-4 font-16 fw-medium text-decoration-underline   px-4"
                          scope="col"
                        >
                          RESULT
                        </th>
                        <th
                          className="white border-0 py-4 text-center font-16 fw-medium text-decoration-underline"
                          scope="col"
                        >
                          <span className="text-nowrap">
                            QBR
                            <span className="ms-3">
                              <img
                                className="down-arrow-icon mb-1"
                                src={DownArrowIcon}
                                alt="DownArrowIcon"
                              />
                            </span>
                          </span>
                        </th>
                        <th
                          className="white border-0 py-4 text-center font-16 fw-medium text-decoration-underline"
                          scope="col"
                        >
                          PAA
                        </th>
                        <th
                          className="white border-0 py-4 text-center font-16 fw-medium text-decoration-underline"
                          scope="col"
                        >
                          PLAYS
                        </th>
                        <th
                          className="white border-0 py-4 text-center font-16 fw-medium text-decoration-underline"
                          scope="col"
                        >
                          EPA
                        </th>
                        <th
                          className="white border-0 py-4 text-center font-16 fw-medium text-decoration-underline"
                          scope="col"
                        >
                          PASS
                        </th>
                        <th
                          className="white border-0 py-4 text-center font-16 fw-medium text-decoration-underline"
                          scope="col"
                        >
                          RUN
                        </th>
                        <th
                          className="white border-0 py-4 text-center font-16 fw-medium text-decoration-underline"
                          scope="col"
                        >
                          SACK
                        </th>
                        <th
                          className="white border-0 py-4 text-center font-16 fw-medium text-decoration-underline"
                          scope="col"
                        >
                          PEN
                        </th>
                        <th
                          className="white border-0 py-4 text-center font-16 fw-medium text-decoration-underline"
                          scope="col"
                        >
                          RAW
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white border-0">
                      {obj.ncaafLeaderTableData.map((item, index) => (
                        <tr key={index}>
                          <>
                            <td className="border-0 py-4 pe-4 width-60 text-end">
                              <h2 className="black font-18 opacity-75 mb-0">{item.SrNo}</h2>
                            </td>
                            <td className="blue text-start font-18 border-0 py-4 border-right-custom   min-width-250 pe-4">
                              <img className="me-5 mobile_image" src={item.imgUrl} alt="imgUrl" />
                              <span className="ms-3">
                                {item.Name}
                                <span className="grey font-18 ps-2 opacity-75">
                                  {item.NameGrayText}
                                </span>
                              </span>
                            </td>
                            <td className="grey opacity-75 text-start font-18 border-0 py-4 custom_width_86  text-center">
                              {item.Week}
                            </td>
                            <td className="grey opacity-75 text-start font-18 border-0 py-4 custom_width_86    px-4">
                              <span className="green">{item.resultGreenText}</span>
                              <span className="blue px-2">{item.resultBlueText}</span>
                              {item.resultGrayText}
                              <span className="text-uppercase ps-2">
                                {item.resultGrayTextUppercase}
                              </span>
                            </td>
                            <td className="grey opacity-75 text-start font-18 border-0 py-4 custom_width_86  text-center  yds_col">
                              {item.Qbr}
                            </td>
                            <td className="grey opacity-75 text-start font-18 border-0 py-4 custom_width_86  text-center">
                              {item.Paa}
                            </td>
                            <td className="grey opacity-75 text-start font-18 border-0 py-4 custom_width_86  text-center">
                              {item.Plays}
                            </td>
                            <td className="grey opacity-75 text-start font-18 border-0 py-4 custom_width_86  text-center">
                              {item.Epa}
                            </td>
                            <td className="grey opacity-75 text-start font-18 border-0 py-4 custom_width_86  text-center">
                              {item.Pass}
                            </td>
                            <td className="grey opacity-75 text-start font-18 border-0 py-4 custom_width_86  text-center">
                              {item.Run}
                            </td>
                            <td className="grey opacity-75 text-start font-18 border-0 py-4 custom_width_86  text-center">
                              {item.Sack}
                            </td>
                            <td className="grey opacity-75 text-start font-18 border-0 py-4 custom_width_86  text-center">
                              {item.Pen}
                            </td>
                            <td className="grey opacity-75 text-start font-18 border-0 py-4 custom_width_86  text-center">
                              {item.Raw}
                            </td>
                          </>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-xl-4">
                  <div className="bg-white py-4 py-sm-5 px-2 ps-sm-4">
                    <a
                      className="text-capitalize text-decoration-none font-18 fw-medium blue mb-0"
                      href="#"
                    >
                      Show More
                    </a>
                  </div>
                </div>
                <div className="px-xl-4">
                  <p className="text-capitalize font-18 fw-light grey mb-0 py-4 py-sm-5 px-2 ps-sm-4 border-bottom   border-top-custom bg-white">
                    Season Leaders: To qualify, a player must play a minimum of 20 action plays per
                    team game
                  </p>
                  <div className="bg-white row align-items-center mx-0">
                    <div className="col-md-6 ps-sm-4 pb-4 h-100 pe-sm-4 border-right-custom">
                      <div className="px-sm-4">
                        <p className="font-16 black fw-semibold mt-3 mt-sm-0 pt-4 pt-sm-5">
                          GLOSSARY
                        </p>

                        <p className="font-16 fw-light grey mt-3">
                          <span className="black fw-semibold">QBR : </span>
                          Adjusted Total Quarterback Rating, which values the quarterback on all
                          play types on a 0-100 scale adjusted for the strength of opposing defenses
                          faced.
                        </p>
                        <p className="font-16 fw-light grey mt-3">
                          <span className="black fw-semibold">PAA : </span>
                          Number of points contributed by a quarterback, accounting for QBR and how
                          much he plays, above the level of an average quarterback
                        </p>
                        <p className="font-16 fw-light grey mt-3">
                          <span className="black fw-semibold">PLAYS : </span>
                          Plays on which the QB has a non-zero expected points contribution.
                          Includes most plays that are not handoffs.
                        </p>
                        <p className="font-16 fw-light grey mt-3">
                          <span className="black fw-semibold">EPA : </span>
                          Total expected points added with low leverage plays, according to ESPN Win
                          Probability model, down-weighted.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 px-sm-4 pb-4 h-100 footer-leader-table-border-top">
                      <div className="px-sm-4">
                        <p className="font-16 fw-light grey mt-3 mt-sm-0 pt-4 pt-sm-5">
                          <span className="black fw-semibold">PASS : </span>
                          Expected points added on pass attempts with low leverage plays
                          down-weighted.
                        </p>
                        <p className="font-16 fw-light grey mt-3">
                          <span className="black fw-semibold">RUN : </span>
                          Clutch-weighted expected points added through rushes
                        </p>
                        <p className="font-16 fw-light grey mt-3">
                          <span className="black fw-semibold">SACK : </span>
                          Expected points added on sacks with low leverage plays down-weighted.
                        </p>
                        <p className="font-16 fw-light grey mt-3">
                          <span className="black fw-semibold">PEN : </span>
                          Expected points added on penalties with low leverage plays down-weighted.
                        </p>
                        <p className="font-16 fw-light grey mt-3">
                          <span className="black fw-semibold">RAW : </span>
                          Raw Total Quarterback Rating, which values quarterback on all play types
                          on a 0-100 scale (not adjusted for opposing defenses faced)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default LeaderWeeklyTable;
