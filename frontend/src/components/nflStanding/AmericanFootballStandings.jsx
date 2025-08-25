import { useEffect, useState } from "react";
import { getAllNflStanding } from "./Helper";
import nflLogoImg from "../../Assets/img/nfl-logo-img.png";
import ScroreBoard from "../../components/homepage/ScroreBoard";
import ColorRingCustomLoader from "../common/ColorRingCustomLoader";

const AmericanFootballStandings = () => {
  const currentYear = new Date().getFullYear();
  const [allNflStanding, setAllNflStanding] = useState([]);
  const [loader, setAllLoader] = useState(false);
  const [isPlayerActive] = useState(0);
  const [allNflYear, setAllNflYear] = useState("");

  useEffect(() => {
    const asyncFunc = async () => {
      setAllLoader(true);
      getAllNflStanding(2023, (r) => {
        if (r) {
          setAllLoader(false);

          setAllNflStanding(r.response_data);
        }
      });
    };
    asyncFunc();
  }, []);

  let yearDropdown = [];
  for (let i = currentYear; i >= currentYear - 1; i--) {
    yearDropdown.push(
      <option selected={i === 2023 ? true : false} value={i} key={i}>
        {i}
      </option>
    );
  }

  const onYear = (v) => {
    setAllNflYear(v.target.value);
    setAllLoader(true);
    getAllNflStanding(v.target.value, (r) => {
      if (r) {
        setAllLoader(false);
        setAllNflStanding(r.response_data);
      }
    });
  };

  return (
    <div className="pb-5 mb-5">
      <div className="scoreboard-page-bg d-flex flex-column">
        <ScroreBoard page="NFL" />

        <div className="d-flex flex-column align-items-center justify-content-center mt-1 pt-5">
          <span>
            <img className="my-3 nflLogoImg" src={nflLogoImg} alt="nflLogoImg" />
          </span>
          <h1 className="font-42 white fw-bold">
            {allNflYear ? "STANDINGS -" + allNflYear : "STANDINGS -" + 2023}
          </h1>
        </div>
      </div>

      <div className="container pt-5">
        <div className="row">
          <div className="col-12">
            {isPlayerActive === 0 && 2 ? (
              <>
                <div className="amSlct">
                  <select
                    className="form-select form-select-sm ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
                    aria-label=".form-select-sm example"
                    onChange={onYear}
                  >
                    {yearDropdown}
                  </select>
                </div>

                {loader ? (
                  <ColorRingCustomLoader isLoader={loader} />
                ) : allNflStanding && allNflStanding.length != 0 ? (
                  allNflStanding.map((item, index) => (
                    <div key={index} className="py-5 ">
                      <div className="d-flex flex-column flex-md-row justify-content-between pe-sm-3 px-3">
                        <div className="gameblog-headings d-inline-block text-start px-sm-5 py-1  ms-sm-2 order-2 order-md-1">
                          <h5 className="font-22 text-nowrap fw-semibold white px-sm-5 ms-4  mb-0 text-uppercase py-sm-4 py-3">
                            {item.team_leag}
                          </h5>
                        </div>
                      </div>
                      <div className="table-responsive standing-table ps-4   text-nowrap">
                        <table class="table bg-white mb-0" key={index}>
                          <thead>
                            <tr>
                              <th
                                className="fw-semibold font-16 py-3 ps-5 standing-nfl-table-heading"
                                scope="col"
                              >
                                {item.team_leag === "National Football Conference" ? "NFC" : "AFC"}{" "}
                                East
                              </th>
                              <th
                                className="fw-semibold font-16 py-3 nfl-table-w-l-t-heading"
                                scope="col"
                              >
                                <span className="d-inline-block px-4 py-1">W</span>
                                <span className="d-inline-block px-4 py-1">L</span>
                                <span className="d-inline-block px-4 py-1">T</span>
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PCT
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                HOME
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                AWAY
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIV
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                CONF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PA
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIFF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                STRK
                              </th>
                            </tr>
                          </thead>

                          {item.doc
                            .filter((obj) => {
                              return obj.team_division === "East";
                            })
                            .map((items, index) => (
                              <tbody>
                                <tr
                                  key={index}
                                  className={`${index % 2 !== 0 ? "bg-very-light-grey" : ""}`}
                                >
                                  <td className="text-start py-3 font-16 fw-normal  lh-35 ">
                                    <div className="teamsImgs tIb">
                                      <span className="d-inline-block">
                                        <img
                                          className="table-img table-imgb"
                                          src={items?.team?.logo_standard}
                                          alt="tableImg1"
                                        />
                                      </span>
                                    </div>

                                    <span> {items?.team?.team_name}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35  nfl-table-w-l-t-heading">
                                    <span className="d-inline-block px-4">{items.won}</span>
                                    <span className="d-inline-block px-4">{items.lost}</span>
                                    <span className="d-inline-block px-4">{items.ties}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.win_percentage}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.home_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.road_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.division_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.conference_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_for}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_against}
                                  </td>
                                  <td
                                    className={`${
                                      items.difference > 0 ? "text-green" : "text-red"
                                    } text-start  py-3 font-16 fw-normal lh-35`}
                                  >
                                    {items.difference}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.streak}
                                  </td>
                                </tr>
                              </tbody>
                            ))}

                          <thead>
                            <tr>
                              <th
                                className="fw-semibold font-16 py-3 ps-5 standing-nfl-table-heading"
                                scope="col"
                              >
                                {item.team_leag === "National Football Conference" ? "NFC" : "AFC"}{" "}
                                West
                              </th>
                              <th
                                className="fw-semibold font-16 py-3 nfl-table-w-l-t-heading"
                                scope="col"
                              >
                                <span className="d-inline-block px-4 py-1">W</span>
                                <span className="d-inline-block px-4 py-1">L</span>
                                <span className="d-inline-block px-4 py-1">T</span>
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PCT
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                HOME
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                AWAY
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIV
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                CONF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PA
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIFF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                STRK
                              </th>
                            </tr>
                          </thead>

                          {item.doc
                            .filter((obj) => {
                              return obj.team_division === "West";
                            })
                            .map((items, index) => (
                              <tbody>
                                <tr
                                  key={index}
                                  className={`${index % 2 !== 0 ? "bg-very-light-grey" : ""}`}
                                >
                                  <td className="text-start py-3 font-16 fw-normal  lh-35 ">
                                    <div className="teamsImgs tIb">
                                      <span className="d-inline-block">
                                        <img
                                          className="table-img table-imgb"
                                          src={items?.team?.logo_standard}
                                          alt="tableImg1"
                                        />
                                      </span>
                                    </div>
                                    <span> {items?.team?.team_name}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35  nfl-table-w-l-t-heading">
                                    <span className="d-inline-block px-4">{items.won}</span>
                                    <span className="d-inline-block px-4">{items.lost}</span>
                                    <span className="d-inline-block px-4">{items.ties}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.win_percentage}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.home_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.road_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.division_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.conference_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_for}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_against}
                                  </td>
                                  <td
                                    className={`${
                                      items.difference > 0 ? "text-green" : "text-red"
                                    } text-start  py-3 font-16 fw-normal lh-35`}
                                  >
                                    {items.difference}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.streak}
                                  </td>
                                </tr>
                              </tbody>
                            ))}

                          <thead>
                            <tr>
                              <th
                                className="fw-semibold font-16 py-3 ps-5 standing-nfl-table-heading"
                                scope="col"
                              >
                                {item.team_leag === "National Football Conference" ? "NFC" : "AFC"}{" "}
                                North
                              </th>
                              <th
                                className="fw-semibold font-16 py-3 nfl-table-w-l-t-heading"
                                scope="col"
                              >
                                <span className="d-inline-block px-4 py-1">W</span>
                                <span className="d-inline-block px-4 py-1">L</span>
                                <span className="d-inline-block px-4 py-1">T</span>
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PCT
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                HOME
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                AWAY
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIV
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                CONF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PA
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIFF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                STRK
                              </th>
                            </tr>
                          </thead>

                          {item.doc
                            .filter((obj) => {
                              return obj.team_division === "North";
                            })
                            .map((items, index) => (
                              <tbody>
                                <tr
                                  key={index}
                                  className={`${index % 2 !== 0 ? "bg-very-light-grey" : ""}`}
                                >
                                  <td className="text-start py-3 font-16 fw-normal  lh-35 ">
                                    <div className="teamsImgs tIb">
                                      <span className="d-inline-block">
                                        <img
                                          className="table-img table-imgb"
                                          src={items?.team?.logo_standard}
                                          alt="tableImg1"
                                        />
                                      </span>
                                    </div>
                                    <span> {items?.team?.team_name}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35  nfl-table-w-l-t-heading">
                                    <span className="d-inline-block px-4">{items.won}</span>
                                    <span className="d-inline-block px-4">{items.lost}</span>
                                    <span className="d-inline-block px-4">{items.ties}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.win_percentage}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.home_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.road_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.division_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.conference_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_for}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_against}
                                  </td>
                                  <td
                                    className={`${
                                      items.difference > 0 ? "text-green" : "text-red"
                                    } text-start  py-3 font-16 fw-normal lh-35`}
                                  >
                                    {items.difference}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.streak}
                                  </td>
                                </tr>
                              </tbody>
                            ))}

                          <thead>
                            <tr>
                              <th
                                className="fw-semibold font-16 py-3 ps-5 standing-nfl-table-heading"
                                scope="col"
                              >
                                {item.team_leag === "National Football Conference" ? "NFC" : "AFC"}{" "}
                                South
                              </th>
                              <th
                                className="fw-semibold font-16 py-3 nfl-table-w-l-t-heading"
                                scope="col"
                              >
                                <span className="d-inline-block px-4 py-1">W</span>
                                <span className="d-inline-block px-4 py-1">L</span>
                                <span className="d-inline-block px-4 py-1">T</span>
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PCT
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                HOME
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                AWAY
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIV
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                CONF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PA
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIFF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                STRK
                              </th>
                            </tr>
                          </thead>

                          {item.doc
                            .filter((obj) => {
                              return obj.team_division === "South";
                            })
                            .map((items, index) => (
                              <tbody>
                                <tr
                                  key={index}
                                  className={`${index % 2 !== 0 ? "bg-very-light-grey" : ""}`}
                                >
                                  <td className="text-start py-3 font-16 fw-normal  lh-35 ">
                                    <div className="teamsImgs tIb">
                                      <span className="d-inline-block">
                                        <img
                                          className="table-img table-imgb"
                                          src={items?.team?.logo_standard}
                                          alt="tableImg1"
                                        />
                                      </span>
                                    </div>
                                    <span> {items?.team?.team_name}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35  nfl-table-w-l-t-heading">
                                    <span className="d-inline-block px-4">{items.won}</span>
                                    <span className="d-inline-block px-4">{items.lost}</span>
                                    <span className="d-inline-block px-4">{items.ties}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.win_percentage}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.home_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.road_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.division_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.conference_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_for}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_against}
                                  </td>
                                  <td
                                    className={`${
                                      items.difference > 0 ? "text-green" : "text-red"
                                    } text-start  py-3 font-16 fw-normal lh-35`}
                                  >
                                    {items.difference}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.streak}
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                        </table>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="container noData">
                    <p style={{ color: "white", textAlign: "center" }}>Data not Found</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="amSlct">
                  <select
                    className="form-select form-select-sm ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
                    aria-label=".form-select-sm example"
                    onChange={onYear}
                  >
                    {yearDropdown}
                  </select>
                </div>

                {loader ? (
                  <ColorRingCustomLoader isLoader={loader} />
                ) : allNflStanding && allNflStanding.length != 0 ? (
                  allNflStanding.map((item, index) => (
                    <div key={index} className="py-5 ">
                      <div className="d-flex flex-column flex-md-row justify-content-between pe-sm-3 px-3">
                        <div className="gameblog-headings d-inline-block text-start px-sm-5 py-1  ms-sm-2 order-2 order-md-1">
                          <h5 className="font-22 text-nowrap fw-semibold white px-sm-5 ms-4  mb-0 text-uppercase py-sm-4 py-3">
                            {item.team_leag}
                          </h5>
                        </div>
                      </div>
                      <div className="table-responsive standing-table ps-4   text-nowrap">
                        <table class="table bg-white mb-0" key={index}>
                          <thead>
                            <tr>
                              <th
                                className="fw-semibold font-16 py-3 ps-5 standing-nfl-table-heading"
                                scope="col"
                              >
                                {item.team_leag === "National Football Conference" ? "NFC" : "AFC"}{" "}
                                East
                              </th>
                              <th
                                className="fw-semibold font-16 py-3 nfl-table-w-l-t-heading"
                                scope="col"
                              >
                                <span className="d-inline-block px-4 py-1">W</span>
                                <span className="d-inline-block px-4 py-1">L</span>
                                <span className="d-inline-block px-4 py-1">T</span>
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PCT
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                HOME
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                AWAY
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIV
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                CONF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PA
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIFF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                STRK
                              </th>
                            </tr>
                          </thead>

                          {item.doc
                            .filter((obj) => {
                              return obj.team_division === "East";
                            })
                            .map((items, index) => (
                              <tbody>
                                <tr
                                  key={index}
                                  className={`${index % 2 !== 0 ? "bg-very-light-grey" : ""}`}
                                >
                                  <td className="text-start py-3 font-16 fw-normal  lh-35 ">
                                    <div className="teamsImgs tIb">
                                      <span className="d-inline-block">
                                        <img
                                          className="table-img table-imgb"
                                          src={items?.team?.logo_standard}
                                          alt="tableImg1"
                                        />
                                      </span>
                                    </div>

                                    <span> {items?.team?.team_name}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35  nfl-table-w-l-t-heading">
                                    <span className="d-inline-block px-4">{items.won}</span>
                                    <span className="d-inline-block px-4">{items.lost}</span>
                                    <span className="d-inline-block px-4">{items.ties}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.win_percentage}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.home_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.road_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.division_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.conference_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_for}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_against}
                                  </td>
                                  <td
                                    className={`${
                                      items.diff > 0 ? "text-green" : "text-red"
                                    } text-start  py-3 font-16 fw-normal lh-35`}
                                  >
                                    {items.difference}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.streak}
                                  </td>
                                </tr>
                              </tbody>
                            ))}

                          <thead>
                            <tr>
                              <th
                                className="fw-semibold font-16 py-3 ps-5 standing-nfl-table-heading"
                                scope="col"
                              >
                                {item.team_leag === "National Football Conference" ? "NFC" : "AFC"}{" "}
                                West
                              </th>
                              <th
                                className="fw-semibold font-16 py-3 nfl-table-w-l-t-heading"
                                scope="col"
                              >
                                <span className="d-inline-block px-4 py-1">W</span>
                                <span className="d-inline-block px-4 py-1">L</span>
                                <span className="d-inline-block px-4 py-1">T</span>
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PCT
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                HOME
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                AWAY
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIV
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                CONF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PA
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIFF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                STRK
                              </th>
                            </tr>
                          </thead>

                          {item.doc
                            .filter((obj) => {
                              return obj.team_division === "West";
                            })
                            .map((items, index) => (
                              <tbody>
                                <tr
                                  key={index}
                                  className={`${index % 2 !== 0 ? "bg-very-light-grey" : ""}`}
                                >
                                  <td className="text-start py-3 font-16 fw-normal  lh-35 ">
                                    <div className="teamsImgs tIb">
                                      <span className="d-inline-block">
                                        <img
                                          className="table-img table-imgb"
                                          src={items?.team?.logo_standard}
                                          alt="tableImg1"
                                        />
                                      </span>
                                    </div>
                                    <span> {items?.team?.team_name}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35  nfl-table-w-l-t-heading">
                                    <span className="d-inline-block px-4">{items.won}</span>
                                    <span className="d-inline-block px-4">{items.lost}</span>
                                    <span className="d-inline-block px-4">{items.ties}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.win_percentage}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.home_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.road_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.division_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.conference_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_for}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_against}
                                  </td>
                                  <td
                                    className={`${
                                      items.diff > 0 ? "text-green" : "text-red"
                                    } text-start  py-3 font-16 fw-normal lh-35`}
                                  >
                                    {items.difference}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.streak}
                                  </td>
                                </tr>
                              </tbody>
                            ))}

                          <thead>
                            <tr>
                              <th
                                className="fw-semibold font-16 py-3 ps-5 standing-nfl-table-heading"
                                scope="col"
                              >
                                {item.team_leag === "National Football Conference" ? "NFC" : "AFC"}{" "}
                                North
                              </th>
                              <th
                                className="fw-semibold font-16 py-3 nfl-table-w-l-t-heading"
                                scope="col"
                              >
                                <span className="d-inline-block px-4 py-1">W</span>
                                <span className="d-inline-block px-4 py-1">L</span>
                                <span className="d-inline-block px-4 py-1">T</span>
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PCT
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                HOME
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                AWAY
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIV
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                CONF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PA
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIFF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                STRK
                              </th>
                            </tr>
                          </thead>

                          {item.doc
                            .filter((obj) => {
                              return obj.team_division === "North";
                            })
                            .map((items, index) => (
                              <tbody>
                                <tr
                                  key={index}
                                  className={`${index % 2 !== 0 ? "bg-very-light-grey" : ""}`}
                                >
                                  <td className="text-start py-3 font-16 fw-normal  lh-35 ">
                                    <div className="teamsImgs tIb">
                                      <span className="d-inline-block">
                                        <img
                                          className="table-img table-imgb"
                                          src={items?.team?.logo_standard}
                                          alt="tableImg1"
                                        />
                                      </span>
                                    </div>
                                    <span> {items?.team?.team_name}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35  nfl-table-w-l-t-heading">
                                    <span className="d-inline-block px-4">{items.won}</span>
                                    <span className="d-inline-block px-4">{items.lost}</span>
                                    <span className="d-inline-block px-4">{items.ties}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.win_percentage}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.home_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.road_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.division_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.conference_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_for}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_against}
                                  </td>
                                  <td
                                    className={`${
                                      items.diff > 0 ? "text-green" : "text-red"
                                    } text-start  py-3 font-16 fw-normal lh-35`}
                                  >
                                    {items.difference}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.streak}
                                  </td>
                                </tr>
                              </tbody>
                            ))}

                          <thead>
                            <tr>
                              <th
                                className="fw-semibold font-16 py-3 ps-5 standing-nfl-table-heading"
                                scope="col"
                              >
                                {item.team_leag === "National Football Conference" ? "NFC" : "AFC"}{" "}
                                South
                              </th>
                              <th
                                className="fw-semibold font-16 py-3 nfl-table-w-l-t-heading"
                                scope="col"
                              >
                                <span className="d-inline-block px-4 py-1">W</span>
                                <span className="d-inline-block px-4 py-1">L</span>
                                <span className="d-inline-block px-4 py-1">T</span>
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PCT
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                HOME
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                AWAY
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIV
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                CONF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                PA
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                DIFF
                              </th>
                              <th className="fw-semibold font-16 py-3 " scope="col">
                                STRK
                              </th>
                            </tr>
                          </thead>

                          {item.doc
                            .filter((obj) => {
                              return obj.team_division === "South";
                            })
                            .map((items, index) => (
                              <tbody>
                                <tr
                                  key={index}
                                  className={`${index % 2 !== 0 ? "bg-very-light-grey" : ""}`}
                                >
                                  <td className="text-start py-3 font-16 fw-normal  lh-35 ">
                                    <div className="teamsImgs tIb">
                                      <span className="d-inline-block">
                                        <img
                                          className="table-img table-imgb"
                                          src={items?.team?.logo_standard}
                                          alt="tableImg1"
                                        />
                                      </span>
                                    </div>
                                    <span> {items?.team?.team_name}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35  nfl-table-w-l-t-heading">
                                    <span className="d-inline-block px-4">{items.won}</span>
                                    <span className="d-inline-block px-4">{items.lost}</span>
                                    <span className="d-inline-block px-4">{items.ties}</span>
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.win_percentage}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.home_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.road_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.division_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.conference_record}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_for}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.points_against}
                                  </td>
                                  <td
                                    className={`${
                                      items.diff > 0 ? "text-green" : "text-red"
                                    } text-start  py-3 font-16 fw-normal lh-35`}
                                  >
                                    {items.difference}
                                  </td>
                                  <td className="text-start py-3 font-16 fw-normal text-light-gray lh-35 ">
                                    {items.streak}
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                        </table>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="container noData">
                    <p style={{ color: "white", textAlign: "center" }}>Data not Found</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmericanFootballStandings;
