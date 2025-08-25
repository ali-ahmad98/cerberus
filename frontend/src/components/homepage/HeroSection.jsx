import { Link } from "react-router-dom";
import ArrowIcon from "../../components/Navbar/assets/arrowicon.png";
import NflSlider from "./Slider";
import { showDate } from "../../service/GeneralFn";
import noImg from "../../Assets/images/noImg.jpg";
import { getArticleDetailsLink } from "../Aritcles/HelperArticle";

const HeroSection = ({ topSectionArticles }) => {
  var topLeft = {};
  var topRight = {};
  if (topSectionArticles && topSectionArticles.length <= 3) {
    topLeft = topSectionArticles.slice(0, 1);
    topRight = topSectionArticles.slice(1, 3);
  } else if (topSectionArticles && topSectionArticles.length > 3) {
    topLeft = topSectionArticles.slice(0, 2);
    topRight = topSectionArticles.slice(2, 6);
  }

  return (
    <div className="hero-img d-flex flex-column">
      <div className=" d-flex  justify-content-end align-items-center flex-grow-1 mb-4 pt-5">
        <div className="container h-100 d-flex justify-content-center align-items-end">
          <div className="row ">
            <div className="col-lg-7 py-lg-0 py-4 ">
              {topLeft.length > 0 &&
                topLeft.map((value, index) => (
                  <div className="row" key={index}>
                    <Link to={getArticleDetailsLink(value.Articles)}>
                      <img
                        className="w-100 hero-main-img"
                        src={value.Articles.thumbnail != "" ? value.Articles.thumbnail : noImg}
                        alt={value.Articles.title}
                      />
                    </Link>
                    <p className="para white font-web pt-3">
                      {showDate(value.Articles.created_at)}
                    </p>
                    <Link to={getArticleDetailsLink(value.Articles)}>
                      <h3 className="font-web white fw-normal">{value.Articles.title}</h3>
                    </Link>
                    <p className="hero-text">{value.Articles.author_name}</p>

                    <Link to="#">
                      <p className="explore-more-text  fw-semibold cursor-pointer">
                        EXPLORE MORE{" "}
                        <span className="ms-3 right-arrow">
                          <img src={ArrowIcon} alt="ArrowIcon" />
                        </span>
                      </p>
                    </Link>
                  </div>
                ))}
            </div>
            <div className="col-lg-5  d-flex flex-lg-column flex-column">
              {topRight.length > 0 &&
                topRight.map((value, index) => (
                  <div
                    className="position-relative  hero-card-hover mb-3 me-lg-0 me-sm-2"
                    key={index}
                  >
                    <Link to={getArticleDetailsLink(value.Articles)}>
                      <img
                        className="w-100 main-img1"
                        src={value.Articles.thumbnail != "" ? value.Articles.thumbnail : noImg}
                        alt={value.Articles.title}
                      />
                    </Link>
                    <div className="position-absolute d-flex z-1 align-items-end w-100 start-0 bottom-0 container-fluid">
                      <div>
                        <p className="para white fw-normal">
                          {showDate(value.Articles.created_at)}
                        </p>
                        <Link to={getArticleDetailsLink(value.Articles)}>
                          <h3 className="font-xs white fw-bold">{value.Articles.title}</h3>
                        </Link>
                        <p className="para white fw-normal font-web">
                          {value.Articles.author_name}
                        </p>
                      </div>
                      <div className="w-100 text-end">
                        <Link to="#">
                          <p className="text-white para font-poppins">
                            Explore more{" "}
                            <span className="ms-3 right-arrow">
                              <img src={ArrowIcon} alt="ArrowIcon" />
                            </span>
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <NflSlider />
    </div>
  );
};

export default HeroSection;
