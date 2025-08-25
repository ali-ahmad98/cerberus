import { Link } from "react-router-dom";
import { getArticleDetailsLink } from "./HelperArticle";

const ArticlesCard2 = ({ dataRow }) => {
  return (
    <Link to={getArticleDetailsLink(dataRow)}>
      <div
        className="deny devy-bg-4 Articles_card position-relative d-flex flex-column justify-content-end"
        style={{ backgroundImage: `url(${dataRow?.thumbnail || ""})` }}
      >
        <div className="px-4 z-10 d-flex flex-column flex-sm-row align-item-center justify-content-between mb-4">
          <div>
            <h5 className="white font-web font-20 fw-bold">
              {dataRow?.title || ""}
              <br className="d-none d-lg-inline-block" />
            </h5>
            <p className="font-18 font-web white mb-0">{dataRow?.sub_title || ""}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticlesCard2;
