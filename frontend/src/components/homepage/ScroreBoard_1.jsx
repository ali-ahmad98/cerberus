import { ScoreBoardIcon, ScoreBoardRightArrow, ScoreBoarRotatedIcon } from "../icons/Icons";
import ScoreBoardListItem from "./ScoreBoardListItem";

const ScroreBoard = () => {
  return (
    <>
      <section className="px-lg-5 px-2">
        <div className="scoreCard-wrapper overflow-hidden px-md-5">
          <div className="d-flex overflow-auto px-4 scrollbar-style flex-nowrap justify-content-center-xxxl">
            <div className="d-flex py-5 flex-nowrap">
              <h3 className="scorecard-title">
                NFL/NCAAF <br /> SCORES
              </h3>
              <span className="ml-2 divider-line"></span>
            </div>

            <div className="d-flex ml-3">
              <span className="label d-flex align-items-center">Favorite</span>

              <div className="h-100 pb-3 d-flex flex-column  point-box">
                <div className="text-center py-2">
                  <span>FT</span>
                </div>
                <div className="box d-flex customFlex">
                  <div className="d-flex align-items-center ">
                    <div className="flag-box ml-4 p-3">
                      <ScoreBoardIcon />
                    </div>
                    <h4 className="team-title mb-0 ml-3">KCC</h4>
                  </div>

                  <div className="d-flex ml-5 align-items-center">
                    <div className="team-score">2</div>
                    <span>
                      <ScoreBoarRotatedIcon />
                    </span>
                  </div>
                </div>
                <div className="box mt-3 d-flex ">
                  <div className="d-flex align-items-center ">
                    <div className="flag-box ml-4 p-3">
                      <ScoreBoardIcon />
                    </div>
                    <h4 className="team-title mb-0 ml-3">KCC</h4>
                  </div>

                  <div className="d-flex ml-5 align-items-center">
                    <div className="team-score">2</div>
                    <span>
                      <ScoreBoarRotatedIcon />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex ml-2 py-5 flex-nowrap">
              <span className="ml-2 divider-line"></span>
            </div>
            <div className="d-flex ml-3">
              <span className="label d-flex align-items-center">NFL</span>
              <ScoreBoardListItem />
              <ScoreBoardListItem />
              <ScoreBoardListItem />
            </div>
            <div className="d-flex ml-2 py-5 flex-nowrap">
              <span className="ml-2 divider-line"></span>
            </div>
            <div className="d-flex ml-3">
              <span className="label d-flex align-items-center">NCAAF</span>
              <ScoreBoardListItem />
              <ScoreBoardListItem />
              <ScoreBoardListItem />
              <div className="h-100 pb-3 d-flex">
                <div className="ms-5 d-flex align-items-center">
                  <ScoreBoardRightArrow />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ScroreBoard;
