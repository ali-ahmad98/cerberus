import ScroreBoard from "../../components/homepage/ScroreBoard";
import NcaafFrontfantasyLeft from "../../Assets/NcaafFrontAssets/HomepageAssets/img/ncaaf-front-fantasy-left.png";
import NcaafFrontfantasyRight from "../../Assets/NcaafFrontAssets/HomepageAssets/img/ncaaf-front-fantasy-right.png";
import NcaafFrontFantasyStatsTable from "./NcaafFrontFantasyStatsTable";

const NcaafFrontFootballStats = () => {
  return (
    <>
      <div className="position-relative ncaaf-front-bg-1a1a1a ncaaf-front-football-stats pb-5">
        <div className="ncaaf-standings-page d-flex flex-column">
          <ScroreBoard />
          <img
            className="fantasy-left ncaaf-front-player-left"
            src={NcaafFrontfantasyLeft}
            alt="fantasyLeft"
          />
          <img
            className="fantasy-right ncaaf-front-player-right"
            src={NcaafFrontfantasyRight}
            alt="fantasyRight"
          />

          <div className="pb-0 py-sm-5 container">
            <div className="row justify-content-center py-sm-5">
              <div className="col-12 col-lg-9 col-xl-8 text-center py-5">
                <h2 className="text-uppercase font-58 fw-bold white py-5 mb-0">
                  Fantasy Football Stats
                  <br className="d-none d-sm-inline-block" />
                  <span> AND</span>
                  <span className="text-blue"> Season Leaders</span>
                </h2>
              </div>
              <div className="col-12 col-lg-7 col-xl-6 text-center text-sm-start">
                <div className="d-flex align-items-center align-items-sm-start flex-column flex-sm-row justify-content-center position-relative">
                  <span className="select-text">From</span>
                  <span className="select-text-2">To</span>

                  <select
                    className="form-select select-season min-width-0 form-select-sm ps-4 py-sm-4 py-3 mb-4 py-xxl-17 font-16 sellect order-2 order-sm-1"
                    aria-label="form-select-sm example"
                  >
                    <option selected>Season</option>
                    <option value="2021">Sunday</option>
                    <option value="2022">Monday</option>
                    <option value="2023">Tuesday</option>
                    <option value="2024">Wednesday</option>
                  </select>
                  <div className="ms-sm-3 order-1 order-sm-2 mb-3 mb-sm-0 live_btn">
                    <button className="px-5 live-btn text-white font-16 fw-bold border-radius-8 bg-light-blue border-0 py-xxl-custom w-100">
                      LIVE
                    </button>
                  </div>

                  <div className="order-3 text-start text-white w-100 mw-xxs-350 fw-semibold mb-2 d-sm-none font-16">
                    From
                  </div>

                  <select
                    className="form-select week-select min-width-0 form-select-sm ms-sm-3 py-xxl-17 ps-4 py-sm-4 py-3 font-16 sellect mb-4 order-3 order-sm-3"
                    aria-label="form-select-sm example"
                  >
                    <option selected>Week 7</option>
                    <option value="2021">Sunday</option>
                    <option value="2022">Monday</option>
                    <option value="2023">Tuesday</option>
                    <option value="2024">Wednesday</option>
                  </select>

                  <div className="order-3 text-start text-white w-100 mw-xxs-350 fw-semibold mb-2 d-sm-none font-16">
                    To
                  </div>

                  <select
                    className="form-select week-select2 min-width-0 form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-4 py-xxl-17 order-4 order-sm-4"
                    aria-label="form-select-sm example"
                  >
                    <option selected>Week 7</option>
                    <option value="2021">Sunday</option>
                    <option value="2022">Monday</option>
                    <option value="2023">Tuesday</option>
                    <option value="2024">Wednesday</option>
                  </select>
                </div>

                <div className="d-flex flex-column align-items-center align-items-sm-start flex-sm-row justify-content-center px-sm-5 mx-xxl-5">
                  <select
                    className="form-select select-season min-width-0 pe-0 form-select-sm  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4 py-xxl-17"
                    aria-label="form-select-sm example"
                  >
                    <option selected>Position</option>
                    <option value="2021">Sunday</option>
                    <option value="2022">Monday</option>
                    <option value="2023">Tuesday</option>
                    <option value="2024">Wednesday</option>
                  </select>
                  <select
                    className="form-select week-select2 min-width-0 form-select-sm ms-sm-3  ps-4 pe-0 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4 py-xxl-17"
                    aria-label="form-select-sm example"
                  >
                    <option selected>Team</option>
                    <option value="2021">Sunday</option>
                    <option value="2022">Monday</option>
                    <option value="2023">Tuesday</option>
                    <option value="2024">Wednesday</option>
                  </select>
                  <select
                    className="form-select week-select3 min-width-0 form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4 py-xxl-17"
                    aria-label="form-select-sm example"
                  >
                    <option selected>Fantasy Scoring</option>
                    <option value="2021">Sunday</option>
                    <option value="2022">Monday</option>
                    <option value="2023">Tuesday</option>
                    <option value="2024">Wednesday</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NcaafFrontFantasyStatsTable />
      </div>
    </>
  );
};

export default NcaafFrontFootballStats;
