import { useState } from "react";
import AmericanFootballStandings from "./AmericanFootballStandings";

const StandingTable = () => {
  const [isPlayerActive, setPlayerActive] = useState(0);

  return (
    <>
      <div className="container pt-5 mt-5 ">
        <div className="row  flex-column flex-lg-row justify-content-between ps-sm-5 px-2 ">
          <div className="col ps-md-4">
            <button
              className={`${
                isPlayerActive === 0 ? "active-nav-btn-blue-scale " : "text-black bg_white"
              }  nav_tabs_btn  me-2 ms-2 text-uppercase mt-2`}
              onClick={() => setPlayerActive(0)}
            >
              <span>Standings</span>
            </button>
            <button
              className={`${
                isPlayerActive === 1 ? "active-nav-btn-blue-scale" : " text-black bg_white"
              }  nav_tabs_btn text-uppercase mt-2`}
              onClick={() => {
                setPlayerActive(1);
              }}
            >
              <span>Playoff</span>
            </button>
            <button
              className={`${
                isPlayerActive === 2 ? "active-nav-btn-blue-scale " : "text-black bg_white"
              }  nav_tabs_btn text-uppercase mt-2  mx-2`}
              onClick={() => setPlayerActive(2)}
            >
              <span>Expanded</span>
            </button>
            <button
              className={`${
                isPlayerActive === 3 ? "active-nav-btn-blue-scale" : " text-black bg_white"
              }  nav_tabs_btn text-uppercase mt-2`}
              onClick={() => {
                setPlayerActive(3);
              }}
            >
              <span>Vs. Division</span>
            </button>
          </div>
        </div>
        <div className="ps-3 pt-4 pt-xl-0">
          <div className="gradient-bg d-inline-block text-white transform-skew-10 ms-sm-4">
            <button className="bg-transparent underline-hover  border-0 font-18 fw-normal text-uppercase px-4 px-sm-5 py-sm-4 py-3 transform-skew-10-revrse">
              <span>LEAGE</span>
            </button>
            <button className="bg-transparent underline-hover  border-0 font-18 fw-normal text-uppercase px-4 px-sm-5 py-sm-4 py-3 transform-skew-10-revrse">
              <span>Conference</span>
            </button>
            <button className="bg-transparent underline-hover  border-0 font-18 fw-normal text-uppercase px-4 px-sm-5 py-sm-4 py-3 transform-skew-10-revrse">
              <span> Division</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container pt-5">
        <div className="row">
          <div className="col-12">
            {isPlayerActive === 0 && 2 ? (
              <AmericanFootballStandings />
            ) : (
              <AmericanFootballStandings />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StandingTable;
