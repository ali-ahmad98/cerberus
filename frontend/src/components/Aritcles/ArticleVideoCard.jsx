import VideoIcon from "../../../src/components/Navbar/assets/icon.png";
import { Link } from "react-router-dom";
import { getArticleDetailsLink } from "./HelperArticle";
import { showDate } from "../../service/GeneralFn";

const ArticleVideoCard = ({ dataRow }) => {
  return (
    <Link to={getArticleDetailsLink(dataRow)}>
      <div className="pb-3 px-4 px-sm-0 px-xxl-5 fantasy-week">
        <div className="video-card d-flex flex-column flex-sm-row align-items-center justify-content-xxl-between my-4">
          <div className="video-card-imgs position-relative">
            <div className="min-w-130">
              <img
                src={dataRow?.thumbnail || ""}
                alt={dataRow?.title || ""}
                style={{ width: "150px" }}
              />
            </div>
            {dataRow?.video ? (
              <div className="position-absolute top-0 h-100 d-flex justify-content-center align-items-center w-100">
                <img className="playicon-img cursor-pointer" src={VideoIcon} alt="VideoIcon" />
              </div>
            ) : null}
          </div>

          <div className="min-w-100 ps-4 ps-sm-5 ps-xxl-4 pe-4 py-4 padding-right-xxxl-20">
            <p className="font-11 font-web white mb-0 pt-1">
              {dataRow?.created_at ? showDate(dataRow.created_at) : ""}
            </p>
            <h1 className="font-13 white font-web fw-bold">{dataRow?.title || ""}</h1>
            <p className="white font-12 font-web mb-0">{dataRow?.sub_title || ""}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleVideoCard;
