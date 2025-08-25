import {
  FaceBookIcon,
  InstagramIcon,
  SnapChatIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../icons/Icons";
import GlobalConfig from "../../GlobalConfig";
import webApi from "../../WebApi/WebApi";

export const topheadlinedata = [
  {
    buttonText: "QB Lawrence to stay at Clemson? 'Who knows?'",
  },
  {
    buttonText: "Washington's Onwuzurike declares for NFL draft",
  },
  {
    buttonText: "Ex-Wolverine Collins: Felt like 'no man's land'",
  },
  {
    buttonText: "Ohio State CB, son of protest leader, opting out",
  },
  {
    buttonText: "QB Lance skips spring season, enters NFL draft",
  },
];

export const followNflList = [
  {
    socialIconUrl: <FaceBookIcon />,
    socialLink: "Facebook",
    linkUrl: GlobalConfig.NFL_FB_LINK,
  },
  {
    socialIconUrl: <TwitterIcon />,
    socialLink: "Twitter",
    linkUrl: GlobalConfig.NFL_TWITTER_LINK,
  },
  {
    socialIconUrl: <InstagramIcon />,
    socialLink: "Instagram",
    linkUrl: GlobalConfig.NFL_INSTAGRAM_LINK,
  },
  {
    socialIconUrl: <YoutubeIcon />,
    socialLink: "Youtube",
    linkUrl: GlobalConfig.NFL_YOUTUBE_LINK,
  },
  {
    socialIconUrl: <SnapChatIcon />,
    socialLink: "Snapchat",
    linkUrl: GlobalConfig.NFL_SNAPCHAT_LINK,
  },
];

export const followNcaaList = [
  {
    socialIconUrl: <FaceBookIcon />,
    socialLink: "Facebook",
    linkUrl: GlobalConfig.NCAAF_FB_LINK,
  },
  {
    socialIconUrl: <TwitterIcon />,
    socialLink: "Twitter",
    linkUrl: GlobalConfig.NCAAF_TWITTER_LINK,
  },
  {
    socialIconUrl: <InstagramIcon />,
    socialLink: "Instagram",
    linkUrl: GlobalConfig.NCAAF_INSTAGRAM_LINK,
  },
  {
    socialIconUrl: <YoutubeIcon />,
    socialLink: "Youtube",
    linkUrl: GlobalConfig.NCAAF_YOUTUBE_LINK,
  },
  {
    socialIconUrl: <SnapChatIcon />,
    socialLink: "Snapchat",
    linkUrl: GlobalConfig.NCAAF_SNAPCHAT_LINK,
  },
];

export const scoreListData = [
  {
    listItem: "Home",
  },
  { listItem: "Player Profile" },
  { listItem: "NFL Draft" },
  { listItem: "Scores" },
  { listItem: "Schedule" },
  { listItem: "Standings" },
  { listItem: "Stats" },
  { listItem: "Teams" },
  { listItem: "Injuries" },
];

export const getNflScoreList = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.get(`/scoreBoard?page=NFL`);
    if (res.status === 200) {
      const r = res.data;
      return onSuccess(r);
    } else {
      onFailure?.("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure?.("Something Wrong! Please Try again later" + error);
  }
};

export const getNcaaScoreList = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.get(`/scoreBoard?page=NCAA`);
    if (res.status === 200) {
      const r = res.data;
      return onSuccess(r);
    } else {
      onFailure?.("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure?.("Something Wrong! Please Try again later" + error);
  }
};

export const getQuickLinkList = async (page, onSuccess, onFailure) => {
  try {
    const res = await webApi.get(`/quickLinkList?page=${page}`);
    if (res.status === 200) {
      const r = res.data;

      return onSuccess(r);
    } else {
      onFailure?.("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure?.("Something Wrong! Please Try again later" + error);
  }
};
