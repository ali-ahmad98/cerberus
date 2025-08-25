import { useEffect, useState } from "react";
import { getAllNflScoreList } from "./Helper";
import ScoreBoardTable from "./ScoreBoardTable";
import { format } from "date-fns";
import ColorRingCustomLoader from "../common/ColorRingCustomLoader";
import { nflWeekList } from "../nfl-team/Helper";
import { weekListDate } from "../../../src/components/nfl-schedule/Helper";

const ScoreBoardCard = () => {
  const currentYear = new Date().getFullYear();
  const [loader, setAllLoader] = useState(false);
  const [allScoreList, setAllScoreList] = useState([]);
  const [allNflWeek, setAllNflWeek] = useState("");
  const [allNflYear, setAllNflYear] = useState("");
  const [startWeek, setStartWeek] = useState("");

  let yearDropdown = [];
  for (let i = currentYear; i >= currentYear - 1; i--) {
    yearDropdown.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  const onYear = (v) => {
    setAllNflYear(v.target.value);
    setAllLoader(true);

    getAllNflScoreList(v.target.value, startWeek || allNflWeek, (r) => {
      if (r) {
        setAllLoader(false);

        setAllScoreList(r);
      }
    });
  };

  const onWeek = (v) => {
    setAllNflWeek(v.target.value);

    setAllLoader(true);

    getAllNflScoreList(allNflYear || currentYear, v.target.value, (r) => {
      setAllLoader(false);

      setAllScoreList(r);
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

    getAllNflScoreList(currentYear, returnDate, (r) => {
      if (r) {
        setAllLoader(false);
        setAllScoreList(r);
      }
    });
  }, []);

  const addOneDayToDate = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };

  return (
    <>
      <section className="pt-0 py-5 mb-5">
        <div className="container my-lg-5 gamelog-table pb-5">
          <div className="d-md-flex justify-content-center w-100 px-md-5">
            <select
              className="form-select form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
              aria-label=".form-select-sm example"
              onChange={onYear}
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
                {startWeek ? startWeek : "Select"}
              </option>

              {nflWeekList.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <br />
          <br />
          <br />

          <div className="mb-sm-5 pb-sm-5">
            {loader ? (
              <ColorRingCustomLoader isLoader={loader} />
            ) : allScoreList && allScoreList.message === "NFL Schedule list" ? (
              allScoreList?.response_data.map((item, index) => (
                <div className={`${index !== 0 ? "pt-5" : ""}`} key={index}>
                  <div className="gameblog-headings d-inline-block text-start pe-5  ms-3">
                    <h5 className="font-22 text-nowrap fw-semibold white p-3 ms-4 ps-4 mb-0">
                      {addOneDayToDate(item._id).toLocaleDateString("en-us", { weekday: "long" })},{" "}
                      {format(addOneDayToDate(item._id), "MM-dd-yyyy")}
                    </h5>
                  </div>
                  <div className="table-responsive scoreboard-table ps-4 ">
                    {item?.doc?.map((obj, index) => (
                      <ScoreBoardTable key={index} obj={obj} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="container noData">
                <p style={{ color: "white", textAlign: "center" }}>Data not Found</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ScoreBoardCard;
