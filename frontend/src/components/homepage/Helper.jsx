const ff_isLogin = localStorage.getItem("ff_isLogin");

export const apiSolutionList = [
  {
    text: "About Us",
    url: "#/about-us",
  },
  {
    text: "Privacy Policy",
    url: "#/privacy-policy",
  },
  {
    text: "Terms & Conditions",
    url: "#/terms-and-conditions",
  },
  {
    text: "Contact",
    url: "#/help",
  },
  {
    text: "Help",
    url: "#/help",
  },
];

export const quickLinkList = [
  {
    text: "Podcast",
    url: "podcast",
  },
  {
    text: "News",
    url: "news",
  },
];

if (!ff_isLogin) {
  quickLinkList.push(
    {
      text: "Register",
      url: "register",
    },
    {
      text: "Log in",
      url: "login",
    }
  );
}
