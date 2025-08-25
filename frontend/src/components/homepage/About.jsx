import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AboutIcon from "../../components/Navbar/assets/abouticon.png";
import { getAboutUsData } from "../../service/cmsService";
import noImg from "../../Assets/images/noImg.jpg";
import HeadingDotted from "../common/HeadingDotted";

const About = () => {
  const [aboutUsData, set_aboutUsData] = useState({});
  useEffect(() => {
    cmsdetailsByUrl();
  }, []);

  async function cmsdetailsByUrl() {
    getAboutUsData().then(function (result) {
      const response = result.data;
      set_aboutUsData(response.response_data);
    });
  }

  var description =
    aboutUsData.cms_description &&
    aboutUsData.cms_description.replace(/(<([^>]+)>)/gi, "").substring(0, 400);

  return (
    <div className="about-section pt-lg-5">
      <div className="container pt-lg-5 ">
        <div className="py-5 my-lg-5">
          <h1 className="heading white font-web skew-heading ">ABOUT US</h1>
          <HeadingDotted />
        </div>
        <div className="position-relative">
          <img
            className="about-img"
            src={aboutUsData.image ? aboutUsData.image : noImg}
            alt={aboutUsData.cms_title}
          />
          <div className=" d-lg-none d-block end-0">
            <div className="fantansy-box">
              <button className="py-4 px-5 border-0 about-btn">WE ARE</button>
              <div className=" px-sm-5 px-4 py-5">
                <h1 className="sub-heading black">{aboutUsData.cms_sub_title}</h1>
                <p className="about-text-second max-width-706">{description}</p>
                <p className="text-end article-text fw-semibold font-web mb-0 cursor-pointer">
                  <Link to="/about-us">
                    VIEW DETAILS{" "}
                    <span className="ms-3">
                      <img src={AboutIcon} alt="AboutIcon" />
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="position-absolute bottom-0 end-0 d-lg-block d-none">
            <div className="fantansy-box">
              <button className="py-4 px-5 border-0 about-btn">WE ARE</button>
              <div className=" px-sm-5 px-3 py-5">
                <h1 className="sub-heading black">{aboutUsData.cms_sub_title}</h1>
                <p className="about-text-second max-width-706">{description}</p>
                <p className="text-end article-text fw-semibold font-web mb-0 cursor-pointer">
                  <Link to="/about-us">
                    VIEW DETAILS{" "}
                    <span className="ms-3">
                      <img src={AboutIcon} alt="AboutIcon" />
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
