import { useEffect } from "react";
import { getAboutUsData } from "../../service/cmsService";
import { useState } from "react";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  const [aboutUsData, set_aboutUsData] = useState({});
  useEffect(() => {
    cmsdetailsByUrl();
  }, []);

  async function cmsdetailsByUrl() {
    getAboutUsData().then(function (result) {
      const response = result.data;
      set_aboutUsData(response.response_data);
    });
  }

  return (
    <>
      <Helmet>
        <title>NFL | {aboutUsData.meta_title ? aboutUsData.meta_title : ""}</title>
        <meta
          name="description"
          content={aboutUsData.meta_description ? aboutUsData.meta_description : ""}
        />
        <meta name="keywords" content={aboutUsData.meta_keyword ? aboutUsData.meta_keyword : ""} />
      </Helmet>
      <section className="innerMainbg">
        <div className="innerBannerbg">
          <div className="innerShadow">
            <div className="innerDots">
              <div className="innerHeading">
                <h2>{aboutUsData.cms_title}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="innerBodycontent noMrgnTop">
          <div className="container customContainer">
            <div className="row mb-4">
              <div className="col-md-12 aboutContent">
                <br />
                <br />

                <p
                  className="whitecol"
                  dangerouslySetInnerHTML={{
                    __html: aboutUsData.cms_description,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
