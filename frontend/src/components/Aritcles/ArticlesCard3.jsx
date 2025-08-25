import { Link } from "react-router-dom";
import { getArticleDetailsLink } from "./HelperArticle";
import { showDate } from "../../service/GeneralFn";
import noImg from "../../Assets/images/noImg.jpg";

const ArticlesCard3 = ({ dataRow }) => {
  return (
    <Link to={getArticleDetailsLink(dataRow)}>
      <div className="py-lg-0 py-sm-5">
        <img
          className="w-100 highlight-img"
          src={dataRow?.thumbnail || noImg}
          alt={dataRow?.title || ""}
        />
        <div className="py-lg-0 py-md-4 ms-xxl-4">
          <p className="para mb-0 pt-3 pt-md-5 font-16">
            {dataRow ? showDate(dataRow.created_at) : ""}
          </p>
          <h2 className="font-23 fw-normal white font-web pt-md-3 pe-xl-5">
            {dataRow?.title || ""}
          </h2>
          <h3 className="font-23 fw-normal white font-web pt-md-3 pe-xl-5">
            {dataRow?.sub_title || ""}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ArticlesCard3;
