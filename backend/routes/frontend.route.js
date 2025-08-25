const router = require("express").Router();
const { validateToken } = require("../middlewares/jwt-validation-middlewares");

const { userRegistration, userLogin, resetPasswordMail, resetPassword } = require("../controllers/frontend/auth.controller");
const { podcastList, contactUsSubmit, faqList, cmsdetailsByUrl, videoList,videoByPage, homePageData, homePageNewsContentData,homePageArticleVideos } = require("../controllers/frontend/site.controller");
const { updateUserProfile, userProfile, changePassword,addFavPodcast,favPodcastList } = require("../controllers/frontend/account.controller");

const { listOfNews }= require("../controllers/thirdApi/common.controller");
const {nflTeamList,getNflFantasyPlayerPosition,nflScheduleList,nflScheduleListByTeamId, nflTeamListDivisionGroup, nflTeamDetailsByTeamId, nflTeamListDropdown } = require("../controllers/frontend/thirdParty.controller");
const { categoryList, articleList, articleListByCategory, articleDetailsByLink, articleRelatedList, articleCommentsSubmit, getArticleComments } = require("../controllers/frontend/article.controller");
// const { getNflPlayerStatByTeamId, getNflTeamLeaderByTeamId, getNflPlayerDetails,getNflInjuriesByTeamId,getNflRosterByTeamId,getNflTeamStatByTeamId, getNflPlayerStatLeaderList } = require("../controllers/frontend/nfl_player.controller");
const { getNflPlayerStatByTeamId, getNflTeamLeaderByTeamId, getNflPlayerDetails,getNflInjuriesByTeamId,getNflRosterByTeamId,getNflTeamStatByTeamId,getNflScore,getNflStandings,getNflPlayerStatLeaderList,getNflLatestScore,getNflPlayerGameLog, followNflTeam,getNflDepthChart } = require("../controllers/frontend/nfl_player.controller");
const { getNcaaTeamList_divisionGr, getNcaaTeamList_leagueGr,NcaaScheduleList, getNcaaTeamList, getNcaaTeamDetails, getNcaaTeamLeaderByTeamId, getNcaaPlayerStatByTeamId,ncaaDivisionList,getNCaaRosterByTeamId, getNcaaScore,getNcaaPlayerDetails,getNcaaPlayerGameLog, getNcaaTeamRanking } = require("../controllers/frontend/ncaa_team.controller");
const { getTopHeadlineArticle, getTopHeadlineNews, getHomeBanner, getHighlightArticlePlayerProfile, getPlayerProfileHighlightArticle } = require("../controllers/frontend/nfl_ncaa_home_controller");
const { followTeam, checkFollowTeam,bothLiveScore,scoreBoard,getFantasyScore,getFantasyScore_recent,isCurrentDateInRange,ncaafCurrentRange} = require("../controllers/frontend/nfl_ncaa_common_controller");
const { getNflStanding, getNcaaStanding } = require("../controllers/frontend/nfl_ncaa_standing_controller");
const { quickLinkList } = require("../controllers/frontend/quickLink.controller");
const { getTeamListSearch, getNewsListSearch, getPlayerListSearch, getArticleListSearch } = require("../controllers/frontend/header_search_controller");


router.get('/', (req, res) => {
    res.send("Hello World");
})

router.post('/registration', userRegistration);
router.post('/login', userLogin);
router.post('/resetPasswordMail', resetPasswordMail);
router.post('/resetPassword', resetPassword);

//== Use After login ==============//
router.get('/userProfile', validateToken, userProfile);
router.post('/updateUserProfile', validateToken, updateUserProfile);
router.post('/changePassword', validateToken, changePassword);
router.post('/addFavRemovePodcast', validateToken, addFavPodcast);
router.get('/favPodcastList', validateToken, favPodcastList);





router.get('/homePageData', homePageData);
router.get('/homePageArticleVideos',homePageArticleVideos);
router.get('/homePageNewsContentData', homePageNewsContentData);
router.get('/podcastList', podcastList);
router.get('/faqList', faqList);
router.get('/cmsdetailsByUrl/:url', cmsdetailsByUrl);
router.get('/videoList', videoList);
// router.get('/videoByPage',videoByPage);


