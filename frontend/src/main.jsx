import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DropDownContextProvider } from "./context/dropDownContext";
import { Helmet } from "react-helmet";
import GlobalConfig from "./GlobalConfig";
import App from "./App";

import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";
import "./App.css";
// import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Helmet>
      <title>{GlobalConfig.SITE_NAME}</title>
      <meta name="description" content="Web site created using create-react-app" />
    </Helmet>
    <ToastContainer />
    <DropDownContextProvider>
      <App />
    </DropDownContextProvider>
  </BrowserRouter>
);
