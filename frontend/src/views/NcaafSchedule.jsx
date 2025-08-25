import { useState, useEffect } from "react";
import webApi from "../WebApi/WebApi";
import ScroreBoard from "../components/homepage/ScroreBoard";
import ncaa from "../Assets/NcaafFrontAssets/ScheduleAssets/images/ncaa.png";
import {
  getAllNcaafSchedulelist,
  getAllNcaafScheduleDivisonlist,
  weekListDate,
  getcheckGameNcaaf,
} from "../NcaafFrontComponents/NcaafFrontSchedule/Helper";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import noTeamImg from "../Assets/images/noImg.jpg";
import ColorRingCustomLoader from "../components/common/ColorRingCustomLoader";
import { ncaaWeekDropdownList } from "../components/NCAA/HelperNcaa";

const NcaafSchedule = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [allNflYear, setAllNflYear] = useState(currentYear);
  const [allNflWeek, setAllNflWeek] = useState("");
  const [allNcaafdivision, setAllNcaafdivision] = useState("");
  const [startWeek, setStartWeek] = useState("");
  const [checkWeek, setCheckWeek] = useState(false);
  const [allNflList, setAllNflList] = useState([]);
  const [loader, setAllLoader] = useState(false);
  const [allNflDivisionList, setAllNflDivisionList] = useState({});

  const addOneDayToDate = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };

  let yearDropdown = [];
  for (let i = currentYear - 1; i <= currentYear + 1; i++) {
    yearDropdown.push(
      <option selected value={i} key={i}>
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
  async function getGheckGameWeek() {
    getcheckGameNcaaf().then(function (result) {
      const response = result.data;
      setCheckWeek(response.isInRange);
    });
  }

  useEffect(() => {
    getGheckGameWeek();
  }, []);

  useEffect(() => {
    if (!checkWeek) {
      setStartWeek("Week Bowls");
      navigate(
        `/ncaaf/schedule?year=${allNflYear || currentYear}${
          allNflWeek && `&week=${allNflWeek || 0}`
        }${allNcaafdivision && `&conference=${allNcaafdivision || 0}`}`
      );
      getNflDivisionDataList();
      setAllLoader(true);
      getAllNcaafSchedulelist("", currentYear, "Week Bowls", (r) => {
        if (r) {
          setAllLoader(false);
          setAllNflList(r);
        }
      });
    } else {
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

      getNflDivisionDataList();
      setAllLoader(true);

      getAllNcaafSchedulelist("", currentYear, returnDate, (r) => {
        if (r) {
          setAllLoader(false);
          setAllNflList(r);
        }
      });
    }
  }, [checkWeek]);

  async function getNflDivisionDataList() {
    getAllNcaafScheduleDivisonlist().then(function (result) {
      const response = result.data;
      setAllNflDivisionList(response.response_data);
    });
  }

  let divisionDropdown = <option>Loading...</option>;
  if (allNflDivisionList && allNflDivisionList.length > 0) {
    divisionDropdown = allNflDivisionList.map((teamRow) => (
      <option key={teamRow._id} value={teamRow._id}>
        {teamRow._id}
      </option>
    ));
  }

  const onWeek = (v) => {
    setAllNflWeek(v.target.value);
    navigate(
      `/ncaaf/schedule?year=${allNflYear || currentYear}${
        v.target.value && `&week=${v.target.value || 0}`
      }${allNcaafdivision && `&conference=${allNcaafdivision || 0}`}`
    );

    setAllLoader(true);
    getAllNcaafSchedulelist(allNcaafdivision, allNflYear || currentYear, v.target.value, (r) => {
      setAllLoader(false);
      setAllNflList(r);
    });
  };

  const onYear = (v) => {
    setAllNflYear(v.target.value);
    navigate(
      `/ncaaf/schedule?year=${v.target.value || currentYear}${
        allNflWeek && `&week=${allNflWeek || 0}`
      }${allNcaafdivision && `&conference=${allNcaafdivision || 0}`}`
    );

    setAllLoader(true);

    getAllNcaafSchedulelist(allNcaafdivision, v.target.value || currentYear, allNflWeek, (r) => {
      setAllLoader(false);

      setAllNflList(r);
    });
  };
  const onDivision = (v) => {
    setAllNcaafdivision(v.target.value);
    navigate(
      `/ncaaf/schedule?year=${allNflYear || currentYear}${
        allNflWeek && `&week=${allNflWeek || 0}`
      }${v.target.value && `&conference=${v.target.value || 0}`}`
    );

    setAllLoader(true);

    getAllNcaafSchedulelist(v.target.value, currentYear, allNflWeek, (r) => {
      setAllLoader(false);

      setAllNflList(r);
    });
  };

  const onClickRefresh = async () => {
    setAllNflYear("");
    setAllNflWeek("");
    setAllNcaafdivision("");
    navigate(`/ncaaf/schedule?year=${currentYear}`);

    setAllLoader(true);

    getAllNcaafSchedulelist("", currentYear, "", (r) => {
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
    <>
      <section className="schedulehome">
        <ScroreBoard page="NCAAF" />
        <section className="pt-4">
          <div className="container pt-5">
            <div className="row justify-content-center pt-2">
              <div className="col-5 col-md-3 col-xl-2 text-center z-5">
                <img className="w-100" src={ncaa} alt="ncaa.png" />
              </div>
            </div>
            <div className="row pt-4 mt-1">
              <div className="col-12 z-5">
                <h1 className="sub-heading text-center fw-bold text-uppercase mb-3">
                  FBS (I-A) Conference Schedule - {allNflYear ? allNflYear : currentYear}
                </h1>
              </div>
            </div>
            <div className="container">
              <div className="row justify-content-center mt-4">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                  {" "}
                  {/* Adjust column sizes as needed */}
                  <div className="d-flex flex-column flex-xxl-row justify-content-between align-items-center">
                    <div
                      className="d-sm-flex justify-content-xxl-end px-4 px-sm-108 order-1 order-xxl-"
                      style={{ marginRight: "10px" }}
                    >
                      <select
                        className="form-select form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
                        aria-label="Default select example"
                        onChange={onDivision}
                        value={allNcaafdivision}
                      >
                        <option selected hidden>
                          Select Conference Schedules
                        </option>
                        {divisionDropdown}
                      </select>

                      <select
                        className="form-select form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
                        aria-label="Default select example"
                        onChange={onYear}
                        value={allNflYear}
                      >
                        {yearDropdown}
                      </select>

                      <select
                        className="form-select form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
                        aria-label="Default select example"
                        onChange={onWeek}
                        value={allNflWeek}
                      >
                        <option hidden selected>
                          {startWeek ? startWeek : "Select"}
                        </option>
                        {ncaaWeekDropdownList.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      {allNcaafdivision || allNflWeek || allNflYear ? (
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
            </div>
          </div>
        </section>
      </section>

      <section className="pb-193 ncaaf_schdule_table ">
        {loader ? (
          <ColorRingCustomLoader isLoader={loader} />
        ) : allNflList && allNflList.message === "NCAA Schedule list" ? (
          allNflList?.response_data.map((item, index) => (
            <div key={index}>
              <div className="ncaaf_schdule_table">
                <div className="container">
                  <div className="table_heading d-flex flex-column justify-content-center">
                    <h2 className="text-center mw_400 white font-22 fw-semibold">
                      {addOneDayToDate(item._id).toLocaleDateString("en-us", { weekday: "long" })},{" "}
                      {format(addOneDayToDate(item._id), "MM-dd-yyyy")}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="pt-3 ncaaf_schdule_table pb-3 mb-5">
                <div className="container">
                  <div className="table-responsive px-4 position-relative ">
                    <table className="table text-nowrap table-striped position-relative z-1 table_bg">
                      <thead>
                        <tr className="py-4 ">
                          <th className="white border-0 ps-5 py-4" scope="col">
                            <h2 className="ps-4 font-16 fw-bold"> MATCHUP</h2>
                          </th>
                          <th className="white border-0 py-4"></th>
                          <th className="white border-0 py-4"></th>
                          <th className="white border-0 ps-2 py-4" scope="col">
                            <h2 className=" font-16 fw-bold"> TIME</h2>
                          </th>
                          <th className="white border-0 py-4 font-16" scope="col">
                            RESULT
                          </th>
                          <th className="white border-0 py-4 font-16" scope="col">
                            PASSING LEADER
                          </th>
                          <th className="white border-0 py-4 font-16" scope="col">
                            RUSHING LEADER
                          </th>
                          <th className="white border-0 py-4 font-16" scope="col">
                            RECEIVING LEADER
                          </th>
                        </tr>
                      </thead>
                      {item.doc.map((item) => {
                        return (
                          <tbody className="bg-white border-0">
                            <tr key={index} style={{ borderBottom: "2px solid " }}>
                              <>
                                <td className="lh-35 font-15 fw-normal d-flex text-start noBordrbtm ps-0">
                                  <div className="teamsImgs">
                                    <span className="d-inline-block">
                                      {/* roster-img */}
                                      <img
                                        src={
                                          item?.awayTeam?.logo_standard
                                            ? item?.awayTeam?.logo_standard
                                            : noTeamImg
                                        }
                                        style={{ width: "60px" }}
                                        alt={item?.awayTeam?.team_name}
                                      />
                                    </span>
                                  </div>

                                  <div className="customPdr" style={{ marginTop: "6px" }}>
                                    {item?.awayTeam?.team_name}
                                  </div>
                                </td>
                                <td className="border-0 width-90 py-4">
                                  <h2 className="black font-18 pe-5 opacity-75">AT</h2>
                                </td>
                                <td className="lh-35 font-15 fw-normal d-flex text-start noBordrbtm ps-0">
                                  <div className="teamsImgs">
                                    <span className="d-inline-block">
                                      {/* roster-img */}
                                      <img
                                        src={
                                          item?.homeTeam?.logo_standard
                                            ? item?.homeTeam?.logo_standard
                                            : noTeamImg
                                        }
                                        style={{ width: "60px" }}
                                      />
                                    </span>
                                  </div>

                                  <div className="customPdr" style={{ marginTop: "6px" }}>
                                    {item?.homeTeam?.team_name}
                                  </div>
                                </td>
                                <td className="blue text-start font-18 border-0 py-4 minwdth100">
                                  {item?.sheduleTime}
                                </td>
                                <td className="black text-start font-18 border-0 py-4 custom_width_230">
                                  {item?.awayTeamScore} - {item?.homeTeamScore}
                                </td>
                                <td className="black text-start font-18 border-0 py-4 custom_width_230">
                                  {item?.hipassing ? item?.hipassing : "-"}
                                </td>
                                <td className="black text-start font-18 border-0 py-4 custom_width_230">
                                  {item?.hirushing ? item?.hirushing : "-"}
                                </td>
                                <td className="black text-start font-18 border-0 py-4 custom_width_230">
                                  {item?.hireceiving ? item?.hireceiving : "-"}
                                </td>
                              </>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="container noData">
            <p style={{ color: "white", textAlign: "center" }}>Data not Found</p>
          </div>
        )}
      </section>
    </>
  );
};

export default NcaafSchedule;
