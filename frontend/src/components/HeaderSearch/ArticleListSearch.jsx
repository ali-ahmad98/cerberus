import { Link } from "react-router-dom";
import { getArticleDetailsLink } from "../Aritcles/HelperArticle";

const ArticleListSearch = ({ articleList }) => {
  return (
    <>
      {articleList && articleList.length > 0 && (
        <div className="tls innerMainbg">
          <div className="container customContainer">
            <div className="row">
              <h3>Article List</h3>

              {articleList.map((element, index) => (
                <div className="col-md-4" key={`article${index}`}>
                  <div className="video-card">
                    <div className="video-card-imgs">
                      <div className="videocard-img ">
                        <a href={element.article_link} target="_blank">
                          <img src={element.thumbnail} alt="" />
                        </a>
                      </div>
                    </div>

                    <div className="vidCardTxt">
                      <Link to={getArticleDetailsLink(element)} target="_blank">
                        <small>{element.author_name}</small>
                        <h6>{element.title}</h6>
                        <p>{element.sub_title}</p>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleListSearch;
