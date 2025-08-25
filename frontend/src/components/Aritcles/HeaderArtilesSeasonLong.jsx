import { Link } from "react-router-dom";
import arrow from "../../Assets/Arow.svg";
import ArticleVideoCard from "./ArticleVideoCard";
import ArticlesCard2 from "./ArticlesCard2";
import HeadingDotted from "../common/HeadingDotted";
import { getLinkFromTitle } from "./HelperArticle";

const HeaderArtilesSeasonLong = ({ catName, dataList }) => {
  return (
    <>
      <section className="articals_ncaf">
        <div className="container py-5">
          <div className="row py-md-5">
            <div className="col-12 py-4 py-md-5 mb-3">
              <h1 className="heading white font-web skew-heading">{catName}</h1>
              <HeadingDotted />
            </div>

            <div className="col-12 col-xxl-8 pb-5 pb-xxl-0">
              <div className="row">
                {dataList && dataList.length > 0
                  ? dataList.slice(0, 4).map(
                      (dataRow) =>
                        dataRow != null && (
                          <div
                            className="col-12 col-lg-6 mt-4 pt-2 "
                            key={`ArticleCard${dataRow._id}`}
                          >
                            <ArticlesCard2 dataRow={dataRow} />
                          </div>
                        )
                    )
                  : ""}
              </div>
            </div>

            <div className="col-12 col-xxl-4 mx-auto d-flex flex-column justify-content-around py-4 py-xxl-0">
              {dataList && dataList.length > 0
                ? dataList
                    .slice(4, 6)
                    .map(
                      (dataRow) =>
                        dataRow != null && (
                          <ArticleVideoCard
                            dataRow={dataRow}
                            key={`ArticleVideoCard${dataRow._id}`}
                          />
                        )
                    )
                : ""}
            </div>

            <Link className="text-decoration-none" to={"/articles/" + getLinkFromTitle(catName)}>
              <h6 className="font-web font-20 text-blue fw-bold text-end mt-sm-5 pt-4 text-uppercase text-hover">
                view all articles <img className="ms-2" src={arrow} alt="arrow" />
              </h6>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeaderArtilesSeasonLong;
