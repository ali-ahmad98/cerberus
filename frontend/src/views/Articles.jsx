import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import GlobalConfig from "../GlobalConfig";
import { articleListApi } from "../service/articleService";
import ScroreBoard from "../components/homepage/ScroreBoard";
import HeaderNflArtiles from "../components/Aritcles/HeaderArtilesNfl";
import HeaderArtilesNcaaf from "../components/Aritcles/HeaderArtilesNcaaf";
import NewsSection from "../components/homepage/NewsSection";
import HeaderArtilesDevy from "../components/Aritcles/HeaderArtilesDevy";
import HeaderArtilesCampusCanton from "../components/Aritcles/HeaderArtilesCampusCanton";
import HeaderArtilesDynasty from "../components/Aritcles/HeaderArtilesDynasty";
import HeaderArtilesSeasonLong from "../components/Aritcles/HeaderArtilesSeasonLong";
import ColorRingCustomLoader from "../components/common/ColorRingCustomLoader";

const Articles = () => {
  const [articleListData, set_articleListData] = useState({});
  const [isLoader, set_isLoader] = useState(true);

  useEffect(() => {
    getArticleListData();
  }, []);

  async function getArticleListData() {
    articleListApi().then(function (result) {
      const response = result.data;
      set_articleListData(response.response_data);
      set_isLoader(false);
    });
  }

  var nflList = "";
  var ncaaList = "";
  var DEVYList = "";
  var CAMPUSList = "";
  var DYNASTYList = "";
  var SEASONList = "";
  var otherList = "";
  {
    Object.entries(articleListData).map((objL) => {
      if (objL[0] == "NFL") {
        nflList = <HeaderNflArtiles catName={objL[0]} dataList={objL[1]} />;
      } else if (objL[0] == "NCAAF") {
        ncaaList = <HeaderArtilesNcaaf catName={objL[0]} dataList={objL[1]} />;
      } else if (objL[0] == "DEVY") {
        DEVYList = <HeaderArtilesDevy catName={objL[0]} dataList={objL[1]} />;
      } else if (objL[0] == "CAMPUS 2 CANTON") {
        CAMPUSList = <HeaderArtilesCampusCanton catName={objL[0]} dataList={objL[1]} />;
      } else if (objL[0] == "DYNASTY") {
        DYNASTYList = <HeaderArtilesDynasty catName={objL[0]} dataList={objL[1]} />;
      } else if (objL[0] == "SEASON LONG") {
        SEASONList = <HeaderArtilesSeasonLong catName={objL[0]} dataList={objL[1]} />;
      } else {
        otherList = otherList + <HeaderArtilesSeasonLong catName={objL[0]} dataList={objL[1]} />;
      }
    });
  }

  return (
    <>
      <Helmet>
        <title> Articles | {GlobalConfig.SITE_NAME} </title>
        <meta name="description" content={` Artiles | ${GlobalConfig.SITE_NAME}`} />
        <meta name="keywords" content={` Artiles | ${GlobalConfig.SITE_NAME}`} />
      </Helmet>
      {isLoader ? (
        <ColorRingCustomLoader isLoader={isLoader} />
      ) : (
        <>
          {nflList}
          {ncaaList}
          {DEVYList}
          {CAMPUSList}
          {DYNASTYList}
          {SEASONList}
          {otherList}
        </>
      )}

      <NewsSection />
    </>
  );
};

export default Articles;
