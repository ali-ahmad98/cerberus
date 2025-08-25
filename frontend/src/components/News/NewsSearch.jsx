import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getAllNewslist } from "../../service/newsService";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import cfsDefault from "../../../src/Assets/cfsdefault.png";

const NewsSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [newsList, SetAllNewsList] = useState(state?.result);
  const [searchDuplicate, setSearchDuplicate] = useState("");
  const [Error, setAllError] = useState("");
  const [searchNews, setSearchNews] = useState("");

  useEffect(() => {
    SetAllNewsList(state?.result);

    getAllNewslist(localStorage.getItem("searchNews"), (r) => {
      SetAllNewsList(r);
      setAllError("");
    });
  }, [state?.result, state?.searchNews]);

  useEffect(() => onLink(), []);

  const onLink = () => {
    navigate(`/news-search?searchdata=${localStorage.getItem("searchNews")}`);
  };

  const onAddSearchNews = (e) => {
    const { value } = e.target;
    setSearchNews(value);
  };

  const onAddSearchNewsBtn = (e) => {
    e.preventDefault();

    if (searchNews === "") {
      setAllError("Please Enter Your Keyword");
    } else {
      navigate(`/news-search?searchdata=${searchNews}`);

      setSearchDuplicate(searchNews);

      getAllNewslist(searchNews, (r) => {
        SetAllNewsList(r);
        localStorage.setItem("searchNews", searchNews);
        setAllError("");
      });
    }
  };

  const soImg = (t, p) => {
    return t ? t : p ? p : cfsDefault;
  };

  return (
    <>
      <Helmet>
        <title>NFL | News </title>
      </Helmet>

      <section className="innerMainbg helpBg customWidth">
        <div className="innerBannerbg">
          <div className="innerShadow">
            <div className="innerDots">
              <div className="innerHeading pb-5">
                <h2>News</h2>

                <div className="d-flex nsr">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{ borderColor: Error ? "red" : "", borderWidth: "2px" }}
                    onChange={onAddSearchNews}
                    value={searchNews}
                  />
                  <button onClick={onAddSearchNewsBtn}>Search</button>
                </div>
                <p style={{ color: "red", height: "25px", textAlign: "left" }}>{Error}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="innerBodycontent">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row pt-5">
                  <div className="newsSrchhdn">
                    {searchDuplicate ? (
                      <h4 className="mb-5">Showing results for - "{searchDuplicate}"</h4>
                    ) : (
                      <h4 className="mb-5">
                        Showing results for - "{localStorage.getItem("searchNews")}"
                      </h4>
                    )}
                  </div>

                  {newsList && newsList.length > 0 ? (
                    newsList.map((n, index) => (
                      <div className="col-md-2" key={index}>
                        <div className="newsPlayerbg newsSrchbg">
                          <a href={n.article_link1} target="_blank" rel="noreferrer">
                            <img src={soImg(n.team_imgs, n.player_imgs)} alt="" />
                          </a>
                          <div className="vidCardTxt">
                            <a href={n.article_link1} target="_blank" rel="noreferrer">
                              <small>{format(new Date(n.article_date1), "MM/dd/yyyy")}</small>
                              <h6>{n.article_headline1}</h6>
                              <p>{n.article_excerpt1}</p>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "red" }}>No Data Found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsSearch;
