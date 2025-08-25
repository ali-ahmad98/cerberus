import { Fragment } from "react";
import { useEffect, useState } from "react";
import ScoreBoardListItem from "./ScoreBoardListItem";
import { getLiveScoresApi } from "../../service/homeService";
import ScoreBoardListItemNcaa from "./ScoreBoardListItemNcaa";
import { weekListDate } from "../../../src/components/nfl-schedule/Helper";
import { weekListDateNcaaf } from "../../NcaafFrontComponents/NcaafFrontSchedule/Helper";

const ScroreBoard = ({ page }) => {
  const [scoreData, set_scoreData] = useState({});
  const [_, setStartWeek] = useState("");

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
    const curYear = new Date().getFullYear();
    const curDay = getWeek(new Date().getDate(), new Date().getMonth() + 1);

    let returnDate = "";
    let weekNcaaf = "";

    {
      page === "NFL"
        ? weekListDate[curYear].forEach((element) => {
            Object.values(element).forEach((val) => {
              val.forEach((d) => {
                if (curDay === d) {
                  const newarray = Object.keys(element);
                  setStartWeek(newarray[0]);
                  return (returnDate = newarray[0]);
                }
              });
            });
          })
        : page === "NCAAF"
        ? (weekListDateNcaaf?.[curYear] || [])?.forEach((element) => {
            Object.values(element).forEach((val) => {
              val.forEach((d) => {
                if (curDay === d) {
                  const newarray = Object.keys(element);
                  setStartWeek(newarray[0]);
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
      (weekListDateNcaaf?.[curYear] || []).forEach((element) => {
        Object.values(element).forEach((val) => {
          val.forEach((d) => {
            if (curDay === d) {
              const newarray = Object.keys(element);
              setStartWeek(newarray[0]);
              return (weekNcaaf = newarray[0]);
            }
          });
        });
      });
    }

    getLiveScoresApi(page, returnDate, weekNcaaf || "").then(function (result) {
      const response = result.data;
      set_scoreData(response.response_data);
    });
  }, []);

  return (
    <section className="px-lg-5 px-2">
      <div className="scoreCard-wrapper overflow-hidden px-md-5">
        <div className="d-flex overflow-auto px-4 scrollbar-style flex-nowrap justify-content-center-xxxl">
          <div className="d-flex py-5 flex-nowrap">
            <h3 className="scorecard-title">
              {page === "HOME" ? "NFL/NCAAF" : page} <br /> SCORES
            </h3>
            <span className="ml-2 divider-line"></span>
          </div>

          {scoreData &&
            Object.entries(scoreData).map((element, index) => (
              <Fragment key={`scoreCont${index}`}>
                {index > 0 && (
                  <div className="d-flex ml-2 py-5 flex-nowrap">
                    {page === "HOME" ? <span className="ml-2 divider-line"></span> : ""}
                  </div>
                )}
                <div className="d-flex ml-3">
                  {page === "HOME" ? (
                    <span className="label d-flex align-items-center">{element[0]} </span>
                  ) : (
                    ""
                  )}

                  {element[1] &&
                    element[1].length > 0 &&
                    element[1].map((scoreRow, index2) =>
                      element[0] == "NFL" ? (
                        <ScoreBoardListItem scoreRow={scoreRow} key={`scoreItem${index2}`} />
                      ) : (
                        <ScoreBoardListItemNcaa scoreRow={scoreRow} key={`scoreItem${index2}`} />
                      )
                    )}
                </div>
              </Fragment>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ScroreBoard;
