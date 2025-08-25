import { SmallRightArrowIcon } from "../icons/Icons";
import noNewsImg from "../../Assets/images/noNewsImg.png";

const News = ({ newsDataRow }) => {
  return (
    <div
      className="week-5-img my-3 py-4 pt-xl-0 pt-xl-4 position-relative Articles_card"
      style={{ backgroundImage: `url(${noNewsImg})` }}
    >
      <div className="d-flex flex-column col-sm-8 col-lg-12 col-xxl-7 col-md-7 py-4 pt-lg-0 pt-xl-4 z-10">
        <h1
          className="font-web white fw-bold font-xsm lineClmp text-left pdnt50"
          title={newsDataRow.article_headline}
        >
          {newsDataRow.article_headline}
        </h1>
        <p className="font-web white para mb-0"> {newsDataRow.article_author}</p>
      </div>

      <div className="text-end position-absolute small-icons z-10">
        <a className="text-decoration-none" href={newsDataRow.article_link} target="_blank">
          <SmallRightArrowIcon />
        </a>
      </div>
    </div>
  );
};

export default News;
