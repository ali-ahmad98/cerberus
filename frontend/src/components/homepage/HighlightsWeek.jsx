import { Link } from "react-router-dom";
import ArrowIcon from "../../components/Navbar/assets/arrowicon.png";
import HighlightsWeekCard from "../common/HighlightsWeekCard";
import HighLightSlider from "./HighLightSlider";
import HeadingDotted from "../common/HeadingDotted";

const HighlightsWeek = ({ articleData }) => {
  const articleData1 = articleData && articleData.length > 0 ? articleData.slice(0, 1) : {};
  const articleDataSlider = articleData && articleData.length > 1 ? articleData.slice(1, 31) : {};

  return (
    <div className="position-relative py-lg-5 my-lg-5 mb-5">
      <div className="container">
        <div className="py-5">
          <h1 className="heading white font-web skew-heading "> HIGHLIGHTS WEEK </h1>
          <HeadingDotted />
        </div>
        <div className="row">
          <div className="col-lg-6 ">
            {articleData1.length > 0 && <HighlightsWeekCard dataRow={articleData1[0]} />}
          </div>
          <div className="col-lg-6">
            {articleDataSlider.length > 0 && (
              <>
                <HighLightSlider articleDataSlider={articleDataSlider} />

                <Link to="/articles">
                  <p className="text-end white mb-0 font-web font-semibold para text-hover cursor-pointer pt-3">
                    VIEW ALL ARTICLES{" "}
                    <span className="ms-3">
                      <img src={ArrowIcon} alt="ArrowIcon" />
                    </span>
                  </p>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightsWeek;
