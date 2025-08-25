const router = require("express").Router();
const { validateToken } = require("../middlewares/jwt-validation-middlewares");

const { createAdminUser, adminLogin } = require("../controllers/admin/auth.controller");
const { cmsList, cmsAdd, cmsDetails, cmsUpdate, cmsUpdateStatus } = require("../controllers/admin/cms.controller");
const { userList, dashboard, myProfile, updateMyProfile, usersChart } = require("../controllers/admin/user.controller");
const { faqList, faqAdd, faqDetails, faqUpdate, faqUpdateStatus, faqDelete } = require("../controllers/admin/faq.controller");
const { contactUsList, contactUsAdd, contactUsDetails } = require("../controllers/admin/contact_us.controller");
const { podcastList, podcastAdd, podcastDetails, podcastUpdate, podcastUpdateStatus, podcastDelete } = require("../controllers/admin/podcast.controller");
const { articleList, articleAdd, articleDetails, articleUpdate, articleUpdateStatus,
    articleDelete, articleOrderNoUpdate, articleHighlightsUpdate } = require("../controllers/admin/article.controller");
const { videoList, videoAdd, videoUpdate, videoDetails, videoDelete, videoUpdateStatus } = require("../controllers/admin/video.controller");
const { CategoryAdd, categoryDetails, categoryUpdate, categoryUpdateStatus,
    categoryDelete, categoryListDropdown, categoryListAll } = require("../controllers/admin/category.controller");

const { apiDataSave, teamSaveUpdateData, ncaaDataSave,upadateNewsData } = require("../controllers/thirdApi/common.controller");
const { nflPlayerSave, nflPlayerStatSave, nflPlayerStatSaveByTeamId,
    nflInjuryUpdateSave, nflInjuryUpdateSaveByTeamId, nflRosterUpadteSave, nflRosterUpdateSaveByTeamId,
    nflTeamStatSave, nflTeamStatSaveByTeamId, nflScoreUpdateSave, nflStandingsUpdateSave, playerImageSave, playerImageSaveAll,nflDepthChartUpadteSave,nflDepthChartUpdateSaveByTeamId, nflPlayerFantasyScore, ForSaveFantasyScore } = require("../controllers/thirdApi/nfl_api.controller");
const { ncaaTeamSave, ncaaPlayerStatSave, ncaaPlayerStatSaveByTeamId, ncaaRosterUpadteSave,
    ncaaRosterUpdateSaveByTeamId, ncaaScoreUpdateSave,ncaaPlayerSave,ncaaplayerImageSave,ncaaplayerImageSaveAll, ncaaTeamRankingSave, ncaaPlayerFantasyScore, ForSaveNcaaFantastyScore } = require("../controllers/thirdApi/ncaa_team.controller");
const {getNflFantasyPlayerPosition, nflTeamList, nflPlayerList, nflPlayerListCount, nflTeamListCount } = require("../controllers/admin/nfl_admin.controller");
const { ncaafTeamList, ncaafTeamLogoUpload,ncaaPlayerList, ncaaPlayerListCount, ncaafTeamListCount,ncaaStandingsUpdateSave } = require("../controllers/admin/ncaaf_admin.controller");
const { bannerList, bannerAdd, bannerDetails, bannerUpdate, bannerUpdateStatus } = require("../controllers/admin/banner.controller");
const { newsList, newsListCount, newsChart } = require("../controllers/admin/news.controller");
const { metaList, metaAdd, metaDetails, metaUpdate, metaDeleteBulk } = require("../controllers/admin/meta.controller");
const { quickLinkList, quickLinkDetails, quickLinkAdd, quickLinkUpdate, quickLinkUpdateStatus,quickLinkDelete } = require("../controllers/admin/quickLink.controller");

router.get('/', (req, res) => {
    res.send("Hello Admin");
})

router.post('/createAdminUser', createAdminUser);
router.post('/adminLogin', adminLogin);

router.get('/dashboard', validateToken, dashboard);
router.get('/myProfile/:id', validateToken, myProfile);
router.post('/updateProfile', validateToken, updateMyProfile);

