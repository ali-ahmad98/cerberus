/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import UppperTeethBg from "../../Assets/headerIcon/upperTeeth.png";
import BottomTeethBg from "../../Assets/headerIcon/bottomTeeth.png";

const TabletMainLink = ({ item, mouseLeaveHandler, toggleHandler }) => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = React.useState("");
  const [isTeamView, setIsTeamView] = React.useState(false);
  const [nestedList, setNestedList] = React.useState("");

  const showListHandler = (value) => {
    if (value == activeDropdown) {
      setActiveDropdown();
    } else {
      setActiveDropdown(value);
    }
  };

  const teamViewHandler = (value, item) => {
    if (item.isLink) {
      navigate(item.url);
      toggleHandler();
    }
    setIsTeamView(false);
    if (value == "Teams") {
      if (isTeamView) {
        setIsTeamView(false);
      }
      if (!isTeamView) {
        setIsTeamView(true);
      } else {
        setIsTeamView(false);
      }
    }

    if (value == nestedList) {
      setNestedList("");
    } else {
      setNestedList(value);
    }
  };
  const rowOneList = (value, item) => {
    if (item.isLink) {
      navigate(item.url);
      toggleHandler();
    }
    if (value == nestedList) {
      setNestedList("");
    } else {
      setNestedList(value);
    }
  };
  const routeHandler = (item) => {
    if (item.isLink) {
      mouseLeaveHandler();
      toggleHandler();
      navigate(item.url);
    }
  };
  return (
    <>
      {item.mainLink ? (
        <div
          id={`${item.title}`}
          className="collapse mobileDropdown position-relative"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <img src={UppperTeethBg} className="upper-teeth-bg mobile-teeth" alt="" />
          <img src={BottomTeethBg} className="bottom-teeth-bg mobile-teeth" alt="" />
          <div className="card-body p-0">
            <div className="row w-100 ">
              <div className="col-sm-auto col-6 px-md-5  d-flex flex-column">
                <div className="d-flex flex-column">
                  {item.mainLink.rowOne &&
                    item.mainLink.rowOne.map((item, index) => (
                      <React.Fragment key={index}>
                        <div
                          onClick={() => teamViewHandler(item.title, item)}
                          className="nested-dropdown-link py-3"
                        >
                          {item.title}
                        </div>
                        {item.title == nestedList && (
                          <>
                            <motion.div
                              initial={{ y: 100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ x: -100, opacity: 0 }}
                              className="d-flex flex-column"
                            >
                              <>
                                {item.rowOneSub &&
                                  item.rowOneSub.map((item, index) => (
                                    <div
                                      key={index}
                                      onClick={() => routeHandler(item)}
                                      className="team-stats"
                                    >
                                      {item.title}
                                    </div>
                                  ))}
                              </>
                            </motion.div>
                          </>
                        )}
                      </React.Fragment>
                    ))}
                </div>
              </div>
              <div className="col-sm-auto col-6 px-md-5 ">
                <div className="d-flex flex-column">
                  {item.mainLink.rowTwo &&
                    item.mainLink.rowTwo.map((item, index) => (
                      <React.Fragment key={index}>
                        <div
                          onClick={() => rowOneList(item.title, item)}
                          className="nested-dropdown-link py-3"
                        >
                          {item.title}
                        </div>
                        {item.title == nestedList && (
                          <>
                            <motion.div
                              initial={{ y: 100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ x: -100, opacity: 0 }}
                              className="d-flex flex-column"
                            >
                              <>
                                {item.rowTwoSub &&
                                  item.rowTwoSub.map((item, index) => (
                                    <div
                                      key={index}
                                      onClick={() => routeHandler(item)}
                                      className="team-stats cursor-pointer"
                                    >
                                      {item.title}
                                    </div>
                                  ))}
                              </>
                            </motion.div>
                          </>
                        )}
                      </React.Fragment>
                    ))}
                </div>
              </div>
              <div className="col-sm-auto col-6 px-md-5 ">
                <div className="d-flex flex-column">
                  {item.mainLink.rowThree &&
                    item.mainLink.rowThree.map((item, index) => (
                      <React.Fragment key={index}>
                        <div
                          onClick={() => rowOneList(item.title, item)}
                          className="nested-dropdown-link py-3"
                        >
                          {item.title}
                        </div>
                        {item.title == nestedList && (
                          <>
                            <motion.div
                              initial={{ y: 100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ x: -100, opacity: 0 }}
                              className="d-flex flex-column"
                            >
                              <>
                                {item.rowThreeSub &&
                                  item.rowThreeSub.map((item, index) => (
                                    <div
                                      key={index}
                                      onClick={() => routeHandler(item)}
                                      className="team-stats cursor-pointer"
                                    >
                                      {item.title}
                                    </div>
                                  ))}
                              </>
                            </motion.div>
                          </>
                        )}
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>
            <AnimatePresence>
              {isTeamView && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                >
                  {/*============ TABLE AFC LINK  =============*/}
                  <div className="row mt-4  w-100">
                    <div className="col-auto mb-5 px-5 d-flex flex-column">
                      {item.AFC_LINK &&
                        item.AFC_LINK.rowOne &&
                        item.AFC_LINK.rowOne.map((item, index) => (
                          <React.Fragment key={index}>
                            <span className="nested-dropdown-link">{item.title} </span>
                            {item.subUrl &&
                              item.subUrl.map((item, index) => (
                                <React.Fragment key={index}>
                                  <div
                                    onClick={() => showListHandler(item.title)}
                                    className="nested-dropdown-link "
                                  >
                                    {item.icon} <span>{item.title}</span>
                                  </div>
                                  <div className="d-flex flex-column">
                                    {activeDropdown == item.title
                                      ? item.afcSub &&
                                        item.afcSub.map((item, index) => (
                                          <div
                                            key={index}
                                            onClick={() => routeHandler(item)}
                                            className="afc-sub-url"
                                          >
                                            {item.title}
                                          </div>
                                        ))
                                      : ""}
                                  </div>
                                </React.Fragment>
                              ))}
                          </React.Fragment>
                        ))}
                    </div>
                    <div className="col-auto mb-5 px-5 d-flex flex-column">
                      {item.AFC_LINK &&
                        item.AFC_LINK.rowTwo &&
                        item.AFC_LINK.rowTwo.map((item, index) => (
                          <React.Fragment key={index}>
                            <span className="nested-dropdown-link">{item.title} </span>
                            {item.subUrl &&
                              item.subUrl.map((item, index) => (
                                <React.Fragment key={index}>
                                  <div
                                    onClick={() => showListHandler(item.title)}
                                    className="nested-dropdown-link "
                                  >
                                    {item.icon} <span>{item.title}</span>
                                  </div>
                                  <div className="d-flex flex-column">
                                    {activeDropdown == item.title
                                      ? item.afcSub &&
                                        item.afcSub.map((item, index) => (
                                          <div
                                            key={index}
                                            onClick={() => routeHandler(item)}
                                            className="afc-sub-url"
                                          >
                                            {item.title}
                                          </div>
                                        ))
                                      : ""}
                                  </div>
                                </React.Fragment>
                              ))}
                          </React.Fragment>
                        ))}
                    </div>
                    <div className="col-auto mb-5 px-5 d-flex flex-column">
                      {item.AFC_LINK &&
                        item.AFC_LINK.rowThree &&
                        item.AFC_LINK.rowThree.map((item, index) => (
                          <React.Fragment key={index}>
                            <span className="nested-dropdown-link">{item.title} </span>
                            {item.subUrl &&
                              item.subUrl.map((item, index) => (
                                <React.Fragment key={index}>
                                  <div
                                    onClick={() => {
                                      showListHandler(item.title);
                                    }}
                                    className="nested-dropdown-link "
                                  >
                                    {item.icon} <span>{item.title}</span>
                                  </div>
                                  <div className="d-flex flex-column">
                                    {activeDropdown == item.title
                                      ? item.afcSub &&
                                        item.afcSub.map((item, index) => (
                                          <div
                                            key={index}
                                            onClick={() => routeHandler(item)}
                                            className="afc-sub-url"
                                          >
                                            {item.title}
                                          </div>
                                        ))
                                      : ""}
                                  </div>
                                </React.Fragment>
                              ))}
                          </React.Fragment>
                        ))}
                    </div>
                    <div className="col-auto mb-5 px-5 d-flex flex-column">
                      {item.AFC_LINK &&
                        item.AFC_LINK.rowFour &&
                        item.AFC_LINK.rowFour.map((item, index) => (
                          <React.Fragment key={index}>
                            <span className="nested-dropdown-link">{item.title} </span>
                            {item.subUrl &&
                              item.subUrl.map((item, index) => (
                                <React.Fragment key={index}>
                                  <div
                                    onClick={() => showListHandler(item.title)}
                                    className="nested-dropdown-link "
                                  >
                                    {item.icon} <span>{item.title}</span>
                                  </div>
                                  <div className="d-flex flex-column">
                                    {activeDropdown == item.title
                                      ? item.afcSub &&
                                        item.afcSub.map((item, index) => (
                                          <div
                                            key={index}
                                            onClick={() => routeHandler(item)}
                                            className="afc-sub-url"
                                          >
                                            {item.title}
                                          </div>
                                        ))
                                      : ""}
                                  </div>
                                </React.Fragment>
                              ))}
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                  {/*=========== TABLET NFC LINK  ==================*/}
                  <div className="row mt-4  w-100">
                    <div className="col-auto mb-5 px-5 d-flex flex-column">
                      {item.NFC_LINK &&
                        item.NFC_LINK.rowOne &&
                        item.NFC_LINK.rowOne.map((item, index) => (
                          <React.Fragment key={index}>
                            <span className="nested-dropdown-link">{item.title} </span>
                            {item.subUrl &&
                              item.subUrl.map((item, index) => (
                                <React.Fragment key={index}>
                                  <div
                                    onClick={() => showListHandler(item.title)}
                                    className="nested-dropdown-link "
                                  >
                                    {item.icon} <span>{item.title}</span>
                                  </div>
                                  <div className="d-flex flex-column">
                                    {activeDropdown == item.title
                                      ? item.nfcSub &&
                                        item.nfcSub.map((item, index) => (
                                          <div
                                            key={index}
                                            onClick={() => routeHandler(item)}
                                            className="afc-sub-url"
                                          >
                                            {item.title}
                                          </div>
                                        ))
                                      : ""}
                                  </div>
                                </React.Fragment>
                              ))}
                          </React.Fragment>
                        ))}
                    </div>
                    <div className="col-auto mb-5 px-5 d-flex flex-column">
                      {item.NFC_LINK &&
                        item.NFC_LINK.rowTwo &&
                        item.NFC_LINK.rowTwo.map((item, index) => (
                          <React.Fragment key={index}>
                            <span className="nested-dropdown-link">{item.title} </span>
                            {item.subUrl &&
                              item.subUrl.map((item, index) => (
                                <React.Fragment key={index}>
                                  <div
                                    onClick={() => showListHandler(item.title)}
                                    className="nested-dropdown-link "
                                  >
                                    {item.icon} <span>{item.title}</span>
                                  </div>
                                  <div className="d-flex flex-column">
                                    {activeDropdown == item.title
                                      ? item.nfcSub &&
                                        item.nfcSub.map((item, index) => (
                                          <div
                                            key={index}
                                            onClick={() => routeHandler(item)}
                                            className="afc-sub-url"
                                          >
                                            {item.title}
                                          </div>
                                        ))
                                      : ""}
                                  </div>
                                </React.Fragment>
                              ))}
                          </React.Fragment>
                        ))}
                    </div>
                    <div className="col-auto mb-5 px-5 d-flex flex-column">
                      {item.NFC_LINK &&
                        item.NFC_LINK.rowThree &&
                        item.NFC_LINK.rowThree.map((item, index) => (
                          <React.Fragment key={index}>
                            <span className="nested-dropdown-link">{item.title} </span>
                            {item.subUrl &&
                              item.subUrl.map((item, index) => (
                                <React.Fragment key={index}>
                                  <div
                                    onClick={() => showListHandler(item.title)}
                                    className="nested-dropdown-link "
                                  >
                                    {item.icon} <span>{item.title}</span>
                                  </div>
                                  <div className="d-flex flex-column">
                                    {activeDropdown == item.title
                                      ? item.nfcSub &&
                                        item.nfcSub.map((item, index) => (
                                          <div
                                            key={index}
                                            onClick={() => routeHandler(item)}
                                            className="afc-sub-url"
                                          >
                                            {item.title}
                                          </div>
                                        ))
                                      : ""}
                                  </div>
                                </React.Fragment>
                              ))}
                          </React.Fragment>
                        ))}
                    </div>
                    <div className="col-auto mb-5 px-5 d-flex flex-column">
                      {item.NFC_LINK &&
                        item.NFC_LINK.rowFour &&
                        item.NFC_LINK.rowFour.map((item, index) => (
                          <React.Fragment key={index}>
                            <span className="nested-dropdown-link">{item.title} </span>
                            {item.subUrl &&
                              item.subUrl.map((item, index) => (
                                <React.Fragment key={index}>
                                  <div
                                    onClick={() => showListHandler(item.title)}
                                    className="nested-dropdown-link "
                                  >
                                    {item.icon} <span>{item.title}</span>
                                  </div>
                                  <div className="d-flex flex-column">
                                    {activeDropdown == item.title
                                      ? item.nfcSub &&
                                        item.nfcSub.map((item, index) => (
                                          <div
                                            key={index}
                                            onClick={() => routeHandler(item)}
                                            className="afc-sub-url"
                                          >
                                            {item.title}
                                          </div>
                                        ))
                                      : ""}
                                  </div>
                                </React.Fragment>
                              ))}
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        // IF IS DATA IS COMMING SOON
        item.title == "FANTASY" && (
          <div
            id={`${item.title}`}
            className="collapse mobileDropdown fantasy-bg "
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="card-body py-2 my-5">
              <h1 className="comming">Comming</h1>
              <h1 className="soon">Soon</h1>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default TabletMainLink;
