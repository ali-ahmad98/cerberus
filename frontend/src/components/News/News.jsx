import { Helmet } from "react-helmet";
import { getAllNewslist } from "../../service/newsService";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import cfsDefault from "../../../src/Assets/cfsdefault.png";

const News = () => {
  const navigate = useNavigate();
  const [newsList, SetAllNewsList] = useState({});
  const [searchNews, setSearchNews] = React.useState({
    txt_keyword_pharse: "",
  });
  const [Error, setAllError] = useState("");

  useEffect(() => {
    news();
  }, []);

  const news = () => {
    getAllNewslist("", (newsList) => {
      SetAllNewsList(newsList);
    });
  };

  // search Query
  const onAddSearchNews = (e) => {
    const { value } = e.target;

    setSearchNews(value);
  };

  const onAddSearchNewsBtn = () => {
    if (searchNews.txt_keyword_pharse === "") {
      setAllError("Please Enter Your Keyword");
    } else {
      getAllNewslist(searchNews, (r) => {
        SetAllNewsList(r);
        setAllError("");
        navigate("/news-search", {
          state: { searchNews: searchNews, result: r },
        });
        localStorage.setItem("searchNews", searchNews);
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

      <section class="innerMainbg helpBg customWidth">
        <div class="innerBannerbg">
          <div class="innerShadow">
            <div class="innerDots">
              <div class="innerHeading">
                <h2>News</h2>
                <div class="d-flex newsFrm">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    name="txt_keyword_pharse"
                    onChange={onAddSearchNews}
                    value={searchNews.txt_keyword_pharse}
                    style={{ borderColor: Error ? "red" : "", borderWidth: "2px" }}
                  />
                  <button onClick={onAddSearchNewsBtn}>Search</button>
                </div>

                <p
                  style={{
                    color: "red",
                    height: "25px",
                    textAlign: "left",
                  }}
                >
                  {Error}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="innerBodycontent">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 colFlex">
                <div className="vcScroll">
                  {newsList && newsList.length > 0
                    ? newsList.slice(0, 4).map((n, index) => (
                        <div key={index} class="video-card">
                          <div class="video-card-imgs">
                            <div class="videocard-img videoResize">
                              <a href={n.article_link1} target="_blank">
                                <img src={soImg(n.team_imgs, n.player_imgs)} alt="" />
                              </a>
                            </div>
                          </div>

                          <div class="vidCardTxt">
                            <a href={n.article_link1} target="_blank">
                              <small>{format(new Date(n.article_date1), "MM/dd/yyyy")}</small>
                              <h6>{n.article_headline1}</h6>
                              <p>{n.article_excerpt1}</p>
                            </a>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
              {newsList && newsList.length > 0
                ? newsList.slice(4, 7).map((n, index) => (
                    <div key={index} class="col-lg-3 col-md-6">
                      <div class="newsPlayerbg">
                        <a href={n.article_link1} target="_blank">
                          <img src={soImg(n.team_imgs, n.player_imgs)} alt="" />
                        </a>
                        <div class="npbtm">
                          <a href={n.article_link1} target="_blank">
                            <p>{n.article_excerpt1}</p>
                            <p class="text-end"></p>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                : ""}
            </div>

            <div class="row mb-2">
              {newsList && newsList.length > 0
                ? newsList.slice(7, 8).map((n, index) => (
                    <div key={index} class="col-lg-6">
                      <div class="newsPlayerbg">
                        <a href={n.article_link1} target="_blank">
                          <img src={soImg(n.team_imgs, n.player_imgs)} alt="" />
                        </a>
                        <div class="npbtm">
                          <a href={n.article_link1} target="_blank">
                            <p>{n.article_excerpt1}</p>
                            <p class="text-end"></p>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                : ""}

              {newsList && newsList.length > 0
                ? newsList.slice(8, 10).map((n, index) => (
                    <div key={index} class="col-lg-3 col-md-6">
                      <div class="newsPlayerbg">
                        <a href={n.article_link1} target="_blank">
                          <img src={soImg(n.team_imgs, n.player_imgs)} alt="" />
                        </a>
                        <div class="npbtm">
                          <a href={n.article_link1} target="_blank">
                            <p>{n.article_excerpt1}</p>
                            <p class="text-end"></p>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                : ""}
            </div>

            <div class="row">
              <div class="col-lg-9">
                <div class="row">
                  {newsList && newsList.length > 0
                    ? newsList.slice(10, 22).map((n, index) => (
                        <div key={index} class="col-md-6">
                          <div class="newsPlayerbg newsPlayerB">
                            <a href={n.article_link1} target="_blank">
                              <img src={soImg(n.team_imgs, n.player_imgs)} alt="" />
                            </a>
                            <div class="npbtm">
                              <a href={n.article_link1} target="_blank">
                                <p>{n.article_excerpt1}</p>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>

              <div class="col-lg-3 colFlex">
                <div className="vsScroll-b">
                  {newsList && newsList.length > 0
                    ? newsList.slice(22, 34).map((n, index) => (
                        <div key={index} class="video-card">
                          <div class="video-card-imgs">
                            <div class="videocard-img videoResize">
                              <a href={n.article_link1} target="_blank">
                                <img src={soImg(n.team_imgs, n.player_imgs)} alt="" />
                              </a>
                            </div>
                          </div>
                          <div class="vidCardTxt">
                            <a href={n.article_link1} target="_blank">
                              <small>{format(new Date(n.article_date1), "MM/dd/yyyy")}</small>
                              <h6>{n.article_headline1}</h6>
                              <p>{n.article_excerpt1}</p>
                            </a>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default News;