router.get('/userList', validateToken, userList);
router.get('/usersChart', validateToken, usersChart);


router.get('/podcastList', validateToken, podcastList);
router.post('/podcastAdd', validateToken, podcastAdd);
router.get('/podcastDetails/:id', validateToken, podcastDetails);
router.post('/podcastUpdate', validateToken, podcastUpdate);
router.get('/podcastUpdateStatus/:id', validateToken, podcastUpdateStatus);
router.get('/podcastDelete/:id', validateToken, podcastDelete);


router.get('/articleList', validateToken, articleList);
router.post('/articleAdd', validateToken, articleAdd);
router.get('/articleDetails/:id', validateToken, articleDetails);
router.post('/articleUpdate', validateToken, articleUpdate);
router.get('/articleUpdateStatus/:id', validateToken, articleUpdateStatus);
router.get('/articleDelete/:id', validateToken, articleDelete);
router.post('/articleOrderNoUpdate', validateToken, articleOrderNoUpdate);
router.post('/articleHighlightsUpdate', validateToken, articleHighlightsUpdate);


router.get('/cmsList', validateToken, cmsList);
router.get('/cmsDetails/:id', validateToken, cmsDetails);
router.post('/cmsAdd', validateToken, cmsAdd);
router.post('/cmsUpdate', validateToken, cmsUpdate);
router.get('/cmsUpdateStatus/:id', validateToken, cmsUpdateStatus);

router.get('/faqList', validateToken, faqList);
router.post('/faqAdd', validateToken, faqAdd);
router.get('/faqDetails/:id', validateToken, faqDetails);
router.post('/faqUpdate', validateToken, faqUpdate);
router.get('/faqUpdateStatus/:id', validateToken, faqUpdateStatus);
router.get('/faqDelete/:id', validateToken, faqDelete);


router.get('/videoList', validateToken, videoList);
router.post('/videoAdd', validateToken, videoAdd);
router.get('/videoDetails/:id', validateToken, videoDetails);
router.post('/videoUpdate', validateToken, videoUpdate);
router.get('/videoUpdateStatus/:id', validateToken, videoUpdateStatus);
router.get('/videoDelete/:id', validateToken, videoDelete);


router.get('/categoryList', validateToken, categoryListDropdown);

router.get('/categoryListAll', validateToken, categoryListAll);
router.post('/categoryAdd', validateToken, CategoryAdd);
router.get('/categoryDetails/:id', validateToken, categoryDetails);
router.post('/categoryUpdate', validateToken, categoryUpdate);
router.get('/categoryUpdateStatus/:id', validateToken, categoryUpdateStatus);
router.get('/categoryDelete/:id', validateToken, categoryDelete);


router.get('/bannerList', validateToken, bannerList);
router.post('/bannerAdd', validateToken, bannerAdd);
router.get('/bannerDetails/:id', validateToken, bannerDetails);
router.post('/bannerUpdate', validateToken, bannerUpdate);
router.get('/bannerUpdateStatus/:id', validateToken, bannerUpdateStatus);


router.get('/metaList', validateToken, metaList);
router.get('/metaDetails/:id', validateToken, metaDetails);
router.post('/metaAdd', validateToken, metaAdd);
router.post('/metaUpdate', validateToken, metaUpdate);
router.post('/metaDeleteBulk', validateToken, metaDeleteBulk);


router.get('/quickLinkList', validateToken, quickLinkList);
router.get('/quickLinkDetails/:id', validateToken, quickLinkDetails);
router.post('/quickLinkAdd', validateToken, quickLinkAdd);
router.post('/quickLinkUpdate', validateToken, quickLinkUpdate);
router.get('/quickLinkUpdateStatus/:id', validateToken, quickLinkUpdateStatus);
router.post('/quickLinkDelete/:id', validateToken, quickLinkDelete);




router.get('/contactUsList', validateToken, contactUsList);
router.post('/contactUsAdd', validateToken, contactUsAdd);
router.get('/contactUsDetails/:id', validateToken, contactUsDetails);

