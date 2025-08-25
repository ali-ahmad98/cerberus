import { useState } from "react";
import DefensiveLeaders from "./DefensiveLeaders";
import DefensiveTeams from "./DefensiveTeams";
import OffensiveLeaders from "./OffensiveLeaders";
import OffensiveTeams from "./OffensiveTeams";

const StatLeaders = () => {
  const [isPlayerActive, setPlayerActive] = useState(0);

  return (
    <>
      <div className="container pt-5 mt-5">
        <div className="row  flex-column flex-lg-row justify-content-between">
          <div className="col">
            <button
              className={`${
                isPlayerActive === 0 ? "active-nav-btn-blue-scale " : "text-black bg_white"
              }  nav_tabs_btn ms-sm-3 ms-2`}
              onClick={() => setPlayerActive(0)}
            >
              <span>PLAYER</span>
            </button>
            <button
              className={`${
                isPlayerActive === 1 ? "active-nav-btn-blue-scale" : " text-black bg_white"
              }  nav_tabs_btn`}
              onClick={() => {
                setPlayerActive(1);
              }}
            >
              <span>TEAM</span>
            </button>
          </div>

          <div className="col-12 col-lg-5 d-sm-flex justify-content-center align-items-center mt-4 mt-lg-0">
            <select
              className="form-select form-select-sm ms-lg-3 ps-sm-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-3"
              aria-label=".form-select-sm example"
            >
              <option selected>Team Statistics</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <select
              className="form-select form-select-sm ms-sm-3 ps-sm-4 py-sm-4 py-3 font-16 sellect mb-sm-5"
              aria-label=".form-select-sm example"
            >
              <option selected>2020 Regular Season</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container pt-5">
        <div className="row">
          <div className="col-12 col-lg-6">
            {isPlayerActive === 0 ? <OffensiveLeaders /> : <OffensiveTeams />}
          </div>
          <div className="col-12 col-lg-6 mt-5 mt-lg-0">
            {isPlayerActive === 0 ? <DefensiveLeaders /> : <DefensiveTeams />}
          </div>
        </div>
      </div>
    </>
  );
};

export default StatLeaders;
