import { useRef } from "react";
import Slider from "react-slick";
import NextIcon from "../../components/Navbar/assets/next.png";
import PrevIcon from "../../components/Navbar/assets/prev.png";
import { Link } from "react-router-dom";
import { getArticleDetailsLink } from "../Aritcles/HelperArticle";

const HighLightSlider = ({ articleDataSlider }) => {
  var sliderData1 = [];
  var sliderData2 = [];

  if (articleDataSlider.length > 0) {
    articleDataSlider.forEach((row, i) => {
      if (i % 2 == 0) {
        sliderData1.push(row);
      } else {
        sliderData2.push(row);
      }
    });
  }

  const slider = useRef();
  const settings = {
    dots: false,
    rightMode: true,
    rtl: true,
    arrows: false,
    fade: false,
    infinite: true,
    slidesToShow: 2.5,
    centerPadding: "60px",
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className=" position-relative">
        {articleDataSlider.length > 0 && (
          <>
            <Slider {...settings} ref={slider}>
              {sliderData1 &&
                sliderData1.map((value, index) => {
                  var row2Data = sliderData2[index - 1];
                  if (sliderData2[index]) {
                    row2Data = sliderData2[index];
                  }

                  return (
                    <div key={index}>
                      <div className="row mx-0 px-sm-2 px-lg-1 px-xxl-2" key={index}>
                        <div className="col">
                          <Link to={getArticleDetailsLink(value)}>
                            <div className=" position-relative hover-effect">
                              <div className="slider-img">
                                <img
                                  className="w-100 h-100"
                                  src={value.thumbnail}
                                  alt={value.title}
                                />
                              </div>
                              <div className="position-absolute bottom-0">
                                <p className="slider-text font-web white px-4 z-index-20 position-relative">
                                  {value.title}
                                </p>
                              </div>
                              <div className="overlay-1 position-absolute  bottom-0 end-0"></div>
                              <div className="overlay position-absolute  top-0 end-0"></div>
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="row mx-0 mt-3 px-sm-2 px-lg-1 px-xxl-2">
                        <div className="col">
                          <Link to={getArticleDetailsLink(row2Data)}>
                            <div className=" position-relative  hover-effect">
                              <div className="slider-img">
                                <img
                                  className="w-100 h-100"
                                  src={row2Data.thumbnail}
                                  alt={row2Data.title}
                                />
                              </div>
                              <div className="position-absolute bottom-0">
                                <p className="slider-text font-web white px-4 z-index-20 position-relative">
                                  {row2Data.title}
                                </p>
                              </div>
                              <div className="overlay-1 position-absolute  bottom-0 end-0"></div>
                              <div className="overlay position-absolute  top-0 end-0"></div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
            <div className="position-absolute  icon-img justify-content-center h-100 d-md-flex d-none flex-column">
              <img
                onClick={() => slider?.current?.slickPrev()}
                src={NextIcon}
                className="pb-5 cursor-pointer"
                alt="NextIcon"
              />
              <img
                className="cursor-pointer"
                onClick={() => slider?.current?.slickNext()}
                src={PrevIcon}
                alt="PrevIcon"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HighLightSlider;