router.get('/newsList', validateToken, newsList);
router.get('/newsListCount', validateToken, newsListCount);
router.get('/newsChart', validateToken, newsChart);


//==== START::   3rd party Api For NFL to Admin
router.get('/nflTeamList', validateToken, nflTeamList);
router.get('/nflTeamListCount', validateToken, nflTeamListCount);

router.get('/nflPlayerList', validateToken, nflPlayerList); 
router.get('/nflPlayerListCount', validateToken, nflPlayerListCount);

//==== END::   3rd party Api For NFL to Admin



//==== START::   3rd party Api For NCAAF to Admin
router.get('/ncaafTeamList', validateToken, ncaafTeamList);
router.get('/ncaafTeamListCount', validateToken, ncaafTeamListCount);

router.get('/ncaaPlayerList', validateToken, ncaaPlayerList);
router.get('/ncaaPlayerListCount', validateToken, ncaaPlayerListCount);


router.post('/ncaafTeamLogoUpload', validateToken, ncaafTeamLogoUpload);
//==== END::   3rd party Api For NCAAF to Admin





//==== data save from 3rd party Api For NFL
router.post('/saveData', apiDataSave); //previously used for news data save
router.post('/upadateNewsData', upadateNewsData); 
router.post('/teamSaveUpdateData', teamSaveUpdateData);

router.post('/nflPlayerSave', nflPlayerSave);
router.post('/nflPlayerStatSave', nflPlayerStatSave);
router.get('/nflPlayerStatSaveByTeamId', nflPlayerStatSaveByTeamId);

router.get('/nflInjuryUpadteSave', nflInjuryUpdateSave);
router.get('/nflInjuryUpdateSaveByTeamId', nflInjuryUpdateSaveByTeamId);

router.get('/nflRosterUpadteSave', nflRosterUpadteSave);
router.get('/nflRosterUpdateSaveByTeamId', nflRosterUpdateSaveByTeamId);

router.get('/nflTeamStatSave', nflTeamStatSave);
router.get('/nflTeamStatSaveByTeamId', nflTeamStatSaveByTeamId);
router.get('/nflScoreUpdateSave', nflScoreUpdateSave);
router.get('/nflStandingsUpdateSave', nflStandingsUpdateSave);
router.get('/playerImageSave', playerImageSave);
router.get('/playerImageSaveAll', playerImageSaveAll);


router.get('/nflDepthChartUpadteSave', nflDepthChartUpadteSave);
router.get('/nflDepthChartUpdateSaveByTeamId', nflDepthChartUpdateSaveByTeamId);


//==== data save from 3rd party Api For NCAA

router.post('/ncaaSaveData',  ncaaDataSave);

router.post('/ncaaTeamSave', ncaaTeamSave);
router.post('/ncaaPlayerSave', ncaaPlayerSave);
router.get('/ncaaplayerImageSave', ncaaplayerImageSave);
router.get('/ncaaplayerImageSaveAll', ncaaplayerImageSaveAll);
router.get('/ncaaStandingsUpdateSave', ncaaStandingsUpdateSave);//
router.post('/ncaaPlayerStatSave', ncaaPlayerStatSave);
router.get('/ncaaPlayerStatSaveByTeamId', ncaaPlayerStatSaveByTeamId);
router.get('/ncaaRosterUpadteSave', ncaaRosterUpadteSave);
router.get('/ncaaRosterUpdateSaveByTeamId', ncaaRosterUpdateSaveByTeamId);
router.get('/ncaaScoreUpdateSave', ncaaScoreUpdateSave);


router.get('/ncaaTeamRankingSave', ncaaTeamRankingSave);

router.post('/saveFantasyScore',nflPlayerFantasyScore);
router.post('/saveFantasyScoreCal',ForSaveFantasyScore);

router.post('/ncaaFantasySave', ncaaPlayerFantasyScore);
router.post('/ncaaFantasyScoreCal', ForSaveNcaaFantastyScore);


module.exports = router;