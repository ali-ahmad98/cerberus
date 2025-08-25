import { useEffect, useState } from "react";
import FantasyStatsTable from "./FantasyStatsTable";
import NcaafFantasyStatTable from "./ncaafFantasyStatTable";
import ScroreBoard from "../homepage/ScroreBoard";
import fantasyLeft from "../../Assets/fantasy-left.png";
import fantasyRight from "../../Assets/fantasy-right.png";
import { weekListDate, weekListDateNcaaf } from "../../../src/components/nfl-schedule/Helper";
import { useNavigate } from "react-router-dom";
import {
  nflTeamListApi,
  nflPlayerPositionListApi,
} from "../../../src/service/thirdPartyDataService";
import {
  getAllNflFantasylist,
  getAllNcaafFantasylist,
} from "../../../src/components/Nfl-fantasy-stat/Helper";
import ColorRingCustomLoader from "../../components/common/ColorRingCustomLoader";
import { getNcaaTeamListApi } from "../../service/NcaaService";

const FantasyStats = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const currentYearNcaaf = new Date().getFullYear();
  const [nflButton, setNflbutton] = useState("NFL");
  const [allNflYear, setAllNflYear] = useState("");
  const [allNcaafYear, setAllNcaafYear] = useState("");
  const [allPosition, setAllNflPosition] = useState("");
  const [allNAAcFPosition, setAllNcaafPosition] = useState("");
  const [startWeek, setStartWeek] = useState("");
  const [startWeekNcaaf, setStartWeekNcaaf] = useState("");
  const [nflTeamListData, set_nflTeamListData] = useState({});
  const [allNflTeam, setAllNflTeam] = useState("");
  const [allNcaafTeam, setAllNcaafTeam] = useState("");
  const [allNflList, setAllNflList] = useState([]);
  const [allNcaafDivisionList, setAllNcaafDivisionList] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(true);
  const [loader, setAllLoader] = useState(false);
  const [fantasyScoring, setFantasyScoring] = useState("");
  const [fantasyNcaafScoring, setFantasyNcaafScoring] = useState("");

  let yearDropdown = [];
  for (let i = currentYear; i > currentYear - 2; i--) {
    yearDropdown.push(
      <option value={i} key={`year${i}`}>
        {i}
      </option>
    );
  }

  let yearDropdownNcaaf = [];
  for (let i = currentYearNcaaf; i > currentYearNcaaf - 2; i--) {
    yearDropdownNcaaf.push(
      <option value={i} key={`year${i}`}>
        {i}
      </option>
    );
  }

  const onNfl = (e) => {
    setNflbutton(e.target.value);
    setIsActive2((current) => !current);
    setIsActive(false);
    const curYear = new Date().getFullYear();
    const curDay = getWeek(new Date().getDate(), new Date().getMonth() + 1);

    let returnDate = "";
    weekListDate[curYear].forEach((element) => {
      Object.values(element).forEach((val) => {
        val.forEach((d) => {
          if (curDay === d) {
            const newarray = Object.keys(element);

            setStartWeek(newarray[0]);
            return (returnDate = newarray[0]);
          }
        });
      });
    });

    navigate(
      `/nfl/fantasy-stats?league=${nflButton}&year=${currentYear}&week=${String(returnDate).replace(
        " ",
        ""
      )}&fantasyscore=${"STD"}`
    );
    setAllLoader(true);

    getAllNflFantasylist(currentYear, returnDate, "", "", "STD", (r) => {
      setAllLoader(false);

      setAllNflList(r);
    });
  };
  const onNcaaf = (e) => {
    setNflbutton(e.target.value);
    setIsActive((current) => !current);
    setIsActive2(false);

    const curYear = new Date().getFullYear();
    const curDay = getWeek(new Date().getDate(), new Date().getMonth() + 1);

    let returnDate = "";
    weekListDateNcaaf[curYear].forEach((element) => {
      Object.values(element).forEach((val) => {
        val.forEach((d) => {
          if (curDay === d) {
            const newarray = Object.keys(element);

            setStartWeekNcaaf(newarray[0]);
            return (returnDate = newarray[0]);
          }
        });
      });
    });

    navigate(
      `/nfl/fantasy-stats?league=${nflButton}&year=${currentYear}&week=${String(
        startWeekNcaaf
      ).replace(" ", "")}&fantasyscore=${"STD"}`
    );
    setAllLoader(true);

    getAllNcaafFantasylist(currentYear, returnDate, "", "", "STD", (r) => {
      setAllLoader(false);

      setAllNflList(r);
    });
  };

  const getWeek = (d, m) => {
    if (d > 9) {
      if (m > 9) {
        return `${m}-${d}`;
      } else {
        return `0${m}-${d}`;
      }
    } else {
      if (m > 9) {
        return `${m}-${d}`;
      } else {
        return `0${m}-0${d}`;
      }
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      const curYear = new Date().getFullYear();
      const curDay = getWeek(new Date().getDate(), new Date().getMonth() + 1);
      let returnDate = "";
      {
        isActive
          ? weekListDateNcaaf[curYear].forEach((element) => {
              Object.values(element).forEach((val) => {
                val.forEach((d) => {
                  if (curDay === d) {
                    const newarray = Object.keys(element);

                    setStartWeekNcaaf(newarray[0]);
                    return (returnDate = newarray[0]);
                  }
                });
              });
            })
          : weekListDate[curYear].forEach((element) => {
              Object.values(element).forEach((val) => {
                val.forEach((d) => {
                  if (curDay === d) {
                    const newarray = Object.keys(element);
                    setStartWeek(newarray[0]);
                    return (returnDate = newarray[0]);
                  }
                });
              });
            });
      }

      navigate(
        `/nfl/fantasy-stats?league=${nflButton}&year=${currentYear}&week=${String(
          returnDate
        ).replace(" ", "")}&fantasyscore=${"STD"}`
      );
      setAllLoader(true);

      getAllNflFantasylist(currentYear, returnDate, "", "", "STD", (r) => {
        setAllLoader(false);

        setAllNflList(r);
      });
      getNflTeamDataList();
      getNflDivisionDataList();
      getNflPlayerPositionDataList();
    };
    asyncFunc();
  }, []);

  async function getNflDivisionDataList() {
    getNcaaTeamListApi().then(function (result) {
      const response = result.data;
      setAllNcaafDivisionList(response.response_data);
    });
  }

  let divisionDropdown = <option>Loading...</option>;

  if (allNcaafDivisionList && allNcaafDivisionList.length > 0) {
    divisionDropdown = allNcaafDivisionList.map((teamRow) => (
      <option key={teamRow.team_id} value={teamRow.team_id}>
        {teamRow.team_name}
      </option>
    ));
  }

  //for player position
  async function getNflPlayerPositionDataList() {
    nflPlayerPositionListApi().then(function () {});
  }

  //for nfl team name
  async function getNflTeamDataList() {
    nflTeamListApi().then(function (result) {
      const response = result.data;
      set_nflTeamListData(response.response_data);
    });
  }

  let nflTeamDropdown = <option>Loading...</option>;
  if (nflTeamListData && nflTeamListData.length > 0) {
    nflTeamDropdown = nflTeamListData.map((teamRow) => (
      <option key={teamRow.team_id} value={teamRow.team_id}>
        {teamRow.team_name}
      </option>
    ));
  }

  //FOR NFL FUNCTION

  const onTeam = (e) => {
    setAllNflTeam(e.target.value);
    navigate(
      `/nfl/fantasy-stats?league=${nflButton}&team=${e.target.value}&year=${
        allNflYear || currentYear
      }&week=${String(startWeek).replace(" ", "")}&position=${allPosition || 0}&fantasyscore=${
        fantasyScoring || "STD"
      }`
    );
    setAllLoader(true);

    getAllNflFantasylist(
      allNflYear || currentYear,
      startWeek,
      e.target.value,
      allPosition,
      fantasyScoring || "STD",
      (r) => {
        setAllLoader(false);

        setAllNflList(r);
      }
    );
  };

  const onYear = (v) => {
    setAllNflYear(v.target.value);
    navigate(
      `/nfl/fantasy-stats?league=${nflButton}&team=${allNflTeam || 1696}&season=${
        v.target.value || currentYear
      }&week=${String(startWeek).replace(" ", "")}`
    );

    setAllLoader(true);

    getAllNflFantasylist(
      v.target.value || currentYear,
      startWeek,
      allNflTeam,
      allPosition,
      fantasyScoring || "STD",
      (r) => {
        setAllLoader(false);
        setAllNflList(r);
      }
    );
  };

  const onPosition = (v) => {
    setAllNflPosition(v.target.value);
    navigate(
      `/nfl/fantasy-stats?league=${nflButton}&team=${allNflTeam || 0}&season=${
        allNflYear || currentYear
      }&week=${String(startWeek).replace(" ", "")}&position=${v.target.value}&fantasyscore=${
        fantasyScoring || "STD"
      }`
    );

    setAllLoader(true);

    getAllNflFantasylist(
      allNflYear || currentYear,
      startWeek,
      allNflTeam,
      v.target.value,
      fantasyScoring || "STD",
      (r) => {
        setAllLoader(false);

        setAllNflList(r);
      }
    );
  };

  const OnNCAAFPosition = (e) => {
    setAllNcaafPosition(e.target.value);
    navigate(
      `/nfl/fantasy-stats?league=${nflButton}&team=${allNcaafTeam || 0}&season=${
        fantasyNcaafScoring || "STD"
      }&week=${String(startWeekNcaaf).replace(" ", "")}`
    );

    setAllLoader(true);

    getAllNcaafFantasylist(
      allNcaafYear || currentYear,
      startWeekNcaaf,
      allNcaafTeam,
      e.target.value || allPosition,
      fantasyNcaafScoring || "STD",
      (r) => {
        setAllLoader(false);

        setAllNflList(r);
      }
    );
  };

  const onFantasyNcaafScoring = (e) => {
    setFantasyNcaafScoring(e.target.value);
    navigate(
      `/nfl/fantasy-stats?league=${nflButton}&team=${allNcaafTeam || 0}&season=${
        e.target.value || fantasyNcaafScoring
      }&week=${String(startWeekNcaaf).replace(" ", "")}`
    );

    setAllLoader(true);

    getAllNcaafFantasylist(
      allNcaafYear || currentYear,
      startWeekNcaaf,
      allNcaafTeam,
      allPosition,
      e.target.value || fantasyNcaafScoring,
      (r) => {
        setAllLoader(false);

        setAllNflList(r);
      }
    );
  };
  const onNcaafTeam = (e) => {
    setAllNcaafTeam(e.target.value);
    navigate(
      `/nfl/fantasy-stats?league=${nflButton}&team=${e.target.value}&year=${
        allNcaafYear || currentYear
      }&week=${String(startWeekNcaaf).replace(" ", "")}&position=${
        allNAAcFPosition || 0
      }&fantasyscore=${fantasyNcaafScoring || "STD"}`
    );
    setAllLoader(true);

    getAllNcaafFantasylist(
      allNcaafYear || currentYear,
      startWeekNcaaf,
      e.target.value,
      allNAAcFPosition,
      fantasyNcaafScoring || "STD",
      (r) => {
        setAllLoader(false);

        setAllNflList(r);
      }
    );
  };
  const onFantasyNflScoring = (e) => {
    setFantasyScoring(e.target.value);
    navigate(
      `/nfl/fantasy-stats?league=${nflButton}&team=${allNflTeam || 0}&season=${
        allNflYear || currentYear
      }&week=${String(startWeekNcaaf).replace(" ", "")}&position=${allNAAcFPosition}&fantasyscore=${
        e.target.value
      }`
    );

    setAllLoader(true);

    getAllNflFantasylist(
      allNflYear || currentYear,
      startWeek,
      allNflTeam,
      allPosition,
      e.target.value,
      (r) => {
        setAllLoader(false);

        setAllNflList(r);
      }
    );
  };

  //For Ncaaf function
  const onYearNcaaf = (v) => {
    setAllNcaafYear(v.target.value);
    navigate(
      `/nfl/fantasy-stats?league=${nflButton}&team=${allNcaafTeam || 0}&season=${
        fantasyNcaafScoring || "STD"
      }&week=${String(startWeekNcaaf).replace(" ", "")}`
    );

    setAllLoader(true);

    getAllNcaafFantasylist(
      v.target.value || currentYear,
      startWeekNcaaf,
      allNcaafTeam,
      allPosition,
      fantasyNcaafScoring || "STD",
      (r) => {
        setAllLoader(false);

        setAllNflList(r);
      }
    );
  };

  return (
    <div className="position-relative  ncaaf-front-football-stats">
      <div className="scoreboard-page-bg d-flex flex-column">
        <ScroreBoard page="HOME" />

        <img className="fantasy-left nfl-fantasy-left" src={fantasyLeft} alt="fantasyLeft" />
        <img className="fantasy-right nfl-fantasy-right" src={fantasyRight} alt="fantasyRight" />

        <div className="py-5 container">
          <div className="row justify-content-center py-sm-5">
            <div className="col-lg-7 col-12  text-center py-5">
              <h2 className="heading text-uppercase py-5 font-58">
                Fantasy Football Stats and
                <span className="text-blue "> Season Leaders</span>
              </h2>
            </div>
            <div className="container pt-5 pb-3 z-1 position-relative fantasy-stats mb-5">
              <div className="d-flex" style={{ width: "100%", justifyContent: "center" }}>
                <button
                  className={"fantasy-btn " + (isActive ? "addActive" : "")}
                  value={"NCAAF"}
                  onClick={onNcaaf}
                >
                  {" "}
                  NCAAF
                </button>
                &nbsp;&nbsp;&nbsp;
                <button
                  className={"fantasy-btn " + (isActive2 ? "addActive" : "")}
                  value={"NFL"}
                  onClick={onNfl}
                >
                  {" "}
                  NFL
                </button>
              </div>
            </div>
            {nflButton === "NFL" ? (
              <div className="col-12 col-lg-7 col-xl-6 text-center text-sm-start">
                <div className="d-flex align-items-center align-items-sm-start flex-column flex-sm-row justify-content-center position-relative">
                  <div className="stSlct">
                    <label className="text-white fw-semibold mb-2 font-16">&nbsp;</label>
                    <select
                      className="form-select form-select-sm  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
                      aria-label="form-select-sm example"
                      onChange={onYear}
                      value={allNflYear}
                    >
                      {yearDropdown}
                    </select>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-center align-items-sm-start flex-sm-row justify-content-center px-sm-5 mx-xxl-5">
                  <select
                    className="form-select select-season min-width-0 pe-0 form-select-sm  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4 py-xxl-17"
                    aria-label="form-select-sm example"
                    onChange={onPosition}
                  >
                    <option selected hidden>
                      Position
                    </option>
                    <option value="QB">QB</option>
                    <option value="RB">RB</option>
                    <option value="WR">WR</option>
                    <option value="TE">TE</option>
                    <option value="PK">PK</option>
                  </select>
                  <select
                    className="form-select min-width-0 form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4 py-xxl-17"
                    aria-label="form-select-sm example"
                    value={allNflTeam}
                    onChange={onTeam}
                  >
                    <option value="0" selected hidden>
                      Team
                    </option>

                    {nflTeamDropdown}
                  </select>
                  <select
                    className="form-select week-select3 min-width-0 form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4 py-xxl-17"
                    aria-label="form-select-sm example"
                    onChange={onFantasyNflScoring}
                  >
                    <option selected value="STD">
                      STD score{" "}
                    </option>
                    <option value="HALF_PPR">Half - PPR </option>
                    <option value="HALF_PPR_TEP">Half - PPR - tep</option>
                    <option value="PPR">PPR</option>
                    <option value="PPR_TEP">PPR_TEP</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="col-12 col-lg-7 col-xl-6 text-center text-sm-start">
                <div className="d-flex align-items-center align-items-sm-start flex-column flex-sm-row justify-content-center position-relative">
                  <div className="stSlct">
                    <label className="text-white fw-semibold mb-2 font-16">&nbsp;</label>
                    <select
                      className="form-select form-select-sm ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
                      aria-label="form-select-sm example"
                      onChange={onYearNcaaf}
                      value={allNcaafYear}
                    >
                      {yearDropdownNcaaf}
                    </select>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-center align-items-sm-start flex-sm-row justify-content-center px-sm-5 mx-xxl-5">
                  <select
                    className="form-select select-season min-width-0 pe-0 form-select-sm  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4 py-xxl-17"
                    aria-label="form-select-sm example"
                    onChange={OnNCAAFPosition}
                  >
                    <option selected hidden>
                      Position
                    </option>
                    <option value="QB">QB</option>
                    <option value="RB">RB</option>
                    <option value="WR">WR</option>
                    <option value="TE">TE</option>
                    <option value="PK">PK</option>
                  </select>
                  <select
                    className="form-select min-width-0 form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4 py-xxl-17"
                    aria-label="form-select-sm example"
                    value={allNcaafTeam}
                    onChange={onNcaafTeam}
                  >
                    <option value="0" selected hidden>
                      Team
                    </option>
                    {divisionDropdown}
                  </select>
                  <select
                    className="form-select week-select3 min-width-0 form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4 py-xxl-17"
                    aria-label="form-select-sm example"
                    onChange={onFantasyNcaafScoring}
                  >
                    <option selected value="STD">
                      STD score{" "}
                    </option>
                    <option value="HALF_PPR">Half – PPR </option>
                    <option value="HALF_PPR_TEP">Half – PPR - tep</option>
                    <option value="PPR">PPR</option>
                    <option value="PPR_TEP">PPR_TEP</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {nflButton === "NFL" ? (
        <>
          {loader ? (
            <ColorRingCustomLoader isLoader={loader} />
          ) : allNflList && allNflList.message === "live score data" ? (
            allNflList.response_data?.NFL.length != 0 && (
              <FantasyStatsTable allNflList={allNflList} />
            )
          ) : (
            <div className="container noData">
              <p style={{ color: "red", textAlign: "center" }}>Data not Found</p>
            </div>
          )}
        </>
      ) : (
        <>
          {loader ? (
            <ColorRingCustomLoader isLoader={loader} />
          ) : allNflList && allNflList.message === "live score data" ? (
            allNflList.response_data?.NCAA.length != 0 && (
              <NcaafFantasyStatTable allNflList={allNflList} />
            )
          ) : (
            <div className="container noData">
              <p style={{ color: "red", textAlign: "center" }}>Data not Found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FantasyStats;
