import { Link } from "react-router-dom";
import ArticlesCard from "./ArticlesCard";
import arrow from "../../Assets/Arow.svg";
import HeadingDotted from "../common/HeadingDotted";
import ArticlesCard3 from "./ArticlesCard3";
import { getLinkFromTitle } from "./HelperArticle";

const HeaderArtilesNcaaf = ({ catName, dataList }) => {
  return (
    <>
      <section className="articals_ncaf">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="py-4 py-md-5">
                <h1 className="heading white font-web skew-heading">{catName}</h1>
                <HeadingDotted />
              </div>
            </div>
            <div className="col-12 col-xxl-6 ">
              <div className="pe-5 position-relative my-highlight">
                {dataList && dataList.length > 0
                  ? dataList
                      .slice(0, 1)
                      .map(
                        (dataRow) =>
                          dataRow != null && (
                            <ArticlesCard3 dataRow={dataRow} key={`ArticlesCard${dataRow._id}`} />
                          )
                      )
                  : ""}
              </div>
            </div>
            <div className="col-12 col-xxl-6 mt-5 mt-xxl-0">
              <div className="row justify-content-center">
                {dataList && dataList.length > 0
                  ? dataList.slice(1, 3).map(
                      (dataRow) =>
                        dataRow != null && (
                          <div className="col-11 col-sm-6" key={`ArticlesCard${dataRow._id}`}>
                            <ArticlesCard dataRow={dataRow} />
                          </div>
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
        </div>
      </section>
    </>
  );
};

export default HeaderArtilesNcaaf;
