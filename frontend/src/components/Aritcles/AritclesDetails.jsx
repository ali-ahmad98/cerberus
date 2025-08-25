import { useEffect, useState } from "react";
import ScroreBoard from "../homepage/ScroreBoard";
import Headerarticles from "../ArticlesWR/Headerarticles";
import Videos from "../homepage/Videos";
import Comments from "../ArticlesWR/Comments";
import { useParams } from "react-router-dom";
import { articleDetailsByLinkApi, articleRelatedListApi } from "../../service/articleService";
import { Helmet } from "react-helmet";
import GlobalConfig from "../../GlobalConfig";

const AritclesDetails = () => {
  const [relatedListData, set_relatedListData] = useState({});
  const [latestListData, set_latestListData] = useState({});
  const [currentCatUrl, set_currentCatUrl] = useState("");
  const [dataRow, set_dataRow] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      articleDetailsByLink();
    }
  }, [id]);

  async function articleDetailsByLink() {
    try {
      const detailResult = await articleDetailsByLinkApi(id);
      const detailResponse = detailResult.data;
      set_dataRow(detailResponse.response_data);
      set_currentCatUrl("/articles/" + detailResponse.response_data.category.permalink);

      const relatedResult = await articleRelatedListApi(id);
      const relatedResponse = relatedResult.data;
      set_relatedListData(relatedResponse.response_data.related);
      set_latestListData(relatedResponse.response_data.latest);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg_color_black_1a1a1a articles_wr overflow-x-hidden">
      <Helmet>
        <title>
          {dataRow.meta_title && dataRow.meta_title !== "null" ? dataRow.meta_title + " | " : ""}{" "}
          Article | {GlobalConfig.SITE_NAME}
        </title>
        <meta name="description" content={dataRow.meta_description || ""} />
        <meta name="keywords" content={dataRow.meta_keyword || ""} />
      </Helmet>

      <ScroreBoard />
      <Headerarticles
        articleData={dataRow}
        relatedListData={relatedListData}
        latestListData={latestListData}
        currentCatUrl={currentCatUrl}
      />
      <Videos viewOn="article" videoTitle="You May Also Interested" />
      <Comments articleId={id} />
    </div>
  );
};

export default AritclesDetails;
