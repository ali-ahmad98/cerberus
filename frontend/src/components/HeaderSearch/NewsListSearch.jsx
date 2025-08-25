import cfsDefault from "../../../src/Assets/cfsdefault.png";
import { showDate } from "../../service/GeneralFn";

const NewsListSearch = ({ newsList }) => {
  const soImg = (t, p) => {
    return t ? t : p ? p : cfsDefault;
  };

  return (
    <>
      {newsList && newsList.length > 0 && (
        <div className="tls innerMainbg">
          <div className="container customContainer">
            <div className="row">
              <h3>News List</h3>

              {newsList.map((element, index) => (
                <div className="col-md-4" key={`news${index}`}>
                  <div className="video-card">
                    <div className="video-card-imgs">
                      <div className="videocard-img">
                        <a href={element.article_link} target="_blank">
                          <img src={soImg(element.team_imgs, element.player_imgs)} alt="" />
                        </a>
                      </div>
                    </div>

                    <div className="vidCardTxt">
                      <a href={element.article_link} target="_blank">
                        <small>{showDate(element.article_date)}</small>
                        <h6>{element.article_headline}</h6>
                        <p>{element.article_excerpt}</p>
                      </a>
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

export default NewsListSearch;
