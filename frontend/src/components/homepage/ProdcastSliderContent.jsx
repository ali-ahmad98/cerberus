import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import sliderImage from "../../../src/components/Navbar/assets/slider1.png";
import { PlayIcon } from "./HomePageIcon";

const ProdcastSliderContent = () => {
  return (
    <>
      <div>
        <div className=" mx-5 poadcastSlider-box d-flex align-items-center">
          <div className="content-box">
            <h1>Week 5 Fantasy Projections + Notes</h1>
          </div>
          <img src={sliderImage} className="w-100 h-75" alt="sliderImage" />
          <div className="play-icon">
            <PlayIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProdcastSliderContent;
