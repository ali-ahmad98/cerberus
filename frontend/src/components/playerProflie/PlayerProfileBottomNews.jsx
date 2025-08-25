import PlayerProfileBottomSlider from "./PlayerProfileBottomSlider";
import HeadingDotted from "../common/HeadingDotted";

const PlayerProfileBottomNews = () => {
  return (
    <div className="newssection position-relative py-lg-5">
      <div className="container py-5">
        <div className="row justify-content-between w-100 mx-0">
          <div className="col-lg-12">
            <div className="py-5 mb-5">
              <h1 className="heading white font-web skew-heading"> HIGHLIGHTS WEEK </h1>
              <HeadingDotted />
            </div>
            <PlayerProfileBottomSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfileBottomNews;
