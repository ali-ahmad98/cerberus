import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
import { FaSearch } from "react-icons/fa";

const HeaderSearch = () => {
  const [topsearch, setTopsearch] = useState(false);
  const [searchData, set_searchData] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const navigate = useNavigate();

  useEffect(() => set_searchData(queryParams.get("s") || ""), [location.search]);

  const togsearch = () => setTopsearch(!topsearch);

  const headerSearchHandler = (e) => {
    const searchVal = e.target.value;
    set_searchData(searchVal);

    if (e.key === "Enter") {
      navigate(`/search?s=${encodeURIComponent(searchVal)}`);
    }
  };

  return (
    <div className={`navsrchs ${topsearch ? "searchNw" : ""}`}>
      <input
        type="text"
        placeholder="Search"
        value={searchData}
        onChange={headerSearchHandler}
        onKeyDown={headerSearchHandler}
      />
      <button type="button" className={styles.btn} onClick={togsearch}>
        <FaSearch />
      </button>
    </div>
  );
};

export default HeaderSearch;
