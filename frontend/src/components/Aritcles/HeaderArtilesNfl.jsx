import { Link } from "react-router-dom";
import arrow from "../../Assets/Arow.svg";
import ArticlesCard from "./ArticlesCard";
import ArticleVideoCard from "./ArticleVideoCard";
import HeadingDotted from "../common/HeadingDotted";
import { getLinkFromTitle } from "./HelperArticle";

const HeaderArtilesNfl = ({ catName, dataList }) => {
  return (
    <>
      <section className="Articles">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-xl-5 pb-lg-5 innerHeading">
              <h2 className="text-center text-white articles_heading font-web fw-bold mb-0 mb-xl-5 pb-5">
                Article
              </h2>
            </div>

            <div className="col-12">
              <div className="ps-lg-5 ms-5 pb-4">
                <h1 className="heading white font-web skew-heading ">{catName}</h1>
                <HeadingDotted />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-xxl-4 mx-auto d-flex flex-column justify-content-around py-4 py-xxl-0">
              {dataList && dataList.length > 0
                ? dataList
                    .slice(0, 3)
                    .map(
                      (dataRow, index) =>
                        dataRow != null && (
                          <ArticleVideoCard dataRow={dataRow} key={`ArticleVideoCard${index}`} />
                        )
                    )
                : ""}
            </div>

            <div className="col-12 col-xxl-8">
              <div className="row justify-content-center">
                {dataList && dataList.length > 0
                  ? dataList.slice(3, 6).map(
                      (dataRow, index) =>
                        dataRow != null && (
                          <div
                            className="col-11 col-sm-6 col-md-4 px-xxl-4 mb-3"
                            key={`ArticlesCard${index}`}
                          >
                            <ArticlesCard dataRow={dataRow} />
                          </div>
                        )
                    )
                  : ""}
              </div>
            </div>

            <div className="col-12">
              <Link className="text-decoration-none" to={"/articles/" + getLinkFromTitle(catName)}>
                <h6 className="font-web font-20 text-blue fw-bold text-end mt-3 pt-sm-1 text-uppercase text-hover">
                  view all articles <img className="ms-2" src={arrow} alt="arrow" />
                </h6>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HeaderArtilesNfl;
