import orangeWeather from "../../Assets/orange-weather.png";
import HalfMoonIcon from "../../Assets/NcaafFrontAssets/HomepageAssets/img/half-moon-icon.svg";

const PLayersToWatch = ({ item }) => {
  return (
    <>
      <div className="gamelog-table players-table">
        <div class="table-responsive px-4 position-relative table-bg-line">
          <table className="table text-nowrap position-relative z-1 table_bg ms-3 mt-4 mb-0">
            <thead>
              <tr class="py-4 text-uppercase">
                <th
                  class="white border-0 ps-4 ps-sm-5 py-4 height-70 align-middle min-width-300 custom-width-500 vertical-align-middle"
                  scope="col"
                  colSpan={1}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <h2 class="font-18 fw-light">{item.finalText}</h2>
                  </div>
                </th>
                <th
                  className="py-0 px-0 table-small-bg custom-min-width custom-width-527 align-middle"
                  scope="col"
                >
                  <div className="text-white d-flex justify-content-between py-2 min-width-300 align-items-center px-4">
                    <div className="text-wrap">
                      <h4 className="mb-0 ps-lg-4 font-18 fw-light custom-width-400">
                        {item.place}
                      </h4>
                    </div>
                    <div className="pe-lg-4">
                      <img src={orangeWeather} alt="orangeWeather" />
                      <p className="mb-0 font-18 fw-light">
                        <img className="pe-1" src={HalfMoonIcon} alt="HalfMoonIcon" />
                        {item.temprature}
                      </p>
                    </div>
                  </div>
                </th>
                <th
                  class="font-18 fw-light white border-0 py-4 height-70 align-middle"
                  scope="col"
                  colSpan={1}
                >
                  TOP PERFORMERS
                </th>
              </tr>
            </thead>

            <tbody className="border-0">
              <tr className="custom_height">
                <th scope="row" className="border-right width-500 align-middle">
                  <div className="d-flex align-items-center">
                    <img className="table-img ms-3 me-4" src={item.imgUrl1} alt="img" />

                    <div>
                      <p className="font-22 fw-normal mb-0">
                        <span className="grey me-1">{item.FirstNameLetter}</span>
                        {item.teamFirstName}
                      </p>
                      <p className="font-18 fw-light mb-0">{item.team1Text}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center pt-4 grey">
                    <img className="table-img ms-3 me-4" src={item.imgUrl2} alt="img" />

                    <div className="black">
                      <p className="font-22 fw-normal mb-0">
                        <span className="grey me-1">{item.SecondNameLetter}</span>
                        {item.teamNameSecond}
                      </p>
                      <p className="font-18 fw-light mb-0">{item.team2Text}</p>
                    </div>
                  </div>
                </th>

                {item.ticketIcon ? (
                  <td className="font-18 fw-light text-start  px-0 d-flex flex-column border-bottom">
                    <p className=" mb-0 ps-4 py-3 text-light-blue">
                      <span className="ps-4 pe-3">{item.ticketIcon}</span>
                      {item.ticketRate}
                    </p>
                  </td>
                ) : (
                  <td></td>
                )}

                <td className="font-14 fw-light text-start ps-5 border-left border-right align-middle">
                  <div className="d-flex align-items-center py-1">
                    <p className="mb-0 pe-3 min-width-55">PASS</p>
                    <div className="border-left-custom ps-4">
                      <p className="mb-0 ">
                        <span className="fw-bold">{item.passBoldText}</span>
                        {item.passNormalText}
                      </p>
                      <p className="mb-0">{item.pass}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center py-3">
                    <p className="mb-0 pe-3 min-width-55">RUSH</p>
                    <div className="border-left-custom ps-4">
                      <p className="mb-0 ">
                        <span className="fw-bold">{item.rushBoldText}</span>
                        {item.rushNormalText}
                      </p>
                      <p className="mb-0 ">{item.rush}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center py-1">
                    <p className="mb-0 pe-3 min-width-55">REC</p>
                    <div className="border-left-custom ps-4">
                      <p className="mb-0 ">
                        <span className="fw-bold">{item.recBoldText}</span>
                        {item.recNormalText}
                      </p>
                      <p className="mb-0 ">{item.rec}</p>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="d-flex flex-column align-items-center justify-content-center me-5">
                    <button className="gamecast-btn font-14 fw-regular common-button text-uppercase">
                      {item.gamecast}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PLayersToWatch;
