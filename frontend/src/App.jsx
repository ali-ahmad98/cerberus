import { useState } from "react";
import AppRoutes from "./AppRoutes";

function App() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  // useEffect(() => {
  //   window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  // }, []);

  const scrolltop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <>
      <AppRoutes />
      <button
        className="scrollTop"
        onClick={scrolltop}
        style={{ display: visible ? "inline" : "none" }}
      >
        <i className="fas fa-arrow-alt-up"></i>
      </button>
    </>
  );
}

export default App;
