import React, { useEffect } from "react";
import "./Header.css";
import { headerData } from "./Helper";
import styles from "./navbar.module.css";
import { MdAccountCircle } from "react-icons/md";
import HeaderLogo from "../../Assets/headerIcon/Group 1209.png";
import UppperTeethBg from "../../Assets/headerIcon/upperTeeth.png";
import BottomTeethBg from "../../Assets/headerIcon/bottomTeeth.png";
import AfcLink from "./AfcLink";
import NfcLink from "./NfcLink";
import { UpperTeeth, BottomTeeth } from "./HeaderIcon";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import TabletMainLink from "./TabletMainLink";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = React.useState();
  const [active, setActive] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(false);
  const [mobileActive, setMobileActive] = React.useState(false);
  const [activeAccordion, setActiveAccordion] = React.useState("");
  const [activeState, setActiveState] = React.useState("");
  const [viewTeam, setViewTeam] = React.useState(true);

  const mouseHoverHandler = (index) => {
    setActive(true);
    if (index == 0) {
      setFullWidth(true);
    }
    setActiveLink(index);
  };

  const toggleHandler = () => {
    setMobileActive(!mobileActive);
  };

  useEffect(() => {
    if (mobileActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileActive]);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  useEffect(() => {
    if (isDesktopOrLaptop) {
      document.body.style.overflow = "auto";
    }
  }, [isDesktopOrLaptop]);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  // UPPER TEETH GSAP ANIMATION

  useEffect(() => {
    gsap.fromTo(
      ".upperTeeth",
      {
        opacity: 0,
        y: -20,
      },
      {
        y: 0,
        duration: 0.4,
        opacity: 0,
      }
    );
    if (active) {
      gsap.fromTo(
        ".active-nav-link .upperTeeth",
        {
          opacity: 0,
          y: -20,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power4.out",
        }
      );
    }
  }, [active, activeLink]);

  // BOTTOM TEETH GSAP ANIMATION
  useEffect(() => {
    gsap.fromTo(
      ".bottomTeeth",
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 20,
        duration: 0.3,
        opacity: 0,
      }
    );
    if (active) {
      gsap.fromTo(
        ".active-nav-link .bottomTeeth",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power4.out",
        }
      );
    }
  }, [active, activeLink]);

  const mouseLeaveHandler = () => {
    setActiveLink(null);
    setFullWidth(false);
    setActive(false);
  };

  // WHEN ACTIVELINK VALUE IS NULL
  useEffect(() => {
    if (activeLink == null) {
      gsap.fromTo(
        ".bottomTeeth",
        {
          y: -20,
          opacity: 0,
        },
        {
          y: -20,
          duration: 0.3,
          opacity: 0,
        }
      );
    }
  }, [activeLink]);

  // FIND ACTIVE ACCORDION VALUE IN MOBILE OR TABLET
  const accordianHandler = (value) => {
    if (activeAccordion == value) {
      setActiveAccordion("");
    } else {
      setActiveAccordion(value);
    }
  };

  // SLIDE UPDWON ON COMPONENT MOUNT
  useEffect(() => {
    gsap.fromTo(
      ".slideUpDown",
      {
        opacity: 0,
        y: -100,
      },
      {
        y: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power4.out",
      }
    );
  }, []);

  const onMouseEnter = (value) => {
    setActiveState(value);
  };

  const onMouseLeave = () => {
    setActiveState("");
    gsap.fromTo(
      ".slideDown",
      {
        opacity: 0,
        y: 0,
      },
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power4.out",
      }
    );
  };

  useEffect(() => {
    if (activeState != "") {
      gsap.fromTo(
        ".slideUpDown",
        {
          opacity: 0,
          y: 20,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
        }
      );
    }
  }, [activeState]);

  useEffect(() => {
    gsap.fromTo(
      ".slideDown",
      {
        opacity: 0,
        y: 0,
      },
      {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power4.out",
      }
    );
  }, []);

  const teamHandler = (value, item) => {
    if (value == "Teams") {
      if ((value = viewTeam)) {
        setViewTeam(true);
      } else {
        setViewTeam(true);
      }
    }
    if (item.isLink) {
      mouseLeaveHandler();
      navigate(item.url);
    }
  };

  const routeHandler = (item) => {
    if (item.isLink) {
      mouseLeaveHandler();
      navigate(item.url);
    }
  };

  // TEETH CLICK ANIMATION HANDLER ON NAV ITEMS
  const teethCloseAnimHandler = (item) => {
    if (item.isLink) {
      navigate(item.url);
    }
    gsap.fromTo(
      ".active-nav-link .upperTeeth",
      {
        y: 0,
        opacity: 1,
      },
      {
        y: 24,
        duration: 0.3,
        opacity: 1,
      }
    );
    gsap.fromTo(
      ".active-nav-link  .bottomTeeth",
      {
        y: 0,
        opacity: 1,
      },
      {
        y: -24,
        duration: 0.3,
        opacity: 1,
      }
    );
  };

  const mobileRouteHandler = (e, item) => {
    if (item.isLink) {
      e.stopPropagation();
      navigate(item.url);
      setMobileActive(!mobileActive);
    }
  };

  const ff_isLogin = localStorage.getItem("ff_isLogin");

  return (
    <section className={`px-4 header-style ${mobileActive ? "mobile-menu-active" : ""}`}>
      <div className="d-flex w-100 h-100 justify-content-between align-items-center">
        <div className="d-flex h-100  flex-grow-1">
          <div
            onClick={() => navigate("/")}
            className={`${styles.box}  logo-parent d-flex cursor-pointer  align-items-center`}
          >
            <img className="w-100" src={HeaderLogo} alt="Navbar logo" />
          </div>
          {isDesktopOrLaptop && (
            <div className="flex-grow-1 h-100 position-relative   d-flex ">
              {headerData.map((item, index) => (
                <div
                  onMouseEnter={() => mouseHoverHandler(index)}
                  onMouseLeave={mouseLeaveHandler}
                  className={`linkStyle ${!fullWidth ? "position-relative" : ""}   ${
                    active && index == activeLink ? "active-nav-link" : ""
                  }`}
                  key={index}
                >
                  {/*================= NAV LINK ============*/}
                  <span
                    onClick={() => teethCloseAnimHandler(item)}
                    className="d-flex py-2  flex-column position-relative align-items-center text-center px-xl-4  h-100 w-100"
                  >
                    <UpperTeeth />
                    <span className=" px-2 "> {item.title}</span>
                    <BottomTeeth />
                    <div className="bg-anim"></div>
                  </span>

                  {/*================= DROPDOWN LINK ============*/}
                  {item.mainLink ? (
                    <div
                      className={` ${index == activeLink ? "active-dropdown" : ""} ${
                        !fullWidth ? "custom-width" : ""
                      } ${index == 7 ? "right-0" : ""} ${
                        !viewTeam ? "teamWidthRemove" : ""
                      }  dropdown-style py-5 mb-5`}
                    >
                      <img src={UppperTeethBg} className="upper-teeth-bg" alt="upper-teeth-bg" />
                      <img src={BottomTeethBg} className="bottom-teeth-bg" alt="bottom-teeth-bg" />
                      <div className="w-100 d-flex">
                        <div className="d-flex flex-column">
                          {/*============= TOP DROPDOWN ROW ONE LINK LIST MAP ==========*/}
                          {item.mainLink &&
                            item.mainLink.rowOne &&
                            item.mainLink.rowOne.map((item, index) => (
                              <div
                                key={index}
                                className={`dropdown-link-style`}
                                onMouseEnter={() => onMouseEnter(item.title)}
                                onMouseLeave={() => onMouseLeave()}
                                onClick={() => teamHandler(item.title, item)}
                              >
                                <span>{item.title}</span>

                                <div className={`d-flex mt-3 slideDown  flex-column `}>
                                  {item.rowOneSub &&
                                    item.rowOneSub.map((item, index) => (
                                      <div
                                        onClick={() => routeHandler(item)}
                                        className={`team-stats`}
                                        key={index}
                                      >
                                        {item.title}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ))}
                        </div>
                        <div className="d-flex flex-column">
                          {/*============= TOP DROPDOWN ROW TOW LINK LIST MAP ==========*/}
                          {item.mainLink &&
                            item.mainLink.rowTwo &&
                            item.mainLink.rowTwo.map((item, index) => (
                              <div
                                key={index}
                                className={`dropdown-link-style`}
                                onMouseEnter={() => onMouseEnter(item.title)}
                                onMouseLeave={() => onMouseLeave()}
                                onClick={() => routeHandler(item)}
                              >
                                <span>{item.title}</span>
                                <div
                                  className={`d-flex slideDown mt-3 flex-column ${
                                    activeState == item.title ? "slideUpDown" : ""
                                  }`}
                                >
                                  {item.rowTwoSub &&
                                    item.rowTwoSub.map((item, index) => (
                                      <div
                                        className={`team-stats`}
                                        onClick={() => routeHandler(item)}
                                        key={index}
                                      >
                                        {item.title}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ))}
                        </div>
                        <div className="d-flex flex-column">
                          {/*============= TOP DROPDOWN ROW THREE LINK LIST MAP ==========*/}
                          {item.mainLink &&
                            item.mainLink.rowThree &&
                            item.mainLink.rowThree.map((item, index) => (
                              <div
                                onMouseEnter={() => onMouseEnter(item.title)}
                                onMouseLeave={() => onMouseLeave()}
                                key={index}
                                className={`dropdown-link-style`}
                                onClick={() => routeHandler(item)}
                              >
                                <span>{item.title}</span>
                                <div
                                  className={`d-flex slideDown  mt-3 flex-column ${
                                    activeState == item.title ? "slideUpDown" : ""
                                  }`}
                                >
                                  {item.rowThreeSub &&
                                    item.rowThreeSub.map((item, index) => (
                                      <div
                                        className={`team-stats`}
                                        onClick={() => routeHandler(item)}
                                        key={index}
                                      >
                                        {item.title}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      {/*========================================== ACF LINK MAP  =======================================*/}
                      {item.AFC_LINK ? (
                        <AfcLink
                          mouseLeaveHandler={mouseLeaveHandler}
                          viewTeam={viewTeam}
                          item={item}
                        />
                      ) : (
                        ""
                      )}
                      {/*======================================= NFC LINK MAP  =============================================*/}

                      {item.NFC_LINK ? (
                        <NfcLink
                          mouseLeaveHandler={mouseLeaveHandler}
                          viewTeam={viewTeam}
                          item={item}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    item.title == "FANTASY" && (
                      <div
                        className={` ${index == activeLink ? "active-dropdown" : ""} ${
                          !fullWidth ? "custom-width" : ""
                        } ${index == 7 ? "right-align" : ""} ${
                          item.title == "FANTASY" ? "fantasy-bg" : ""
                        }   dropdown-style p-5 mb-5`}
                      >
                        <div className="p-5 m-5">
                          <h4 className="comming">Coming</h4>
                          <h4 className="soon">Soon</h4>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`${styles.buttons} pl-3`}>
          <HeaderSearch />

          <button type="button" className={styles.btn}>
            <Link to={`/${ff_isLogin ? "profile" : "login"}`} style={{ color: "gray" }}>
              <MdAccountCircle />
            </Link>
          </button>
          {isTabletOrMobile && (
            <div onClick={toggleHandler} className={`${mobileActive ? "on" : ""} menu-toggle`}>
              <div className="one"></div>
              <div className="two"></div>
              <div className="three"></div>
            </div>
          )}
        </div>
      </div>
      {/*================= MOBILE MENU ============*/}
      {isTabletOrMobile && mobileActive ? (
        <section className="mobile-menu-wrapper py-5 px-4">
          <div className="accordion" id="accordionExample">
            {headerData.map((item, index) => (
              <div className="card bg-transparent">
                <div className="card-header px-0" id="headingOne">
                  <h2 className="mb-0">
                    <button
                      className={`btn btn-link px-0 d-flex bg-transparent align-items-center border-0
                       mobile-view-menu justify-content-between btn-block text-left ${
                         activeAccordion == item.title ? "active-accordion" : ""
                       }`}
                      type="button"
                      data-toggle="collapse"
                      data-target={`#${item.title}`}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      key={index}
                      onClick={() => accordianHandler(item.title)}
                    >
                      <span onClick={(e) => mobileRouteHandler(e, item)}>{item.title}</span>
                      <div className="icon d-flex align-items-center justify-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="8"
                          viewBox="0 0 14 8"
                        >
                          <path
                            id="Path_8392"
                            data-name="Path 8392"
                            d="M5,6l5,5,1.366-1.366L15,6l2,1-7,7L3,7Z"
                            transform="translate(-3 -6)"
                            fill="#fff"
                          />
                        </svg>
                      </div>
                    </button>
                  </h2>
                </div>

                <TabletMainLink
                  mouseLeaveHandler={mouseLeaveHandler}
                  toggleHandler={toggleHandler}
                  item={item}
                />
              </div>
            ))}
          </div>
        </section>
      ) : (
        ""
      )}
    </section>
  );
};

export default Header;
