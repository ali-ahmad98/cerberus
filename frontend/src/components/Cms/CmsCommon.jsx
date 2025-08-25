import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCmsData } from "../../service/cmsService";
import { Helmet } from "react-helmet";

const CmsCommon = () => {
  const location = useLocation();
  const [cmsData, set_cmsData] = useState({});

  useEffect(() => {
    cmsdetailsByUrl();
  }, [location.pathname]);

  async function cmsdetailsByUrl() {
    try {
      const result = await getCmsData(location.pathname);
      const response = result?.data;
      set_cmsData(response?.response_data || {});
    } catch (error) {
      console.error("Error fetching CMS data:", error);
    }
  }

  return (
    <>
      <Helmet>
        <title>NFL | {cmsData?.meta_title || ""}</title>
        <meta name="description" content={cmsData?.meta_description || ""} />
        <meta name="keywords" content={cmsData?.meta_keyword || ""} />
      </Helmet>

      <section className="innerMainbg">
        <div className="innerBannerbg">
          <div className="innerShadow">
            <div className="innerDots">
              <div className="innerHeading">
                <h2>{cmsData?.cms_title || ""}</h2>
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
                {cmsData?.cms_description && (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: cmsData.cms_description,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CmsCommon;
