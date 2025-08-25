import Buffalo from "../../Assets/headerIcon/buffalo.png";
import Miami from "../../Assets/headerIcon/Miami.png";
import England from "../../Assets/headerIcon/England.png";
import NewYork from "../../Assets/headerIcon/NewYork.png";
import Baltimore from "../../Assets/headerIcon/baltimore.png";
import Cincennati from "../../Assets/headerIcon/cincennati.png";
import Cleveland from "../../Assets/headerIcon/Cleveland.png";
import Pittsburgh from "../../Assets/headerIcon/Pittsburgh.png";
import Houston from "../../Assets/headerIcon/Houston.png";
import Indianapolis from "../../Assets/headerIcon/Indianapolis.png";
import Jacksonville from "../../Assets/headerIcon/Jacksonville.png";
import Tennessee from "../../Assets/headerIcon/Tennessee.png";
import Denver from "../../Assets/headerIcon/Denver.png";
import Kansas from "../../Assets/headerIcon/Kansas.png";
import Las from "../../Assets/headerIcon/Las.png";
import Los from "../../Assets/headerIcon/Los.png";
import { articleCategoryListApi } from "../../service/articleService";
import { getLinkFromTitle } from "../Aritcles/HelperArticle";
import { checkLoginOrNotRedirectUrl } from "../../service/GeneralFn";

