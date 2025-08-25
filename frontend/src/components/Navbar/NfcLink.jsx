/* eslint-disable no-unused-vars */
import { useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NfcLink = ({ item, viewTeam, mouseLeaveHandler }) => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState("");

  const dropdownOpenHandler = (value) => {
    if (value === activeDropdown) {
      setActiveDropdown("");
      gsap.fromTo(
        ".animated-el",
        { y: 0, x: 0, opacity: 1, height: "auto" },
        { opacity: 1, y: 0, duration: 0.2, height: "auto" }
      );
    } else {
      setActiveDropdown(value);
      gsap.fromTo(
        ".animated-el",
        { opacity: 0, y: -20, height: 0 },
        { y: 0, x: 0, duration: 0.2, opacity: 1, height: "auto" }
      );
    }
  };

  const routeHandler = (item) => {
    if (item.isLink) {
      mouseLeaveHandler();
      navigate(item.url);
    }
  };

  const renderRow = (rowData) =>
    rowData.map((item, index) => (
      <div key={index} className="mb-4">
        <li>{item.title}</li>
        <div className="d-flex mt-4 flex-column">
          {item.subUrl &&
            item.subUrl.map((subItem, subIndex) => (
              <div
                key={subIndex}
                className="dropdown-bottom-link"
                onClick={() => dropdownOpenHandler(subItem.title)}
              >
                {subItem.icon}
                <span className="d-inline-block pl-3">{subItem.title}</span>
                <div className="d-flex animated-el flex-column">
                  {subItem.title === activeDropdown &&
                    subItem.nfcSub &&
                    subItem.nfcSub.map((subSub, idx) => (
                      <div key={idx} className="afc-sub-url" onClick={() => routeHandler(subSub)}>
                        {subSub.title}
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    ));

  return (
    <AnimatePresence>
      {viewTeam && (
        <motion.div
          initial={{ scale: 0, transformOrigin: "left top", opacity: 0 }}
          animate={{ scale: 1, transformOrigin: "left top", opacity: 1 }}
          exit={{ scale: 0, transformOrigin: "left top", opacity: 0 }}
          className="w-100 bottom-list"
        >
          <div className="row w-100">
            <div className="col-auto px-5 mb-5">{renderRow(item.NFC_LINK.rowOne)}</div>
            <div className="col-auto px-5 mb-5">{renderRow(item.NFC_LINK.rowTwo)}</div>
            <div className="col-auto px-5 mb-5">{renderRow(item.NFC_LINK.rowThree)}</div>
            <div className="col-auto px-5 mb-5">{renderRow(item.NFC_LINK.rowFour)}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NfcLink;
