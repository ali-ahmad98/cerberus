import ArrowIcon from "../../../src/components/Navbar/assets/arrowicon.png";
import { Link } from "react-router-dom";
import { getArticleDetailsLink } from "../Aritcles/HelperArticle";
import HeadingDotted from "../common/HeadingDotted";

const Headerarticles = ({ articleData, relatedListData, latestListData, currentCatUrl }) => {
  var date = new Date(articleData.created_at);
  var day = date.toLocaleDateString("en-us", { weekday: "long" });
  var datefull = new Date(articleData.created_at).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  var showDate = day + " " + datefull;

  return (
    <>
      <section className="Articles Articles_WR">
        <div className="container pb-4">
          <div className="row">
            <div className="col-12">
              <div className="mb-4 pb-2">
                <div className="new-rorate">
                  <h1 className="heading white font-web skew-heading text-uppercase articles_heading_WR respMrgn ps-sm-3">
                    {articleData.title}
                  </h1>
                </div>
                <HeadingDotted />
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between">
                <p className="para">
                  <span className="color-very-light-gray fw-bold">by</span>{" "}
                  <span className="blue fw-bold">{articleData.author_name}</span>{" "}
                  <span className="color-very-light-gray">|</span> Featured Writer
                </p>
                <p className="para">{showDate}</p>
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <img className="w-100 mt-3" src={articleData.thumbnail} alt={articleData.title} />
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-12 col-lg-7 defaultColor">
              <p className="para mt-5 pt-xl-3 mb-2">
                {articleData.sub_title ? articleData.sub_title : ""}
              </p>

              <p
                dangerouslySetInnerHTML={{
                  __html: articleData.description,
                }}
              />

              {articleData.video != "" ? (
                <div className="artVideo">
                  <video width={"100%"} controls>
                    <source src={articleData.video} type="video/mp4" />
                  </video>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="col-12 col-lg-5 custom_col_width">
              {relatedListData && relatedListData.length > 0 && (
                <>
                  <h5 className="heading white font-web skew-heading ">Related Articles</h5>
                  <HeadingDotted />

                  {relatedListData.map((dataRow) => (
                    <div className="newsPlayerbg newsPlayerB articleplayr" key={dataRow._id}>
                      <img src={dataRow.thumbnail} alt={dataRow.title} />
                      <div className="npbtm">
                        <Link to={getArticleDetailsLink(dataRow)}>
                          <p>
                            <strong>{dataRow.category.title}</strong>
                          </p>
                          <p>{dataRow.title}</p>
                        </Link>
                      </div>
                    </div>
                  ))}

                  <p className="text-end pb-4 z-index-20 position-relative white font-web font-semibold para respLeft">
                    <Link className="cursor-pointer viewAllLink" to={currentCatUrl}>
                      VIEW ALL{" "}
                      <span className="ms-3">
                        <img src={ArrowIcon} alt="ArrowIcon" />
                      </span>
                    </Link>
                  </p>
                </>
              )}

              <hr />

              {latestListData && latestListData.length > 0 && (
                <>
                  <h5 className="heading white font-web skew-heading">Latest Articles</h5>
                  <HeadingDotted />
                  {latestListData.map((dataRow) => (
                    <div className="newsPlayerbg newsPlayerB articleplayr" key={dataRow._id}>
                      <img src={dataRow.thumbnail} alt={dataRow.title} />
                      <div className="npbtm">
                        <Link to={getArticleDetailsLink(dataRow)}>
                          <p>
                            <strong>{dataRow.category.title}</strong>
                          </p>
                          <p>{dataRow.title}</p>
                        </Link>
                      </div>
                    </div>
                  ))}

                  <p className="text-end pb-4 z-index-20 position-relative white font-web font-semibold para respLeft">
                    <Link className="cursor-pointer viewAllLink" to="/articles">
                      VIEW ALL ARTICLES{" "}
                      <span className="ms-3">
                        <img src={ArrowIcon} alt="ArrowIcon" />
                      </span>
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Headerarticles;
