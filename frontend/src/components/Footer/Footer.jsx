import classes from "./Footer.module.css";
import logo from "../../Assets/logo.svg";
import { apiSolutionList, quickLinkList } from "../homepage/Helper";
import { FaceBookIcon, TwitterIcon, YoutubeIcon, InstagramIcon } from "../icons/Icons";
import { Link } from "react-router-dom";
import GlobalConfig from "../../GlobalConfig";

export const Fotter = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xxl-4 col-xl-6 col-lg-5 px-0 ">
          <div className="footer-img h-100 py-5 d-flex flex-column justify-content-between ">
            <div className="d-flex flex-column  align-items-sm-center pb-5 responsivefoot">
              <div className="ps-lg-0 ms-lg-0">
                <img className=" mb-2" src={logo} alt="logo" width="100px" />
                <p className=" footer-text font-22 fw-light">{GlobalConfig.FOOTER_ADDRESS}</p>

                <a
                  href={"tel:" + GlobalConfig.FOOTER_PH_NO}
                  className="cursor-pointer text-underline font-30 blue fw-semibold  footer-tel-link"
                >
                  {GlobalConfig.FOOTER_PH_NO}
                </a>

                <p className="mt-2">
                  <a
                    href={"mailto:" + GlobalConfig.FOOTER_EMAIL}
                    className="footer-text font-22 fw-light mail-footer-link"
                  >
                    {GlobalConfig.FOOTER_EMAIL}
                  </a>
                </p>
              </div>
            </div>
            <div className="ps-xxl-5 ms-xxl-5 pe-xl-5 me-xl-5 text-center text-xxl-start">
              <div className="px-4 ms-xxl-4 me-xl-5 pe-xl-5 me-xxl-0 ">
                <span className="mx-sm-5 ms-md-4 ms-lg-4 me-4 me-lg-4 me-xl-5">
                  <a
                    href="https://www.facebook.com/share/yRsF6VzWLiC6hr9C/?mibextid=qi2Omg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaceBookIcon />
                  </a>
                </span>
                <span className="mx-sm-5 mx-lg-4 mx-xl-5 mx-4">
                  <a
                    href="https://x.com/CerberusFS2023?t=XWrdHM6giiKQsn_2B4dj3w&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon />
                  </a>
                </span>
                <span className="mx-sm-5 mx-lg-4 mx-xl-5 mx-4">
                  <a
                    href="https://www.instagram.com/cerberusfs2023?igsh=eGRiMzJjdXZpYWsx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon />
                  </a>
                </span>
                <span className="mx-sm-5 mx-lg-4 mx-xl-5 mx-4">
                  <a
                    href="https://youtube.com/@cerberusfantasysports2023?si=yGEifUwtMi6MN01c"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <YoutubeIcon />
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-8 col-xl-6  col-lg-7 px-0 ">
          <div className="footer-bg h-100 py-5">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className=" col-md-7 d-flex justify-content-lg-center">
                  <div className="w-100 ps-md-5 ms-lg-0 respCol">
                    <ul className={`${classes.list} pb-0 ps-0`}>
                      <h1 className="mb-0 mb-2 font-22 fw-normal pb-4">QUICK LINKS</h1>
                      {apiSolutionList.map((obj, index) => (
                        <li key={index}>
                          <a className="font-20 fw-light footer-links-hover" href={obj.url}>
                            {obj.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className=" col-md-5 d-flex justify-content-sm-start justify-content-center">
                  <div className="w-100 respCol">
                    <ul className={`${classes.list} pb-0 ps-0`}>
                      {quickLinkList.map((obj, index) => (
                        <li key={index}>
                          <Link
                            to={"/" + obj.url}
                            className="font-20 fw-light footer-links-hover"
                            onClick={() => {
                              // window.scroll(0, 0);
                              window.scroll({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                              });
                            }}
                          >
                            {obj.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p className="font-14 fw-normal mb-0 d-sm-flex d-none grey responsiveCenter">
                    © Copyright {new Date().getFullYear()} {GlobalConfig.SITE_NAME}
                  </p>
                </div>
              </div>
            </div>
            <p className="mb-0 font-16 fw-normal d-sm-none d-block pb-5 text-center grey">
              © Copyright 2020 Cerberus Football Fantasy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Fotter;
