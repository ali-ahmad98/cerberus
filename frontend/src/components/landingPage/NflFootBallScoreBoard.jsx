import React, { useEffect, useState } from "react";
import ScoreBoardTableNcaa from "./ScoreBoardTableNcaa";
import ScoreBoardTable from "./ScoreBoardTable";

import TopHeadings from "./TopHeadings";
import headingBg from "../../Assets/img/nfl-score-heading.png";
import scoreboarBg from "../../Assets/img/scoreboard-bg.png";
import HeadlineNewsCard from "./HeadlineNewsCard";
import NflSideLinks from "./NflSideLinks";
import NcaafSideLinks from "./NcaafSideLinks";
import { getQuickLinkList } from "../landingPage/Helper";
import FollowLinks from "./FollowLinks";

const NflFootBallScoreBoard = ({ page, scoreBoardTitle }) => {
  const [allNflLinkList, setAllNflLinkList] = useState([]);

  const ff_isLogin = localStorage.getItem("ff_isLogin");

  useEffect(() => {
    {
      page === "NFL"
        ? getQuickLinkList(page, (r) => {
            setAllNflLinkList(r);
          })
        : getQuickLinkList(page, (r) => {
            setAllNflLinkList(r);
          });
    }
  }, []);

  return (
    <div className="position-relative ">
      <img className="scoreboard-bg" src={scoreboarBg} alt="scoreboarBg" />

      {ff_isLogin && (
        <div className="row justify-content-center mx-0 position-relative">
          <div className="col-xl-8 col-12 overflow-hidden mb-sm-5 mb-xxl-0">
            <img className="w-100 text-bg" src={headingBg} alt="heading-background-img" />
            <div className="floating-heading text-white text-center   college-football-label-heading w-100">
              <h2 className="heading font-34 white font-web skew-heading text-uppercase mb-0 mb-xl-1 ">
                {scoreBoardTitle}
              </h2>
              <p className="font-23 fw-medium mb-0 mb-xl-2">LATEST GAMES</p>
              <span className="first-box d-inline-block"></span>
              <span className="second-box d-inline-block mx-2"></span>
              <span className="third-box d-inline-block"></span>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 pb-5 nfCustom">
        <div className="row justify-content-between  justify-content-xl-center ">
          <div className="col-xxl-auto col-md-5 order-2 col-lg-4 col-sm-6 col-12 mw-xxl-20 order-sm-2 order-xxl-1 ">
            <div className=" pe-xxl-5">
              {page === "NFL" ? (
                <NflSideLinks title="quick links" linksdata={allNflLinkList} page={page} />
              ) : (
                <NcaafSideLinks title="quick links" linksdata={allNflLinkList} page={page} />
              )}
              <FollowLinks page={page} />
            </div>
          </div>
          <div className="col-xxl-7 order-1 col-12 order-sm-1 order-xxl-2 my-5 mt-xxl-0 pt-2">
            {ff_isLogin && <>{page === "NCAAF" ? <ScoreBoardTableNcaa /> : <ScoreBoardTable />}</>}
          </div>
          <div className="col-xxl-auto col-sm-6 order-3 col-12 mw-xxl-21 order-sm-3 order-xxl-3 mt-5 mt-sm-0 ">
            <div className="ms-xxl-4   heading_cards_custom_paadding">
              <TopHeadings page={page} headlineTitle="Top headlines" />
              <HeadlineNewsCard page={page} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NflFootBallScoreBoard;