export const headerData = [
  {
    title: "NFL",
    isLink: true,
    url: "/nfl",
    mainLink: {
      rowOne: [
        {
          title: "Schedule",
          isLink: true,
          url: checkLoginOrNotRedirectUrl("/nfl/schedule"),
        },
        {
          isLink: true,
          title: "Scores",
          url: checkLoginOrNotRedirectUrl("/nfl/scoreboard"),
        },
        {
          title: "Teams",
          isLink: true,
          url: checkLoginOrNotRedirectUrl("/nfl/team"),
        },
      ],
      rowTwo: [
        {
          title: "Standings",
          isLink: true,
          url: checkLoginOrNotRedirectUrl("/nfl/standings"),
        },
        {
          title: "Stats",
          isLink: true,
          url: checkLoginOrNotRedirectUrl("/nfl/team-details/stats"),
        },
        {
          isLink: true,
          title: "Roster",
          url: checkLoginOrNotRedirectUrl("/nfl/team-details/roster"),
        },
      ],
      rowThree: [
        {
          isLink: true,
          title: "Injuries",
          url: checkLoginOrNotRedirectUrl("/nfl/team-details/injuries"),
        },
      ],
    },
    AFC_LINK: {
      rowOne: [
        {
          isLink: false,
          title: "AFC East",
          subUrl: [
            {
              isLink: false,
              icon: <img src={Buffalo} alt="Buffalo" />,
              title: "Buffalo Bills",
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/nfl/injuries",
                },
              ],
            },
            {
              icon: <img src={Miami} alt="Buffalo" />,
              isLink: false,
              title: "Miami Dolphins",
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
            {
              icon: <img src={England} alt="Buffalo" />,
              isLink: false,
              title: "New England Patriots",
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
            {
              icon: <img src={NewYork} alt="Buffalo" />,
              isLink: false,
              title: "New York Jets",
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
          ],
        },
      ],
      rowTwo: [
        {
          title: "AFC North",
          isLink: false,

          subUrl: [
            {
              isLink: false,
              icon: <img src={Baltimore} alt="Baltimore" />,
              title: "Baltimore Ravens",
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
            {
              icon: <img src={Cincennati} alt="Buffalo" />,
              isLink: false,

              title: "Cincinnati Bengals",
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
            {
              icon: <img src={Cleveland} alt="Buffalo" />,
              title: "Cleveland Browns",
              isLink: false,
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
            {
              icon: <img src={Pittsburgh} alt="Buffalo" />,
              title: "Pittsburgh Steelers",
              isLink: false,
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
          ],
        },
      ],
      rowThree: [
        {
          title: "AFC South",
          isLink: false,
          subUrl: [
            {
              icon: <img src={Houston} alt="Buffalo" />,
              title: "Houston Texans",
              isLink: false,
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
            {
              icon: <img src={Indianapolis} alt="Buffalo" />,
              title: "Indianapolis Colts",
              isLink: false,
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
            {
              icon: <img src={Jacksonville} alt="Buffalo" />,
              title: "Jacksonville Jaguars",
              isLink: false,
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
            {
              icon: <img src={Tennessee} alt="Buffalo" />,
              title: "Tennessee Titans",
              isLink: false,
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
          ],
        },
      ],
      rowFour: [
        {
          title: "AFC West",
          isLink: false,

          subUrl: [
            {
              icon: <img src={Denver} alt="Buffalo" />,
              title: "Denver Broncos",
              isLink: false,

              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
            {
              icon: <img src={Kansas} alt="Buffalo" />,
              title: "Kansas City Chiefs",
              isLink: false,
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
            {
              icon: <img src={Las} alt="Buffalo" />,
              title: "Las Vegas Raiders",
              isLink: false,
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
            {
              icon: <img src={Los} alt="Buffalo" />,
              isLink: false,
              title: "Los Angeles Chargers",
              afcSub: [
                {
                  isLink: true,
                  title: "NFL Home Page ",
                  url: "/nfl",
                },
                {
                  title: "Roaster ",
                  isLink: true,
                  url: "/teams/roster",
                },
                {
                  isLink: true,
                  title: "Schedules ",
                  url: "/teams/schedule",
                },
                {
                  isLink: true,
                  title: "Player Stats ",
                  url: "/teams/stats",
                },
                {
                  isLink: true,
                  title: "Depth Chart",
                  url: "/teams/depth-chart",
                },
                {
                  isLink: true,
                  title: "Team Injuries",
                  url: "/teams/injuries",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    title: "NCAAF",
    isLink: true,
    url: "/ncaaf",
    mainLink: {
      rowOne: [
        {
          title: "Scoreboard",
          url: checkLoginOrNotRedirectUrl("/ncaaf/scoreboard"),
          isLink: true,
        },
        {
          title: "Rankings",
          url: checkLoginOrNotRedirectUrl("/ncaaf/ranking"),
          isLink: true,
        },

        {
          title: "Teams",
          url: checkLoginOrNotRedirectUrl("/ncaaf/team"),
          isLink: true,
        },
      ],
      rowTwo: [
        {
          title: "Schedule",
          url: checkLoginOrNotRedirectUrl("/ncaaf/schedule"),
          isLink: true,
        },
        {
          title: "Standings",
          url: checkLoginOrNotRedirectUrl("/ncaaf/standings"),
          isLink: true,
        },
        {
          isLink: true,
          title: "Roster",
          url: checkLoginOrNotRedirectUrl("/ncaaf/team-details/roster"),
        },
      ],
      rowThree: [
        {
          title: "Stats",
          isLink: true,
          url: checkLoginOrNotRedirectUrl("/ncaaf/team-details/stats"),
        },
      ],
    },
  },

  {
    title: "FANTASY",
    isLink: true,
    mainLink: {
      rowOne: [
        {
          title: "Fantasy Stats",
          url: "/nfl/fantasy-stats",
          isLink: true,
        },
      ],
    },
  },

  {
    title: "NEWS",
    isLink: true,
    url: "/news",
  },
  {
    title: "ARTICLES",
    isLink: true,
    url: "/articles",
    mainLink: {
      rowOne: getArticleCatList(),
    },
  },
  {
    title: "ABOUT",
    isLink: true,
    url: "/about-us",
  },
  {
    title: "MORE",
    isLink: false,
    url: "/",
    mainLink: {
      rowOne: [
        {
          title: "Podcast",
          url: "/podcast",
          isLink: true,
        },
        {
          title: "Help",
          url: "/help",
          isLink: true,
        },
      ],
      rowTwo: [
        {
          title: "Schedule",
          url: checkLoginOrNotRedirectUrl("/ncaaf/schedule"),
          isLink: true,
        },
      ],
    },
  },
];

// ICON COMPONENT
function getArticleCatList() {
  var returndataList = [];
  articleCategoryListApi().then(function (result) {
    const response = result.data;
    if (response.response_data) {
      response.response_data.map((element) => {
        var data = {
          title: element.title,
          url: "/articles/" + getLinkFromTitle(element.permalink),
          isLink: true,
        };
        returndataList.push(data);
      });
    }
  });
  return returndataList;
}
