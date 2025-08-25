import { Link } from "react-router-dom";
import { RightArrowIcon } from "../icons/Icons";
import { showDate } from "../../service/GeneralFn";
import { getArticleDetailsLink } from "../Aritcles/HelperArticle";

const HeroCard = ({ element }) => {
  return (
    <div className="mt-5 position-relative hero-card-nfl-head cursor-pointer">
      <img
        className="w-100"
        src={element.thumbnail}
        alt={element.title}
        style={{ width: "300px", height: "200px" }}
      />
      <div className="text-white top-heading-floating-text">
        <p className="font-12 pt-4 mb-2">{showDate(element.created_at)}</p>
        <h4 className="font-14 fw-bold mw-200">{element.title}</h4>
        <p className="font-13 text-light-gray fw-normal py-2 mb-2 pe-5 me-4">
          {element.author_name}
        </p>
      </div>
      <div className="right-arrow-icon">
        <Link to={getArticleDetailsLink(element)}>
          {" "}
          <RightArrowIcon />
        </Link>
      </div>
    </div>
  );
};

export default HeroCard;
