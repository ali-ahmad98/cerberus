import axios from "axios";

//const prodApi =  "https://nodeserver.mydevfactory.com:9000/api/web"

//const devApi = "https://nodeserver.mydevfactory.com:9000/api/web"
const devApi = "http://localhost:9000/api/web";
const prodApi = "https://cerberusfantasysports.com:9000/api/web/";

// const devApi = "https://cerberusfantasysports.com:9000/api/web/"

export let baseURL;
const subdomain = window.location.host.split(".")[0];

if (process.env.NODE_ENV === "production" && subdomain === "live") {
  baseURL = prodApi;
} else {
  baseURL = devApi; //prodApi //
}

let instance = axios.create({
  baseURL: baseURL,
  // baseURL:betaApi,
  responseType: "json",
});

instance.defaults.headers.common["Authorization"] = localStorage.getItem("ff_AuthToken");

export default instance;
