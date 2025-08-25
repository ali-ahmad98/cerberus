import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import NextIcon from "../../components/Navbar/assets/next.png";
import PrevIcon from "../../components/Navbar/assets/prev.png";
import { getPlayerProfileHighlightArticleApi } from "../../service/thirdPartyDataService";
import { Link } from "react-router-dom";
import { getArticleDetailsLink } from "../Aritcles/HelperArticle";

const PlayerProfileBottomSlider = () => {
  const slider = useRef();
  const settings = {
    dots: false,
    rightMode: true,
    rtl: true,
    arrows: false,
    fade: false,
    infinite: true,
    slidesToShow: 2.25,
    centerPadding: "60px",
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
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
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [dataList, set_dataList] = useState({});

  useEffect(() => {
    playerProfileHighlightArticle();
  }, []);

  async function playerProfileHighlightArticle() {
    getPlayerProfileHighlightArticleApi().then(function (result) {
      const response_data = result.data.response_data;
      set_dataList(response_data);
    });
  }

  return (
    <>
      <div className="position-relative py-4">
        <Slider {...settings} ref={slider}>
          {dataList &&
            dataList.length > 0 &&
            dataList.map((value, index) => {
              return (
                <div className="px-sm-3 mx-2" key={index}>
                  <Link to={getArticleDetailsLink(value)}>
                    <div className="position-relative blue-overlay">
                      <div className="slider-img br-8">
                        <img className="w-100 h-100 br-8" src={value.thumbnail} alt={value.title} />
                      </div>
                      <div className="position-absolute bottom-0">
                        <p className="font-16 font-web white px-4 z-index-20 position-relative">
                          {value.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </Slider>
        <div className="position-absolute icon-img justify-content-center h-100 d-sm-flex d-none  flex-column ">
          <div>
            <img
              onClick={() => slider?.current?.slickPrev()}
              src={NextIcon}
              className="pb-5  img-1 cursor-pointer "
              alt="NextIcon"
            />
          </div>
          <div>
            <img
              className="cursor-pointer img-2 "
              src={PrevIcon}
              onClick={() => slider?.current?.slickNext()}
              alt="PrevIcon"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerProfileBottomSlider;
