import noImg from "../../Assets/images/noImg.jpg";

const ArticlesCard = (props) => {
  const dataRow = props.dataRow;

  return (
    <div className="position-relative Articles_card cursor_pointer">
      <img
        className="w-100 h-100 team-detail-article-img"
        src={dataRow ? dataRow.thumbnail : noImg}
        alt={dataRow ? dataRow.title : ""}
      />

      <div className="position-absolute Articles_match_text d-flex articleCardflex">
        <div>
          <h6 className="font-18 fw-normal white font-web">{dataRow ? dataRow.title : ""}</h6>
          <h6 className="font-18 fw-normal white font-web">{dataRow ? dataRow.sub_title : ""}</h6>
        </div>
      </div>
    </div>
  );
};

export default ArticlesCard;
