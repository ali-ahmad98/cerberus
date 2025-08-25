import { Link } from "react-router-dom";
import arrow from "../../Assets/Arow.svg";
import ArticlesCard from "./ArticlesCard";
import DottedImg from "../../Assets/dotted.png";
import ArticleVideoCard from "./ArticleVideoCard";
import HeadingDotted from "../common/HeadingDotted";
import { getLinkFromTitle } from "./HelperArticle";

const HeaderArtilesCampusCanton = ({ catName, dataList = [] }) => {
  return (
    <section className="articals_ncaf position-relative">
      <div className="container py-5">
        <img className="campus-canton-sec position-absolute" src={DottedImg} alt="DottedImg" />
        <div className="row">
          <div className="col-12 z-1">
            <div className="ps-lg-5 pb-4">
              <h1 className="heading white font-web skew-heading">{catName}</h1>
              <HeadingDotted />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 z-1 col-xxl-4 mx-auto d-flex flex-column justify-content-around py-4 py-xxl-0">
            {dataList
              ?.slice(0, 3)
              .map(
                (dataRow) =>
                  dataRow && (
                    <ArticleVideoCard dataRow={dataRow} key={`ArticleVideoCard${dataRow._id}`} />
                  )
              )}
          </div>

          <div className="col-12 z-1 col-xxl-8">
            <div className="row mt-4 justify-content-center">
              {dataList?.slice(3, 6).map(
                (dataRow) =>
                  dataRow && (
                    <div
                      className="col-11 col-sm-6 col-md-4 px-xxl-4 mb-3"
                      key={`ArticlesCard${dataRow._id}`}
                    >
                      <ArticlesCard dataRow={dataRow} />
                    </div>
                  )
              )}
            </div>

            <Link className="text-decoration-none" to={`/articles/${getLinkFromTitle(catName)}`}>
              <h6 className="font-web font-20 text-blue fw-bold text-end mt-3 pt-sm-1 text-uppercase text-hover">
                view all articles
                <img className="ms-2" src={arrow} alt="arrow" />
              </h6>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderArtilesCampusCanton;
