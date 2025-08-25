import ScroreBoard from "../components/homepage/ScroreBoard";
import ScoreBoardHero from "../components/nfl-scoreboard/ScoreBoardHero";
import { useState } from "react";
import {
  scheduleHeadingList,
  getAllNflSchedulelist,
  weekListDate,
} from "../../src/components/nfl-schedule/Helper";
import { useEffect } from "react";
import { nflTeamListApi, nflcheckGameWeek } from "../../src/service/thirdPartyDataService";
import { format } from "date-fns";
import webApi from "../WebApi/WebApi";
import { useNavigate } from "react-router-dom";
import ColorRingCustomLoader from "../components/common/ColorRingCustomLoader";
import { nflWeekList } from "../components/nfl-team/Helper";

const NflSchedule = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [nflTeamListData, set_nflTeamListData] = useState({});
  const [allNflList, setAllNflList] = useState([]);
  const [allNflYear, setAllNflYear] = useState(currentYear);
  const [allNflWeek, setAllNflWeek] = useState("");
  const [allNflTeam, setAllNflTeam] = useState("");
  const [loader, setAllLoader] = useState(false);
  const [startWeek, setStartWeek] = useState("");
  const [checkWeek, setCheckWeek] = useState();

  const addOneDayToDate = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };

  let yearDropdown = [];
  for (let i = currentYear - 1; i <= currentYear + 1; i++) {
    yearDropdown.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

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
    async function getGheckGameWeek() {
      nflcheckGameWeek().then(function (result) {
        const response = result.data;
        setCheckWeek(response.isInRange);
      });
    }
    getGheckGameWeek();
  }, []);

  useEffect(() => {
    const asyncFunc = async () => {
      if (!checkWeek) {
        setStartWeek("PreSeason Week 1");

        navigate(
          `/nfl/schedule?year=${currentYear || 0}${allNflWeek && `&week=${allNflWeek || 0}`}${
            allNflTeam && `&team=${allNflTeam || 0}`
          }`
        );
        getAllNflSchedulelist(currentYear, "PreSeason Week 1", allNflTeam, (r) => {
          setAllLoader(false);

          setAllNflList(r);
        });
        getNflTeamDataList();
        setAllLoader(true);
      } else {
        navigate(
          `/nfl/schedule?year=${currentYear || 0}${allNflWeek && `&week=${allNflWeek || 0}`}${
            allNflTeam && `&team=${allNflTeam || 0}`
          }`
        );

        const curYear = new Date().getFullYear();
        const curDay = getWeek(new Date().getDate(), new Date().getMonth() + 1);
        let returnDate = "";

        weekListDate[curYear].forEach((element) => {
          Object.values(element).forEach((val) => {
            val.forEach((d) => {
              if (curDay === d) {
                const newarray = Object.keys(element);
                setStartWeek(newarray[0]);
                returnDate = newarray[0];
              }
            });
          });
        });

        getNflTeamDataList();
        setAllLoader(true);

        getAllNflSchedulelist(currentYear, returnDate, "", (r) => {
          if (r) {
            setAllLoader(false);
            setAllNflList(r);
          }
        });

        try {
          const res = await webApi.post();
          if (res.status === 200) {
            const r = res.data;
            let nfl_list = [];

            r.response_data.map((r, i) => {
              nfl_list.push({
                id: i + 1,
                sheduleDate: r?.sheduleDate,
                date: r?.date,
                //for away team
                away_team_code: r?.awayTeam?.team_code,
                away_team_name: r?.awayTeam?.team_name,
                away_logo_small: r?.awayTeam?.logo_small,
                away_logo_medium: r?.awayTeam?.logo_medium,
                away_logo_standard: r?.awayTeam?.logo_standard,
                away_logo_helmet: r?.awayTeam?.logo_helmet,

                //for home team
                home_team_code: r?.homeTeam?.team_code,
                home_team_name: r?.homeTeam?.team_name,
                home_logo_small: r?.homeTeam?.logo_small,
                home_logo_medium: r?.homeTeam?.logo_medium,
                home_logo_standard: r?.homeTeam?.logo_standard,
                away_home_logo_helmet: r?.homeTeam?.logo_helmet,

                sheduleTime: r?.sheduleTime,
                venue: r?.venue,

                lightText: "AT",
              });
            });
            setAllNflList(nfl_list);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    asyncFunc();
  }, [currentYear, weekListDate, checkWeek]);

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

  const onYear = (v) => {
    v.preventDefault();
    setAllNflYear(v.target.value);
    navigate(
      `/nfl/schedule?year=${v.target.value || currentYear}${
        allNflWeek && `&week=${allNflWeek || 0}`
      }${allNflTeam && `&team=${allNflTeam || 0}`}`
    );

    setAllLoader(true);

    getAllNflSchedulelist(
      v.target.value || currentYear,
      allNflWeek || startWeek,
      allNflTeam,
      (r) => {
        setAllLoader(false);

        setAllNflList(r);
      }
    );
  };

  const onWeek = (v) => {
    v.preventDefault();

    setAllNflWeek(v.target.value);
    navigate(
      `/nfl/schedule?year=${allNflYear || currentYear}${
        v.target.value && `&week=${v.target.value || 0}`
      }${allNflTeam && `&team=${allNflTeam || 0}`}`
    );

    setAllLoader(true);

    getAllNflSchedulelist(allNflYear || currentYear, v.target.value, allNflTeam, (r) => {
      setAllLoader(false);

      setAllNflList(r);
    });
  };

  const onTeam = (v) => {
    v.preventDefault();

    setAllNflTeam(v.target.value);
    navigate(
      `/nfl/schedule?year=${allNflYear || currentYear}${allNflWeek && `&week=${allNflWeek || 0}`}${
        v.target.value && `&team=${v.target.value || 0}`
      }`
    );

    setAllLoader(true);

    getAllNflSchedulelist(
      currentYear || allNflYear,
      allNflWeek || startWeek,
      v.target.value,
      (r) => {
        setAllLoader(false);

        setAllNflList(r);
      }
    );
  };

  const onClickRefresh = async () => {
    setAllNflYear("");
    setAllNflWeek("");
    setAllNflTeam("");

    navigate(`/nfl/schedule?year=${currentYear}`);

    setAllLoader(true);
    setStartWeek("PreSeason Week 1");
    getAllNflSchedulelist(currentYear, allNflWeek || startWeek, "", (r) => {
      setAllLoader(false);
      setAllNflList(r);
    });

    try {
      const res = await webApi.post();
      if (res.status === 200) {
        const r = res.data;
        let nfl_list = [];

        r.response_data.map((r, i) => {
          nfl_list.push({
            id: i + 1,
            sheduleDate: r?.sheduleDate,
            date: r?.date,
            //for away team
            away_team_code: r?.awayTeam?.team_code,
            away_team_name: r?.awayTeam?.team_name,
            away_logo_small: r?.awayTeam?.logo_small,
            away_logo_medium: r?.awayTeam?.logo_medium,
            away_logo_standard: r?.awayTeam?.logo_standard,
            away_logo_helmet: r?.awayTeam?.logo_helmet,

            //for home team
            home_team_code: r?.homeTeam?.team_code,
            home_team_name: r?.homeTeam?.team_name,
            home_logo_small: r?.homeTeam?.logo_small,
            home_logo_medium: r?.homeTeam?.logo_medium,
            home_logo_standard: r?.homeTeam?.logo_standard,
            away_home_logo_helmet: r?.homeTeam?.logo_helmet,

            sheduleTime: r?.sheduleTime,
            venue: r?.venue,

            lightText: "AT",
          });
        });

        setAllNflList(nfl_list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black pb-5">
      <div className="scoreboard-page-bg d-flex flex-column ">
        <ScroreBoard page="NFL" />
        <div className="py-5">
          <ScoreBoardHero
            value={allNflYear ? "SCHEDULE -" + allNflYear : "SCHEDULE -" + currentYear}
          />
        </div>

        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div
              className="d-sm-flex justify-content-xxl-end px-4 px-sm-0 order-1 order-xxl-2"
              style={{ marginRight: "10px" }}
            >
              <select
                className="form-select form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
                aria-label=".form-select-sm example"
                onChange={onYear}
                value={allNflYear}
              >
                {yearDropdown}
              </select>
              <select
                className="form-select form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
                aria-label=".form-select-sm example"
                onChange={onWeek}
                name="ddl_week"
                value={allNflWeek}
              >
                <option hidden selected>
                  {startWeek ? startWeek : "PreSeason Week 1"}
                </option>
                {nflWeekList.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
              <select
                className="form-select form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
                aria-label=".form-select-sm example"
                onChange={onTeam}
                name="ddl_team"
                value={allNflTeam}
              >
                <option value="0" selected hidden>
                  Select Team name
                </option>
                {nflTeamDropdown}
              </select>
              {allNflTeam || allNflWeek || allNflYear ? (
                <button className="refreshBtns mb-sm-5" onClick={onClickRefresh}>
                  Clear
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container pb-5 ">
        {loader ? (
          <ColorRingCustomLoader isLoader={loader} />
        ) : allNflList && allNflList.message === "NFL Schedule list" ? (
          allNflList?.response_data.map((item, index) => (
            <section key={index} className="mb-5">
              <div className="d-flex flex-column justify-content-end order-2 order-xxl-1 mt-5">
                <div>
                  <button className=" nav_tabs_btn  text-white btn ms-4 ">
                    <span>
                      {addOneDayToDate(item._id).toLocaleDateString("en-us", { weekday: "long" })},{" "}
                      {format(addOneDayToDate(item._id), "MM-dd-yyyy")}
                    </span>
                  </button>
                </div>
              </div>

              <div className="table-responsive ps-4">
                <table className="table bg-white text-nowrap">
                  <thead>
                    <tr className="">
                      {scheduleHeadingList.map((obj, index) => (
                        <th
                          key={index}
                          className={`font-15 fw-semibold py-3 text-nowrap   ${
                            index === 0 ? "ps-5 text-start" : ""
                          }`}
                          scope="col"
                        >
                          {obj.heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {item.doc.map((item, id) => {
                    return (
                      <tbody>
                        <tr className={` ${id % 2 !== 0 ? "bg-very-light-grey" : ""}`}>
                          <td className="lh-35 font-15 fw-normal d-flex text-start noBordrbtm ps-0">
                            <div className="teamsImgs">
                              <span className="d-inline-block">
                                <img
                                  className="table-img table-imgb"
                                  src={item?.homeTeam?.logo_standard}
                                  alt="tableImg1"
                                />
                              </span>
                            </div>

                            <span className="ps-2" style={{ marginTop: "5px" }}>
                              {item?.homeTeam?.team_name}
                            </span>
                          </td>
                          <td className="lh-35 font-16 fw-normal">
                            <span className="pe-2 text-light-gray">VS</span>
                          </td>
                          <td className="lh-35 font-15 fw-normal d-flex text-start noBordrbtm">
                            <div className="teamsImgs">
                              <span className="d-inline-block">
                                <img
                                  className="mx-1 table-img table-imgb"
                                  src={item?.awayTeam?.logo_standard}
                                  alt="tableImg2"
                                />
                              </span>
                            </div>

                            <span className="ps-2" style={{ marginTop: "5px" }}>
                              {" "}
                              {item?.awayTeam?.team_name}
                            </span>
                          </td>
                          <td className="lh-35 font-15 fw-normal color-blue text-start">
                            {item.sheduleTime}
                          </td>

                          <td className="lh-35 font-15 fw-normal text-start">{item.venue}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </section>
          ))
        ) : (
          <div className="container noData">
            <p style={{ color: "white", textAlign: "center" }}>Data not Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NflSchedule;
