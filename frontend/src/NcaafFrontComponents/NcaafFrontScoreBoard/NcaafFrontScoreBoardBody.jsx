import { useEffect, useState } from "react";
import dotsImg from "../../Assets/NcaafFrontAssets/HomepageAssets/img/dotsImg.png";
import LeftTopdotsImg from "../../Assets/NcaafFrontAssets/HomepageAssets/img/LeftTopdotsImg.png";
import ScroreBoard from "../../components/homepage/ScroreBoard";
import ncaa from "../../Assets/NcaafFrontAssets/ScheduleAssets/images/ncaa.png";
import { getAllNcaafScoreList } from "./Helper";
import SideArrowIcon from "../../Assets/NcaafFrontAssets/HomepageAssets/img/side-arrow-icon.svg";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import orangeWeather from "../../Assets/orange-weather.png";
import HalfMoonIcon from "../../Assets/NcaafFrontAssets/HomepageAssets/img/half-moon-icon.svg";
import ColorRingCustomLoader from "../../components/common/ColorRingCustomLoader";
import { ncaaWeekDropdownList } from "../../components/NCAA/HelperNcaa";
import { useNavigate } from "react-router-dom";
import { weekListDate } from "../../NcaafFrontComponents/NcaafFrontSchedule/Helper";

const NcaafFrontScoreBoardBody = () => {
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const currentDate = new Date();
  const [startWeek, setStartWeek] = useState("");

  const [isDateActive, setDateActive] = useState(0);
  const [allScoreList, setAllScoreList] = useState([]);
  const [loader, setAllLoader] = useState(false);
  const [allNflWeek, setAllNflWeek] = useState("");
  const [allNflYear, setAllNflYear] = useState("");

  const addOneDayToDate = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };

  let yearDropdown = [];
  for (let i = currentYear; i >= currentYear - 1; i--) {
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
  const onYear = (v) => {
    setAllNflYear(v.target.value);
    setAllLoader(true);

    getAllNcaafScoreList(v.target.value, startWeek || allNflWeek, (r) => {
      if (r) {
        setAllLoader(false);
        setAllScoreList(r);
      }
    });
  };

  const onWeek = (v) => {
    setAllNflWeek(v.target.value);
    setAllLoader(true);

    getAllNcaafScoreList(allNflYear || currentYear, v.target.value, (r) => {
      setAllLoader(false);

      setAllScoreList(r);
    });
  };

  useEffect(() => {
    navigate(`/ncaaf/scoreboard?year=${currentYear}`);
    setAllLoader(true);
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
    getAllNcaafScoreList(currentYear, returnDate, (r) => {
      if (r) {
        setAllLoader(false);

        setAllScoreList(r);
      }
    });
  }, []);

  return (
    <>
      <section className="schedulehome position-relative">
        <img
          className="position-absolute scoreboardLeftDotsImg"
          src={LeftTopdotsImg}
          alt="LeftTopdotsImg"
        />
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
                <h1 className="sub-heading text-center fw-bold text-uppercase mb-3">Scoreboard</h1>
              </div>
            </div>
            <div className="row justify-content-center mt-4">
              <div className="col-12 z-5 col-lg-10 col-xxl-8 d-flex justify-content-between">
                <div className="d-md-flex justify-content-center w-100 px-md-5">
                  <select
                    className="form-select form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
                    aria-label="Default select example"
                    onChange={onYear}
                  >
                    {yearDropdown}
                  </select>

                  <select
                    className="form-select form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
                    aria-label="Default select example"
                    onChange={onWeek}
                    name="ddl_week"
                    value={allNflWeek}
                  >
                    <option hidden selected>
                      {startWeek ? startWeek : "Select"}
                    </option>

                    {ncaaWeekDropdownList.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
        <img className="position-absolute scoreboardDotsImg" src={dotsImg} alt="dotsImg" />
      </section>

      <div className="container nfl-team-stats mb-5 pb-5">
        <div className="row">
          <div className="col-12">
            <div className="container">
              <div className="scoreboard-table">
                {loader ? (
                  <ColorRingCustomLoader isLoader={loader} />
                ) : allScoreList && allScoreList.message === "Ncaa Score list" ? (
                  allScoreList?.response_data.map((obj, index) =>
                    new Date(obj._id) < currentDate ? (
                      <div key={index} className="gamelog-table players-table">
                        <div class="table-responsive px-4 position-relative table-bg-line">
                          <div className="container mt-3 pt-lg-3">
                            <div className="d-flex flex-column flex-sm-row align-items-sm-center pt-0 text-nowrap ncaaf-front-heading-bar pe-sm-4 frontscore-minus-mb    pb-1">
                              <div className="gameblog-headings d-flex align-items-center ms-4 ms-sm-0">
                                <button
                                  className={`text-start ${
                                    isDateActive === 0
                                      ? "text-white min-height-68 mt-20"
                                      : "tab-btn"
                                  } nav_tabs_stats_btn tab-btn-padding`}
                                  onClick={() => setDateActive(0)}
                                >
                                  <span>
                                    {addOneDayToDate(obj._id).toLocaleDateString("en-us", {
                                      weekday: "long",
                                    })}
                                    , {format(addOneDayToDate(obj._id), "MM-dd-yyyy")}
                                  </span>
                                </button>
                              </div>
                              <div className="d-flex mt-2 mt-lg-0 mb-2 mb-lg-0"></div>
                            </div>
                          </div>
                          <table className="table text-nowrap position-relative z-1 table_bg ms-3 mt-4 mb-0">
                            <thead>
                              <tr class="py-4 text-uppercase height-70">
                                <th
                                  class="white border-0 ps-4 ps-md-5 py-4"
                                  scope="col"
                                  colSpan={1}
                                >
                                  <div className="d-flex align-items-center justify-content-between">
                                    <h2 class="font-18 fw-semibold mb-0">{"Final"}</h2>
                                    <div className="font-18 fw-semibold d-flex align-items-center">
                                      <td className="border-0 mx-2">1</td>
                                      <td className="border-0 mx-2">2</td>
                                      <td className="border-0 mx-2">3</td>
                                      <td className="border-0 mx-2">4</td>
                                      <td className="border-0 ms-5 me-2">T</td>
                                    </div>
                                  </div>
                                </th>
                                <th
                                  class="font-18 fw-semibold white border-0 py-4 ps-5"
                                  scope="col"
                                  colSpan={1}
                                >
                                  TEAM INFORMATION
                                </th>
                                <th
                                  class="font-18 fw-semibold white border-0 py-4"
                                  scope="col"
                                  colSpan={1}
                                >
                                  TOP PERFORMERS
                                </th>
                              </tr>
                            </thead>
                            {obj.doc.map((obj, index) => (
                              <tbody key={index}>
                                <tr>
                                  <th scope="row" className="border-right width-500 tbordr">
                                    <div
                                      className={`d-flex align-items-center frontSpace pt-1 ${
                                        Number(obj?.awayTeamScore?.totalscore) >
                                        Number(obj?.homeTeamScore?.totalscore)
                                          ? "awayClr"
                                          : "awayClr2"
                                      }`}
                                    >
                                      <div className="frontFlex">
                                        <img
                                          className="table-img me-4"
                                          src={obj?.awayTeam?.logo_standard}
                                          alt="img"
                                        />

                                        <div>
                                          <p className="font-22 fw-normal mb-0">
                                            <span className="grey me-1"></span>

                                            {obj?.awayTeam?.team_name}
                                          </p>
                                          <p className="font-18 fw-normal mb-0">{obj.team1Text}</p>
                                        </div>
                                      </div>

                                      <div className="font-18 fw-normal d-flex align-items-center ms-5 ps-5 fxTd">
                                        <td className="border-0 mx-2">{obj?.awayTeamScore?.q1}</td>
                                        <td className="border-0 mx-2">{obj?.awayTeamScore?.q2}</td>
                                        <td className="border-0 mx-2">{obj?.awayTeamScore?.q3}</td>
                                        <td className="border-0 mx-2">{obj?.awayTeamScore?.q4}</td>
                                        <td className="border-0 mx-2 font-28">
                                          {obj?.awayTeamScore?.totalscore}
                                        </td>
                                      </div>
                                    </div>

                                    <div
                                      className={`d-flex align-items-center frontSpace pt-5 ${
                                        Number(obj?.awayTeamScore?.totalscore) <
                                        Number(obj?.homeTeamScore?.totalscore)
                                          ? "awayClr"
                                          : "awayClr2"
                                      }`}
                                    >
                                      <div className="frontFlex">
                                        <img
                                          className="table-img me-4"
                                          src={obj?.homeTeam?.logo_standard}
                                          alt="img"
                                        />
                                        <div>
                                          <p className="font-22 fw-normal mb-0">
                                            <span className="grey me-1"></span>
                                            {obj?.homeTeam?.team_name}
                                          </p>
                                          <p className="font-18 fw-normal mb-0">{obj.team2Text}</p>
                                        </div>
                                      </div>
                                      <div className="font-18 fw-normal d-flex align-items-center ms-5 ps-5 fxTd">
                                        <td className="border-0 mx-2">{obj?.homeTeamScore?.q1}</td>
                                        <td className="border-0 mx-2">{obj?.homeTeamScore?.q2}</td>
                                        <td className="border-0 mx-2">{obj?.homeTeamScore?.q3}</td>
                                        <td className="border-0 mx-2">{obj?.homeTeamScore?.q4}</td>
                                        <td className="border-0 mx-2 font-28 ">
                                          {obj?.homeTeamScore?.totalscore}
                                        </td>
                                      </div>
                                    </div>
                                  </th>

                                  <td className="table-small-bg font-18 fw-light text-start px-0 d-flex flex-column border-bottom mt-2">
                                    <div className="position-relative text-white d-flex align-items-center justify-content-between py-3 px-4 ">
                                      <div className="text-wrap ps-4">
                                        <h4 className="mb-0 font-22 mw-250 mb-23">
                                          {obj?.awayTeam?.team_name}
                                        </h4>
                                        <div className="selectLink">
                                          <span>
                                            <Link
                                              to={`/ncaaf/team-details/roster?team=${obj?.awayTeam?.team_id}`}
                                            >
                                              Roster
                                            </Link>
                                          </span>

                                          <span className="px-3 mx-3 place-text-border">
                                            <Link
                                              to={`/ncaaf/team-details/stats?team=${obj?.awayTeam?.team_id}`}
                                            >
                                              Statistics
                                            </Link>
                                          </span>
                                          <span>
                                            <Link
                                              to={`/ncaaf/team-details/schedule?team=${obj?.awayTeam?.team_id}`}
                                            >
                                              Schedule
                                            </Link>
                                          </span>
                                        </div>
                                      </div>
                                      {Number(obj?.awayTeamScore?.totalscore) >
                                      Number(obj?.homeTeamScore?.totalscore) ? (
                                        <img
                                          className="position-absolute side-arrow-icon"
                                          src={SideArrowIcon}
                                          alt="SideArrowIcon"
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </td>

                                  <td className="table-small-bg font-18 fw-light text-start px-0 d-flex flex-column border-bottom my-2">
                                    <div className="text-white d-flex align-items-center justify-content-between py-3 px-4 ">
                                      <div className="text-wrap ps-4">
                                        <h4 className="mb-0 font-22 mw-250 mb-2">
                                          {obj?.homeTeam?.team_name}
                                        </h4>
                                        <div className="selectLink">
                                          <span>
                                            <Link
                                              to={`/ncaaf/team-details/roster?team=${obj?.homeTeam?.team_id}`}
                                            >
                                              Roster
                                            </Link>
                                          </span>
                                          <span className="px-3 mx-3 place-text-border">
                                            <Link
                                              to={`/ncaaf/team-details/stats?team=${obj?.homeTeam?.team_id}`}
                                            >
                                              Statistics
                                            </Link>
                                          </span>
                                          <span>
                                            <Link
                                              to={`/ncaaf/team-details/schedule?team=${obj?.homeTeam?.team_id}`}
                                            >
                                              Schedule
                                            </Link>
                                          </span>
                                          {Number(obj?.awayTeamScore?.totalscore) <
                                          Number(obj?.homeTeamScore?.totalscore) ? (
                                            <img
                                              className="position-absolute side-arrow-icon"
                                              src={SideArrowIcon}
                                              alt="SideArrowIcon"
                                              style={{ marginTop: "-16px" }}
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="font-14 fw-light text-start ps-5 border-left border-right">
                                    <div className="d-flex align-items-center py-1">
                                      <p className="mb-0 pe-3 min-width-55">PASS</p>
                                      <div className="border-left-custom ps-4">
                                        <p className="mb-0 ">
                                          <span className="fw-bold">
                                            {Number(obj?.maxPassing?.awayteam?.yards) >
                                            Number(obj?.maxPassing?.hometeam?.yards)
                                              ? obj?.maxPassing?.awayteam?.name
                                              : obj?.maxPassing?.hometeam?.name}
                                          </span>
                                          {obj.passNormalText}
                                        </p>
                                        <p className="mb-0 font-13">
                                          {Number(obj?.maxPassing?.awayteam?.yards) >
                                          Number(obj?.maxPassing?.hometeam?.yards)
                                            ? obj?.maxPassing?.awayteam?.yards
                                            : obj?.maxPassing?.hometeam?.yards}
                                          &nbsp;YDS, &nbsp;
                                          {Number(obj?.maxPassing?.awayteam?.yards) >
                                          Number(obj?.maxPassing?.hometeam?.yards)
                                            ? obj?.maxPassing?.awayteam?.passing_touch_downs
                                            : obj?.maxPassing?.hometeam?.passing_touch_downs}
                                          &nbsp;TD, &nbsp;
                                          {Number(obj?.maxPassing?.awayteam?.yards) >
                                          Number(obj?.maxPassing?.hometeam?.yards)
                                            ? obj?.maxPassing?.awayteam?.interceptions
                                            : obj?.maxPassing?.hometeam?.interceptions}
                                          &nbsp;INT
                                        </p>
                                      </div>
                                    </div>

                                    <div className="d-flex align-items-center py-3">
                                      <p className="mb-0 pe-3 min-width-55">RUSH</p>
                                      <div className="border-left-custom ps-4">
                                        <p className="mb-0 ">
                                          <span className="fw-bold">
                                            {Number(obj?.maxRushing?.awayteam?.yards) >
                                            Number(obj?.maxRushing?.hometeam?.yards)
                                              ? obj?.maxRushing?.awayteam?.name
                                              : obj?.maxRushing?.hometeam?.name}
                                          </span>
                                          {obj.rushNormalText}
                                        </p>
                                        <p className="mb-0 font-13">
                                          {Number(obj?.maxRushing?.awayteam?.yards) >
                                          Number(obj?.maxRushing?.hometeam?.yards)
                                            ? obj?.maxRushing?.awayteam?.yards
                                            : obj?.maxRushing?.hometeam?.yards}
                                          &nbsp;YDS, &nbsp;
                                          {Number(obj?.maxRushing?.awayteam?.yards) >
                                          Number(obj?.maxRushing?.hometeam?.yards)
                                            ? obj?.maxRushing?.awayteam?.rushing_touch_downs
                                            : obj?.maxRushing?.hometeam?.rushing_touch_downs}
                                          &nbsp;TD, &nbsp;
                                        </p>
                                      </div>
                                    </div>

                                    <div className="d-flex align-items-center py-1">
                                      <p className="mb-0 pe-3 min-width-55">REC</p>
                                      <div className="border-left-custom ps-4">
                                        <p className="mb-0 ">
                                          <span className="fw-bold">
                                            {Number(obj?.maxReceiving?.awayteam?.yards) >
                                            Number(obj?.maxReceiving?.hometeam?.yards)
                                              ? obj?.maxReceiving?.awayteam?.name
                                              : obj?.maxReceiving?.hometeam?.name}
                                          </span>
                                          {obj.recNormalText}
                                        </p>
                                        <p className="mb-0 font-13">
                                          {Number(obj?.maxReceiving?.awayteam?.yards) >
                                          Number(obj?.maxReceiving?.hometeam?.yards)
                                            ? obj?.maxReceiving?.awayteam?.total_receptions
                                            : obj?.maxReceiving?.hometeam?.total_receptions}
                                          &nbsp;REC, &nbsp;
                                          {Number(obj?.maxReceiving?.awayteam?.yards) >
                                          Number(obj?.maxReceiving?.hometeam?.yards)
                                            ? obj?.maxReceiving?.awayteam?.yards
                                            : obj?.maxReceiving?.hometeam?.yards}
                                          &nbsp;YDS, &nbsp;
                                          {Number(obj?.maxReceiving?.awayteam?.yards) >
                                          Number(obj?.maxReceiving?.hometeam?.yards)
                                            ? obj?.maxReceiving?.awayteam?.receiving_touch_downs
                                            : obj?.maxReceiving?.hometeam?.receiving_touch_downs}
                                          &nbsp;TD, &nbsp;
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                          </table>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )
                ) : (
                  <div className="container noData">
                    <p style={{ color: "white", textAlign: "center" }}>Data not Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container nfl-team-stats mb-5 pb-5">
        <div className="row">
          <div className="col-12">
            <div className="container">
              <div className="gamelog-table players-table">
                <div class="table-responsive px-4 position-relative table-bg-line">
                  {allScoreList &&
                    allScoreList.message === "Ncaa Score list" &&
                    allScoreList?.response_data.map((item) =>
                      new Date(item._id) > currentDate ? (
                        <>
                          {item.doc.map((item, index) => (
                            <div key={index} className="wrapScroll">
                              <table className="table text-nowrap position-relative z-1 table_bg ms-3 mt-4 mb-0">
                                <thead>
                                  <tr class="py-4 text-uppercase">
                                    <th
                                      class="white border-0 ps-4 ps-sm-5 py-4 height-70 align-middle min-width-300 custom-width-500 vertical-align-middle"
                                      scope="col"
                                      colSpan={1}
                                    >
                                      <div className="d-flex align-items-center justify-content-between">
                                        <h2 class="font-20 fw-bold">
                                          {addOneDayToDate(item.matchDate).toLocaleDateString(
                                            "en-us",
                                            { weekday: "long" }
                                          )}
                                          , {format(addOneDayToDate(item.matchDate), "MM-dd-yyyy")},{" "}
                                          {item.matchTime}
                                        </h2>
                                      </div>
                                    </th>
                                    <th
                                      className="py-0 px-0 table-small-bg align-middle"
                                      scope="col"
                                    >
                                      <div className="text-white d-flex justify-content-between py-2 min-width-300 align-items-center px-4">
                                        <div className="text-wrap">
                                          <h4 className="mb-0 ps-lg-4 font-18 fw-light custom-width-400">
                                            {item.matchVenue}
                                          </h4>
                                        </div>
                                        <div className="pe-lg-4">
                                          <img src={orangeWeather} alt="orangeWeather" />
                                          <p className="mb-0 font-18 fw-light">
                                            <img
                                              className="pe-1"
                                              src={HalfMoonIcon}
                                              alt="HalfMoonIcon"
                                            />
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
                                    <th
                                      scope="row"
                                      className={`thirdFlex ${
                                        Number(item?.awayTeamScore?.totalscore) >
                                        Number(item?.homeTeamScore?.totalscore)
                                          ? "awayClr"
                                          : "awayClr2"
                                      }`}
                                    >
                                      <div className="d-flex align-items-center pb-4 mb-4 pt-5 bdrBtm">
                                        <img
                                          className="table-img ms-3 me-4"
                                          src={item?.awayTeam?.logo_standard}
                                          alt="img"
                                        />

                                        <div>
                                          <p className="font-22 fw-normal mb-0">
                                            <span className="grey me-1">
                                              {item.FirstNameLetter}
                                            </span>
                                            {item?.awayTeam?.team_name}
                                          </p>
                                          <p className="font-18 fw-light mb-0">{item.team1Text}</p>
                                        </div>
                                      </div>

                                      <div
                                        className={`d-flex align-items-center pt-1 ${
                                          Number(item?.awayTeamScore?.totalscore) <
                                          Number(item?.homeTeamScore?.totalscore)
                                            ? "awayClr"
                                            : "awayClr2"
                                        }`}
                                      >
                                        <img
                                          className="table-img ms-3 me-4"
                                          src={item?.homeTeam?.logo_standard}
                                          alt="img"
                                        />

                                        <div className="black">
                                          <p className="font-22 fw-normal mb-0">
                                            <span className="grey me-1">
                                              {item.SecondNameLetter}
                                            </span>
                                            {item?.homeTeam?.team_name}
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
                                      ""
                                      // <td></td>
                                    )}

                                    <td>&nbsp;</td>

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
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          ))}
                        </>
                      ) : (
                        ""
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NcaafFrontScoreBoardBody;
