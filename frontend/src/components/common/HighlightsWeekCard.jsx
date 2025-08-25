import highlightImg from "../Navbar/assets/highlightimg.png";
import { Link } from "react-router-dom";
import { getArticleDetailsLink } from "../Aritcles/HelperArticle";
import { showDate } from "../../service/GeneralFn";

const HighlightsWeekCard = (props) => {
  const dataRow = props.dataRow;
  return (
    <div className="py-lg-0 py-sm-5">
      <Link to={getArticleDetailsLink(dataRow)}>
        <img
          className="w-100 highlight-img"
          src={dataRow ? dataRow.thumbnail : highlightImg}
          alt={dataRow ? dataRow.title : "Img"}
        />
      </Link>
      <div className="py-lg-0 py-md-4 ms-xxl-4">
        <p className="para mb-0 pt-3 pt-md-5 font-16">
          {dataRow ? showDate(dataRow.created_at) : ""}
        </p>
        <h1 className="font-23 fw-normal white font-web pt-md-3 pe-xl-5">
          {dataRow ? dataRow.title : ""}
          <br />
          {dataRow ? dataRow.sub_title : " "}
        </h1>
      </div>
    </div>
  );
};

export default HighlightsWeekCard;
