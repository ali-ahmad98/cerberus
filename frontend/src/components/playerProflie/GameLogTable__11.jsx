import { useEffect } from "react";
import { gameLogBodyData, gameLogDataFirst, gameLogDataSecond } from "./Helper";
import { getNflPlayerGameLogApi } from "../../service/thirdPartyDataService";

const GameLogTable = ({ playerId }) => {
  useEffect(() => {
    async function getNflPlayerGameLog() {
      getNflPlayerGameLogApi(playerId).then(function () {});
    }
    getNflPlayerGameLog();
  }, [playerId]);

  return (
    <>
      <section className="py-5">
        <div className="container my-5 py-5 gamelog-table">
          <div className="row align-items-lg-end">
            <div className="col-lg-4">
              <div className="gameblog-headings">
                <h5 className="font-22 white p-3 ms-4 ps-4 mb-0 text-uppercase fw-semibold">
                  Game Log
                </h5>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="d-flex justify-content-end mt-2 mt-lg-0 mb-2">
                <select
                  className="form-select form-select-sm ps-4 py-4 font-16 gamelog-select"
                  aria-label=".form-select-sm example"
                >
                  <option selected>Season</option>
                  <option value="Winter">Winter</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Monsoon">Monsoon</option>
                </select>
                <select
                  className="form-select form-select-sm ms-3 ps-4 py-4 font-16 gamelog-select"
                  aria-label=".form-select-sm example"
                >
                  <option selected>2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      {gameLogDataFirst.map((val, index) => {
                        return (
                          <th
                            className={`${
                              index === 0
                                ? "font-16 fw-semibold text-nowrap"
                                : index === 1
                                ? "font-16 fw-semibold text-nowrap"
                                : "font-16 fw-semibold border-1-black text-center  text-nowrap"
                            }`}
                            scope="col"
                            colSpan={
                              index === 0 ? "9" : index === 1 ? "6" : index === 2 ? "5" : null
                            }
                            key={index}
                          >
                            {val.name}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <thead>
                    <tr className="tablehead-tr">
                      {gameLogDataSecond.map((val, index) => {
                        return (
                          <th
                            className={`${
                              index === 0
                                ? "font-16 fw-semibold ps-4"
                                : index === 1
                                ? "font-16 fw-semibold px-3"
                                : index === 14
                                ? "font-16 fw-semibold px-4 tr-border-left"
                                : ""
                            } font-16 fw-semibold px-3`}
                            scope="col"
                            colSpan={
                              index === 0 ? "1" : index === 1 ? "1" : index === 2 ? "2" : null
                            }
                            key={index}
                          >
                            {val.name}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {gameLogBodyData.map((val, index) => {
                      return (
                        <tr key={index} className="gamelog-tr">
                          <td className="font-16 fw-light color-grey">{val.date}</td>
                          <td className="font-18 fw-light color-grey">
                            {val.opp}
                            <span className="mx-3">
                              <img src={val.imgUrl} alt="eagleImg" />
                            </span>
                            <span className="blue"> {val.blueAri} </span>
                          </td>
                          <td className="font-16 fw-light blue" colSpan="2">
                            <span
                              className={`color-red pe-2 ${index % 2 !== 0 ? "color-green" : ""}`}
                            >
                              {val.coloredText}
                            </span>
                            {val.text}
                          </td>
                          <td className="font-16 fw-light color-grey">{val.cmp1}</td>
                          <td className="font-16 fw-light p-0 color-grey">{val.att}</td>
                          <td className="font-16 fw-light p-0 color-grey">{val.yds}</td>
                          <td className="font-16 fw-light p-0 color-grey">{val.cmp2}</td>
                          <td className="font-16 fw-light p-0 color-grey">{val.avg}</td>
                          <td className="font-16 fw-light p-0 color-grey">{val.td}</td>
                          <td className="font-16 fw-light p-0 color-grey">{val.int}</td>
                          <td className="font-16 fw-light p-0 color-grey">{val.lng}</td>
                          <td className="font-16 fw-light p-0 color-grey">{val.sack}</td>
                          <td className="font-16 fw-light p-0 color-grey">{val.rtg}</td>
                          <td className="font-16 fw-light p-0 color-grey">{val.qbr}</td>
                          <td className="font-16 fw-light p-0 color-grey tr-border-left">
                            {val.att2}
                          </td>
                          <td className="font-16 fw-light p-0 color-grey">{val.yds}</td>
                          <td className="font-16 fw-light p-0 color-grey">{val.avg2}</td>
                          <td className="font-16 fw-light p-0 color-grey">{val.td2}</td>
                          <td className="font-16 fw-light p-0 color-grey ps-4 pe-5">{val.lng2}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GameLogTable;
