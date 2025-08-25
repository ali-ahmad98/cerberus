import { Link } from "react-router-dom";

import ComingSoon from "./ComingSoon";

import { dropdownContent } from "./dropdownContent";
import { useDropDownContext } from "../../context/dropDownContext";

import styles from "./dropdown.module.css";

export const Dropdown = ({ hoveredLink, visible }) => {
  const { dropDownRef } = useDropDownContext();

  const contentList = dropdownContent[hoveredLink] ?? [];
  const dropDownContentList = contentList.map((item, index) => (
    <ul className={styles.list} key={index}>
      {item.title && <p className={styles.title}>{item.title}</p>}
      {item.links.map((link, index) => (
        <li key={index} className={styles["list-item"]}>
          <Link to="/" className={styles.link}>
            {link}
          </Link>
        </li>
      ))}
    </ul>
  ));
  return (
    <div
      aria-label="dropdown"
      className={`${styles.dropdown} ${visible ? styles.active : ""}`}
      ref={dropDownRef}
    >
      {contentList.length ? dropDownContentList : <ComingSoon />}
    </div>
  );
};
