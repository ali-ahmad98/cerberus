import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import GlobalConfig from "../../GlobalConfig";
import { articleListByCategoryApi } from "../../service/articleService";
import ArticlesCard from "./ArticlesCard";
import HeadingDotted from "../common/HeadingDotted";
import { getArticleDetailsLink } from "./HelperArticle";
import ColorRingCustomLoader from "../common/ColorRingCustomLoader";

const ArticleViewAll = () => {
  const [isLoader, set_isLoader] = useState(true);
  const { category: catName } = useParams(); // <-- v6 way
  const categoryName = catName?.toUpperCase().replace(/-/g, " ") || "";
  const [dataList, set_dataList] = useState([]);

  useEffect(() => {
    if (catName) {
      set_isLoader(true);
      cmsdetailsByUrl();
    }
  }, [catName]);

  async function cmsdetailsByUrl() {
    try {
      const result = await articleListByCategoryApi(catName);
      set_dataList(result?.data?.response_data || []);
    } catch (error) {
      console.error(error);
    } finally {
      set_isLoader(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>
          Articles | {categoryName} | {GlobalConfig.SITE_NAME}
        </title>
        <meta
          name="description"
          content={`Articles | ${categoryName} | ${GlobalConfig.SITE_NAME}`}
        />
        <meta name="keywords" content={`Articles | ${categoryName} | ${GlobalConfig.SITE_NAME}`} />
      </Helmet>

      <section className="Articles">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-xl-5 pb-lg-5 innerHeading">
              <h2 className="text-center text-white articles_heading font-web fw-bold mb-0 mb-xl-5 pb-5">
                Articles
              </h2>
            </div>

            <div className="col-12">
              <div className="pb-4">
                <h1 className="heading white font-web skew-heading">{categoryName}</h1>
                <HeadingDotted />
              </div>
            </div>
          </div>

          <div className="row">
            {isLoader ? (
              <ColorRingCustomLoader isLoader={isLoader} />
            ) : (
              <div className="col-12 col-lg-12 artView">
                <div className="row justify-content-center">
                  {dataList?.length > 0
                    ? dataList.map(
                        (dataRow, index) =>
                          dataRow && (
                            <div
                              className="col-sm-6 col-md-3 col-xl-4"
                              key={`ArticlesCard${index}`}
                            >
                              <Link to={getArticleDetailsLink(dataRow)}>
                                <ArticlesCard dataRow={dataRow} />
                              </Link>
                            </div>
                          )
                      )
                    : null}
                </div>
              </div>
            )}
          </div>
          <br />
          <br />
        </div>
      </section>
    </>
  );
};

export default ArticleViewAll;
