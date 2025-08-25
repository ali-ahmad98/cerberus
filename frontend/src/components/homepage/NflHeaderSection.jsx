import { useState, useEffect } from "react";
import btn_arrow from "../../Assets/explore-btn-arrow.png";
import nfl_flag_img from "../../Assets/nfl-flag-img.png";
import HeroCard from "./HeroCard";
import { getHomeBannerApi, getTopHeadlineArticleApi } from "../../service/homeService";

const NflHeaderSection = () => {
  const [bannerlist, set_bannerlist] = useState([]);

  useEffect(() => {
    getBannerData();
  }, []);

  async function getBannerData() {
    getHomeBannerApi("nfl").then(function (result) {
      const response = result.data;
      set_bannerlist(response.response_data);
    });
  }

  const [topHeadingsList, set_topHeadingsList] = useState({});

  useEffect(() => {
    getTopHeadlineArticle();
  }, []);

  async function getTopHeadlineArticle() {
    getTopHeadlineArticleApi("nfl", 2).then(function (result) {
      const response = result.data;
      set_topHeadingsList(response.response_data);
    });
  }
  return (
    <>
      <section className="bg_header_section position-relative">
        <div className="container">
          {bannerlist &&
            bannerlist.length > 0 &&
            bannerlist.map((bannerData, index) => (
              <div className="row justify-content-center" key={`banner${index}`}>
                <div className="col-xl-4">
                  <div className="mt-5 text-center mb-negative ">
                    <img
                      className="small_screen_size"
                      src={bannerData.banner_image}
                      alt={bannerData.title}
                    />
                  </div>
                </div>
                <div className="col-xl-6 pb-xxl-5 my-xxl-auto">
                  <div className="py-5 py-xl-0">
                    <p className="text-white mt-xl-5 pt-xl-5  mt-xxl-0 pt-xxl-0">
                      {bannerData.title}
                    </p>
                    <div className="mt-4">
                      <a className="btn common_btn  py-3 px-5" href={bannerData.button_url}>
                        <span className="font-poppins">
                          {bannerData.button_name}
                          <span className="ms-3">
                            <img src={btn_arrow} alt="btn_arrow" />
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="nfl_flag_img_adjust d-none d-sm-block">
          <img src={nfl_flag_img} alt="" />
        </div>
        <div className="blocks_adjustment">
          <div className="d-sm-flex px-5 px-sm-0 justify-content-xl-end justify-content-center py-5 py-xl-0  overflow-x-hidden">
            {topHeadingsList &&
              topHeadingsList.length > 0 &&
              topHeadingsList.map((element, index) => (
                <div className="ms-sm-5" key={index}>
                  <HeroCard element={element} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NflHeaderSection;
