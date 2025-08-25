import { useEffect, useState } from "react";
import NcaafFrontVideoFantacyCard from "./NcaafFrontVideoFantacyCard";
import RightArrowIcon from "../../Assets/NcaafFrontAssets/HomepageAssets/img/rightArrowIcon.png";
import { getHomeBannerApi } from "../../service/homeService";

const NcaafFrontHeroSection = () => {
  const [bannerlist, set_bannerlist] = useState([]);

  useEffect(() => {
    getBannerData();
  }, []);

  async function getBannerData() {
    getHomeBannerApi("ncaaf").then(function (result) {
      const response = result.data;
      set_bannerlist(response.response_data);
    });
  }
  return (
    <>
      <section className="ncaaf-front-hero-img d-flex flex-column justify-content-xxl-end">
        <div className="container pt-5 mt-md-5">
          <div className="row align-items-center justify-content-center mt-md-5 pt-md-5">
            {bannerlist &&
              bannerlist.length > 0 &&
              bannerlist.map((bannerData, index) => (
                <React.Fragment key={index}>
                  <div className="col-12 order-2 order-md-1 col-md-6 col-lg-5 mb-5 mb-md-0 mt-5 pt-md-5">
                    <div className="trusting-content">
                      <h1 className="font-35 fw-semibold pe-xxl-5">
                        {/* <span className="trust pt-2">Trusti</span>ng USC as Pac-12
                      play opens, throwing to Travis Etienne, and more to watch in
                      Week 10 */}
                        <span className="trust pt-2">
                          {bannerData.title.split(/\s+/).slice(0, 1).join(" ")}
                        </span>
                        &nbsp;
                        {bannerData.title.split(/\s+/).slice(1, 100).join(" ")}
                      </h1>
                      <div className="d-flex justify-content-md-end me-5 mt-4 mt-xl-5">
                        <a href={bannerData.button_url}>
                          <button className="explore-btn bg-transparent font-18 font-normal border-0 px-4 py-2">
                            {bannerData.button_name}
                            <span className="ms-2">
                              <img src={RightArrowIcon} alt="arrowIcon" />
                            </span>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-9 order-1 order-md-2 col-md-6 col-lg-3 z-2">
                    <img
                      className="w-100 hero-front-img"
                      src={bannerData.banner_image}
                      alt={bannerData.button_name}
                    />
                  </div>
                </React.Fragment>
              ))}

            <div className="col-12 order-3 col-md-7 col-lg-4 z-1">
              <NcaafFrontVideoFantacyCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NcaafFrontHeroSection;
