import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { NextSliderIcon, PrevSliderIcon } from "./HomePageIcon";
import ProdcastSliderContent from "./ProdcastSliderContent";

const PoadcastSlider = ({ settings }) => {
  const slider = React.useRef(null);

  return (
    <>
      <div className="px-3 flex-grow-1 overflow-hidden">
        <div className="w-100 py-3">
          <Slider ref={slider} {...settings}>
            <ProdcastSliderContent />
            <ProdcastSliderContent />
            <ProdcastSliderContent />
            <ProdcastSliderContent />
            <ProdcastSliderContent />
          </Slider>
        </div>
      </div>

      <div className="arrows ">
        <div onClick={() => slider.current.slickNext()} className="next py-3 cursor-pointer arrow">
          <NextSliderIcon />
        </div>
        <div onClick={() => slider.current.slickPrev()} className="prev py-3 cursor-pointer arrow">
          <PrevSliderIcon />
        </div>
      </div>
    </>
  );
};

export default PoadcastSlider;