router.get('/categoryList', categoryList);
router.get('/articleList', articleList);
router.get('/articleList/:category', articleListByCategory);
router.get('/articleDetails/:id', articleDetailsByLink);
router.get('/articleRelatedList/:id', articleRelatedList); 

router.post('/articleCommentsSubmit', validateToken, articleCommentsSubmit);
router.get('/getArticleComments/:articleId', getArticleComments);



router.post('/contactUsSubmit', contactUsSubmit);

router.get('/listOfNews', listOfNews);

// 3rd party api data ======//
router.post('/nflScheduleList',nflScheduleList);
router.post('/nflScheduleListByTeamId',nflScheduleListByTeamId);


router.get('/getNflFantasyPlayerPosition',getNflFantasyPlayerPosition);

router.get('/nflTeamList', nflTeamList);
router.get('/nflTeamListDropdown', nflTeamListDropdown);
router.get('/nflTeamListDivisionGroup', nflTeamListDivisionGroup);
router.get('/nflTeamDetailsByTeamId/:teamId', nflTeamDetailsByTeamId);

router.get('/getNflTeamLeaderByTeamId', getNflTeamLeaderByTeamId); // For stat page
router.get('/getNflPlayerStatByTeamId', getNflPlayerStatByTeamId); // For stat page

router.get('/nflPlayerDetails/:playerId', getNflPlayerDetails);

router.get('/getNflInjuriesByTeamId',getNflInjuriesByTeamId);
router.get('/getNflRosterByTeamId',getNflRosterByTeamId);
router.get('/getNflTeamStatByTeamId',getNflTeamStatByTeamId);
router.get('/getNflPlayerStatLeaderList',getNflPlayerStatLeaderList);
router.post('/getNflScore',getNflScore);
router.post('/getNflStandings',getNflStandings);
router.post('/getNflLatestScore',getNflLatestScore);
router.get('/getNflPlayerGameLog',getNflPlayerGameLog);
router.get('/checkFollowTeam', checkFollowTeam);
router.get('/followTeam', followTeam);
router.get('/getNflDepthChartByTeam', getNflDepthChart);







router.get('/getNcaaTeamList', getNcaaTeamList);
router.get('/getNcaaTeamListGr', getNcaaTeamList_leagueGr);
// router.get('/getNcaaTeamList', getNcaaTeamList_divisionGr);
router.get('/getNcaaTeamDetails/:teamId', getNcaaTeamDetails);
router.get('/getNcaaTeamLeaderByTeamId', getNcaaTeamLeaderByTeamId);
router.get('/getNcaaPlayerStatByTeamId', getNcaaPlayerStatByTeamId);

router.post('/getNcaaScheduleList',NcaaScheduleList);
router.get('/ncaaDivisionList',ncaaDivisionList);
router.post('/getNcaaScore',getNcaaScore);



router.get('/getNCaaRosterByTeamId',getNCaaRosterByTeamId);
router.get('/ncaaPlayerDetails/:playerId', getNcaaPlayerDetails);
router.get('/getNcaaPlayerGameLog',getNcaaPlayerGameLog);

router.get('/getNcaaTeamRanking', getNcaaTeamRanking);



//===== NFL, NCAAF common API ================//

router.get('/getHomeBanner', getHomeBanner);
router.get('/getTopHeadlineArticle', getTopHeadlineArticle);
router.get('/getTopHeadlineNews', getTopHeadlineNews);
router.get('/getPlayerProfileHighlightArticle', getPlayerProfileHighlightArticle);


//===== NFL, NCAAF Standing API ================//

// router.get('/getNflStanding', getNflStanding); 
router.get('/getNcaaStanding', getNcaaStanding); 



//================liveScore=======================
router.get('/liveScores',bothLiveScore);
router.get('/scoreBoard',scoreBoard);


//================quick links===============
router.get('/quickLinkList',quickLinkList);


//================Header search===============

router.get('/getTeamListSearch', getTeamListSearch);
router.get('/getPlayerListSearch', getPlayerListSearch);
router.get('/getArticleListSearch', getArticleListSearch);
router.get('/getNewsListSearch', getNewsListSearch);


//========================fantasty score stats======================
router.post('/getFantasyScore',getFantasyScore);
router.post('/getFantasyScoreRecent',getFantasyScore_recent);

//====Player position

router.get('/checkGameWeek',isCurrentDateInRange);
router.get('/checkGameNcaaf',ncaafCurrentRange);



module.exports = router;